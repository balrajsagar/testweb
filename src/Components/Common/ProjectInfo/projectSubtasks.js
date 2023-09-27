import { getSubTasks } from "./network";
import React, { useEffect, useReducer, useState } from "react";
import $ from 'jquery';
import { projectReducer, initialState } from "./projectReducer";
import { useSelector } from "react-redux";
import RootLoader from "../Loader/RootLoader";
import ChatBox from "../Chat";
import SubTaskVerify from "../TaskVerify/subtaskVerify";
import { SUBTASKTITLE, EDIT, ACTION, DELETE,CHANGE_STATUS, MAINTASK,MAINTASKNAME,MAINTASK_DESCRIPTION,ASSIGNED_BY,ASSIGNED_DATE, ACTION_ICON, VIEW_DETAILS } from "../Headers";
import ModifySubTask from "../SubTaskModals/modifySubtask";
import SubTaskDelete from "../SubTaskModals/deleteSubTask";
import MainTaskInfo from "../TasksModals/mainTaskInfo";
import ChangeStatus from "../../UserModule/Backlogs/changeStatus";

export default function ProjectSubTasks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(projectReducer, initialState)
    const [open, setOpen] = useState({ status: false, action: "", index: 0 })
    const [taskInfo, setTaskInfo] = useState()
    useEffect(() => {
        getSubTasks(dispatch, getUser.user, props.data.id);
        // getTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.manageSubTasks.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.manageSubTasks])
    const handleOpen = (action, index, sno) => {
        setOpen({ status: true, action: action, index: index });
        var info;
        if (action === "Verify") {
            info = {
                mainTaskId: state.manageSubTasks[index].story_id,
                subTaskId: state.manageSubTasks[index].task_id,
                taskTitle: state.manageSubTasks[index].task_title,
                action: action
            }
        } else if (action === "Delete") {
            info = {
                mainTaskId: state.manageSubTasks[index].story_id,
                subTaskId: state.manageSubTasks[index].task_id,
                taskTitle: state.manageSubTasks[index].task_title,
                taskDesc: state.manageSubTasks[index].task_desc,
                action: action
            }
        }
        else if (action === "taskInfo") {
            info = {
                taskTitle: state.manageSubTasks[index].tasktitle,
                task: state.manageSubTasks[index].task_title,
                subTaskDesc: state.manageSubTasks[index].task_desc,
                action: action,
                assignedBy: state.manageSubTasks[index].assignedby,
                assignedTo: state.manageSubTasks[index].assignedto,
                targetDate: state.manageSubTasks[index].target_date
            }
        }
        else if (action === "subtask_changeStatus") {
            info = { title: state.manageSubTasks[index].task_title, 
                action: action, 
                taskId: state.manageSubTasks[index].story_id, 
                subTaskId: state.manageSubTasks[index].task_id, 
                activeStatus: state.manageSubTasks[index].activeStatus, 
                completeStatus: state.manageSubTasks[index].status }
        }
        else if (action === "modify" || action === "reassign") {
            info = {
                mainTaskId: state.manageSubTasks[index].story_id,
                subTaskId: state.manageSubTasks[index].task_id,
                taskTitle: state.manageSubTasks[index].task_title,
                taskDesc: state.manageSubTasks[index].task_desc,
                estimatedHours: state.manageSubTasks[index].estimatedHours,
                action: action, ideaId: props.data.id
            }
        } else {
            info = {
                action: action,
                id: state.manageSubTasks[index].task_id,
                sno: sno
            }
        }
        setTaskInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getSubTasks(props.data.dispatch, getUser.user, props.data.id);//solved node child error
        // getTaskMessages(dispatch, getUser.user);
    };
    const handleModalClose = () => {
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
    //                         <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("subtask", data, msgCount)} />
    //                         <span style={{ color: 'red', fontWeight: "bold", marginLeft: "-2px" }}>{msgCount.length}</span>
    //                     </div>
    //                     :
    //                     <div className="row">
    //                         <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("subtask", data, msgCount)} />
    //                     </div>
    //             }
    //         </i>
    //     )
    // }

    // console.log(state.manageSubTasks)
    return <div className="table-responsive">
        {state.isLoading ? <RootLoader /> :
            <table
                search="true"
                id="example" className="table table-striped table-bordered"
                data-pagination="true"
            >
                <thead style={{ backgroundColor: '#F4FAF7' }}>
                    <tr>
                        <th>{SUBTASKTITLE}</th>
                        {/* <th>{SUBTASK_DESCRIPTION}</th>
                        <th>{TARGET_DATE}</th>
                        <th>{ASSIGNED_TO}</th>
                        <th>{ASSIGNED_BY}</th>
                        <th>{ASSIGNED_ON}</th>
                        <th>{SUBTASK_PROGRESS}</th> */}
                        {/* <th>Time Left</th> */}
                        {/* <th>{STATUS}</th> */}
                        {/* {(getUser.user.role === "Scrum Master" || getUser.user.role === "Product Owner") ? <th>Verify</th> : null}
                        <th>Action</th> */}
                        <th>{MAINTASK}</th>
                        <th>{ACTION}</th>
                        {/* <th>{CHAT}</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        state.manageSubTasks !== [] ? state.manageSubTasks.map((tasks, index) => {
                            return (
                                <tr key={index}>
                                    <td onClick={(event) => handleOpen("taskInfo", index)} style={{ width: '400px', textTransform: "capitalize", cursor: 'pointer' }} data-toggle="tooltip" data-placement="left" title={`${MAINTASKNAME}  :` + tasks.tasktitle + `\n\n${MAINTASK_DESCRIPTION}     :` + tasks.task_desc + `\n\n${ASSIGNED_BY}    :` + tasks.assignedBy + `\n\n${ASSIGNED_DATE} :` + tasks.assignedDate}>{tasks.status === 'pending' ? <b>{tasks.task_title}</b> : <del> <b>{tasks.task_title}</b></del>}</td>
                                    {/* <td style={{ width: '400px',textTransform: "capitalize" }}>{tasks.taskDesc}</td>
                                    <td style={{ width: '120px' }}>{tasks.targetDate}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedTo}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedBy}</td>
                                    <td style={{ width: '120px' }}>{tasks.assignedDate}</td>
                                    <td style={{ textAlign: 'center' }}>{tasks.taskStatus}%</td> */}
                                    {/* {tasks.taskstatus === "pending" ? <td>{tasks.timeLeft}</td> : <td>{tasks.timeLeft}</td>} */}
                                    {/* <td style={{ textAlign: 'center',textTransform: "capitalize" }}>
                                        {tasks.status === "pending" ? <span className="badge badge-pill badge-danger " style={{ width: '100px' }}>{tasks.status}</span>
                                            : <span className="badge badge-pill badge-success " style={{ width: '100px' }}>Completed</span>}
                                    </td> */}

                                    {/* {(getUser.user.role === "Scrum Master" || getUser.user.role === "Product Owner") ? <td style={{ textAlign: 'center' }}>{tasks.status === "pending" ? <span > --- </span> : (getUser.user.role === "Scrum Master" || getUser.user.role === "Product Owner") ? <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "green" }} onClick={(event) => handleOpen("Verify", index)}>{VERIFY}</button> : <span > --- </span>}</td> : null} */}
                                    {/* <td >{tasks.status === "pending" ? <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("modify", index)}>{EDIT}</button> :
                                        <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("reassign", index)}>{REASSIGN}</button>}</td> */}
                                    <td style={{ textTransform: "capitalize" }}>{tasks.tasktitle}</td>
                                    <td style={{ textAlign: 'center', width: '10px' }}>
                                        <div className="dropdown show">
                                            {/* eslint-disable-next-line */}
                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                                            </a>
                                            {
                                                tasks.status === "pending" ?
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                        <div>{/* eslint-disable-next-line */}
                                                            <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                            {getUser.user.empId === tasks.assignedid ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173', color: 'white' }} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                                            <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#5cb0bd", color: 'white' }} onClick={(event) => handleOpen("subtask_changeStatus", index)}>{CHANGE_STATUS}</button>
                                                            <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                        </div>
                                                    </div> :
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>

                                                        <div>{/* eslint-disable-next-line */}
                                                            {/* <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "orange" }} onClick={(event) => handleOpen("reassign", index)}>{REASSIGN}</button> */}
                                                        </div>
                                                    </div>}
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

                                </tr>
                            )
                        }) : null}
                    {
                        open.action === "subtask" ? <ChatBox open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "Verify" ? <SubTaskVerify open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "modify" || open.action === "reassign" ? <ModifySubTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "Delete" ? <SubTaskDelete open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "subtask_changeStatus" ? <ChangeStatus open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                </tbody>
            </table>}
    </div>
}
