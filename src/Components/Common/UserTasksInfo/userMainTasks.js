import React, { useEffect, useReducer, useState } from 'react';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { getMainTasks, getDashboardMainTasks } from './network';
import { Link } from 'react-router-dom';
import { userTaskReducer, initialState } from './userTaskReducer';
import TopNav from '../../UserModule/Utility/TopNav';
import SideBar from '../../UserModule/Utility/SideNav';
import RootLoader from '../Loader/RootLoader';
import MainTaskChatBox from '../ChatMainTask';
import AddSubTask from '../SubTaskModals/addSubTask';
import MainTaskVerify from '../TaskVerify/mainTaskVerify';
import MainTaskInfo from '../TasksModals/mainTaskInfo';
import ModifyMainTask from '../TasksModals/modifyMainTask';
import { MAINTASKNAME, VIEWSUBTASKS, EDIT, ACTION,VIEW_DETAILS, ACTION_ICON } from '../Headers';
import { getSubStringId } from '../SubStringConvert';

export default function UserMainTasks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(userTaskReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    var data = {
        dashboard: props.location.state.dashboard,
        id: props.location.state.id,
        moduleid: props.location.state.moduleid,
        targetDate:props.location.state.targetDate
    }
    useEffect(() => {
        (data.dashboard === 'backlogs') ? getMainTasks(dispatch, getUser.user, data.id,data.moduleid) : getDashboardMainTasks(dispatch, getUser.user)
        // getMainTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
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
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "addSubtask") {
            info = { mainTaskId: state.manageTasks[index].taskid, action: action, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].ideano }
        } else if (action === "Verify") {
            info = { mainTaskId: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle, action: action, moduleId: state.manageTasks[index].moduleId }
        }
        else if (action === "modify") {
            info = {
                moduleId: state.manageTasks[index].userstoryModuleId,
                ideaId: state.manageTasks[index].ideano,
                title: state.manageTasks[index].tasktitle,
                description: state.manageTasks[index].taskdescription,
                taskId: state.manageTasks[index].userstory_id,
                acceptanceCriteria: state.manageTasks[index].acceptanceCriteria,
                storyPoints: state.manageTasks[index].storyPoints,
                userDetails: state.manageTasks[index].assigntto,
                id: state.manageTasks[index].assignedTo,
                priorityLevel: state.manageTasks[index].priorityLevel,
                targetDate: state.manageTasks[index].targettime,
                action: action,
                sprintTargetDate: data.targetDate,
                currentDate:  state.manageTasks[index].currenttime,
                activeStatus: state.manageTasks[index].activeStatus,
                backlogs: state.manageTasks[index].backlogs


            }
        }
        else if (action === "unassigned_taskInfo") {

            var view_status1 = "taskInfo"
            info = {
                view: view_status1,
                projectName: state.manageTasks[index].projectitle,
                epicId: state.manageTasks[index].ideano,
                moduleName: state.manageTasks[index].moduletitle,
                moduleId: state.manageTasks[index].userstoryModuleId,
                title: state.manageTasks[index].tasktitle,
                description: state.manageTasks[index].taskdescription,
                taskId: getSubStringId(getUser.user.corp, 3).concat('-', getSubStringId(state.manageTasks[index].userstory_id,5)),
                targetDate: state.manageTasks[index].targettime,
                timeLeft: state.manageTasks[index].timeLeft,
                extraHours: state.manageTasks[index].extraHours,
                status: state.manageTasks[index].completeStatus,
                createdDate: state.manageTasks[index].assignedon,
                taskProgress: state.manageTasks[index].taskStatus,
                storyPoints: state.manageTasks[index].storyPoints,
                acceptanceCriteria: state.manageTasks[index].acceptanceCriteria,
            }

        }
        else {
            info = { action: action, id: state.manageTasks[index].userstory_id, sno: sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        if (cardInfo.action === "addSubtask") {
            setOpen({ status: false, index: 0 });
            // getMainTaskMessages(dispatch, getUser.user);
        } else {
            // state.manageTasks = []
            setOpen({ status: false, index: 0 });
            getMainTasks(dispatch, getUser.user);
            // getMainTaskMessages(dispatch, getUser.user);
        }
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    // const getMessagesCount = (data, msg, task, empId) => {
    //     const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.taskid).map((messages, i) => {
    //         // eslint-disable-next-line
    //         return i, messages
    //     })
    //     return (
    //         <i>
    //             {msgCount.length > 0 ? msgCount.length : null}
    //             {
    //                 msgCount.length > 0 ?
    //                     <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px', backgroundColor: 'green' }} onClick={(event) => handleOpen("maintask", data, msgCount)} />
    //                     :
    //                     <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", data, msgCount)} />

    //             }
    //         </i>
    //     )
    // }

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
                                    <div>
                                        <h4 className="card-title">{data.dashboard === 'dashboard' ? 'Pending User Stories' : 'User Stories'}</h4>
                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                        <div className="table-responsive">

                                            {/* <MDBTable> */}
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
                                                        {/* <th>Created Date</th> */}
                                                        {/* <th>Assigned To</th> */}
                                                        {/* <th>{ASSIGNED_BY}</th>
                                                        <th>{MAINTASKPROGRESS}</th> */}
                                                        {/* <th>Time Left</th> */}
                                                        {/* <th>Status</th> */}
                                                        <th>{ACTION}</th>
                                                        {/* <th>{CHAT}</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.manageTasks !== [] ? state.manageTasks.map((tasks, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    {/* <td style={{textAlign:'end',width:'10px'}}>{index + 1}</td> */}
                                                                    {/* <td style={{ textAlign: 'center' }}>{tasks.taskid}</td> */}
                                                            <td style={{cursor:'pointer'}} title={"Epic Title       :" + tasks.projectitle  + "\n\nSprint Name  :" + tasks.moduletitle + "\n\nAssigned To    :" + tasks.assigntto + "\n\nStory Points    :" + tasks.storyPoints + "\n\nAcceptance Criteria:" + tasks.acceptanceCriteria + "\n\nAssigned By    :" + tasks.assignby + "\n\nAssigned Date  :" + tasks.assignedon + "\n\nUser Story\nProgress          :" + tasks.taskStatus + "%"}>{tasks.completeStatus === 'pending' ? <b>{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(tasks.userstory_id,5)}{'-'}{tasks.tasktitle}</b> : <del> <b>{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(tasks.userstory_id,5)}{'-'}{tasks.tasktitle}</b></del>}</td>
                                                                    {/* <td style={{ textTransform: "capitalize" }}>{tasks.projectitle}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.taskdescription}</td> */}
                                                                    {/* <td style={{ width: '100px' }}>{tasks.targettime}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.assigntto}</td> */}
                                                                    {/* <td style={{ textTransform: "capitalize" }}>{tasks.assignby}</td> */}
                                                                        {/* <td style={{ width: '0px' }}>{tasks.taskStatus}%</td> */}
                                                                    {/* {tasks.completeStatus === "pending" ? <td style={{ width: '100px' }}>{tasks.timeLeft}</td> : <td style={{ width: '100px' }}>{tasks.extraHours}</td>} */}
                                                                    {/* <td style={{ textAlign: 'center' }}>
                                                                       <button className="badge badge-pill badge-danger border-0" style={{width:'100px',textTransform:"capitalize"}}onClick={(event) => handleOpen("taskInfo", index)}>{tasks.completeStatus}</button>
                                                                    </td> */}

                                                                    <td style={{ textAlign: 'center', width: '10px' }}>
                                                                        <div className="dropdown show">
                                                                            {/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                                                                            </a>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                <div>
                                                                                    {tasks.assignbyId === getUser.user.empId ?
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("modify", index)}>{EDIT}</button> : null}
                                                                                    <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A",color:'white' }} onClick={(event) => handleOpen("unassigned_taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                    {(tasks.completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button> : null}
                                                                                    <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>

                                                                                    {/* <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "grey" }} onClick={(event) => handleOpen("addSubtask", index)}>Add SubTask</button> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                    {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent',border:"0", width:'5px',padding:"0"}} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", index)} /></button></td> */}
                                                                    {/* <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} >
                                                                            {
                                                                                getMessagesCount(index, state.mainTaskMessages, tasks, getUser.user.empId)
                                                                            }
                                                                        </button>
                                                                    </td> */}
                                                                    {/* onClick={() => handleOpenChat("subtask", id)} */}
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                            {/* </MDBTable> */}
                                        </div>
                                    }
                                    {
                                        open.action === "maintask" ? <MainTaskChatBox open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "addSubtask" ? <AddSubTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "modify" ? <ModifyMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Verify" ? <MainTaskVerify open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "unassigned_taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
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