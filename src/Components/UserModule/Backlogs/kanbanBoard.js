/* 
FileName:kanbanBoard.js
purpose:To se all the backlogs
Developers:Satya Sidda[SS]

 */
import React, { useEffect, useState, useReducer } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { getActiveSprints, getUnassigned, getCurrentSprint, getPending, getSprints, getInvolvedEmployees, getAllTaskMessages, getWorkingHours, getWorkingDays } from './network';
import { useSelector } from "react-redux";
import { tasksReducer, initialState } from './tasksReducer';
import SideBar from '../Utility/SideNav';
import RootLoader from '../../Common/Loader/RootLoader';
import TopNav from '../Utility/TopNav'
import AddMainTask from '../../Common/TasksModals/addMainTask';
import { NEWMAINTASK, EDIT, VIEW_DETAILS, LIMITED_ACCESS_CONTRIBUTOR, ADD_TO_EPIC, REASSIGN, ADD_TO_SPRINT, CHANGE_STATUS, SCRUM_MASTER, PRODUCT_OWNER, VIEWSUBTASKS, NEWSUBTASK, PENDING_SUBTASKS, MODULE, ACTION_ICON, CHAT, STORY_POINTS, PRIORITY_LEVEL, ALL_USERS, DELETE, KANBAN } from '../../Common/Headers';
import { Link, useHistory } from 'react-router-dom';
import AddToSprint from '../Backlogs/addToSprint';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';
import ModifyMainTask from '../../Common/TasksModals/modifyMainTask';
import Moment from 'moment';
import Select from 'react-select';
import { activeSprint } from "./actions";
import AddToKanban from "./addToKanban";
import ModifyModule from '../../Common/Modules/modifyModule';
import MainTaskChatBox from '../../Common/ChatMainTask';
import ChangeStatus from "./changeStatus";
import AddSubTask from '../../Common/SubTaskModals/addSubTask';
import { getSubStringId } from "../../Common/SubStringConvert";
import DeleteSprint from "./deleteSprint";
import AddToSprintKanban from "./addToSprintKanban";

