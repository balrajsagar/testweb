import { getMainTasks, getMainTaskMessages} from "./network";
import React, { useEffect, useReducer, useState } from "react";
import $ from 'jquery';
import { projectReducer, initialState } from "./projectReducer";
import { useSelector } from "react-redux";
import RootLoader from "../Loader/RootLoader";
import MainTaskChatBox from "../ChatMainTask";
import MainTaskInfo from "../TasksModals/mainTaskInfo";
import MainTaskVerify from "../TaskVerify/mainTaskVerify";
import {CONTRIBUTOR, MAINTASK,MAINTASKNAME, VERIFY, ACTION, DELETE, VIEW_DETAILS,ACCEPTANCE_CRITERIA,MAINTASKPROGRESS,ASSIGNED_BY, REASSIGN,VIEWSUBTASKS,NEWSUBTASK,EDIT,ASSIGNED_DATE, ASSIGNED_TO,STORY_POINTS, CHAT,MAINTASK_DESCRIPTION, ACTION_ICON, TARGET_DATE } from "../Headers";
import { Link } from "react-router-dom";
import ModifyMainTask from "../TasksModals/modifyMainTask";
import AddSubTask from "../SubTaskModals/addSubTask";
import MainTaskDelete from "../TasksModals/deleteMainTask";
import { getSubStringId } from "../SubStringConvert";
import { role_array } from "../getDefaultRoles";
// import Moment from 'moment';

