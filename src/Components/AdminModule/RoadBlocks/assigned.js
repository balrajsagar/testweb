import React, { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
import $ from 'jquery';
import { roadBlockReducer, initialState } from "./roadBlockReducer"
import { getAssignedRoadBlocks } from "./network";
import ChatBox from "../../Common/Chat";
import RoadBlock from "../../Common/RoadBlock";
import RootLoader from "../../Common/Loader/RootLoader";
import ModifyRoadBlock from "../../Common/RoadBlock/modifyRoadBlock";
import { SUBTASKTITLE, EDIT, ROADBLOCK_DESCRIPTION, ASSIGNED_TO, ASSIGNED_BY, ASSIGNED_DATE, TARGET_DATE, ACTION, CHAT, SEVERITY, PRIORITY } from "../../Common/Headers";

export default function AssignedRoadBlocks(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(roadBlockReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    useEffect(() => {
        getAssignedRoadBlocks(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.assigned.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.assigned])
    const handleOpen = (action, index) => {
        var info
        setOpen({ status: true, index: index, action: action });
        if (action === "modify") {
            info = { taskId: state.assigned[index].subTaskId, roadblockId: state.assigned[index].sno, taskName: state.assigned[index].subTaskName, roadBlockDescription: state.assigned[index].roadBlockDescription, estimatedHours: state.assigned[index].estimatedHours, assignedto: state.assigned[index].assignedTo, severitySelected: state.assigned[index].severityLevel, prioritySelected: state.assigned[index].priorityLevel, assignedTo: state.assigned[index].assignedto }
        } else if (action === "roadblock") {
            info = { action: action, id: state.assigned[index].sno }
        } else {
            info = { action: action, id: state.assigned[index].subTaskId, roadblockId: state.assigned[index].sno }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getAssignedRoadBlocks(props.dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    // console.log(state.assigned)
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
                        <th>{ASSIGNED_TO}</th>
                        <th>{ASSIGNED_BY}</th>
                        <th>{ASSIGNED_DATE}</th>
                        <th>{TARGET_DATE}</th>
                        <th>{SEVERITY}</th>
                        <th>{PRIORITY}</th>
                        <th>{ACTION}</th>
                        <th>{CHAT}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.assigned !== [] ? state.assigned.map((tasks, index) => {
                            return (
                                <tr key={index}>
                                    {/* <td style={{ textAlign: 'end', width: '30px' }}>{tasks.subTaskId}</td> */}
                                    <td style={{ textTransform: "capitalize" }}>{tasks.subTaskName}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.roadBlockDescription}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedTo}</td>
                                    <td style={{ textTransform: "capitalize" }}>{tasks.assignedBy}</td>
                                    <td style={{ width: '100px' }}>{tasks.assignedDate}</td>
                                    <td style={{ width: '100px' }}>{tasks.targetDate}</td>
                                    <td >{tasks.severityLevel}</td>
                                    <td >{tasks.priorityLevel}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E" ,color:'white'}} title={EDIT} onClick={(event) => handleOpen("modify", index)}>{EDIT}</button>
                                    </td>
                                    <td style={{ width: '8px' }}><button style={{ backgroundColor: 'transparent', border: "0", width: '5px', padding: "0" }} type="button" > <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '40px', height: '20px' }} onClick={(event) => handleOpen("roadblock", index)} /></button></td>
                                </tr>
                            )
                        }) : null}
                </tbody>
            </table>}
        {
            open.action === "modify" ? <ModifyRoadBlock open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {
            open.action === "roadblock" ? <ChatBox open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {
            open.action === "addRoadBlock" ? <RoadBlock open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
            /> : null
        }
    </div>
}