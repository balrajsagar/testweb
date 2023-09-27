import React, { useEffect, useReducer, useState } from 'react';
import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { getSubTasks } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
// import Header from '../TopNav';
import SideNavigation from '../SideNav';
import { getToken, setToken } from '../LocalStorage';
import { subtasksReducer, initialState } from './subtaskReducer';
import ChatBox from '../Chat';
import ModifySubTask from './modifySubtask';
import AddSubTask from './addSubTask';
import SubTaskVerify from '../TaskVerify/subtaskVerify';
import SubTaskDelete from './deleteSubTask';
import { SUBTASKS, MAINTASKNAME, NEWSUBTASK, SUBTASKTITLE, EDIT, DELETE, ACTION,CHANGE_STATUS, ACTION_ICON } from '../Headers';
import ChangeStatus from '../../UserModule/Backlogs/changeStatus';
import MainTaskInfo from '../TasksModals/mainTaskInfo';
import TopNavWithOutProject from '../../UserModule/Utility/TopNav/topnav';


export default function ViewSubTasks(props) {
    var data = {
        id: props.location.state.id,
        title: props.location.state.title,
        moduleId: props.location.state.moduleId,
        ideaId: props.location.state.ideaId,
        assignedTo: props.location.state.subTasksAssignedTo,
        targetDate: props.location.state.targetDate
    }
    // console.log(props,data.assignedTo, props.location.state.subTasksAssignedTo)
    setToken('task_id', data.id)
    setToken('task_title', data.title)
    setToken('moduleId', data.moduleId)
    setToken('ideaId', data.ideaId)
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(subtasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, action: "", index: 0 })
    const [taskInfo, setTaskInfo] = useState()
    useEffect(() => {
        if (props.location.data !== undefined && props.location.data !== "") {
            getSubTasks(dispatch, getUser.user, getToken('task_id'));
            // getAllTaskMessages(dispatch, getUser.user);
        }
        getSubTasks(dispatch, getUser.user, getToken('task_id'));
        // getAllTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.location.data])
    useEffect(() => {
        if (state.manageSubTasks.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.manageSubTasks])
    console.log(state)
    const handleOpen = (action, index, sno) => {
        setOpen({ status: true, action: action, index: index });
        var info;
        if (action === "add") {
            info = { mainTaskId: getToken('task_id'), moduleId: getToken('moduleId'), ideaId: getToken('ideaId'),assignedTo:data.assignedTo, targetDate: data.targetDate,
        }
        } else if (action === "modify") {
            info = {
                mainTaskId: state.manageSubTasks[index].mainTaskId,
                subTaskId: state.manageSubTasks[index].subTaskId,
                taskTitle: state.manageSubTasks[index].taskTitle,
                taskDesc: state.manageSubTasks[index].taskDesc,
                estimatedHours: state.manageSubTasks[index].estimatedHours,
                action: action, ideaId: getToken('ideaId')
            }
        } else if (action === "Delete") {
            info = {
                mainTaskId: state.manageSubTasks[index].mainTaskId,
                subTaskId: state.manageSubTasks[index].subTaskId,
                taskTitle: state.manageSubTasks[index].taskTitle,
                taskDesc: state.manageSubTasks[index].taskDesc,
                estimatedHours: state.manageSubTasks[index].estimatedHours,
                action: action, ideaId: getToken('ideaId')
            }
        } else if (action === "Verify") {
            info = {
                mainTaskId: state.manageSubTasks[index].mainTaskId,
                subTaskId: state.manageSubTasks[index].subTaskId,
                taskTitle: state.manageSubTasks[index].taskTitle,
                action: action
            }

        }
        else if (action === "taskInfo") {
            info = {
                taskTitle: state.manageSubTasks[index].tasktitle,
                subTaskDesc: state.manageSubTasks[index].taskDesc,
                assignedBy: state.manageSubTasks[index].assignedBy,
                assignedTo: state.manageSubTasks[index].assignedTo,
                targetDate: state.manageSubTasks[index].targetDate,
                task: state.manageSubTasks[index].taskTitle,

            }
        }
        else if (action === "subtask_changeStatus") {
            info = { title: state.manageSubTasks[index].taskTitle,action: action, taskId: state.manageSubTasks[index].mainTaskId, subTaskId: state.manageSubTasks[index].subTaskId, activeStatus: state.manageSubTasks[index].activeStatus, completeStatus: state.manageSubTasks[index].status }
        }
        else {
            info = {
                action: action,
                id: state.manageSubTasks[index].subTaskId,
                sno: sno
            }
        }
        setTaskInfo(info)
    };
    const handleClose = () => {

        setOpen({ status: false, index: 0 });
        getSubTasks(dispatch, getUser.user, getToken('task_id'));

    };
    const handleModalClose = () => {
        getSubTasks(dispatch, getUser.user, getToken('task_id'));
        setOpen({ status: false, index: 0 });
    }

    // const getMessagesCount = (data, msg, task, empId) => {
    //     const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.subTaskId).map((messages, i) => {
    //         // eslint-disable-next-line
    //         return i, messages
    //     })
    //     return (
    //         <i>
    //             {/* {msgCount.length > 0 ? msgCount.length : null} */}
    //             {
    //                 msgCount.length > 0 ?
    //                     <div className="row">
    //                         <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-8px" }} onClick={(event) => handleOpen("subtask", data, msgCount)} />
    //                         <span style={{ color: 'red', fontWeight: "bold" }}>{msgCount.length}</span>
    //                     </div>
    //                     :
    //                     <div className="row">
    //                         <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-8px" }} onClick={(event) => handleOpen("subtask", data, msgCount)} />
    //                     </div>

    //             }
    //         </i>
    //     )
    // }

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
                                            <h4 className="card-title">{SUBTASKS}</h4>
                                            <h4 className="card-title text-success">{MAINTASKNAME}: {getToken('task_title')}</h4>
                                            <div className="d-flex justify-content-end mb-2">
                                                <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" title={NEWSUBTASK} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{NEWSUBTASK}</span></button>
                                                {
                                                    open.action === "add" ? <AddSubTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                                    /> : null
                                                }
                                            </div>

                                        </div>
                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                        <div className="table-responsive">

                                            <MDBTable>
                                                <table
                                                    search="true"
                                                    id="example" className="table table-striped table-bordered"
                                                    data-pagination="true"
                                                >
                                                    <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                        <tr>
                                                            {/* <th>Task ID</th> */}
                                                            <th>{SUBTASKTITLE}</th>
                                                            {/* <th>{SUBTASK_DESCRIPTION}</th>
                                                            <th>{TARGET_DATE}</th>
                                                            <th>{ASSIGNED_TO}</th>
                                                            <th>{ASSIGNED_BY}</th>
                                                            <th>{ASSIGNED_ON}</th>
                                                            <th>{SUBTASK_PROGRESS}</th> */}
                                                            {/* <th>Time Left</th> */}
                                                            {/* <th>{STATUS}</th> */}
                                                            <th>{ACTION}</th>
                                                            {/* <th>{CHAT}</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            state.manageSubTasks !== [] ? state.manageSubTasks.map((tasks, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        {/* <td style={{ textAlign: 'center' }}>{tasks.subTaskId}</td> */}
                                                                        <td onClick={(event) => handleOpen("taskInfo", index)} style={{ textTransform: "capitalize",cursor:'pointer' }} data-toggle="tooltip" data-placement="left" title={"Description     :" + tasks.taskDesc + "\n\nAssigned By    :" + tasks.assignedBy + "\n\nAssigned Date :" + tasks.assignedDate}>{tasks.taskstatus === 'pending' ? <b>{tasks.taskTitle}</b> : <del> <b>{tasks.taskTitle}</b></del>}</td>
                                                                        {/* <td style={{ textTransform: "capitalize" }}>{tasks.taskDesc}</td>
                                                                        <td>{tasks.targetDate}</td>
                                                                        <td style={{ textTransform: "capitalize" }}>{tasks.assignedTo}</td>
                                                                        <td style={{ textTransform: "capitalize" }}>{tasks.assignedBy}</td>
                                                                        <td>{tasks.assignedDate}</td>
                                                                        <td style={{ textAlign: 'center' }}>{tasks.taskStatusPercentage}%</td> */}
                                                                        {/* {tasks.taskstatus === "pending" ? <td>{tasks.timeLeft}</td> : <td>{tasks.timeLeft}</td>} */}
                                                                        {/* <td style={{ textAlign: 'center' }}>
                                                                            {tasks.taskstatus === "pending" ? <span className="badge badge-pill badge-danger " style={{ width: '100px' }}>Pending</span>
                                                                                : <span className="badge badge-pill badge-success " style={{ width: '100px' }}>Completed</span>}
                                                                        </td> */}
                                                                        <td style={{ textAlign: 'center', width: '10px' }}>
                                                                            <div className="dropdown show">
                                                                                {/* eslint-disable-next-line */}
                                                                                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                    <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                                                                                </a>

                                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>

                                                                                    <div>{/* eslint-disable-next-line */}
                                                                                    {(tasks.status === 'pending') ?   <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>:null}
                                                                                        {(getUser.user.empId === tasks.assignedid) ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: 'red' }} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                                                                        {(tasks.status === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#5cb0bd", color: 'white' }} onClick={(event) => handleOpen("subtask_changeStatus", index)}>{CHANGE_STATUS}</button> : null}

                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </td>
                                                                        {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("subtask", index)} /></button></td> */}
                                                                        {/* <td style={{ width: '8px' }}>
                                                                            <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft: '15px' }} >
                                                                                {
                                                                                    getMessagesCount(index, state.allMessages, tasks, getUser.user.empId)
                                                                                }
                                                                            </button>
                                                                        </td> */}
                                                                        {/* onClick={() => handleOpenChat("subtask", id)} */}
                                                                    </tr>
                                                                )
                                                            }) : null}
                                                    </tbody>
                                                </table>
                                            </MDBTable>
                                        </div>
                                    }
                                    {
                                        open.action === "modify" ? <ModifySubTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Delete" ? <SubTaskDelete open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "subtask" ? <ChatBox open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Verify" ? <SubTaskVerify open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "subtask_changeStatus" ? <ChangeStatus open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
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