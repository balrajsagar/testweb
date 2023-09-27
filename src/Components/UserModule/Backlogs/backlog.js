/* 
FileName:index.js
purpose:To se all the backlogs
Developers:Naveen Kumar Gade[NKG],Satya Sidda[SS]

 */
import React, { useEffect, useReducer, useState } from 'react';
import SideBar from '../Utility/SideNav';
import TopNav from '../Utility/TopNav';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { tasksReducer, initialState } from './tasksReducer';
import { getAllTaskMessages,getActiveSprints,getUnassigned } from './network';
import Moment from 'moment';


import RootLoader from '../../Common/Loader/RootLoader';
import MainTaskChatBox from '../../Common/ChatMainTask';
import { Link } from 'react-router-dom';
import AddSubTask from '../../Common/SubTaskModals/addSubTask';
import MainTaskVerify from '../../Common/TaskVerify/mainTaskVerify';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';
import ModifyMainTask from '../../Common/TasksModals/modifyMainTask';
import AddToSprint from '../Backlogs/addToSprint';
import { SCRUM_MASTER,PRODUCT_OWNER,NEWSUBTASK, NEWMAINTASK, VIEWSUBTASKS, EDIT, DELETE, ACTION, CHAT, VIEW_DETAILS, ADD_TO_SPRINT, ACTION_ICON } from '../../Common/Headers';
import MainTaskDelete from '../../Common/TasksModals/deleteMainTask';
import AddMainTask from '../../Common/TasksModals/addMainTask';

