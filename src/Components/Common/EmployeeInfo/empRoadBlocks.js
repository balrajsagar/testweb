import React, { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { empInfoReducer, initialState } from "./empInfoReducer"
import { getRoadBlocks, getRoadBlockMessages} from "./network"
import RootLoader from "../Loader/RootLoader";
import RoadBlockChatBox from "../ChatRoadBlock";
import RoadBlock from "../RoadBlock";
import { SUBTASKTITLE, ROADBLOCK_DESCRIPTION, CHAT, REQUESTED_BY, ASSIGNED_BY, ASSIGNED_DATE, ROADBLOCK_PERCENTAGE, ROADBLOCK_STATUS,SEVERITY, PRIORITY } from "../Headers";

export default function EmpRoadBlocks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empInfoReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        if (props.data !== undefined && props.data !== "") {
            getRoadBlocks(dispatch, getUser.user, props.data.id, props.data.role);
            getRoadBlockMessages(dispatch, getUser.user);
        }
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.roadBlocks.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.roadBlocks])
    // eslint-disable-next-line
    const handleOpen = (action, index, sno, r_id) => {
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "addRoadBlock") {
            info = { taskId: state.roadBlocks[index].subTaskId }
        } else if(action === "roadblock") {
            info = { action: action, id: r_id, sno:sno }
        }
        else {
            info = { action: action, id: state.roadBlocks[index].subTaskId, sno:sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
      
        setOpen({ status: false, index: 0 });
        getRoadBlocks(props.data.dispatch, getUser.user, props.data.id, props.data.role);
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
                    <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px'}}  onClick={(event) => handleOpen("roadblock", data, msgCount, r_id)} />
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
        {/* <MDBTable> */}
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
                        <th>{ASSIGNED_DATE}</th>
                        <th>{ROADBLOCK_PERCENTAGE}</th>
                        <th>{SEVERITY}</th>
                        <th>{PRIORITY}</th>
                        <th>{ROADBLOCK_STATUS}</th>
                        <th>{CHAT}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.roadBlocks !== [] ? state.roadBlocks.map((tasks, index) => {
                            return (
                                <tr key={index}>
                                    {/* <td style={{ textAlign: 'end', width: '30px' }}>{tasks.subTaskId}</td> */}
                                    <td style={{ textTransform: "capitalize" }}>{tasks.subtaskname}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.roadblock_description}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.requestedby}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedby}</td>
                                    <td style={{ width: '100px' }}>{tasks.assigned_date}</td>
                                    <td style={{ width: '100px' }}>{tasks.roadblock_status}%</td>
                                    <td >{tasks.severity_level}</td>
                                    <td >{tasks.priority_level}</td>
                                    <td style={{ textAlign: 'center' }}>{tasks.status}</td>
                                    {/* <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '40px', height: '20px' }} onClick={(event) => handleOpen("roadblock", index)} /></button></td> */}
                                    <td style={{ width: '8px' }}>
                                                                        <button type="button" style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0",marginLeft:'15px' }} >
                                                                            {
                                                                                getMessagesCount(index, state.roadBlockMessages, tasks, getUser.user.empId, tasks.r_id)
                                                                            }
                                                                        </button>
                                                                    </td>
                                    {/* <td style={{ textAlign: 'center' }}>
                                        {tasks.status === "pending" ? <span className="badge badge-pill badge-danger" style={{width:'100px'}}>Pending</span>
                                            : <span className="badge badge-pill badge-success" style={{width:'100px'}}>Completed</span>}
                                    </td> */}

                                    {/* <td style={{ textAlign: 'center', width: '8px' }}>
                                        <div className="dropdown show">
                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                <img src="images/common/more.svg" alt="logo" style={{ width: '20px', height: '20px' }} />
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                <div>
                                                    {getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "blue" }}><Link to={{ pathname: '/roadblockList', state: { id: state.roadBlocks[index].subTaskId, title: state.roadBlocks[index].tasktitle } }} style={{ color: 'white' }}>View RoadBlocks</Link></button> :
                                                        <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "blue" }}><Link to={{ pathname: '/roadblocks', state: { id: state.roadBlocks[index].subTaskId, title: state.roadBlocks[index].tasktitle } }} style={{ color: 'white' }}>View RoadBlocks</Link></button>}
                                                    <button className="dropdown-item badge badge-pill badge-secondary text-center" onClick={(event) => handleOpen("addRoadBlock", index)}>Add RoadBlock</button>
                                                </div>
                                            </div>
                                        </div>

                                    </td>
                                    <td><button style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px' }} onClick={(event) => handleOpen("subtask", index)} /></button></td> */}
                                    {/* onClick={() => handleOpenChat("subtask", id)} */}
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
        {/* </MDBTable> */}
    </div>
}