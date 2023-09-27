import React, { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
import $ from 'jquery';
import { roadBlockReducer, initialState } from "./roadBlockReducer"
import { getToBeAssignedRoadBlocks, getAllTaskMessages } from "./network";
import RoadBlockChatBox from "../../Common/ChatRoadBlock";
import RoadBlock from "../../Common/RoadBlock/assignBlocked";
import ModifyRoadBlock from "../../Common/RoadBlock/modifyRoadBlock";
import RootLoader from "../../Common/Loader/RootLoader";
import {  MAINTASKNAME, MAINTASKID, ACTION, ROADBLOCK_DESCRIPTION, REQUESTED_BY, ROADBLOCK_DATE, CHAT, PRIORITY, SEVERITY } from "../../Common/Headers";
import { getSubStringId } from "../../Common/SubStringConvert";
import convertPSTtoLocalTime from "../../Common/convertPSTtoLocalTime";

export default function ToBeAssignedRoadBlocks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(roadBlockReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        getToBeAssignedRoadBlocks(dispatch, getUser.user);
        getAllTaskMessages(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.data])
    // console.log(state.allMessages)
    useEffect(() => {
        if (state.toBeAssigned.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.toBeAssigned])
    const handleOpen = (action,index,r_id, sno) => {
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "addRoadBlock") {
            info = { taskId: state.toBeAssigned[index].story_id, roadblockId: state.toBeAssigned[index].blocked_id, taskName: state.toBeAssigned[index].subtaskname, roadBlockDescription: state.toBeAssigned[index].roadblock_description, severityLevel: state.toBeAssigned[index].severity_level ,priorityLevel :state.toBeAssigned[index].priority_level }
        } else if (action === "roadblock") {
            info = { action: action, id: r_id, sno:sno }
        } else {
            info = { action: action, id: state.toBeAssigned[index].subtaskid, roadblockId: state.toBeAssigned[index].sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getToBeAssignedRoadBlocks(props.dispatch, getUser.user);
        getAllTaskMessages(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    const getMessagesCount = (data,r_id, msg, task, empId) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === r_id  ).map((messages, i) => {
        // eslint-disable-next-line
        return i,messages
    })
    return (
        <i>
            {/* {msgCount.length > 0 ? msgCount.length : null} */}
            {
                msgCount.length > 0 ?
                <div className="row">
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-8px" }}  onClick={(event) => handleOpen("roadblock",data,r_id, msgCount)} />
                    <span style={{ color: 'red', fontWeight: "bold" }}>{msgCount.length}</span>
                    </div>
                    :
                    <div className="row">
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-8px" }}  onClick={(event) => handleOpen("roadblock",data,r_id, msgCount)} />
                    </div>

            }
        </i>
    )
}

    // console.log(state.toBeAssigned)
    return <div className="table-responsive">
        {state.isLoading ? <RootLoader /> :
            <table
                search="true"
                id="example" className="table table-striped table-bordered"
                data-pagination="true"
            >
                <thead style={{ backgroundColor: '#F4FAF7' }}>
                    <tr>
                        <th>{MAINTASKID}</th>
                        <th>{MAINTASKNAME}</th>
                        <th>{ROADBLOCK_DESCRIPTION}</th>
                        <th>{REQUESTED_BY}</th>
                        {/* <th>Assigned By</th> */}
                        <th>{ROADBLOCK_DATE}</th>
                        <th>{SEVERITY}</th>
                        <th>{PRIORITY}</th>
                        <th>{ACTION}</th>
                        <th>{CHAT}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.toBeAssigned !== [] ? state.toBeAssigned.map((tasks, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ width:'100px' }}>{getSubStringId(getUser.user.corp, 3)}-{getSubStringId(tasks.story_id, 5)}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.subtaskname}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.roadblock_description}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.requestedby}</td>
                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.assignedby}</td> */}
                                    <td style={{ width: '130px' }}>{convertPSTtoLocalTime(tasks.roadblock_date)}</td>
                                    <td >{tasks.severity_level}</td>
                                    <td >{tasks.priority_level}</td>
                                    <td style={{ width: '100px', textAlign: 'center' }}>
                                        <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("addRoadBlock", index)}>Assign</button>
                                    </td>
                                    {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '40px', height: '20px' }} onClick={(event) => handleOpen("roadblock", index)} /></button></td> */}
                                    <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0",marginLeft:'15px' }} >
                                                                            {
                                                                                getMessagesCount(index,tasks.r_id, state.allMessages, tasks, getUser.user.empId)
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
        {
            open.action === "addRoadBlock" ? <RoadBlock open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {
            open.action === "modify" ? <ModifyRoadBlock open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {/* </MDBTable> */}
    </div>
}