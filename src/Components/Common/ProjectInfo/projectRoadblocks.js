import { getRoadblocks, getRoadBlockMessages } from "./network";
import React, { useEffect, useReducer, useState } from "react";
import $ from 'jquery';
import { projectReducer, initialState } from "./projectReducer";
import { useSelector } from "react-redux";
import RootLoader from "../Loader/RootLoader";
import { SUBTASKTITLE, ROADBLOCK_DESCRIPTION, REQUESTED_BY, CHAT, ASSIGNED_BY, ASSIGNED_DATE, ROADBLOCK_PERCENTAGE, ROADBLOCK_STATUS,ASSIGNED_TO, SEVERITY, PRIORITY } from "../Headers";
import RoadBlockChatBox from "../ChatRoadBlock";

export default function ProjectRoadblocks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(projectReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        getRoadblocks(dispatch, getUser.user, props.data.id);
        getRoadBlockMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.roadblocks.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.roadblocks])
    const handleOpen = (action, index, sno, r_id) => {
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "roadblock") {
            info = { action: action, id: r_id, sno:sno }
        }
        else {
            info = { action: action, id: state.roadblocks[index].subTaskId, sno:sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getRoadBlockMessages(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    const getMessagesCount = (data, msg, task, empId, r_id) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === task.sno  ).map((messages, i) => {
        // eslint-disable-next-line
        return i,messages
    })
    return (
        <i>
            {/* {msgCount.length > 0 ? msgCount.length : null} */}
            {
                msgCount.length > 0 ?
                <div className="row">
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }}  onClick={(event) => handleOpen("roadblock", data, msgCount, r_id)} />
                    <span style={{ color: 'red', fontWeight: "bold", marginLeft: "-2px"  }}>{msgCount.length}</span>
                    </div>
                    :
                    <div className="row">
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px' }}  onClick={(event) => handleOpen("roadblock", data, msgCount, r_id)} />
                    </div>
            }
        </i>
    )
}

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
                        <th>{ROADBLOCK_DESCRIPTION}</th>
                        <th>{REQUESTED_BY}</th>
                        <th>{ASSIGNED_BY}</th>
                        <th>{ASSIGNED_TO}</th>
                        <th>{ASSIGNED_DATE}</th>
                        <th>{PRIORITY}</th>
                        <th>{SEVERITY}</th>
                        <th>{ROADBLOCK_PERCENTAGE}</th>
                        {/* <th>{TARGET_DATE}</th> */}
                        <th>{ROADBLOCK_STATUS}</th>
                        <th>{CHAT}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.roadblocks !== [] ? state.roadblocks.map((tasks, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ textTransform: "capitalize", width: '400px' }}>{tasks.subtaskname}</td>
                                    <td style={{ textTransform: "capitalize", width: '400px', }}>{tasks.roadblock_description}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.requestedby}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedby}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedto}</td>
                                    <td style={{ width: '100px' }}>{tasks.assigned_date}</td>
                                    <td >{tasks.severity_level}</td>
                                    <td >{tasks.priority_level}</td>
                                    <td style={{ width: '90px' }}>{tasks.roadblock_status}%</td>
                                    {/* <td style={{ width: '100px' }}>{tasks.targetDate}</td> */}
                                    <td style={{ textAlign: 'center',textTransform: "capitalize"}}>{tasks.status === 'solved' ? <button className="badge badge-pill badge-success border-0" style={{ width: '100px',textTransform: "capitalize"  }}>{tasks.status}</button> : <button className="badge badge-pill badge-danger border-0" style={{ width: '100px',textTransform: "capitalize" }}>{tasks.status}</button>}</td>
                                    {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '40px', height: '20px' }} onClick={(event) => handleOpen("roadblock", index)} /></button></td> */}
                                    <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0",marginLeft:'15px' }} >
                                                                            {
                                                                                getMessagesCount(index, state.roadBlockMessages, tasks, getUser.user.empId, tasks.r_id)
                                                                            }
                                                                        </button>
                                                                    </td>
                                </tr>
                            )
                        }) : null}
                </tbody>
            </table>}
        {
            open.action === "roadblock" ? <RoadBlockChatBox open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
            /> : null
        }
    </div>
}
