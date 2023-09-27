import React, { useEffect, useReducer, useState } from 'react';
import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { getSubTasks, getAllTaskMessages } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import Header from '../TopNav';
import SideNavigation from '../SideNav';
import { userTaskReducer, initialState } from './userTaskReducer';
import ChatBox from '../Chat';
import ModifySubTask from '../SubTaskModals/modifySubtask';
import EmployeesInvolved from '../../UserModule/Modules/employees';
import { MODULENAME, MODULES } from '../Headers';


export default function UserSubTasks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(userTaskReducer, initialState)
    const [open, setOpen] = useState({ status: false, action: "", index: 0 })
    const [taskInfo, setTaskInfo] = useState()
    useEffect(() => {
        getSubTasks(dispatch, getUser.user);
        getAllTaskMessages(dispatch, getUser.user);
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
    const handleOpen = (action, index, sno) => {
        setOpen({ status: true, action: action, index: index });
        var info;
        if (action === "modify") {
            info = {
                mainTaskId: state.manageSubTasks[index].mainTaskId,
                subTaskId: state.manageSubTasks[index].subTaskId,
                taskTitle: state.manageSubTasks[index].taskTitle,
                taskDesc: state.manageSubTasks[index].subTaskDesc,
                estimatedHours: state.manageSubTasks[index].estimatedHours,
                action: action, ideaId: state.manageSubTasks[index].ideaId
            }

        }
        else if (action === "employees") {
            info = { moduleId: state.manageSubTasks[index].moduleId }
        }
        else if (action === "Verify") {
            info = {
                mainTaskId: state.manageSubTasks[index].mainTaskId,
                subTaskId: state.manageSubTasks[index].subTaskId,
                taskTitle: state.manageSubTasks[index].taskTitle,
                action: action
            }
        } else {
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
        getSubTasks(dispatch, getUser.user);
        getAllTaskMessages(dispatch, getUser.user);

    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    // const getMessagesCount = (data, msg, task, empId) => {
    //         const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.subTaskId  ).map((messages, i) => {
    //         // eslint-disable-next-line
    //         return i,messages
    //     })
    //     return (
    //         <i>
    //             {msgCount.length > 0 ? msgCount.length : null}
    //             {
    //                 msgCount.length > 0 ?
    //                     <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px', backgroundColor: 'green' }}  onClick={(event) => handleOpen("subtask", data, msgCount)} />
    //                     :
    //                     <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }}  onClick={(event) => handleOpen("subtask", data, msgCount)} />

    //             }
    //         </i>
    //     )
    // }

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
                                            <h4 className="card-title">Pending {MODULES}</h4>
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
                                                            {<th>{MODULENAME}</th>}
                                                            <th>Squad</th>

                                                            {/* <th>Description</th> */}
                                                            <th>Start Date</th>
                                                            <th>End Date</th>
                                                            {/* <th>Assigned To</th> */}
                                                            {/* <th>{ASSIGNED_BY}</th>
                                                            <th>{ASSIGNED_ON}</th>
                                                            <th>{SUBTASK_PROGRESS}</th> */}
                                                            {/* <th>Time Left</th> */}
                                                            {/* <th>Status</th> */}
                                                            {/* <th>{ACTION}</th>
                                                            <th>{CHAT}</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            state.manageSubTasks !== [] ? state.manageSubTasks.map((tasks, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        {/* <td style={{ textAlign: 'center' }}>{tasks.subTaskId}</td> */}
                                                                        <td style={{ textTransform: "capitalize" }}><b>{tasks.moduleDesc}</b></td>
                                                                        <td>
                                                                            <input type="image" src="images/common/teams.png" alt="logo" width="25" height="25" onClick={(event) => handleOpen("employees", index)} />
                                                                        </td>
                                                                        {/* <td style={{textTransform:"capitalize"}}>{tasks.subTaskDesc}</td> */}
                                                                        <td style={{ textTransform: "capitalize" }}>{tasks.startDate}</td>
                                                                        <td>{tasks.targetDate}</td>
                                                                        {/* <td style={{textTransform:"capitalize"}}>{tasks.assignedTo}</td> */}
                                                                        {/* <td style={{ textTransform: "capitalize" }}>{tasks.assignedBy}</td>
                                                                        <td>{tasks.assignedDate}</td>
                                                                        <td style={{ textAlign: 'center' }}>{tasks.taskStatus}%</td> */}
                                                                        {/* {tasks.taskstatus === "pending" ? <td>{tasks.timeLeft}</td> : <td>{tasks.timeLeft}</td>} */}
                                                                        {/* <td style={{ textAlign: 'center' }}>
                                                                        <span className="badge badge-pill badge-danger " style={{width:'100px',textTransform:"capitalize"}}>{tasks.status}</span>        
                                                                        </td> */}
                                                                        {/* <td>
                                                                        <div className="dropdown show"> */}
                                                                        {/* eslint-disable-next-line */}
                                                                        {/* <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                            <img src="images/common/more.svg" alt="logo" style={{ width: '20px', height: '20px' }} />
                                                                        </a>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                            {tasks.assignby === getUser.user.empId ?
                                                                                <div>
                                                                                    <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                                                </div> :
                                                                                null}
                                                                        </div>
                                                                        </div>
                                                                    </td> */}
                                                                        {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("subtask", index)} /></button></td> */}
                                                                        {/* onClick={() => handleOpenChat("subtask", id)} */}
                                                                        {/* <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} >
                                                                            {
                                                                                getMessagesCount(index, state.allMessages, tasks, getUser.user.empId)
                                                                            }
                                                                        </button>
                                                                    </td> */}
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
                                        open.action === "subtask" ? <ChatBox open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "employees" ? <EmployeesInvolved open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}