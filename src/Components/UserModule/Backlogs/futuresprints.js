/* 
FileName:index.js
purpose:To se all the backlogs
Developers:Naveen Kumar Gade[NKG],Satya Sidda[SS]

 */
import React, { useEffect, useReducer, useState } from 'react';
import SideBar from '../Utility/SideNav';

import TopNav from '../Utility/TopNav';
// import { MDBTable } from 'mdbreact';
import { useSelector } from 'react-redux';
import { tasksReducer, initialState } from './tasksReducer';
import { getAllTaskMessages, getActiveSprints, getUnassigned, getCurrentSprint, getPending, getSprints } from './network';
import Moment from 'moment';
import RootLoader from '../../Common/Loader/RootLoader';
import ModifyModule from '../../Common/Modules/modifyModule';
import MainTaskChatBox from '../../Common/ChatMainTask';
import { Link } from 'react-router-dom';
import AddSubTask from '../../Common/SubTaskModals/addSubTask';
import MainTaskVerify from '../../Common/TaskVerify/mainTaskVerify';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';
import ModifyMainTask from '../../Common/TasksModals/modifyMainTask';
import AddToSprint from '../Backlogs/addToSprint';
import { SCRUM_MASTER,PRODUCT_OWNER,NEWSUBTASK, NEWMAINTASK, VIEWSUBTASKS, EDIT, DELETE, VIEW_DETAILS, ADD_TO_SPRINT, ADD_TO_EPIC, ACTION_ICON, CHAT } from '../../Common/Headers';
import MainTaskDelete from '../../Common/TasksModals/deleteMainTask';
import AddMainTask from '../../Common/TasksModals/addMainTask';

