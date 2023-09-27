import React, { useEffect, useReducer, useState } from 'react';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { getModuleMainTasks, getAllTaskMessages } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
// import Header from '../TopNav';
import SideNavigation from '../SideNav';
import { setToken } from '../LocalStorage';
import { tasksReducer, initialState } from './tasksReducer';
import AddMainTask from './addMainTask';
import ModifyMainTask from './modifyMainTask';
import MainTaskVerify from '../TaskVerify/mainTaskVerify'
import MainTaskChatBox from '../ChatMainTask';
import { Link } from 'react-router-dom';
import AddSubTask from '../SubTaskModals/addSubTask';
import MainTaskInfo from './mainTaskInfo';
import MainTaskDelete from './deleteMainTask';
import {SCRUM_MASTER,PRODUCT_OWNER, MAINTASKNAME, VIEWSUBTASKS, NEWSUBTASK, NEWMAINTASK, EDIT, DELETE, VERIFY, ACTION, CHAT, VIEW_DETAILS, REASSIGN, ACTION_ICON } from '../Headers';
import TopNavWithOutProject from '../../UserModule/Utility/TopNav/topnav';

export default function ViewMainTasks(props) {
    var data = {
        id: props.location.state.id,
        title: props.location.state.title,
        ideaId: props.location.state.ideaId,
        startDate: props.location.state.startDate,
        targetDate: props.location.state.targetDate
    }
    const [year, month, date] = props.location.state.startDate.split('-');
    const [year1, month1, date1] = props.location.state.targetDate.split('-');


    setToken('module_id', data.id)
    setToken('module_name', data.title)
    setToken('startDate', data.startDate)
    setToken('targetDate', data.targetDate)
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, action: "", index: 0 })
    const [taskInfo, setTaskInfo] = useState()

    useEffect(() => {
        if (props.location.data !== undefined && props.location.data !== "") {
            getModuleMainTasks(dispatch, getUser.user, props.location.state.id);
            getAllTaskMessages(dispatch, getUser.user);
        }
        getModuleMainTasks(dispatch, getUser.user, props.location.state.id);
        getAllTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.location.data])
    useEffect(() => {
        if (state.manageTasks.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.manageTasks])
    const handleOpen = (action, index, sno) => {
        var info;
        setOpen({ status: true, action: action, index: index });
        if (action === "add") {
            info = { moduleId: props.location.state.id, ideaId: props.location.state.ideaId }
        } else if (action === "modify") {
            info = {
                moduleId: state.manageTasks[index].moduleId,
                ideaId: state.manageTasks[index].ideaId,
                title: state.manageTasks[index].taskTitle,
                description: state.manageTasks[index].taskDesc,
                taskId: state.manageTasks[index].id,
                acceptanceCriteria: state.manageTasks[index].acceptanceCriteria,
                userDetails: state.manageTasks[index].toEmp,
                storyPoints: state.manageTasks[index].storyPoints,

                id: state.manageTasks[index].assignedTo,
            }
        } else if (action === "addSubtask") {
            info = { mainTaskId: state.manageTasks[index].id, moduleId: state.manageTasks[index].moduleId, assignedTo: state.manageTasks[index].assignedTo, ideaId: props.location.state.ideaId }
        }
        else if (action === "Verify") {
            info = { mainTaskId: state.manageTasks[index].id, title: state.manageTasks[index].taskTitle, action: action }
        }
        else if (action === "taskInfo") {
            var view_status = "taskInfo"
            info = {
                view: view_status,
                projectName: state.manageTasks[index].projectName,
                moduleName: props.location.state.title,
                title: state.manageTasks[index].taskTitle,
                description: state.manageTasks[index].taskDesc,
                taskId: (getUser.user.corp).substring(0, 3).toUpperCase().concat('-', state.manageTasks[index].id),
                targetDate: state.manageTasks[index].targettime,
                timeLeft: state.manageTasks[index].timeLeft,
                extraHours: state.manageTasks[index].extraHours,
                status: state.manageTasks[index].completeStatus,
                createdDate: state.manageTasks[index].assignedDate,
                taskProgress: state.manageTasks[index].taskStatus,
                storyPoints: state.manageTasks[index].storyPoints,
                acceptanceCriteria: state.manageTasks[index].acceptanceCriteria,
                assignedTo: state.manageTasks[index].toEmp,
                assignedBy: state.manageTasks[index].byEmp,

            }
        } else if (action === "reassign") {
            info = {
                projectName: state.manageTasks[index].projectName,
                moduleId: props.location.state.id,
                ideaId: state.manageTasks[index].ideaId,
                title: state.manageTasks[index].taskTitle,
                description: state.manageTasks[index].taskDesc,
                taskId: state.manageTasks[index].id,
                acceptanceCriteria: state.manageTasks[index].acceptanceCriteria,
                storyPoints: state.manageTasks[index].storyPoints,
                userDetails: state.manageTasks[index].toEmp,
                id: state.manageTasks[index].assignedTo,
                priorityLevel: state.manageTasks[index].priorityLevel,
                action: action,
            }
        }
        else if (action === "Delete") {
            info = {
                projectName: state.manageTasks[index].projectName,
                title: state.manageTasks[index].taskTitle,
                description: state.manageTasks[index].taskDesc,
                taskId: state.manageTasks[index].id,
                moduleId: props.location.state.id,
                action: action
            }
        }
        else {
            info = {
                action: action,
                id: state.manageTasks[index].id,
                sno: sno
            }
        }
        setTaskInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getModuleMainTasks(dispatch, getUser.user, props.location.state.id);
        getAllTaskMessages(dispatch, getUser.user);
        // window.location.reload();
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    const getMessagesCount = (data, msg, task, empId) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.id).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })
        return (
            <i>
                {/* {msgCount.length > 0 ? msgCount.length : null} */}
                {
                    msgCount.length > 0 ?
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-8px" }} onClick={(event) => handleOpen("maintask", data, msgCount)} />
                            <span style={{ color: 'red', fontWeight: "bold" }}>{msgCount.length}</span>
                        </div>
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-8px" }} onClick={(event) => handleOpen("maintask", data, msgCount)} />
                        </div>
                }
            </i>
        )
    }
    return (
        <div className="container-scroller">
            <TopNavWithOutProject />
            <div className="container-fluid page-body-wrapper">
                <SideNavigation />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <div className="row justify-content-between">
                                            <h4 style={{ overflowWrap: "break-word", color: 'blue' }}><b>{props.location.state.title}</b>   [{month + '.' + date + '.' + year}-{month1 + '.' + date1 + '.' + year1}]</h4>


                                            <div className="d-flex justify-content-end mb-2">
                                                <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" title={NEWMAINTASK} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{NEWMAINTASK}</span></button>
                                                {
                                                    open.action === "add" ? <AddMainTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                                    /> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                        <div className="table-responsive">
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        {/* <th>S.No</th> */}
                                                        <th>{MAINTASKNAME}</th>
                                                        {/* <th>{PROJECTNAME}</th> */}
                                                        {/* <th>Description</th> */}
                                                        {/* <th>Target Time</th> */}
                                                        {/* <th>{ASSIGNED_TO}</th>
                                                        <th>{ASSIGNED_BY}</th>
                                                        <th style={{width:"100px"}}>{MAINTASKPROGRESS}</th> */}
                                                        {/* <th>Time Left</th> */}
                                                        {/* <th>{STATUS}</th> */}
                                                        <th>{ACTION}</th>
                                                        <th>{CHAT}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.manageTasks !== [] ? state.manageTasks.map((tasks, index) => {
                                                            return (
                                                                <tr key={tasks.id}>
                                                                    {/* <td style={{textAlign:'end',width:'10px'}}>{index + 1}</td> */}
                                                                    {/* <td style={{ textAlign: 'center', width: '10px' }}>{tasks.id}</td> */}
                                                                    <td onClick={(event) => handleOpen("taskInfo", index)} data-toggle="tooltip" data-placement="left" title={"Epic Name              :" + tasks.projectName + "\n\nAssigned To            :" + tasks.toEmp + "\n\nStory Points            :" + tasks.storyPoints + "\n\nAcceptance Criteria :" + tasks.acceptanceCriteria + "\n\nAssigned By            :" + tasks.byEmp + "\n\nAssigned Date        :" + tasks.assignedDate + "\n\nUser Story Progress:" + tasks.taskStatus + "%"}>{tasks.completeStatus === 'pending' ? <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.id}{'-'}{tasks.taskTitle}</b> : <del> <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.id}{'-'}{tasks.taskTitle}</b></del>}</td>
                                                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.projectName}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.taskDesc}</td> */}
                                                                    {/* <td style={{ width: '100px' }}>{tasks.targetDate}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.toEmp}</td>
                                                                    <td style={{textTransform:"capitalize"}}>{tasks.byEmp}</td>
                                                                    <td style={{ textAlign: 'start',width:'50px'}}>{tasks.taskStatus}%</td> */}
                                                                    {/* {tasks.completeStatus === "pending" ? <td style={{ width: '100px' }}>{tasks.timeleft}</td> : <td style={{ width: '100px' }}>{tasks.extraHours}</td>} */}
                                                                    {/* <td style={{ textAlign: 'center' }}>
                                                                        {tasks.completeStatus === "pending" ? <button className="badge badge-pill badge-danger border-0" style={{width:'100px'}} onClick={(event) => handleOpen("taskInfo", index)}>Pending</button>
                                                                            : <button className="badge badge-pill badge-success border-0" style={{width:'100px'}} onClick={(event) => handleOpen("taskInfo", index)}>Completed</button>}
                                                                    </td> */}

                                                                    <td style={{ textAlign: 'center', width: '10px' }}>
                                                                        <div className="dropdown show">{/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                                                                            </a>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                {tasks.completeStatus === "pending" ?
                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78", color: 'white' }}>
                                                                                            {getUser.user.role === "admin" ? <Link to={{ pathname: '/subTasks', state: { id: state.manageTasks[index].id, title: state.manageTasks[index].taskTitle, moduleId: state.manageTasks[index].moduleId, ideaId: props.location.state.ideaId } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link>
                                                                                                : <Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].id, title: state.manageTasks[index].taskTitle, moduleId: state.manageTasks[index].moduleId, ideaId: props.location.state.ideaId } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link>}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436", color: 'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                                                        {getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: 'red' }} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> :
                                                                                            (getUser.user.empId === tasks.assignedid) ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173', color: 'white' }} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                                                                        {/* <a className="dropdown-item badge-info text-center" onClick={(event) => handleOpen(index)}>AddMainTask</a> */}
                                                                                    </div> :
                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>

                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78", color: 'white' }}>
                                                                                            {getUser.user.role === "admin" ? <Link to={{ pathname: '/subTasks', state: { id: state.manageTasks[index].id, title: state.manageTasks[index].taskTitle, moduleId: state.manageTasks[index].moduleId, ideaId: props.location.state.ideaId } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link>
                                                                                                : <Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].id, title: state.manageTasks[index].taskTitle, moduleId: state.manageTasks[index].moduleId, ideaId: props.location.state.ideaId } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link>}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436", color: 'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                                                        {/* <a className="dropdown-item badge-info text-center" onClick={(event) => handleOpen(index)}>AddMainTask</a> */}
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "orange", color: 'white' }} onClick={(event) => handleOpen("reassign", index)}>{REASSIGN}</button>
                                                                                        {(getUser.user.role === SCRUM_MASTER || getUser.user.role === PRODUCT_OWNER) ? <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "green" }} onClick={(event) => handleOpen("Verify", index)}>Verify</button> : getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "#6BC2D3", color: 'white' }} onClick={(event) => handleOpen("Verify", index)}>{VERIFY}</button> : null}
                                                                                    </div>}
                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                    {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent',border:"0", width:'5px',padding:"0"}} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", index)} /></button></td> */}
                                                                    <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft: '15px' }} >
                                                                            {
                                                                                getMessagesCount(index, state.allMessages, tasks, getUser.user.empId)
                                                                            }
                                                                        </button>
                                                                    </td>
                                                                    {/* onClick={() => handleOpenChat("subtask", id)} */}
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>}
                                    {
                                        open.action === "modify" ? <ModifyMainTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "maintask" ? <MainTaskChatBox open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "addSubtask" ? <AddSubTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Verify" ? <MainTaskVerify open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Delete" ? <MainTaskDelete open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "reassign" ? <ModifyMainTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
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