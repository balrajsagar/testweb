import React, { useEffect, useReducer, useState } from 'react';
import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { subtasksReducer, initialState } from './reducer';
import Header from '../../Common/TopNav';
import SideNavigation from '../../Common/SideNav';
import RootLoader from '../../Common/Loader/RootLoader';
import { getUserSubTasks, getAllTaskMessages } from './network';
import ChatBox from '../../Common/Chat';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';

import { SUBTASKTITLE, CHAT, ACTION, VIEW_DETAILS, ACTION_ICON } from '../../Common/Headers';



export default function UserPendingSubTasks() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(subtasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, action: "", index: 0 })
    const [taskInfo, setTaskInfo] = useState()
    useEffect(() => {
        getUserSubTasks(dispatch, getUser.user);
        getAllTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
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
    const handleOpen = (action, index, sno) => {
        setOpen({ status: true, action: action, index: index });
        var info;
        // if (action === "add") {
        //     info = { mainTaskId: getToken('task_id'), moduleId: getToken('moduleId'),ideaId:getToken('ideaId') }
        // } else if (action === "modify") {
        //     info = {
        //         mainTaskId: state.manageSubTasks[index].mainTaskId,
        //         subTaskId: state.manageSubTasks[index].subTaskId,
        //         taskTitle: state.manageSubTasks[index].taskTitle,
        //         taskDesc: state.manageSubTasks[index].taskDesc,
        //         estimatedHours: state.manageSubTasks[index].estimatedHours,
        //         action:action,ideaId:getToken('ideaId')
        //     }
        // }else 
        // if (action === "Delete") {
        //     info = {
        //         mainTaskId: state.manageSubTasks[index].mainTaskId,
        //         subTaskId: state.manageSubTasks[index].subTaskId,
        //         taskTitle: state.manageSubTasks[index].taskTitle,
        //         taskDesc: state.manageSubTasks[index].taskDesc,
        //         estimatedHours: state.manageSubTasks[index].estimatedHours,
        //     }
        // } else if (action === "Verify") {
        //     info = {
        //         mainTaskId: state.manageSubTasks[index].mainTaskId,
        //         subTaskId: state.manageSubTasks[index].subTaskId,
        //         taskTitle: state.manageSubTasks[index].taskTitle,
        //         action: action
        //     }
        // } else {
            if(action === 'view_details'){
                var view_status = "subTaskInfo"
                info = {
                    view: view_status,
                    projectName: state.manageSubTasks[index].ideaTitle,
                    subTaskDesc: state.manageSubTasks[index].subTaskDesc,
                    assignedTo: state.manageSubTasks[index].assignedTo,
                    assignedBy: state.manageSubTasks[index].assignedBy,
                    assignedDate: state.manageSubTasks[index].assignedDate,
                    targetDate: state.manageSubTasks[index].targetDate,
                    taskStatus: state.manageSubTasks[index].taskStatus,

                    
                }

            }
            else{
        info = {
                action: action,
                id: state.manageSubTasks[index].subTaskId,
                sno: sno,
            }
        }
    // }
        setTaskInfo(info)
    };
    const handleClose = () => {
    
        setOpen({ status: false, index: 0 });
        getUserSubTasks(dispatch, getUser.user);
        getAllTaskMessages(dispatch, getUser.user);

    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    const getMessagesCount = (data, msg, task, empId) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.subTaskId  ).map((messages, i) => {
        // eslint-disable-next-line
        return i,messages
    })
    return (
        <i>
            {msgCount.length > 0 ? msgCount.length : null}
            {
                msgCount.length > 0 ?
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', backgroundColor: 'green' }}  onClick={(event) => handleOpen("subtask", data, msgCount)} />
                    :
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }}  onClick={(event) => handleOpen("subtask", data, msgCount)} />

            }
        </i>
    )
}

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideNavigation />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <div className="row justify-content-between">
                                        <h4 className="card-title">Backlog</h4>
                                            {/* <h4 className="card-title text-success">Main Task Title : {getToken('task_title')}</h4> */}
                                            {/* <div className="d-flex justify-content-end mb-2">
                                                <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">Add SubTask</span></button>
                                                {
                                                    open.action === "add" ? <AddSubTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                                    /> : null
                                                }
                                            </div> */}

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
                                                            {/* <th>{PROJECTNAME}</th>
                                                            <th>{SUBTASK_DESCRIPTION}</th>
                                                            <th>{ASSIGNED_TO}</th>
                                                            <th>{ASSIGNED_BY}</th>
                                                            <th>{ASSIGNED_ON}</th>
                                                            <th>{TARGET_DATE}</th>
                                                            <th>{SUBTASK_PROGRESS}</th> */}
                                                            {/* <th>Time Left</th> */}
                                                            {/* <th>Status</th> */}
                                                            {/* <th>Action</th> */}
                                                            <th>{ACTION}</th>
                                                            <th>{CHAT}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                                state.manageSubTasks !== [] ? state.manageSubTasks.map((tasks, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            {/* <td style={{ textAlign: 'center' }}>{tasks.subTaskId}</td> */}
                                                                            <td style={{ textTransform: "capitalize" }} title={"Epic Name       :" + tasks.ideaTitle + "\n\nTask Description:" + tasks.subTaskDesc + "\n\nAssigned To       :" + tasks.assignedTo + "\n\nAssigned By       :" + tasks.assignedBy + "\n\nAssigned On       :" + tasks.assignedDate + "\n\nTarget Date        :" + tasks.targetDate + "\n\nTask Progress      :" + tasks.taskStatus}><b>{tasks.taskTitle}</b></td>
                                                                            {/* <td style={{textTransform:"capitalize" ,width:'120px'}}>{tasks.ideaTitle}</td>
                                                                            <td style={{textTransform:"capitalize"}}>{tasks.subTaskDesc}</td>
                                                                            <td style={{textTransform:"capitalize"}}>{tasks.assignedTo}</td>
                                                                            <td style={{textTransform:"capitalize"}}>{tasks.assignedBy}</td>
                                                                            <td style={{width:'90px'}}>{tasks.assignedDate}</td>
                                                                            <td style={{width:'90px'}}>{tasks.targetDate}</td>
                                                                            <td style={{ textAlign: 'center' }}>{tasks.taskStatus}%</td> */}
                                                                            {/* <td style={{width:'120px'}}>{tasks.timeLeft}</td> */}
                                                                            {/* <td style={{ textAlign: 'center' }}>
                                                                                 <span className="badge badge-pill badge-danger" style={{width:'90px'}}>Pending</span>
                                                                            </td> */}
                                                                            <td style={{ textAlign:'center',width:'10px' }}>
                                                                                <div className="dropdown show">
                                                                                    {/* eslint-disable-next-line */}
                                                                                    <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                    <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo"  style={{ width: '20px', height: '20px',borderRadius:'0' }} />
                                                                                    </a>
    
                                                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
    
                                                                                        <div>
                                                                                            <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A",color:'white' }} onClick={(event) => handleOpen("view_details", index)}>{VIEW_DETAILS}</button>
                                                                                        </div>
    
    
                                                                                    </div>
                                                                                </div></td>
                                                                        {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent',border:"0", width:'5px',padding:"0"}} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("subtask", index)} /></button></td> */}
                                                                        <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} >
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
                                            </MDBTable>
                                        </div>
                                    }
                                    {/* {
                                        open.action === "modify" ? <ModifySubTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Delete" ? <SubTaskDelete open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    } */}
                                    {
                                        open.action === "subtask" ? <ChatBox open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                   {
                                         open.action === "view_details" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
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