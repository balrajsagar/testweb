import React, { useEffect, useReducer, useState } from 'react';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { tasksReducer, initialState } from './tasksReducer';
import { getPending } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import ChatBox from '../../Common/Chat';
import { Link } from 'react-router-dom';
import AddSubTask from '../../Common/SubTaskModals/addSubTask';
import MainTaskVerify from '../../Common/TaskVerify/mainTaskVerify';
import Header from '../../Common/TopNav';
import AdminSideBar from '../Utility/SideNav';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';
import ModifyMainTask from '../../Common/TasksModals/modifyMainTask';
import MainTaskDelete from '../../Common/TasksModals/deleteMainTask';
import { MAINTASKS, NEWSUBTASK, VIEWSUBTASKS, MAINTASKNAME, EDIT, DELETE, VERIFY, ACTION, CHAT, VIEW_DETAILS, ACTION_ICON } from '../../Common/Headers';

export default function AdminManageTasks() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        getPending(dispatch, getUser.user);
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
    const handleOpen = (action, index) => {
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "addSubtask") {
            info = { mainTaskId: state.manageTasks[index].taskid, action: action, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].ideano }
        } else if (action === "modify") {
            info = {
                moduleId: state.manageTasks[index].moduleId,
                ideaId: state.manageTasks[index].ideano,
                title: state.manageTasks[index].tasktitle,
                description: state.manageTasks[index].taskdescription,
                taskId: state.manageTasks[index].taskid
            }
        } else if (action === "Verify") {
            info = { mainTaskId: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle, action: action, moduleId: state.manageTasks[index].moduleId }
        } else if (action === "taskInfo") {
            info = {
                projectName: state.manageTasks[index].projectitle,
                title: state.manageTasks[index].tasktitle,
                description: state.manageTasks[index].taskdescription,
                taskId: state.manageTasks[index].taskid,
                targetDate: state.manageTasks[index].targettime,
                timeLeft: state.manageTasks[index].timeLeft,
                extraHours: state.manageTasks[index].extraHours,
                status: state.manageTasks[index].completeStatus
            }
        } else if (action === "Delete") {
            info = {
                projectName: state.manageTasks[index].projectitle,
                moduleId: state.manageTasks[index].moduleId,
                title: state.manageTasks[index].tasktitle,
                description: state.manageTasks[index].taskdescription,
                taskId: state.manageTasks[index].taskid,
                action: action
            }
        } else {
            info = { action: action, id: state.manageTasks[index].taskid }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        // setOpen(false);
        // state.manageTasks=[]
        setOpen({ status: false, index: 0 });
        getPending(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
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
                                                        {/* <th >{PROJECTNAME}</th> */}
                                                        {/* <th>Description</th> */}
                                                        {/* <th>Target Time</th> */}
                                                        {/* <th>{ASSIGNED_TO}</th>
                                                        <th>{ASSIGNED_BY}</th>
                                                        <th>{MAINTASKPROGRESS}</th> */}
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
                                                                    {/* <td style={{textAlign:'center'}}>{tasks.taskid}</td> */}
                                                                    <td style={{ width: '0px', textTransform: "capitalize" }} data-toggle="tooltip" data-placement="left" title={"Epic Name        :" + tasks.projectitle + "\n\nSprint Name     :" + tasks.moduletitle + "\n\nAssigned To       :" + tasks.assigntto + "\n\nStory Points       :" + tasks.storyPoints + "\n\nAssigned By       :" + tasks.assignby + "\n\nAssigned Date    :" + tasks.assignedon + "\n\nTask Progress      :" + tasks.taskStatus + "%"}>{tasks.completeStatus === 'pending' ? <b>{tasks.tasktitle}</b> : <del> <b>{tasks.tasktitle}</b></del>}</td>
                                                                    {/* <td style={{textTransform:"capitalize",width:'120px'}}>{tasks.projectitle}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.taskdescription}</td> */}
                                                                    {/* <td style={{width:'100px'}}>{tasks.targettime}</td> */}
                                                                    {/* <td style={{textTransform:"capitalize",width:'100px'}}>{tasks.assigntto}</td>
                                                                        <td style={{textTransform:"capitalize",width:'100px'}}>{tasks.assignby}</td>
                                                                        <td style={{textAlign:'center',width:'120px'}}>{tasks.taskStatus}%</td> */}
                                                                    {/* {tasks.completeStatus === "pending" ? <td style={{width:'100px'}}>{tasks.timeLeft}</td> : <td style={{width:'100px'}}>{tasks.extraHours}</td>} */}
                                                                    {/* <td style={{textAlign:'center'}}>
                                                                            {tasks.completeStatus === "pending" ? <button className="badge badge-pill badge-danger border-0" style={{width:'100px'}} onClick={(event) => handleOpen("taskInfo", index)}>Pending</button>
                                                                                : <button className="badge badge-pill badge-success border-0" style={{width:'100px'}}onClick={(event) => handleOpen("taskInfo", index)}>Completed</button>}
                                                                        </td> */}

                                                                    <td style={{ textAlign: 'center', width: '10px' }}>
                                                                        <div className="dropdown show">
                                                                            {/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                                                                            </a>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }} >
                                                                                {tasks.completeStatus === "pending" ?
                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A",color:'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/subTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#B1787B",color:'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                                                        {getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleOpen("Delete", index)}>{DELETE}</button> : null}
                                                                                    </div> :

                                                                                    <div>
                                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A",color:'white' }} onClick={(event) => handleOpen("taskInfo", index)}>{VIEW_DETAILS}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78",color:'white' }}><Link to={{ pathname: '/subTasks', state: { id: state.manageTasks[index].taskid, title: state.manageTasks[index].tasktitle, moduleId: state.manageTasks[index].moduleId, ideaId: state.manageTasks[index].ideano } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                                                        <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436",color:'white' }} onClick={(event) => handleOpen("addSubtask", index)}>{NEWSUBTASK}</button>
                                                                                        <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "#6BC2D3",color:'white' }} onClick={(event) => handleOpen("Verify", index)}>{VERIFY}</button>
                                                                                    </div>}
                                                                            </div>
                                                                        </div>

                                                                    </td>
                                                                    <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("maintask", index)} /></button></td>
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
                                        open.action === "maintask" ? <ChatBox open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
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
                                        open.action === "Verify" ? <MainTaskVerify open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "Delete" ? <MainTaskDelete open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
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