export default function Backlogs() {
    const getUser = useSelector(state => state.auth)

    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        /*to fetch squad members from the data base through network function[SS] */
        getActiveSprints(dispatch, getUser.user)
        getUnassigned(dispatch, getUser.user)
        getAllTaskMessages(dispatch, getUser.user);
        // getCompleted(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])

    const backlogs=state.pendingTasks.concat(state.unassignedTasks)
    const manageTasks=backlogs


    useEffect(() => {
        if (state.currentTasks.length > 0) {
            $(document).ready(function () {
                window.$('#example1').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.currentTasks])
    useEffect(() => {
        if (manageTasks.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [manageTasks])
   
    const handleOpen = (action, index, sno) => {
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "addSubtask") {
            info = { mainTaskId: state.currentTasks[index].taskid, action: action, moduleId: state.currentTasks[index].moduleId, ideaId: state.currentTasks[index].ideano, assignedTo: state.currentTasks[index].assignedTo }
        }
        else if (action === "modify") {
            info = {
                moduleId: state.currentTasks[index].moduleId,
                ideaId: state.currentTasks[index].ideano,
                title: state.currentTasks[index].tasktitle,
                description: state.currentTasks[index].taskdescription,
                taskId: state.currentTasks[index].taskid,
                acceptanceCriteria: state.currentTasks[index].acceptanceCriteria,
                storyPoints: state.currentTasks[index].storyPoints,
                userDetails: state.currentTasks[index].assigntto,
                id: state.currentTasks[index].assignedTo,


            }
        }

        else if (action === "add") {
            var status = "backlog_addUser"
            info = {
                view: status,
            }
        } else if (action === "Verify") {
            info = { mainTaskId: state.currentTasks[index].taskid, title: state.currentTasks[index].tasktitle, action: action, moduleId: state.currentTasks[index].moduleId }
        }
        else if (action === "unassigned_taskInfo") {

            var view_status1 = "taskInfo"
            info = {
                view: view_status1,
                projectName: manageTasks[index].projectitle,
                moduleName: manageTasks[index].moduletitle,
                title: manageTasks[index].tasktitle,
                description: manageTasks[index].taskdescription,
                taskId: (getUser.user.corp).substring(0, 3).toUpperCase().concat('-', manageTasks[index].taskid),
                targetDate: manageTasks[index].targettime,
                timeLeft: manageTasks[index].timeLeft,
                extraHours: manageTasks[index].extraHours,
                status: manageTasks[index].completeStatus,
                createdDate: manageTasks[index].assignedon,
                taskProgress: manageTasks[index].taskStatus,
                storyPoints: manageTasks[index].storyPoints,
                acceptanceCriteria: manageTasks[index].acceptanceCriteria,
            }

        }
        else if (action === "taskInfo") {

            var view_status = "taskInfo"
            info = {
                view: view_status,
                projectName: state.currentTasks[index].projectitle,
                moduleName: state.currentTasks[index].moduletitle,
                title: state.currentTasks[index].tasktitle,
                description: state.currentTasks[index].taskdescription,
                taskId: (getUser.user.corp).substring(0, 3).toUpperCase().concat('-', state.currentTasks[index].taskid),
                targetDate: state.currentTasks[index].targettime,
                timeLeft: state.currentTasks[index].timeLeft,
                extraHours: state.currentTasks[index].extraHours,
                status: state.currentTasks[index].completeStatus,
                createdDate: state.currentTasks[index].assignedon,
                taskProgress: state.currentTasks[index].taskStatus,
                storyPoints: state.currentTasks[index].storyPoints,
                acceptanceCriteria: state.currentTasks[index].acceptanceCriteria,
            }

        }
        else if (action === "add_to_sprint") {
            info = {
                projectid: manageTasks[index].ideano,
                taskId: manageTasks[index].taskid,


            }

        }
        else if (action === "current_add_to_sprint") {
            info = {
                projectid: state.currentTasks[index].ideano,
                taskId: state.currentTasks[index].taskid,


            }

        }
        else if (action === "Delete") {
            info = {
                projectName: state.currentTasks[index].projectitle,
                title: state.currentTasks[index].tasktitle,
                description: state.currentTasks[index].taskdescription,
                taskId: state.currentTasks[index].taskid,
                moduleId: state.currentTasks[index].moduleId,
                action: action
            }
        } else {
            info = { action: action, id: state.currentTasks[index].taskid, sno: sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        if (cardInfo.action === "addSubtask") {
            setOpen({ status: false, index: 0 });
        } else {
            // manageTasks = []
            setOpen({ status: false, index: 0 });
            getActiveSprints(dispatch, getUser.user);
            getAllTaskMessages(dispatch, getUser.user);
            getUnassigned(dispatch, getUser.user)
        }
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    const getMessagesCount = (data, msg, task, empId) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.taskid).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })
        return (
            <i>
                {msgCount.length > 0 ? msgCount.length : null}
                {
                    msgCount.length > 0 ?
                        <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', backgroundColor: 'green' }} onClick={(event) => handleOpen("maintask", data, msgCount)} />
                        :
                        <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", data, msgCount)} />

                }
            </i>
        )
    }
          
    return (
        <div className="container-scroller">
            <TopNav />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    { state.currentTasks.length>0 ?
                                    <div>
                                        <h2 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent' }}> {(getUser.user.corp).substring(0, 3).toUpperCase().concat('-', state.activeSprint.moduleId, '   ', state.activeSprint.moduleDesc,'[',Moment(state.activeSprint.startDate).format('MM.DD.YYYY'),'-',Moment(state.activeSprint.targetDate).format('MM.DD.YYYY'),']' )}</h2>

                                        <h6>  {state.involvedEmployees.map((employee, index) => {
                                            const input = employee.assignedTo;
                                            const [name] = input.split('@');
                                            return <Link to={{ pathname: '/userMaintasks', state: { dashboard: 'backlogs', id: state.involvedEmployees[index].assignedToId,moduleid:state.activeSprint.moduleId} }} style={{ textTransform: "capitalize", padding: '1px', textAlign: 'center', marginLeft: '20px' }}>{name}-{employee.points}</Link>
                                        })}</h6>
                                    </div> :null}

                                    <div className="d-flex justify-content-end mb-2">
                                        <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" title={NEWMAINTASK} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{NEWMAINTASK}</span></button>
                                        {
                                            open.action === "add" ? <AddMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                            /> : null
                                        }
                                    </div>


                                    {/* <h4 className="card-title">{modulename}</h4> */}


                                    {state.isLoading ? <RootLoader /> :
                                        <div className="table-responsive">

                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"

                                            //data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        {/* <th>S.No</th> */}
                                                        <th>User Story Name</th>
                                                        {/* <th>{PROJECTNAME}</th> */}
                                                        {/* <th>Description</th> */}
                                                        {/* <th>Target Time</th> */}
                                                        {/* <th style={{width:"100px"}}>{ASSIGNED_TO}</th>
                                                        <th style={{width:"100px"}}>{ASSIGNED_BY}</th>
                                                        <th style={{width:"100px"}}>{MAINTASKPROGRESS}</th> */}
                                                        {/* <th>Time Left</th> */}
                                                        {/* <th>{STATUS}</th> */}
                                                        <th>{ACTION}</th>
                                                        <th>{CHAT}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.currentTasks.length > 0 ? state.currentTasks.map((tasks, index) => {
                                                            return (


                                                                <tr key={index}>
                                                                    {/* <td style={{textAlign:'end',width:'10px'}}>{index + 1}</td> */}
                                                                    {/* <td style={{ textAlign: 'center' }}>{tasks.taskid}</td> */}
                                                                    <td onClick={(event) => handleOpen("taskInfo", index)} title={"Epic Title       :" + tasks.projectitle + "\n\nSprint Name  :" + tasks.moduletitle + "\n\nAssigned To    :" + tasks.assigntto + "\n\nStory Points    :" + tasks.storyPoints + "\n\nAcceptance Criteria:" + tasks.acceptanceCriteria + "\n\nAssigned By    :" + tasks.assignby + "\n\nAssigned Date  :" + tasks.assignedon + "\n\nUser Story\nProgress          :" + tasks.taskStatus + "%"}><Link style={{ color: 'black' }}>{tasks.completeStatus === 'pending' ? <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.taskid}{'-'}{tasks.tasktitle}</b> : <del> <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.taskid}{'-'}{tasks.tasktitle}</b></del>}</Link></td>
                                                                    {/* <td style={{ textTransform: "capitalize" }}>{tasks.completeStatus ==='pending'? <p>{tasks.projectitle}</p>:<del> {tasks.projectitle}</del>}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.taskdescription}</td> */}
                                                                    {/* <td style={{ width: '100px' }}>{tasks.targettime}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.assigntto}</td>
                                                                    <td style={{textTransform:"capitalize"}}>{tasks.assignby}</td>
                                                                    <td style={{ textAlign: 'start',width:'50px' }}>{tasks.taskStatus}%</td> */}
                                                                    {/* {tasks.completeStatus === "pending" ? <td style={{ width: '100px' }}>{tasks.timeLeft}</td> : <td style={{ width: '100px' }}>{tasks.extraHours}</td>} */}
                                                                    {/* <td style={{ textAlign: 'center' }}>
                                                                        {tasks.completeStatus === "pending" ? <button className="badge badge-pill badge-danger border-0" style={{ width: '100px' }} onClick={(event) => handleOpen("taskInfo", index)}>Pending</button>
                                                                            : <button className="badge badge-pill badge-success border-0" style={{ width: '100px' }} onClick={(event) => handleOpen("taskInfo", index)}>Completed</button>}
                                                                    </td> */}

                                                                    <td style={{ textAlign: 'center', width: '10px' }}>
                                                                        <div className="dropdown show">
                                                                            {/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                                                                            </a>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                {/* {
                                                                                tasks.completeStatus === "pending" ? */}
                                                                                <div>
                                                                                {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#3DD896", color: 'white' }} onClick={(event) => handleOpen("current_add_to_sprint", index)}>{ADD_TO_SPRINT}</button> : null}

                                                                                    {/* {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#3DD896",color:'white' }} onClick={(event) => handleOpen("add_to_sprint", index)}>{ADD_TO_SPRINT}</button> : null} */}
                                                                                    <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                    {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button> : null}

                                                                                    <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78", color: 'white' }}><Link to={{ pathname: '/viewSubTasks', state: { id: state.currentTasks[index].taskid, title: state.currentTasks[index].tasktitle, moduleId: state.currentTasks[index].moduleId, ideaId: state.currentTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                                                    {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436", color: 'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button> : null}
                                                                                    {(getUser.user.empId === tasks.assignbyId) ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173', color: 'white' }} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                                                                </div>
                                                                                {/* :

                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "blue" }}><Link to={{ pathname: '/viewSubTasks', state: { id: manageTasks[index].taskid, title: manageTasks[index].tasktitle, moduleId: manageTasks[index].moduleId, ideaId: manageTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "grey" }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                                                        {(getUser.user.role === SCRUM_MASTER || getUser.user.role === PRODUCT_OWNER) ? <button className="dropdown-item badge badge-pill badge-success text-center" onClick={(event) => handleOpen("Verify", index)}>{VERIFY}</button> : null}
                                                                                    </div> */}
                                                                                {/* } */}
                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                    {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", index)} /></button></td> */}
                                                                    <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} >
                                                                            {
                                                                                getMessagesCount(index, state.allMessages, tasks, getUser.user.empId)
                                                                            }
                                                                        </button>
                                                                    </td>                                                             {/* onClick={() => handleOpenChat("subtask", id)} */}
                                                                </tr>
                                                            )
                                                        }
                                                        ) : null}
                                                </tbody>
                                            </table>
                                            
                                            {/* <MDBTable> */}
                                            
                                            {/* </MDBTable> */}
                                        </div>

                                        
                                    }
                                    <h2 className="card-title" style={{ marginTop: '20px',color:'blue' }}>Backlog</h2>
                                            <div className="table-responsive">
                                                <table
                                                    search="true"
                                                    id="example1" className="table table-striped table-bordered"
                                                //data-pagination="true"
                                                >
                                                    <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                        <tr>
                                                            {/* <th>S.No</th> */}
                                                            <th>User Story Name</th>
                                                            {/* <th>{PROJECTNAME}</th> */}
                                                            {/* <th>Description</th> */}
                                                            {/* <th>Target Time</th> */}
                                                            {/* <th style={{width:"100px"}}>{ASSIGNED_TO}</th>
                                                        <th style={{width:"100px"}}>{ASSIGNED_BY}</th>
                                                        <th style={{width:"100px"}}>{MAINTASKPROGRESS}</th> */}
                                                            {/* <th>Time Left</th> */}
                                                            {/* <th>{STATUS}</th> */}
                                                            <th style={{width:"30px"}}>{ACTION}</th>
                                                            <th style={{width:"30px"}}>{CHAT}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            manageTasks.length > 0 ? manageTasks.map((tasks, index) => {
                                                                return (


                                                                    <tr key={index}>
                                                                        {/* <td style={{textAlign:'end',width:'10px'}}>{index + 1}</td> */}
                                                                        {/* <td style={{ textAlign: 'center' }}>{tasks.taskid}</td> */}
                                                                        <td onClick={(event) => handleOpen("unassigned_taskInfo", index)} title={"Epic Title       :" + tasks.projectitle  + "\n\nSprint Name  :" + tasks.moduletitle + "\n\nAssigned To    :" + tasks.assigntto + "\n\nStory Points    :" + tasks.storyPoints + "\n\nAcceptance Criteria:" + tasks.acceptanceCriteria + "\n\nAssigned By    :" + tasks.assignby + "\n\nAssigned Date  :" + tasks.assignedon + "\n\nUser Story\nProgress          :" + tasks.taskStatus + "%"}><Link style={{ color: 'black' }}>{tasks.completeStatus === 'pending' ? <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.taskid}{'-'}{tasks.tasktitle}</b> : <del> <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.taskid}{'-'}{tasks.tasktitle}</b></del>}</Link></td>
                                                                        {/* <td style={{ textTransform: "capitalize" }}>{tasks.completeStatus ==='pending'? <p>{tasks.projectitle}</p>:<del> {tasks.projectitle}</del>}</td> */}
                                                                        {/* <td style={{textTransform:"capitalize"}}>{tasks.taskdescription}</td> */}
                                                                        {/* <td style={{ width: '100px' }}>{tasks.targettime}</td> */}
                                                                        {/* <td style={{textTransform:"capitalize"}}>{tasks.assigntto}</td>
                                                                    <td style={{textTransform:"capitalize"}}>{tasks.assignby}</td>
                                                                    <td style={{ textAlign: 'start',width:'50px' }}>{tasks.taskStatus}%</td> */}
                                                                        {/* {tasks.completeStatus === "pending" ? <td style={{ width: '100px' }}>{tasks.timeLeft}</td> : <td style={{ width: '100px' }}>{tasks.extraHours}</td>} */}
                                                                        {/* <td style={{ textAlign: 'center' }}>
                                                                        {tasks.completeStatus === "pending" ? <button className="badge badge-pill badge-danger border-0" style={{ width: '100px' }} onClick={(event) => handleOpen("taskInfo", index)}>Pending</button>
                                                                            : <button className="badge badge-pill badge-success border-0" style={{ width: '100px' }} onClick={(event) => handleOpen("taskInfo", index)}>Completed</button>}
                                                                    </td> */}

                                                                        <td style={{ textAlign: 'center', width: '10px' }}>
                                                                            <div className="dropdown show">
                                                                                {/* eslint-disable-next-line */}
                                                                                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                    <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                                                                                </a>
                                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                    {/* {
                                                                                tasks.completeStatus === "pending" ? */}
                                                                                    <div>
                                                                                        {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#3DD896", color: 'white' }} onClick={(event) => handleOpen("add_to_sprint", index)}>{ADD_TO_SPRINT}</button> : null}
                                                                                     <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A",color:'white' }} onClick={(event) => handleOpen("unassigned_taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                    {/* {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button> : null}

                                                                                    <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/viewSubTasks', state: { id: manageTasks[index].taskid, title: manageTasks[index].tasktitle, moduleId: manageTasks[index].moduleId, ideaId: manageTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                                                    {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436",color:'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button> : null}
                                                                                    {(getUser.user.empId === tasks.assignbyId) ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null} */} 
                                                                                    </div>
                                                                                    {/* :

                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "blue" }}><Link to={{ pathname: '/viewSubTasks', state: { id: manageTasks[index].taskid, title: manageTasks[index].tasktitle, moduleId: manageTasks[index].moduleId, ideaId: manageTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "grey" }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                                                        {(getUser.user.role === SCRUM_MASTER || getUser.user.role === PRODUCT_OWNER) ? <button className="dropdown-item badge badge-pill badge-success text-center" onClick={(event) => handleOpen("Verify", index)}>{VERIFY}</button> : null}
                                                                                    </div> */}
                                                                                    {/* } */}
                                                                                </div>
                                                                            </div>

                                                                        </td>
                                                                        {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", index)} /></button></td> */}
                                                                        <td style={{ width: '8px' }}>
                                                                            <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} >
                                                                                {
                                                                                    getMessagesCount(index, state.allMessages, tasks, getUser.user.empId)
                                                                                }
                                                                            </button>
                                                                        </td>                                                             {/* onClick={() => handleOpenChat("subtask", id)} */}
                                                                    </tr>
                                                                )
                                                            }
                                                            ) : null}
                                                    </tbody>
                                                </table>
                                            </div>


                                    {
                                        open.action === "maintask" ? <MainTaskChatBox open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "modify" ? <ModifyMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "addSubtask" ? <AddSubTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Delete" ? <MainTaskDelete open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Verify" ? <MainTaskVerify open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "unassigned_taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "add_to_sprint" ? <AddToSprint open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "current_add_to_sprint" ? <AddToSprint open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}