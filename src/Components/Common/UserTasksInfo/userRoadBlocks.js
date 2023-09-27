import React, { useEffect, useReducer, useState } from 'react';
import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { getRoadBlocks, getAllRoadBlockMessages } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import Header from '../TopNav';
import SideNavigation from '../SideNav';
import { userTaskReducer, initialState } from './userTaskReducer';
import RoadBlockChatBox from '../ChatRoadBlock';
import { SUBTASKTITLE, ROADBLOCK_DESCRIPTION, REQUESTED_BY, ASSIGNED_BY, ASSIGNED_DATE, TARGET_DATE, ROADBLOCK_PERCENTAGE, ACTION, PENDING_ROADBLOCKS, CHAT, SEVERITY, PRIORITY } from '../Headers';
import UpdateRoadblock from './roadblockUpdate';


export default function UserRoadBlocks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(userTaskReducer, initialState)
    const [open, setOpen] = useState({ status: false, action: "", index: 0 })
    const [taskInfo, setTaskInfo] = useState()
    useEffect(() => {
        getRoadBlocks(dispatch, getUser.user);
        getAllRoadBlockMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.location.data])
    useEffect(() => {
        if (state.roadblocks.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.roadblocks])
    const handleOpen = (action, index, sno) => {
        setOpen({ status: true, action: action, index: index });
        var info;
        if (action === "update") {
            info = {
                action: action,
                id: state.roadblocks[index].sno
            }
        }
        if (action === "roadblock") {
            info = {
                action: action,
                id: state.roadblocks[index].sno,
                sno:sno
            }
        }
        setTaskInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getRoadBlocks(dispatch, getUser.user);
        getAllRoadBlockMessages(dispatch, getUser.user);

    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    const getMessagesCount = (data, msg, task, empId) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.sno  ).map((messages, i) => {
        // eslint-disable-next-line
        return i,messages
    })
    return (
        <i>
            {msgCount.length > 0 ? msgCount.length : null}
            {
                msgCount.length > 0 ?
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', backgroundColor: 'green' }}  onClick={(event) => handleOpen("roadblock", data, msgCount)} />
                    :
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }}  onClick={(event) => handleOpen("roadblock", data, msgCount)} />

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
                                            <h4 className="card-title">{PENDING_ROADBLOCKS}</h4>
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
                                                            <th>{ROADBLOCK_DESCRIPTION}</th>
                                                            <th>{REQUESTED_BY}</th>
                                                            <th>{ASSIGNED_BY}</th>
                                                            <th>{ASSIGNED_DATE}</th>
                                                            <th>{TARGET_DATE}</th>
                                                            <th>{SEVERITY}</th>
                                                            <th>{PRIORITY}</th>
                                                            <th>{ROADBLOCK_PERCENTAGE}</th>
                                                            {/* <th>{ROADBLOCK_STATUS}</th> */}
                                                            {/* <th>Action</th> */}
                                                            <th>{ACTION}</th>
                                                            <th>{CHAT}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            state.roadblocks !== [] ? state.roadblocks.map((tasks, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        {/* <td style={{ textAlign: 'center' }}>{tasks.subTaskId}</td> */}
                                                                        <td style={{ textTransform: "capitalize" }}>{tasks.subTaskName}</td>
                                                                        <td style={{ textTransform: "capitalize" }}>{tasks.roadBlockDescription}</td>
                                                                        <td style={{ textTransform: "capitalize" }}>{tasks.requestedBy}</td>
                                                                        <td style={{ textTransform: "capitalize" }}>{tasks.assignedBy}</td>
                                                                        <td style={{ width: '100px' }}>{tasks.assignedDate}</td>
                                                                        <td style={{ width: '100px' }}>{tasks.targetDate}</td>
                                                                        <td >{tasks.severityLevel}</td>
                                                                        <td >{tasks.priorityLevel}</td>
                                                                        <td style={{ width: '100px' }}>{tasks.roadblockStatus}%</td>
                                                                        {/* <td style={{ textAlign: 'center' }}>{tasks.status}</td> */}
                                                                        <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/update.svg" alt="logo" style={{ width: '40px', height: '20px' }} onClick={(event) => handleOpen("update", index)} /></button></td>
                                                                        {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '40px', height: '20px' }} onClick={(event) => handleOpen("roadblock", index)} /></button></td> */}
                                                                        <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} >
                                                                            {
                                                                                getMessagesCount(index, state.allRoadBlockMessages, tasks, getUser.user.empId)
                                                                            }
                                                                        </button>
                                                                    </td>
                                                                    </tr>
                                                                )
                                                            }) : null}
                                                    </tbody>
                                                </table>
                                            </MDBTable>
                                        </div>
                                    }
                                    {
                                        open.action === "roadblock" ? <RoadBlockChatBox open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "update" ? <UpdateRoadblock open={open.status} handleClose={handleClose} data={taskInfo} handleModalClose={handleModalClose}
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