export default function Kanbanboard() {
    const history = useHistory()
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    const [searchWord, setSearchWord] = useState('')

    // const [staticWord, setStaticWord] = useState(`[${ACTIVE_SPRINT}]`)
    const [staticWord, setStaticWord] = useState(`[ACTIVE ${MODULE}]`)


    useEffect(() => {
        if (history?.location?.state?.action === 'add') {
            handleOpen("add")
        }
        // eslint-disable-next-line
    }, [history?.location?.state])

    //network calls during page load
    useEffect(() => {
        getActiveSprints(dispatch, getUser.user)
        getSprints(dispatch, getUser.user)
        getPending(dispatch, getUser.user)
        getUnassigned(dispatch, getUser.user)
        getAllTaskMessages(dispatch, getUser.user)
        getWorkingHours(dispatch, getUser.user);
        getWorkingDays(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])

    const getHours = (id, timesheet) => {
        const hoursCount = timesheet.filter(list => list.story_id === id).map((list) => {
            return list.sum;
          });
        if(hoursCount[0] > 0){
          return Math.round(hoursCount[0]);
        }
        else{
          return 0;
        }
      };
    
      const getDays = (id, count_days_no_weekend) => {
        const daysCount = count_days_no_weekend.filter(list => list.story_id === id).map((list) => {
            return list.count_days_no_weekend;
          });
        if(daysCount[0] > 0){
          return Math.round(daysCount[0]);
        }
        else{
          return 0;
        }
      };
    var sprintDetails = [];
    state.sprints.map((sprints) => {
        return (
            sprintDetails.push({ 'value': sprints.moduleId, 'moduleName': sprints.moduleDesc, 'startDate': sprints.startDate, 'sprint_status': sprints.sprint_status, 'targetDate': sprints.targetDate, 'label': (getUser.user.corp).substring(0, 3).toUpperCase().concat('-', '   ', sprints.moduleDesc) })
        );
    })
    const backlogs = state.pendingTasks.concat(state.unassignedTasks)
    // console.log(backlogs)
    const handleOpen = (action, data, sno) => {
        var info
        setOpen({ status: true, action: action });
        if (action === "useTemplate") {
            var template_status = "useTemplate"
            info = { view: template_status }
        } else if (action === "add") {
            var status = "backlog_addUser"

            info = { view: status }
        }
        else if (action === "taskInfo") {
            var view_status = "taskInfo"
            info = {
                view: view_status,
                projectName: data.projectitle,
                epicId: data.ideano,
                moduleName: data.moduletitle,
                moduleId: data.userstoryModuleId,
                title: data.tasktitle,
                description: data.taskdescription,
                taskId: data.userstory_id,
                createdDate: data.assignedon,
                taskProgress: data.taskStatus,
                storyPoints: data.storyPoints,
                acceptanceCriteria: data.acceptanceCriteria,
                assignedTo: data.assigntto,
                assignedBy: data.assignby,
                completedDate: data.modifiedDate,
                completedStatus: data.completeStatus,
                targetDate: data.targetDate,
                device_id: data.device_id,
                player_id: data.player_id
            }
        }
        else if (action === "addSubtask") {
            info = {
                mainTaskId: data.userstory_id,
                action: action,
                moduleId: data.userstoryModuleId,
                title: data.tasktitle,
                ideaId: data.ideano,
                assignedTo: data.assignedTo,
                targetDate: state.activeSprint.targetDate
            }
        }
        else if (action === "modify") {
            info = {
                projectName: data.projectitle,
                moduleId: data.userstoryModuleId,
                ideaId: data.ideano,
                title: data.tasktitle,
                description: data.taskdescription,
                taskId: data.userstory_id,
                acceptanceCriteria: data.acceptanceCriteria,
                storyPoints: data.storyPoints,
                userDetails: data.assigntto,
                id: data.assignedTo,
                priorityLevel: data.priorityLevel,
                targetDate: data.targetDate,
                action: action,
                sprintTargetDate: state.activeSprint.targetDate,
                currentDate: data.currentDate,
                activeStatus: data.activeStatus,
                backlogs: data.backlogs,
                device_id: data.device_id,
                player_id: data.player_id

            }
        }
        else if (action === "reassign") {
            info = {
                projectName: data.projectitle,
                moduleId: data.userstoryModuleId,
                ideaId: data.ideano,
                title: data.tasktitle,
                description: data.taskdescription,
                taskId: data.userstory_id,
                acceptanceCriteria: data.acceptanceCriteria,
                storyPoints: data.storyPoints,
                userDetails: data.assigntto,
                id: data.assignedTo,
                priorityLevel: data.priorityLevel,
                targetDate: data.targetDate,
                action: action,
                sprintTargetDate: state.activeSprint.targetDate,
                currentDate: data.currentDate,
                activeStatus: data.activeStatus,
                backlogs: data.backlogs,
                device_id: data.device_id,
                player_id: data.player_id

            }
        }
        else if (action === "add_to_epic") {
            var epic_status = "epic"
            info = {
                view: epic_status,
                projectid: data.ideano,
                taskId: data.userstory_id,

            }
        }
        else if (action === "add_to_sprint") {
            info = {
                projectid: data.ideano,
                taskId: data.userstory_id,
                currentDate: data.currentDate,
                assignedTo: data.assigntto,
                assign_to: data.assignedTo,
                title: data.tasktitle,
                sprintDesc: state.activeSprint.moduleDesc,
                device_id: data.device_id,
                player_id: data.player_id,
                storyPoints: data.storyPoints,
            }
        }

        else if (action === "add_to_new_kanban") {
            info = {
                projectid: data.ideano,
                taskId: data.userstory_id,
                assignedTo: data.assigntto,
                assign_to: data.assignedTo,
                title: data.tasktitle,
                sprintDesc: state.activeSprint.moduleDesc,
                device_id: data.device_id,
                player_id: data.player_id,
                storyPoints: data.storyPoints,
            }
        }
        else if (action === "add_to_kanban") {
            info = {
                assignedTo: data.assigntto, action: action, taskId: data.userstory_id, currentDate: data.currenttime, sprint_status: state.activeSprint.sprint_status, sprintId: state.activeSprint.moduleId, sprintDesc: state.activeSprint.moduleDesc, targetDate: state.activeSprint.targetDate, device_id: data.device_id, assign_to: data.assignedTo,
                title: data.tasktitle, player_id: data.player_id, storyPoints: data.storyPoints,
            }
        }
        else if (action === "remove_from_sprint") {

            info = {
                action: action,
                taskId: data.userstory_id, completeStatus: data.completeStatus, sprintId: state.activeSprint.moduleId, sprintDesc: state.activeSprint.moduleDesc
            }
        }
        else if (action === "changeStatus") {
            info = { title: data.tasktitle, action: action, taskId: data.userstory_id, activeStatus: data.activeStatus, completeStatus: data.completeStatus, sprintId: state.activeSprint.moduleId }
        }
        else if (action === 'modify_sprint') {

            info = {
                id: state.activeSprint.moduleId,
                title: state.activeSprint.moduleDesc,
                targetDate: state.activeSprint.targetDate,
                startDate: state.activeSprint.startDate,
                sprint_status: state.activeSprint.sprint_status
            }

        }
        else if (action === 'delete_sprint') {

            info = {
                action: action,
                id: state.activeSprint.moduleId,
                title: state.activeSprint.moduleDesc,
                targetDate: state.activeSprint.targetDate,
                startDate: state.activeSprint.startDate
            }
        }
        else if (action === 'move_to_archive') {

            info = {
                action: action,
                id: state.activeSprint.moduleId,
                title: state.activeSprint.moduleDesc,
                targetDate: state.activeSprint.targetDate,
                startDate: state.activeSprint.startDate
            }
        }
        else if (action === 'commit_sprint') {

            info = {
                action: action,
                id: state.activeSprint.moduleId,
                title: state.activeSprint.moduleDesc,
                targetDate: state.activeSprint.targetDate,
                startDate: state.activeSprint.startDate,
                sprint_status: state.activeSprint.sprint_status
            }
        }
        else if (action === 'uncommit_sprint') {

            info = {
                action: action,
                id: state.activeSprint.moduleId,
                title: state.activeSprint.moduleDesc,
                targetDate: state.activeSprint.targetDate,
                startDate: state.activeSprint.startDate,
                sprint_status: state.activeSprint.sprint_status
            }
        }
        else if (action === 'maintask') {
            info = { action: action, id: data, sno: sno }
        }
        else {
            info = { action: action, taskId: data.userstory_id }
        }
        setCardInfo(info)
    };
    const handleDeleteClose = () => {
        setOpen({ status: false, index: 0 })
        getActiveSprints(dispatch, getUser.user)
        getSprints(dispatch, getUser.user)
        getPending(dispatch, getUser.user)
        getUnassigned(dispatch, getUser.user)
        getAllTaskMessages(dispatch, getUser.user)
    }
    const handleClose = () => {
        setOpen({ status: false, index: 0 })
        getSprints(dispatch, getUser.user)
        getInvolvedEmployees(dispatch, getUser.user, state.activeSprint.moduleId);
        getCurrentSprint(dispatch, getUser.user, state.activeSprint.moduleId)
        getPending(dispatch, getUser.user)
        getUnassigned(dispatch, getUser.user)
        getAllTaskMessages(dispatch, getUser.user)
    };
    const handleModifySprint = (title) => {
        setOpen({ status: false, index: 0 })
        dispatch(activeSprint(title))
        getSprints(dispatch, getUser.user)
        getInvolvedEmployees(dispatch, getUser, state.activeSprint.moduleId);
        getCurrentSprint(dispatch, getUser.user, state.activeSprint.moduleId)
        getPending(dispatch, getUser.user);
        getUnassigned(dispatch, getUser.user)
        getAllTaskMessages(dispatch, getUser.user);

    }
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
        getAllTaskMessages(dispatch, getUser.user);

    }
    //boards displaying in backlogs page
    const board = {
        columns: [
            {
                id: 1,

                title: "",
                /* eslint-disable-next-line */
                cards: state.currentTasks.filter((val) => {
                    //filtering data
                    if (val.tasktitle.toLowerCase().includes(searchWord.toLowerCase()) || val.assigntto.toLowerCase().includes(searchWord.toLowerCase()) || val.assignedTo.includes(searchWord.toLowerCase())) {
                        return val
                    }
                }
                )
            },
            {
                id: 2,
                title: backlogs.length > 0 ? <h4 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent' }}> <b>{PENDING_SUBTASKS}</b></h4> : null,

                /* eslint-disable-next-line */
                cards: backlogs.filter((val) => {
                    //filtering data
                    if (val.tasktitle.toLowerCase().includes(searchWord.toLowerCase())) {
                        return val
                    }
                }
                )
            },
        ]
    };

    const getMessagesCount = (id, msg, empId) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === id).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })
        return (
            <i>
                {/* {msgCount.length > 0 ? msgCount.length : null} */}
                {
                    msgCount.length > 0 ?
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }} onClick={(event) => handleOpen("maintask", id, msgCount)} />
                            <span style={{ color: 'red', fontWeight: "bold" }}>{msgCount.length}</span>
                        </div>
                        // <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px', backgroundColor: 'green' }} onClick={(event) => handleOpen("maintask", id, msgCount)} />
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }} onClick={(event) => handleOpen("maintask", id, msgCount)} />
                        </div>
                }
            </i>
        )
    }
    //board for dragging
    function ControlledBoard() {
        const [controlledBoard, setBoard] = useState(board);
        function handleCardMove(_card, source, destination) {
            // console.log(_card)
            // console.log(JSON.stringify(source) + '' + JSON.stringify(destination))
            if (state.sprints.length > 0) {
                //moving card from backlogs to active sprint
                if (JSON.stringify(destination.toColumnId) === '1' && JSON.stringify(source.fromColumnId) === '2') {
                    const updatedBoard = moveCard(controlledBoard, source, destination);
                    setBoard(updatedBoard)
                    handleOpen("add_to_kanban", _card)
                }

            //moving card from active sprint to backlogs

                else if (JSON.stringify(destination.toColumnId) === '2' && JSON.stringify(source.fromColumnId) === '1') {
                    const updatedBoard = moveCard(controlledBoard, source, destination);
                    setBoard(updatedBoard);
                    handleOpen("remove_from_sprint", _card)
                }
            }


        }
        //returning data which is showing in the and menu for active sprint and backlogs (i.e;commit,modify etc...)
        return (
            <div className="col-12" >
                {state.sprints.length > 0 ? <div style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                    <div className="row">
                        <div className="d-flex justify-content-start" style={{ marginLeft: 50 }}>


                            <h4 className="card-title mt-2 " style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent', marginRight: '5px' }}>
                                <b style={{ marginRight: '10px' }}>  {staticWord} </b>
                                <b>{(getUser.user.corp).substring(0, 3).toUpperCase().concat('   ', state.activeSprint.moduleDesc, '  [', Moment(state.activeSprint.startDate).format('MM.DD.YYYY'), '-', Moment(state.activeSprint.targetDate).format('MM.DD.YYYY'), ']')}</b>
                            </h4>

                            {(getUser.user.role === SCRUM_MASTER || getUser.user.role === PRODUCT_OWNER) && <div className="dropdown show " aria-haspopup="true" aria-expanded="false" style={{ cursor: 'pointer', marginLeft: 15, marginRight: 15, padding: '5px', }}>
                                {/* eslint-disable-next-line */}
                                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                    <img src="images/common/actionmenu.png" alt="logo" title={ACTION_ICON} style={{ width: '15px', height: '15px', borderRadius: '0' }} />
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0', }}>
                                    <div>
                                        <button className="dropdown-item badge badge-pill badge-warning text-center" data-toggle="tooltip" data-placement="bottom" title="Modify Sprint" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("modify_sprint")}>{EDIT}</button>
                                        <br />
                                        <button className="dropdown-item badge badge-pill badge-warning text-center" data-toggle="tooltip" data-placement="bottom" title="Delete Sprint" onClick={(event) => handleOpen("delete_sprint")} style={{ backgroundColor: "#203B5A", color: 'white' }} >{DELETE}</button>
                                        <br />
                                        {state.activeSprint.sprint_status !== 'commited' && state.currentTasks.length > 0 ?
                                            <button className="dropdown-item badge badge-pill badge-warning text-center" data-toggle="tooltip" data-placement="bottom" title="commit Sprint" onClick={(event) => handleOpen("commit_sprint")}>Commit {MODULE}</button> : (state.activeSprint.sprint_status === 'commited' && state.currentTasks.length > 0) ?
                                                <button className="dropdown-item badge badge-pill badge-warning text-center" data-toggle="tooltip" data-placement="bottom" title="uncommit Sprint" onClick={(event) => handleOpen("uncommit_sprint")}>Uncommit {MODULE}</button> : null}
                                        <br />
                                        {state.currentTasks.length > 0 ?
                                            <button className="dropdown-item badge badge-pill badge-warning text-center" data-toggle="tooltip" data-placement="bottom" title="Move Sprint to Archive" onClick={(event) => handleOpen("move_to_archive")} style={{ backgroundColor: "#5cb0bd", color: 'white' }} >Move To Archive</button> : null}
                                    </div>
                                </div>
                            </div>}
                            {state.activeSprint.sprint_status === 'commited' &&
                                <b style={{ marginTop: '5px', backgroundColor: '#E9967A', color: 'white', padding: '5px', borderRadius: '5px', height: '30px' }}>COMMITTED</b>
                            }

                        </div>
                        <div style={{ width: 250, marginLeft: 10 }}>
                            <Select
                                className="form-control"

                                placeholder={getSubStringId(getUser.user.corp, 3).concat('-', '   ', state.activeSprint.moduleDesc)}
                                value={sprintDetails.value}
                                maxMenuHeight={130}

                                onChange={(selectedOption) => {
                                    getCurrentSprint(dispatch, getUser.user, selectedOption.value)
                                    var title = { 'moduleId': selectedOption.value, 'moduleDesc': selectedOption.moduleName, 'startDate': selectedOption.startDate, 'targetDate': selectedOption.targetDate, 'sprint_status': selectedOption.sprint_status }
                                    dispatch(activeSprint(title))
                                    setStaticWord('')


                                }}
                                options={sprintDetails}

                            />
                        </div>
                    </div>
                </div> : null}

                <Board
                    className="react-kanban-column"
                    style={{ backgroundColor: 'red' }}
                    onCardDragEnd={handleCardMove}
                    renderCard={({ block_id,targettime, currenttime, backlogs, activeStatus, assignedTo, tasktitle, moduletitle, taskdescription, userstoryModuleId, assignedon, taskStatus, assignby, acceptanceCriteria, modifiedDate, ideano, projectitle, storyPoints, id, priorityLevel, assigntto, completeStatus, userstory_id, device_id, player_id }) => {
                        const [name] = assigntto !== null ? assigntto.split('@') : 'NA'
                        const data = { 'activeStatus': activeStatus, 'tasktitle': tasktitle, 'projectitle': projectitle, 'ideano': ideano, 'id': id, 'moduletitle': moduletitle, 'userstoryModuleId': userstoryModuleId, 'taskdescription': taskdescription, 'assignedon': assignedon, 'taskStatus': taskStatus, 'storyPoints': storyPoints, 'acceptanceCriteria': acceptanceCriteria, 'assigntto': assigntto, 'assignby': assignby, 'modifiedDate': modifiedDate, 'completeStatus': completeStatus, 'priorityLevel': priorityLevel, 'assignedTo': assignedTo, 'targetDate': targettime, 'currentDate': currenttime, 'userstory_id': userstory_id, 'backlogs': backlogs, 'device_id': device_id, 'player_id': player_id }
                        return (
                            <div className="card col-12 " style={(currenttime > targettime && completeStatus === 'pending' && targettime !== '0000-00-00' && targettime !== '0001-01-01') ? { backgroundColor: '#f58484' } : null}>
                                {/* <div className="card col-12 " > */}

                                <div className="d-flex col-12" style={{ borderWidth: 2, borderColor: 'red' }}>
                                    <div className="d-flex pt-2 " style={{ width: '750px' }} >
                                        <div><b style={{ cursor: 'pointer' }} onClick={(event) => handleOpen("taskInfo", data)}> {completeStatus === 'pending' ? <p style={{ color: 'black' }}>{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(userstory_id, 5)}{'-'}{tasktitle}</p> : <del> <p>{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(userstory_id, 5)}{'-'}{tasktitle}</p></del>}</b></div>
                                        <div>{block_id !== null ? <p style={{ backgroundColor: 'red', cursor: 'pointer', color: 'white', marginLeft: 10, padding: '3px', marginTop: 5, marginBottom: 5, width: '100px', textAlign: 'center' }} data-toggle="tooltip" data-placement="bottom">{getSubStringId(getUser.user.corp, 3)}{'-'}{getSubStringId(block_id, 5)}</p> : null}</div>

                                        <div>{targettime === '0001-01-01' ? <p style={{ backgroundColor: '#ADD8E6', cursor: 'pointer', color: 'white', marginLeft: 10, padding: '3px', marginTop: 5, marginBottom: 5, width: '100px', textAlign: 'center' }} data-toggle="tooltip" data-placement="bottom">{KANBAN}</p> : null}</div>
                                    </div>
                                    <div style={{ backgroundColor: '#81B622', cursor: 'pointer', color: 'white', marginLeft: 10, padding: '3px', marginTop: 5, marginBottom: 5, borderRadius: '90px', fontSize: '15px', width: '40px', textAlign: 'center', }} data-toggle="tooltip" data-placement="bottom" title={name}>{assigntto === null ? 'NA' : getSubStringId(name, 1)}</div>
                                    <p style={{ backgroundColor: '#5CDB95', cursor: 'pointer', color: 'white', marginLeft: 10, padding: '3px', marginTop: 5, marginBottom: 5, width: '100px', textAlign: 'center' }} data-toggle="tooltip" data-placement="bottom" title={ideano === null ? 'NA' : projectitle}>{ideano === null ? 'NA' : projectitle.substring(0, 11)}</p>
                                    <p style={{ backgroundColor: 'teal', color: 'white', marginLeft: 10, padding: '3px', marginTop: 5, marginBottom: 5, width: '25px' }} title={PRIORITY_LEVEL}>P:{priorityLevel}</p>
                                    <p style={{ backgroundColor: 'green', color: 'white', marginLeft: 10, marginTop: 5, marginBottom: 5, padding: '3px', borderRadius: '70px', width: '25px', textAlign: 'center' }} title={completeStatus === 'pending' ? "Days Spent" : "Hours Spent"}>
                                    {completeStatus === 'pending' && activeStatus === "0" ? getDays(userstory_id, state.workingDays) : getHours(userstory_id, state.workingHours)}</p>
                                    <p style={{ backgroundColor: '#6495ED', color: 'white', marginLeft: 10, marginTop: 5, marginBottom: 5, padding: '3px', borderRadius: '70px', width: '25px', textAlign: 'center' }} title={STORY_POINTS}>{storyPoints}</p>
                                    <div className="dropdown show" style={{ cursor: 'pointer', marginLeft: 15, marginRight: 15, padding: '5px', marginTop: 5 }}>
                                        {/* eslint-disable-next-line */}
                                        <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                            <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '15px', height: '15px', borderRadius: '0' }} />
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>

                                            <div>
                                                {(completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#F4A896", color: 'white' }} onClick={(event) => handleOpen("add_to_epic", data)}>{ADD_TO_EPIC}</button> : null}

                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }} onClick={(event) => handleOpen("taskInfo", data)}>{VIEW_DETAILS}</button>
                                                {(completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("modify", data)}>{EDIT}</button> : null}
                                                <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#9a7b78", color: 'white' }}><Link to={{ pathname: '/viewSubTasks', state: { id: userstory_id, title: tasktitle, moduleId: userstoryModuleId, ideaId: ideano, subTasksAssignedTo: assignedTo } }} style={{ color: 'white' }}>{VIEWSUBTASKS}</Link></button>
                                                {(completeStatus === 'pending' && backlogs === '1') ? <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436", color: 'white' }} onClick={(event) => handleOpen("addSubtask", data)}>{NEWSUBTASK}</button> : null}
                                                {(targettime === '0001-01-01') ? <button className="dropdown-item badge badge-pill badge-secondary text-center" style={{ backgroundColor: "#630436", color: 'white' }} onClick={(event) => handleOpen("addSubtask", data)}>{NEWSUBTASK}</button> : null}

                                                {(completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#3DD896", color: 'white' }} onClick={(event) => handleOpen("add_to_sprint", data)}>{ADD_TO_SPRINT}</button> : null}
                                                {(completeStatus === 'pending' && backlogs === '1' && activeStatus !== '-1') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#5cb0bd", color: 'white' }} onClick={(event) => handleOpen("changeStatus", data)}>{CHANGE_STATUS}</button> : null}
                                                {(completeStatus === 'completed') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "orange", color: 'white' }} onClick={(event) => handleOpen("reassign", data)}>{REASSIGN}</button> : null}
                                                {(completeStatus === 'pending' && backlogs === '1') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#F4A896", color: 'white' }} onClick={(event) => handleOpen("remove_from_sprint", data)}>Remove from {MODULE}</button> : null}
                                                {(backlogs !== '1') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#9a7b78", color: 'white' }} onClick={(event) => handleOpen("add_to_new_kanban", data)}>Add to {KANBAN}</button> : null}

                                            </div>

                                        </div>
                                    </div>
                                    <button type="button" style={{ backgroundColor: 'transparent', border: "0", marginLeft: 10, width: '10px', padding: "0" }} >
                                        {
                                            getMessagesCount(id, state.allMessages, getUser.user.empId)
                                        }
                                    </button>
                                </div>


                            </div>
                        )
                    }}
                >
                    {controlledBoard}
                </Board>
            </div>
        );
    }


//displayinng whole balckogs page
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
                                    {state.sprints.length > 0 ?
                                        <div>



                                            {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR && <h6 className="col-lg-12 row" >
                                                <div style={{ marginTop: -5, }}>
                                                    <input

                                                        type="image"
                                                        src="images/common/teams.png"
                                                        title={ALL_USERS}
                                                        style={{
                                                            textTransform: "capitalize",
                                                            padding: 1,
                                                            textAlign: "center",

                                                        }}
                                                        alt="logo"
                                                        width="25"
                                                        height="25"

                                                        onClick={() => setSearchWord('')}
                                                    />
                                                </div>

                                                {state.involvedEmployees.map((employee, index) => {
                                                    const input = employee.assignedTo;
                                                    const [name] = input.split('@');
                                                    return <Link onClick={() => setSearchWord(state.involvedEmployees[index].assignedToId)} style={{ textTransform: "capitalize", marginLeft: '10px', color: 'green' }} title={"Pending Points:" + employee.pending_points + " \n\nCompleted Points:" + employee.completed_points}>{name}-{employee.points}</Link>
                                                })}</h6>}
                                        </div> : null}

                                    <br /> <br />
                                    <div className="d-flex justify-content-end" style={{ marginTop: -30 }}>
                                        {/* <button type="button" class="btn btn-outline-primary" style={{ borderRadius: '20px', float:"right" }} 
                                    onClick={() => handleOpen("useTemplate")}>Use Template</button> */}
                                        {/* <Link to={{ pathname: '/templateView' }} ><button type="button" class="btn btn-outline-primary" style={{ borderRadius: '20px', float:"right" }} >
                                       Use Template
                                        </button></Link> */}
                                        <div style={{ marginTop: -5 }}>

                                            <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" title={NEWMAINTASK} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{NEWMAINTASK}</span></button>
                                            {
                                                open.action === "add" ? <AddMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                                /> : null
                                            }

                                        </div>
                                        <div class="input-group-prepend">
                                            <span class="text" style={{ color: 'black', marginTop: '3px', fontSize: '13px', paddingRight: 10 }}>Search:</span>
                                        </div>
                                        <input type="text" class="form-control" style={{ backgroundColor: 'transparent', borderBottom: '2px solid black', borderTop: '2px solid black', borderLeft: '12x solid black', borderRight: '2px solid black', marginTop: '-5px', width: 250, height: '35px' }}
                                            onChange={(event) => setSearchWord(event.target.value)}
                                        />
                                    </div>

                                    {state.isLoading ? <RootLoader /> :

                                        <ControlledBoard />

                                    }

                                    {
                                        open.action === "taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (open.action === "modify" || open.action === "reassign") ? <ModifyMainTask open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (open.action === "add_to_epic" || open.action === "add_to_sprint") ? <AddToSprint open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (open.action === "add_to_new_kanban") ? <AddToSprintKanban open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (open.action === "add_to_kanban" || open.action === "remove_from_sprint") ? <AddToKanban open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        open.action === "modify_sprint" ? <ModifyModule open={open.status} handleClose={handleModifySprint} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (open.action === "delete_sprint" || open.action === "move_to_archive") ? <DeleteSprint open={open.status} handleClose={handleDeleteClose} handleClose1={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                    {
                                        (open.action === "commit_sprint" || open.action === "uncommit_sprint") ? <DeleteSprint open={open.status} handleClose={handleModifySprint} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
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
                                        open.action === "changeStatus" ? <ChangeStatus open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


