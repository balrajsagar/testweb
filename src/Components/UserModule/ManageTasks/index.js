import React, { useEffect, useReducer, useState } from 'react';
import SideBar from '../Utility/SideNav';
import TopNav from '../Utility/TopNav';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { tasksReducer, initialState } from './tasksReducer';
import { getPending, getAllTaskMessages } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import MainTaskChatBox from '../../Common/ChatMainTask';
import { Link } from 'react-router-dom';
import AddSubTask from '../../Common/SubTaskModals/addSubTask';
import MainTaskVerify from '../../Common/TaskVerify/mainTaskVerify';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';
import ModifyMainTask from '../../Common/TasksModals/modifyMainTask';
import { SCRUM_MASTER,PRODUCT_OWNER,MAINTASKS, NEWSUBTASK, VIEWSUBTASKS, MAINTASKNAME, EDIT, VERIFY, DELETE, ACTION, CHAT, VIEW_DETAILS, ACTION_ICON } from '../../Common/Headers';
import MainTaskDelete from '../../Common/TasksModals/deleteMainTask';

export default function ManageTasks() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        getPending(dispatch, getUser.user);
        getAllTaskMessages(dispatch, getUser.user);
        // getCompleted(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    // useEffect(() => {
    //     if (state.pendingTasks.length > 0 || state.completedTasks > 0) {
    //         getManageTasks(dispatch, state.pendingTasks, state.completedTasks)
    //     }
    // }, [state.pendingTasks,state.completedTasks])
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
            info = { mainTaskId: state.manageTasks[index].taskid, action: action, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].ideano, assignedTo: state.manageTasks[index].assignedTo }
        }
        else if (action === "modify") {
            info = {
                moduleId: state.manageTasks[index].moduleId,
                ideaId: state.manageTasks[index].ideano,
                title: state.manageTasks[index].tasktitle,
                description: state.manageTasks[index].taskdescription,
                taskId: state.manageTasks[index].taskid,
                acceptanceCriteria: state.manageTasks[index].acceptanceCriteria
            }
        } else if (action === "Verify") {
            info = { mainTaskId: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle, action: action, moduleId: state.manageTasks[index].moduleId }
        }
        else if (action === "taskInfo") {
            var view_status = "taskInfo"
            info = {
                view: view_status,
                projectName: state.manageTasks[index].projectitle,
                moduleName: state.manageTasks[index].moduletitle,
                title: state.manageTasks[index].tasktitle,
                description: state.manageTasks[index].taskdescription,
                taskId: state.manageTasks[index].taskid,
                targetDate: state.manageTasks[index].targettime,
                timeLeft: state.manageTasks[index].timeLeft,
                extraHours: state.manageTasks[index].extraHours,
                status: state.manageTasks[index].completeStatus,
                createdDate: state.manageTasks[index].assignedon,
                taskProgress: state.manageTasks[index].taskStatus,
                storyPoints: state.manageTasks[index].storyPoints,
                acceptanceCriteria: state.manageTasks[index].acceptanceCriteria

            }
        } else if (action === "Delete") {
            info = {
                projectName: state.manageTasks[index].projectitle,
                title: state.manageTasks[index].tasktitle,
                description: state.manageTasks[index].taskdescription,
                taskId: state.manageTasks[index].taskid,
                moduleId: state.manageTasks[index].moduleId,
                action: action
            }
        } else {
            info = { action: action, id: state.manageTasks[index].taskid, sno: sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        if (cardInfo.action === "addSubtask") {
            setOpen({ status: false, index: 0 });
        } else {
            // state.manageTasks = []
            setOpen({ status: false, index: 0 });
            getPending(dispatch, getUser.user);
            getAllTaskMessages(dispatch, getUser.user);
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
                                    <div>
                                        <h4 className="card-title">{MAINTASKS}</h4>
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
                                                        state.manageTasks !== [] ? state.manageTasks.map((tasks, index) => {
                                                            return (


                                                                <tr key={index}>
                                                                    {/* <td style={{textAlign:'end',width:'10px'}}>{index + 1}</td> */}
                                                                    {/* <td style={{ textAlign: 'center' }}>{tasks.taskid}</td> */}
                                                                    <td style={{ width: '0px', textTransform: "capitalize" }} title={"Epic Title       :" + tasks.projectitle + "\n\nSprint Name  :" + tasks.moduletitle + "\n\nAssigned To    :" + tasks.assigntto + "\n\nStory Points    :" + tasks.storyPoints + "\n\nAcceptance Criteria:" + tasks.acceptanceCriteria + "\n\nAssigned By    :" + tasks.assignby + "\n\nAssigned Date  :" + tasks.assignedon + "\n\nUser Story\nProgress          :" + tasks.taskStatus + "%"}>{tasks.completeStatus === 'pending' ? <b>{tasks.tasktitle}</b> : <del> <b>{tasks.tasktitle}</b></del>}</td>
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
                                                                                {tasks.completeStatus === "pending" ?
                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A",color:'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436",color:'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                                                        {(getUser.user.empId === tasks.assignbyId) ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                                                                    </div> :

                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A",color:'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/viewSubTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436",color:'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                                                        {(getUser.user.role === SCRUM_MASTER || getUser.user.role === PRODUCT_OWNER) ? <button className="dropdown-item badge badge-pill badge-success text-center" onClick={(event) => handleOpen("Verify", index)}>{VERIFY}</button> : null}
                                                                                    </div>}
                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                    {/* <td style={{width:'8px'}}><button style={{ backgroundColor: 'transparent',border:"0", width:'5px',padding:"0"}} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", index)} /></button></td> */}
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
                                            {/* </MDBTable> */}
                                        </div>
                                    }
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}