export default function Allbacklogs() {
    const getUser = useSelector(state => state.auth)

    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [searchWord, setSearchWord] = useState('')
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        getSprints(dispatch, getUser.user);
        getCurrentSprint(dispatch, getUser.user)
        getActiveSprints(dispatch, getUser.user)

        getPending(dispatch, getUser.user);
        getUnassigned(dispatch, getUser.user)
        getAllTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])

    const backlogs = state.pendingTasks.concat(state.unassignedTasks)
    const manageTasks = backlogs


    const handleOpen = (action, index, sno, id) => {
        // console.log( "action"+action )
        // console.log("index" + index)
        // console.log("sno" + id)
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "addSubtask") {
            info = { mainTaskId: state.currentTasks[index].taskid, action: action, moduleId: state.currentTasks[index].moduleId, ideaId: state.currentTasks[index].ideano, assignedTo: state.currentTasks[index].assignedTo }
        }
        else if (action === "modify") {
            info = {
                projectName: state.currentTasks[index].projectitle,
                moduleId: state.currentTasks[index].moduleId,
                ideaId: state.currentTasks[index].ideano,
                title: state.currentTasks[index].tasktitle,
                description: state.currentTasks[index].taskdescription,
                taskId: state.currentTasks[index].taskid,
                acceptanceCriteria: state.currentTasks[index].acceptanceCriteria,
                storyPoints: state.currentTasks[index].storyPoints,
                userDetails: state.currentTasks[index].assigntto,
                id: state.currentTasks[index].assignedTo,
                priorityLevel: state.currentTasks[index].priorityLevel,


            }
        }
        else if (action === "modify_sprint") {
            info = {
                id: state.sprints[index].moduleId,
                title: state.sprints[index].moduleDesc,
                targetDate: state.sprints[index].targetDate,
                startDate: state.sprints[index].startDate
            }
        }
        else if (action === "manage_modify") {
            info = {
                projectName: manageTasks[index].projectitle,
                moduleId: manageTasks[index].moduleId,
                ideaId: manageTasks[index].ideano,
                title: manageTasks[index].tasktitle,
                description: manageTasks[index].taskdescription,
                taskId: manageTasks[index].taskid,
                acceptanceCriteria: manageTasks[index].acceptanceCriteria,
                storyPoints: manageTasks[index].storyPoints,
                userDetails: manageTasks[index].assigntto,
                id: manageTasks[index].assignedTo,
                priorityLevel: state.currentTasks[index].priorityLevel,



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
                epicId: manageTasks[index].ideano,
                moduleName: manageTasks[index].moduletitle,
                moduleId: manageTasks[index].moduleId,
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
                assignedTo: manageTasks[index].assigntto,
                assignedBy: manageTasks[index].assignby,
                completedDate: manageTasks[index].modifiedDate,
                completedStatus: manageTasks[index].completeStatus,

            }

        }
        else if (action === "taskInfo") {

            var view_status = "taskInfo"
            info = {
                view: view_status,
                projectName: state.currentTasks[index].projectitle,
                epicId: state.currentTasks[index].ideano,
                moduleName: state.currentTasks[index].moduletitle,
                moduleId: state.currentTasks[index].moduleId,
                title: state.currentTasks[index].tasktitle,
                description: state.currentTasks[index].taskdescription,
                taskId: (getUser.user.corp).substring(0, 3).toUpperCase().concat('-', state.currentTasks[index].taskid),
                targetDate: state.currentTasks[index].targettime,
                timeLeft: state.currentTasks[index].timeLeft,
                extraHours: state.currentTasks[index].extraHours,
                createdDate: state.currentTasks[index].assignedon,
                taskProgress: state.currentTasks[index].taskStatus,
                storyPoints: state.currentTasks[index].storyPoints,
                acceptanceCriteria: state.currentTasks[index].acceptanceCriteria,
                assignedTo: state.currentTasks[index].assigntto,
                assignedBy: state.currentTasks[index].assignby,
                completedDate: state.currentTasks[index].modifiedDate,
                completedStatus: state.currentTasks[index].completeStatus,
            }
        }
        else if (action === "add_to_sprint") {
            info = {
                projectid: manageTasks[index].ideano,
                taskId: manageTasks[index].taskid,
            }
        }
        else if (action === "add_to_epic") {
            var epic_status = "epic"
            info = {
                view: epic_status,
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
        }
         else if (action ==='maintask') {
             console.log(state.currentTasks[index].taskid)
            info = { action: action, id: state.currentTasks[index].taskid, sno: sno }
        }
        else  {
            var chat_status='maintask'
            info = { action: chat_status, id: id, sno: sno }
        }
        setCardInfo(info)
    };
    // console.log(manageTasks[14].taskid)
    const handleClose = () => {
        if (cardInfo.action === "addSubtask") {
            setOpen({ status: false, index: 0 });
        } else {
            // manageTasks = []
            setOpen({ status: false, index: 0 });
            getSprints(dispatch, getUser.user);
            getCurrentSprint(dispatch, getUser.user)
            getUnassigned(dispatch, getUser.user)
            getAllTaskMessages(dispatch, getUser.user);
            getActiveSprints(dispatch, getUser.user)

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
                {/* {msgCount.length > 0 ? msgCount.length : null} */}
                {
                    msgCount.length > 0 ?
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }} onClick={(event) => handleOpen("maintask", data, msgCount)} />
                            <span style={{ color: 'red', fontWeight: "bold" }}>{msgCount.length}</span>
                        </div>
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }} onClick={(event) => handleOpen("maintask", data, msgCount)} />
                        </div>
                }
            </i>
        )
    }
    const getBacklogMessagesCount = (data, msg, task, empId, id) => {
        // console.log(id)
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.taskid).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })
        return (
            <i>
                {/* {msgCount.length > 0 ? msgCount.length : null} */}
                {
                    msgCount.length > 0 ?
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }} onClick={(event) => handleOpen("backlog_chat", data, msgCount, id)} />
                            <span style={{ color: 'red', fontWeight: "bold" }}>{msgCount.length}</span>
                        </div>
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }} onClick={(event) => handleOpen("backlog_chat", data, msgCount,id)} />
                        </div>
                }
            </i>
        )
    }
    const getAllSprints = (tasks, index) => {

        const [name] = (tasks.assigntto).split('@');

        return (<div className="col-12" key={tasks.taskid}>

            <div className="card col-12">
                <div className="container-fluid col-12 row" >
                    <div class="d-flex col-12" style={{ padding: 0 }}>
                        <div class="mr-auto p-2" >
                            <b style={{ width: '500px', cursor: 'pointer', paddingTop: 10 }} onClick={(event) => handleOpen("taskInfo", index)}> {tasks.completeStatus === 'pending' ? <p>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.taskid}{'-'}{tasks.tasktitle}</p> : <del> <p>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.taskid}{'-'}{tasks.tasktitle}</p></del>}</b>
                        </div>
                        <div style={{ backgroundColor: '#81B622', cursor: 'pointer', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, marginBottom: 5, borderRadius: '90px', fontSize: '15px', width: '25px', textAlign: 'center', }} data-toggle="tooltip" data-placement="bottom" title={name}>{name.substring(0, 1).toUpperCase()}</div>

                        <p style={{ backgroundColor: '#f37778', cursor: 'pointer', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, marginBottom: 5, textAlign: 'center', width: '100px' }} data-toggle="tooltip" data-placement="bottom" title={tasks.ideano === '0' ? 'NA' : tasks.projectitle}>{tasks.ideano === '0' ? 'NA' : tasks.projectitle.substring(0, 11)}</p>
                        <p style={{ backgroundColor: 'teal', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, marginBottom: 5, width: '30px' }}>P:{tasks.priorityLevel}</p>


                        <p style={{ backgroundColor: '#6495ED', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, marginBottom: 5, borderRadius: '70px', width: '25px', textAlign: 'center' }}>{tasks.storyPoints}</p>
                        <div className="dropdown show" style={{ padding: '10px' }}>
                            {/* eslint-disable-next-line */}
                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '15px', height: '15px', borderRadius: '0' }} />
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
                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft: '15px' }} >
                            {
                                getMessagesCount(index, state.allMessages, tasks, getUser.user.empId)
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>)

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
                                    {state.sprints.length > 0 ?
                                        <div>

                                            <h6>  {state.involvedEmployees.map((employee, index) => {
                                                const input = employee.assignedTo;
                                                const [name] = input.split('@');
                                                return <Link to={{ pathname: '/userMaintasks', state: { dashboard: 'backlogs', id: state.involvedEmployees[index].assignedToId, moduleid: state.activeSprint.moduleId } }} style={{ textTransform: "capitalize", padding: '1px', textAlign: 'center', marginLeft: '10px' }}>{name}-{employee.points}</Link>
                                            })}</h6>
                                        </div> : null}

                                    <div className="d-flex justify-content-end mb-2 " >
                                        <div style={{ flexDirection: 'column' }}>
                                            <div style={{ marginLeft: 380 }}>

                                                <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" title={NEWMAINTASK} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{NEWMAINTASK}</span></button>
                                                {
                                                    open.action === "add" ? <AddMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                                    /> : null
                                                }

                                            </div>
                                            <div class="input-group mb-3 mt-2">
                                                <div class="input-group-prepend">
                                                    <span class="text" style={{ color:'black', marginTop:'3px', fontSize:'13px' ,paddingRight:10 }}>Search:</span>
                                                </div>
                                                <input type="text" class="form-control" style={{ backgroundColor: 'transparent', borderBottom: '2px solid black', borderTop: '2px solid black', borderLeft: '12x solid black', borderRight: '2px solid black', marginTop: '-5px', width: '450px', height: '35px' }}
                                                    onChange={(event) => setSearchWord(event.target.value)}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    {state.isLoading ? <RootLoader /> :
                                        <div>
                                            {state.sprints.length > 0 ? state.sprints.map((modules, index) => {
                                                return (
                                                    <div>

                                                        <h2 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent', marginTop: '20px' }}> {(getUser.user.corp).substring(0, 3).toUpperCase().concat('-', modules.moduleId, '   ', modules.moduleDesc, '[', Moment(modules.startDate).format('MM.DD.YYYY'), '-', Moment(modules.targetDate).format('MM.DD.YYYY'), ']')}<span onClick={(event) => handleOpen("modify_sprint", index)}><img src="images/common/edit.svg" style={{ width: '18px', height: '18px' }} alt="" /></span></h2>
                                                        {/* eslint-disable-next-line */}
                                                        {state.currentTasks.length > 0 ? state.currentTasks.filter((val) => {
                                                            if (searchWord === "") {
                                                                return val
                                                            } else if (val.tasktitle.toLowerCase().includes(searchWord.toLowerCase()) || val.assigntto.toLowerCase().includes(searchWord.toLowerCase())) {
                                                                return val
                                                            }
                                                            // eslint-disable-next-line
                                                        }
                                                        ).map((tasks, index) => {

                                                            return (
                                                                (modules.moduleId === tasks.moduleId) ?
                                                                    getAllSprints(tasks, index) : null
                                                            )
                                                        }
                                                        ) : null
                                                        }
                                                    </div>
                                                )

                                            }) : null}

                                        </div>

                                    }

                                    {manageTasks.length > 0 ? <h2 className="card-title" style={{ marginTop: '20px', color: 'blue' }}>Backlog</h2> : null}
                                    <div>
                                        {/* eslint-disable-next-line */}
                                        {manageTasks.length > 0 ? manageTasks.filter((val) => {
                                            if (searchWord === "") {
                                                return val
                                            } else if (val.tasktitle.toLowerCase().includes(searchWord.toLowerCase()) || val.assigntto.toLowerCase().includes(searchWord.toLowerCase())) {
                                                return val
                                            }
                                        }
                                        )
                                            .map((tasks, index) => {
                                                const [name] = (tasks.assigntto).split('@');
                                                return (
                                                    <div className="col-12" key={tasks.taskid}>
                                                        <div className="card col-12">
                                                            <div className="container-fluid col-12 row" >
                                                                <div class="d-flex col-12" style={{ padding: 0 }}>
                                                                    <div class="mr-auto p-2">
                                                                        <b style={{ width: '500px', cursor: 'pointer', paddingTop: 10 }} onClick={(event) => handleOpen("unassigned_taskInfo", index)}> {<p>{(getUser.user.corp).substring(0, 3).toUpperCase()}{tasks.taskid}{'-'}{tasks.tasktitle}</p>}</b>
                                                                    </div>
                                                                    <div style={{ backgroundColor: '#81B622', cursor: 'pointer', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, marginBottom: 5, borderRadius: '90px', fontSize: '15px', width: '25px', textAlign: 'center', }} data-toggle="tooltip" data-placement="bottom" title={name}>{name.substring(0, 1).toUpperCase()}</div>

                                                                    <p style={{ backgroundColor: '#f37778', cursor: 'pointer', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, marginBottom: 5, width: '100px', textAlign: 'center' }} data-toggle="tooltip" data-placement="bottom" title={tasks.ideano === '0' ? 'NA' : tasks.projectitle}>{tasks.ideano === '0' ? 'NA' : tasks.projectitle.substring(0, 11)}</p>
                                                                    <p style={{ backgroundColor: 'teal', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, marginBottom: 5, width: '30px' }}>P:{tasks.priorityLevel}</p>


                                                                    <p style={{ backgroundColor: '#6495ED', color: 'white', marginLeft: 10, marginTop: 5, marginBottom: 5, padding: '5px', borderRadius: '70px', width: '25px', textAlign: 'center' }}>{tasks.storyPoints}</p>
                                                                    <div className="dropdown show" style={{ marginLeft: 10, padding: 5, marginTop: 5 }}>
                                                                        {/* eslint-disable-next-line */}
                                                                        <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                            <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '15px', height: '15px', borderRadius: '0' }} />
                                                                        </a>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>

                                                                            <div>
                                                                                {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#3DD896", color: 'white' }} onClick={(event) => handleOpen("add_to_sprint", index)}>{ADD_TO_SPRINT}</button> : null}
                                                                                {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#F4A896", color: 'white' }} onClick={(event) => handleOpen("add_to_epic", index)}>{ADD_TO_EPIC}</button> : null}

                                                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }} onClick={(event) => handleOpen("unassigned_taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("manage_modify", index)}>{EDIT}</button> : null}

                                                                            </div>

                                                                        </div>
                                                                    </div>{tasks[index]}
                                                                    <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft: '15px' }} >
                                                                        {
                                                                            getBacklogMessagesCount(index, state.allMessages, tasks, getUser.user.empId, tasks.taskid )
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                )
                                            }
                                            ) : null}
                                    </div>


                                    {
                                        open.action === "maintask" ? <MainTaskChatBox open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "backlog_chat" ? <MainTaskChatBox open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "modify" ? <ModifyMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "manage_modify" ? <ModifyMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
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
                                        open.action === "add_to_epic" ? <AddToSprint open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "current_add_to_sprint" ? <AddToSprint open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                       open.action === "modify_sprint" ? <ModifyModule open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
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