import React, { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { empInfoReducer, initialState } from "./empInfoReducer"
import { getSubTasks} from "./network"
import RootLoader from "../Loader/RootLoader";
import ModifySubTask from "../SubTaskModals/modifySubtask";
import EmployeesInvolved from '../../UserModule/Modules/employees';

import ChatBox from "../Chat";
import SubTaskVerify from "../TaskVerify/subtaskVerify";
//import { SUBTASKTITLE, SUBTASK_DESCRIPTION, TARGET_DATE, ASSIGNED_BY, ASSIGNED_ON, SUBTASK_PROGRESS, CHAT, TIME_LEFT } from "../Headers";
import { MODULENAME } from "../Headers";

export default function EmpSubTasks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empInfoReducer, initialState)
    const [open, setOpen] = useState({ status: false, action: "", index: 0 })
    const [taskInfo,] = useState()
    useEffect(() => {
        if (props.data !== undefined && props.data !== "") {
            getSubTasks(dispatch, getUser.user, props.data.id, props.data.role);
            // getTaskMessages(dispatch, getUser.user);
        }
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.subTasks.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.subTasks])
    // const handleOpen = (action, index, sno) => {
    //     setOpen({ status: true, action: action, index: index });
    //     var info;
    //     if (action === "modify") {
    //         info = {
    //             mainTaskId: state.subTasks[index].mainTaskId,
    //             subTaskId: state.subTasks[index].subTaskId,
    //             taskTitle: state.subTasks[index].taskTitle,
    //             taskDesc: state.subTasks[index].subTaskDesc,
    //             estimatedHours: state.subTasks[index].estimatedHours
    //         }
    //     } else if (action === "Verify") {
    //         info = {
    //             mainTaskId: state.subTasks[index].mainTaskId,
    //             subTaskId: state.subTasks[index].subTaskId,
    //             taskTitle: state.subTasks[index].taskTitle,
    //             action: action
    //         }
            
    //     } 
    //     else if (action === "employees") {
    //         info = { moduleId: state.subTasks[index].moduleId }
    //     }
        
    //     else {
    //         info = {
    //             action: action,
    //             id: state.subTasks[index].subTaskId,
    //             sno: sno
    //         }
    //     }
    //     setTaskInfo(info)
    // };
    const handleClose = () => {
        // state.subTasks = [];
        setOpen({ status: false, index: 0 });
        getSubTasks(props.data.dispatch, getUser.user, props.data.id, props.data.role);
        // getTaskMessages(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    //     const getMessagesCount = (data, msg, task, empId) => {
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

    return <div className="table-responsive">
        {/* <MDBTable> */}
        {state.isLoading ? <RootLoader /> :
            <table
                search="true"
                id="example" className="table table-striped table-bordered"
                data-pagination="true"
            >
                <thead style={{ backgroundColor: '#F4FAF7' }}>
                    <tr>
                        {<th>{MODULENAME}</th>}
                        {/* <th>Squad</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        {/* <th>Task ID</th> */}
                        {/* <th>{SUBTASKTITLE}</th>
                    <th>{SUBTASK_DESCRIPTION}</th>
                    <th>{TARGET_DATE}</th> */}
                        {/* <th>Assigned To</th> */}
                        {/* <th>{ASSIGNED_BY}</th>
                    <th>{ASSIGNED_ON}</th>
                    <th>{SUBTASK_PROGRESS}</th>
                    <th>{TIME_LEFT}</th> */}
                        {/* <th>Status</th> */}
                        {/* <th></th> */}
                        {/* <th>{CHAT}</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        state.subTasks !== [] ? state.subTasks.map((tasks, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ textTransform: "capitalize" }}><b>{tasks.sprint_desc}</b></td>
                                    {/* <td>
                                        <input type="image" src="images/common/teams.png" alt="logo" width="25" height="25" onClick={(event) => handleOpen("employees", index)} />
                                    </td> */}
                                    <td style={{ textTransform: "capitalize" }}>{tasks.start_date}</td>
                                    <td>{tasks.target_date}</td>
                                    {/* <td style={{ textAlign: 'center' }}>{tasks.subTaskId}</td> */}
                                    {/* <td  style={{textTransform:"capitalize"}}>{tasks.taskTitle}</td>
                                    <td  style={{textTransform:"capitalize"}}>{tasks.subTaskDesc}</td>
                                    <td>{tasks.targetDate}</td> */}
                                    {/* <td  style={{textTransform:"capitalize"}}>{tasks.assignedTo}</td> */}
                                    {/* <td  style={{textTransform:"capitalize"}}>{tasks.assignedBy}</td>
                                    <td>{tasks.assignedDate}</td>
                                    <td style={{ textAlign: 'center' }}>{tasks.taskStatus}%</td>
                                    <td>{tasks.timeLeft}</td> */}
                                    {/* <td style={{ textAlign: 'center' }}>
                                        <span className="badge badge-pill badge-danger " style={{width:'100px'}}>Pending</span>

                                    </td> */}
                                    {/* <td>
                                        <div className="dropdown show">
                                            
                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                <img src="images/common/more.svg" alt="logo" style={{ width: '20px', height: '20px' }} />
                                            </a>
                                            {(getUser.user.role === "Scrum Master" || getUser.user.role === "admin") ?
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    {tasks.status === "pending" ?
                                                        <div>
                                                            <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("modify", index)}>Modify</button>
                                                        </div> :
                                                        getUser.user.role === "Scrum Master" ? <button className="dropdown-item badge badge-pill badge-success text-center" onClick={(event) => handleOpen("Verify", index)}>Verify</button>
                                                            : getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill badge-success text-center" onClick={(event) => handleOpen("Verify", index)}>Verify</button> : null
                                                    }
                                                </div> : tasks.status === "pending" ? <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                                                    <div>
                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("modify", index)}>Modify</button>
                                                    </div>
                                                </div> : null}
                                        </div>

                                    </td> */}

                                    {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("subtask", index)} /></button></td> */}
                                    {/* <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} >
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
            </table>}
        {
            open.action === "modify" ? <ModifySubTask open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
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
            open.action === "employees" ? <EmployeesInvolved open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {/* </MDBTable> */}
    </div>
}