export default function ProjectMainTasks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(projectReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        getMainTasks(dispatch, getUser.user, props.data.id);
        getMainTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.manageTasks.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                    // ordering:false,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.manageTasks])
    // console.log(state)
    const handleOpen = (action, index, sno, us_id) => {
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "addSubtask") {
            info = {
                  mainTaskId: state.manageTasks[index].story_id, 
                  action: action, 
                  moduleId: state.manageTasks[index].sprint_id, 
                  ideaId: state.manageTasks[index].epic_id,
                  title: state.manageTasks[index].story_title, 
                  assignedTo: state.manageTasks[index].assigned_to,
                  subTasksAssignedTo: state.manageTasks[index].assigned_to,
                  targetDate:state.manageTasks[index].target_date
                 }
        } else if (action === "modify") {
            info = {
                projectName: state.manageTasks[index].epic_name,

                moduleId: state.manageTasks[index].sprint_id,
                ideaId: state.manageTasks[index].epic_id,
                title: state.manageTasks[index].story_title,
                description: state.manageTasks[index].story_desc,
                taskId: state.manageTasks[index].story_id,
                acceptanceCriteria: state.manageTasks[index].acceptance_criteria,
                storyPoints: state.manageTasks[index].story_points,
                userDetails: state.manageTasks[index].assignedto,
                id: state.manageTasks[index].assigned_to,
                priorityLevel: state.manageTasks[index].priority_level,
                targetDate:state.manageTasks[index].target_date,
                action: action,
                sprintTargetDate:state.manageTasks[index].sprintTargetDate

            }
        } else if (action === "Verify") {
            info = { mainTaskId: state.manageTasks[index].story_id, title: state.manageTasks[index].story_title, description: state.manageTasks[index].story_desc, action: action, moduleId: state.manageTasks[index].sprint_id }
        }
        else if (action === "Complete") {
            info = { mainTaskId: state.manageTasks[index].story_id, title: state.manageTasks[index].story_title, description: state.manageTasks[index].story_desc, action: action, moduleId: state.manageTasks[index].sprint_id }
        }
        // else if (action === "taskInfo") {
        //     info = {
        //         projectName: state.manageTasks[index].epic_name,
        //         title: state.manageTasks[index].story_title,
        //         description: state.manageTasks[index].story_desc,
        //         taskId: state.manageTasks[index].story_id,
        //         targetDate: state.manageTasks[index].targetDate,
        //         timeLeft: state.manageTasks[index].timeLeft,
        //         extraHours: state.manageTasks[index].extraHours,
        //         status: state.manageTasks[index].complete_status
        //     }
        // }
        else if (action === "taskInfo") {
            var view_status = "taskInfo"
            info = {
                view: view_status,
                projectName: state.manageTasks[index].epic_name,
                moduleName: state.manageTasks[index].sprint_desc,
                title: state.manageTasks[index].story_title,
                description: state.manageTasks[index].story_desc,
                taskId: state.manageTasks[index].story_id,
                createdDate: state.manageTasks[index].assigned_date,
                storyPoints: state.manageTasks[index].story_points,
                acceptanceCriteria: state.manageTasks[index].acceptance_criteria,
                // targetDate: state.manageTasks[index].targettime,
                // timeLeft: state.manageTasks[index].timeLeft,
                // extraHours: state.manageTasks[index].extraHours,
                taskProgress: state.manageTasks[index].story_status,
                assignedTo: state.manageTasks[index].assignedto,
                assignedBy: state.manageTasks[index].assignedby,
                targetDate: state.manageTasks[index].target_date,
            }
        }
        else if (action === "reassign") {
            info = {
                projectName: state.manageTasks[index].epic_name,
                moduleId: state.manageTasks[index].sprint_id,
                ideaId: state.manageTasks[index].epic_id,
                title: state.manageTasks[index].story_title,
                description: state.manageTasks[index].story_desc,
                taskId: state.manageTasks[index].story_id,
                acceptanceCriteria: state.manageTasks[index].acceptance_criteria,
                storyPoints: state.manageTasks[index].story_points,
                userDetails: state.manageTasks[index].assignedto,
                id: state.manageTasks[index].assigned_to,
                priorityLevel: state.manageTasks[index].priority_level,
                action:action,
            }
        }
        else if (action === "Delete") {
            info = {
                projectName: state.manageTasks[index].epic_name,
                title: state.manageTasks[index].story_title,
                description: state.manageTasks[index].story_desc,
                taskId: state.manageTasks[index].story_id,
                moduleId: state.manageTasks[index].sprint_id,
                action: action
            }
        } else {
            info = { action: action, id: us_id, sno: sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {

        setOpen({ status: false, index: 0 });
        getMainTasks(props.data.dispatch, getUser.user, props.data.id);
        // getMainTaskMessages(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    // // console.log(state.manageTasks)
    const getMessagesCount = (data, msg, task, empId, us_id) => {
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
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", data, msgCount, us_id)} />
                            <span style={{ color: 'red', fontWeight: "bold", marginLeft: "-2px" }}>{msgCount.length}</span>
                        </div>
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", data, msgCount, us_id)} />

                        </div>
                }
            </i>
        )
    }
    // console.log(state.manageTasks)
    return <div className="table-responsive">
        {state.isLoading ? <RootLoader /> :
            <table
                search="true"
                id="example" className="table table-striped table-bordered"
                data-pagination="true"
            >
                <thead style={{ backgroundColor: '#F4FAF7' }}>
                    <tr>
                        <th>S.No</th>
                        <th>{MAINTASKNAME}</th>
                        {/* <th>Project Name</th> */}
                        {/* <th>{MAINTASK_DESCRIPTION}</th>
                        <th>{ASSIGNED_TO}</th>
                        <th>{ASSIGNED_BY}</th>
                        <th>{TARGET_DATE}</th>
                        <th>{MAINTASKPROGRESS}</th> */}
                        {/* <th>Time Left</th> */}
                        {/* <th>{STATUS}</th> */}
                        {/* {(getUser.user.role === "Scrum Master" || getUser.user.role === "Product Owner") ? <th>Verify</th> : null} */}
                        <th>{ACTION}</th>
                        <th>{CHAT}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.manageTasks !== [] ? state.manageTasks.map((tasks, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{width:'6px'}}>{index+1}</td>
                                    {/* eslint-disable-next-line */}
                                    <td style={{cursor:'pointer'}} bgcolor={(tasks.currenttime > tasks.target_date && tasks.complete_status === 'pending' && tasks.target_date !== '0000-00-00') ? '#f58484'  : null }onClick={(event) => handleOpen("taskInfo", index)} data-toggle="tooltip" data-placement="left" title={`${MAINTASK_DESCRIPTION}            :` + tasks.story_desc + `\n\n${ASSIGNED_TO}           :` + tasks.assignedto + `\n\n${STORY_POINTS}            :` + tasks.story_points + `\n\n${ACCEPTANCE_CRITERIA}:` + tasks.acceptance_criteria + `\n\n${ASSIGNED_BY}           :` + tasks.assignedby + `\n\n${ASSIGNED_DATE}        :` + tasks.assigned_date + `\n\n${ MAINTASKPROGRESS}:` + tasks.story_status + "%" + `\n\n${TARGET_DATE} : ` + tasks.target_date}>{tasks.complete_status ==='pending' ? <b>{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(tasks.story_id,5)}{'-'}{tasks.story_title}</b> : <del> <b>{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(tasks.story_id,5)}{'-'}{tasks.story_title}</b></del>}</td>
                                    {/* <td style={{ textTransform: "capitalize" }}>{tasks.projectName}</td> */}
                                    {/* <td style={{ width: '300px', textTransform: "capitalize" }}>{tasks.story_desc}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedto}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedby}</td>
                                    <td style={{ width: '120px' }}>{tasks.targetDate}</td>
                                    <td style={{ textAlign: 'center' }}>{tasks.taskStatus}%</td> */}
                                    {/* {tasks.complete_status === "pending" ? <td style={{width:'100px'}}>{tasks.timeLeft}</td> : <td style={{width:'100px'}}>{tasks.extraHours}</td>} */}
                                    {/* <td style={{ textAlign: 'center' }}>
                                        {tasks.complete_status === "pending" ? <button className="badge badge-pill badge-danger border-0" style={{ width: '100px' }} onClick={(event) => handleOpen("taskInfo", index)}>Pending</button>
                                            : <button className="badge badge-pill badge-success border-0" style={{ width: '100px' }} onClick={(event) => handleOpen("taskInfo", index)}>Completed</button>}
                                    </td> */}
                                    {/* {(getUser.user.role === "Scrum Master" || getUser.user.role === "Product Owner") ? <td style={{ textAlign: 'center' }}>{tasks.complete_status === "pending" ? <span > --- </span> : (getUser.user.role === "Scrum Master" || getUser.user.role === "Product Owner") ? <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "green" }} onClick={(event) => handleOpen("Verify", index)}>{VERIFY}</button> : <span > --- </span>}</td> : null} */}
                                    <td style={{ textAlign: 'center', width: '10px' }}>
                                        <div className="dropdown show">
                                            {/* eslint-disable-next-line */}
                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                {tasks.complete_status === "pending" ?
                                                    <div>
                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78", color: 'white' }}>{getUser.user.role === "admin" ? <Link to={{ pathname: '/subTasks', state: { id: state.manageTasks[index].story_id, title: state.manageTasks[index].story_title, moduleId: state.manageTasks[index].sprint_id, ideaId: state.manageTasks[index].epic_id, subTasksAssignedTo: state.manageTasks[index].assigned_to, targetDate:state.manageTasks[index].target_date, targetDate:state.manageTasks[index].target_date } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link> :
                                                            <Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].story_id, title: state.manageTasks[index].story_title, moduleId: state.manageTasks[index].sprint_id, ideaId: state.manageTasks[index].epic_id, subTasksAssignedTo: state.manageTasks[index].assigned_to, targetDate:state.manageTasks[index].target_date } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link>}</button>
                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436", color: 'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                        {(getUser.user.empId === tasks.assignedid) ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173', color: 'white' }} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                                        {(role_array[getUser.user.role] !==CONTRIBUTOR) ? <button className="dropdown-item badge badge-pill badge-success text-center" style={{ color: 'white' }} onClick={(event) => handleOpen("Complete", index)}>Complete {MAINTASK}</button> : null}  {/* -->GNK -->version 1.0.6.04 */}
                                                    </div> :

                                                    <div>

                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                        {/* <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button> */}

                                                        {/* <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78", color: 'white' }}>{getUser.user.role === "admin" ? <Link to={{ pathname: '/subTasks', state: { id: state.manageTasks[index].id, title: state.manageTasks[index].story_title, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].epic_id, subTasksAssignedTo: state.manageTasks[index].assigned_to, targetDate:state.manageTasks[index].target_date } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link> :
                                                            <Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].id, title: state.manageTasks[index].story_title, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].epic_id, subTasksAssignedTo: state.manageTasks[index].assigned_to, targetDate:state.manageTasks[index].target_date, targetDate:state.manageTasks[index].target_date } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link>}</button>
                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436", color: 'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button> */}
                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "orange", color: 'white' }} onClick={(event) => handleOpen("reassign", index)}>{REASSIGN}</button>
                                                        {(role_array[getUser.user.role] !== CONTRIBUTOR) ? <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "#6BC2D3", color: 'white' }} onClick={(event) => handleOpen("Verify", index)}>{VERIFY}</button> : null}
                                                    </div>}
                                            </div>
                                        </div>

                                    </td>
                                    {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", index)} /></button></td> */}
                                    <td style={{ width: '8px' }}>
                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft: '15px' }} >
                                            {
                                                getMessagesCount(index, state.mainTaskMessages, tasks, getUser.user.empId, tasks.us_id)
                                            }
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) : null}
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
                        open.action === "taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "Delete" ? <MainTaskDelete open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "Verify" || open.action === "Complete" ? <MainTaskVerify open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                    {
                        open.action === "reassign" ? <ModifyMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                        /> : null
                    }
                </tbody>
            </table>}
    </div>
}
