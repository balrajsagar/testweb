import React, { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
import $ from 'jquery';
import { roadBlockReducer, initialState } from "./roadBlockReducer"
import { getToBeAssignedRoadBlocks } from "./network";
import ChatBox from "../../Common/Chat";
import RoadBlock from "../../Common/RoadBlock/assignRoadBlock";
import ModifyRoadBlock from "../../Common/RoadBlock/modifyRoadBlock";
import RootLoader from "../../Common/Loader/RootLoader";
import { SUBTASKTITLE, ACTION, ROADBLOCK_DESCRIPTION, REQUESTED_BY, ROADBLOCK_DATE, CHAT, SEVERITY, PRIORITY } from "../../Common/Headers";

export default function ToBeAssignedRoadBlocks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(roadBlockReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        getToBeAssignedRoadBlocks(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.toBeAssigned.length > 0) {
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
    const handleOpen = (action, index) => {
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "addRoadBlock") {
            info = { taskId: state.toBeAssigned[index].subTaskId, roadblockId: state.toBeAssigned[index].sno, taskName: state.toBeAssigned[index].subTaskName, roadBlockDescription: state.toBeAssigned[index].roadBlockDescription }
        } else if (action === "roadblock") {
            info = { action: action, id: state.toBeAssigned[index].sno }
        } else {
            info = { action: action, id: state.toBeAssigned[index].subTaskId, roadblockId: state.toBeAssigned[index].sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getToBeAssignedRoadBlocks(props.dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
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
                        {/* <th>{SUBTASKID}</th> */}
                        <th>{SUBTASKTITLE}</th>
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
                                    {/* <td style={{ textAlign: 'end',width:'30px' }}>{tasks.subTaskId}</td> */}
                                    <td style={{ textTransform: "capitalize" }}>{tasks.subTaskName}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.roadBlockDescription}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.requestedBy}</td>
                                    {/* <td style={{textTransform:"capitalize"}}>{tasks.assignedby}</td> */}
                                    <td style={{ width: '130px' }}>{tasks.roadBlockDate}</td>
                                    <td >{tasks.severityLevel}</td>
                                    <td >{tasks.priorityLevel}</td>
                                    <td style={{ width: '100px', textAlign: 'center' }}>
                                        <button className="dropdown-item badge badge-pill badge-warning text-center" onClick={(event) => handleOpen("addRoadBlock", index)}>Assign</button>
                                    </td>
                                    <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '40px', height: '20px' }} onClick={(event) => handleOpen("roadblock", index)} /></button></td>
                                </tr>
                            )
                        }) : null}
                </tbody>
            </table>}
        {
            open.action === "roadblock" ? <ChatBox open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
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