import { useDispatch, useSelector } from "react-redux"
import React, { useReducer, useEffect, useState } from "react"
import { consolidatedToDoReducer, initialState } from "./reducer"
import { getConsolidatedTodo, getPrivateTodo } from "./network"
import {ACTIVE_SPRINT, CONSOLIDATED_TODO, MAINTASKNAME, PRIVATE_TODO ,STORY_POINTS, PRIORITY_LEVEL, AGILE_PROJECT_NAME, PROJECTNAME, ADD_PRIVATE_TODO, ACTION_ICON } from "../../Common/Headers"
import $ from 'jquery';
import SideBar from "../SquadChat/sideNav"
import TopNavWithOutProject from "../Utility/TopNav/topnav"
import { getSubStringId } from "../../Common/SubStringConvert"
import MainTaskInfo from "../../Common/TasksModals/mainTaskInfo"
// import ModifyTemplate from "../../Common/TasksModals/modifyTemplate"
// import DeleteTemplate from "../../Common/TasksModals/deleteTemplate"
// import EditTemplate from "../../Common/TasksModals/editTemplate"
import AddPrivateToDo from "../../Common/PrivateToDo/addPrivateToDo"
import AddToToDoProjects from "../../Common/PrivateToDo/addToDoToProject"
import ModifyPrivateToDo from "../../Common/PrivateToDo/modifyPrivateToDo"
import DeletePrivateToDo from "../../Common/PrivateToDo/deletePrivateToDo"
import { getRoleCount, setRoleCount, setToken } from "../../Common/LocalStorage"
import { setCurrentUser } from "../../Common/Actions"
import API from "../../Common/Network/API"
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom"
import moment from "moment"

export default function ConsolidatedTodoList() {
    const getUser = useSelector(state => state.auth)
    const dispatch1 = useDispatch();
    const [state, dispatch] = useReducer(consolidatedToDoReducer, initialState)
    const [searchWord, setSearchWord] = useState('')
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    const [redirect, setRedirect] = useState(false);
    const [sprintStauts, updateSprintStatus] = useState('');
    var date = moment();
    var currentDate = date.format('YYYY-MM-D');
    const pst = currentDate.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
      });
    useEffect(() => {
        getConsolidatedTodo(dispatch, getUser.user);
        getPrivateTodo(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (state.consolidatedToDo.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
    }, [state.consolidatedToDo])

    const SquadChangeStatus = async (project_id,project_name,sprintActiveStatus) => {
        try {
            const response = await API.post("squad_login.php", {
                username: getUser.user.empId,
                project_id: project_id,
                corp: project_name,
            }, {}, false);
            if (response.status === 'TRUE') {
                updateSprintStatus(sprintActiveStatus)//checking for Active sprint or not to redirects to sprint board/backlogs board
                setToken('auth', response.jwt) //store the token information  with exp
                const tokenDetails = jwt_decode(response.jwt);
                setRoleCount('roleCount', tokenDetails.data.roleCount)
                dispatch1(setCurrentUser(tokenDetails.data)); //store the user information
                setRedirect(true)
            } 
        } catch (error) {
            // UpdateUserSquad(getUser.user.corp)
        }
        // dispatch(isLoaded());
    }
    const handleOpen = (action, index ,data) => {
        var info
        setOpen({ status: true, action: action });
        if (action === "taskInfo") {
            var view_status = "taskInfo"
            info = {
                view: view_status,
                projectName: state.consolidatedToDo[index].project_name,
                epicId: state.consolidatedToDo[index].epic_id,
                moduleName: state.consolidatedToDo[index].sprint_desc,
                moduleId: state.consolidatedToDo[index].sprint_id,
                title: state.consolidatedToDo[index].story_title,
                description: state.consolidatedToDo[index].story_desc,
                taskId: state.consolidatedToDo[index].story_id,
                createdDate: state.consolidatedToDo[index].created_date,
                taskProgress: state.consolidatedToDo[index].story_status,
                storyPoints: state.consolidatedToDo[index].story_points,
                acceptanceCriteria: state.consolidatedToDo[index].acceptance_criteria,
                assignedTo: state.consolidatedToDo[index].assignedto,
                assignedBy: state.consolidatedToDo[index].assignedby,
                completedDate: state.consolidatedToDo[index].modified_date,
                completedStatus: state.consolidatedToDo[index].complete_status,
                targetDate: state.consolidatedToDo[index].target_date,
                device_id: state.consolidatedToDo[index].device_id
            }
        }
        else if (action === "addToProject") {
            var status = "backlog_addUser"
            info = { view: status, data:data }
        }else if (action === "modify") {
            status = "modify"
            info = { view: status, data:data }
        }
        else if (action === "delete") {
            status = "delete"
            info = { view: status, data:data }
        }
        else if (action === "complete") {
            status = "complete"
            info = { view: status, data:data }
        }
        setCardInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 })
        getPrivateTodo(dispatch, getUser.user);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 })
    };

    if (redirect) {
        if ((getRoleCount('roleCount') >= 1)) {
            return sprintStauts === "Active Sprint" ? <Redirect to="/sprints" /> : <Redirect to="/backlogs" />
        } else {
          return <Redirect to="/" />
        }
    }

    return (
        <div className="container-scroller">
            <TopNavWithOutProject />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card"> 
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title" style={{ paddingLeft: 10, paddingTop: 10 }}>{CONSOLIDATED_TODO}</h4>
                                        <div className="d-flex justify-content-end mb-3 mt-2">
                                            <div class="input-group-prepend">
                                                <span class="text" style={{ color: 'black', marginTop: '3px', fontSize: '13px', paddingRight: 10 }}>Search: </span>
                                            </div>
                                            <input type="text" class="form-control" style={{ backgroundColor: 'transparent', borderBottom: '2px solid black', borderTop: '2px solid black', borderLeft: '12x solid black', borderRight: '2px solid black', marginTop: '-5px', width: 250, height: '35px' }}
                                                onChange={(event) => setSearchWord(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                        {/* eslint-disable-next-line */}
                                        {state.consolidatedToDo.length > 0 ? state.consolidatedToDo.filter((val) => {
                                            if (searchWord === "") {
                                                return val
                                            } else if (val.story_title.toLowerCase().includes(searchWord.toLowerCase())) {
                                                return val
                                            }
                                        }).map((todo, index) => {
                                            let sprintActiveStatus= todo.sprint_target_date >= pst ? ACTIVE_SPRINT : `Not ${ACTIVE_SPRINT}`;
                                            return (
                                                <div className="col-12">
                                                    <div className="card col-12 " style={(todo.created_date > todo.target_date && todo.complete_status === 'pending' && todo.target_date !== '0000-00-00') ? { backgroundColor: '#f58484' } : null}>
                                                        <div className="container-fluid col-12 row" >
                                                            <div class="d-flex col-12">
                                                                <div class="mr-auto p-2" onClick={()=>{SquadChangeStatus(todo.project_id,todo.project_name, sprintActiveStatus)}}>
                                                                    <b style={{ width: '500px', cursor: 'pointer', paddingTop: 10 }} > <p style={{ width: 500, color: 'black', textTransform: 'capitalize' }}>{getSubStringId(todo.project_name, 3)}{'-'}{getSubStringId(todo.story_id, 5)}{'-'}{todo.story_title}</p> </b>
                                                                </div>
                                                                <p style={{ backgroundColor: '#8F00FF', cursor: 'pointer', color: 'white', marginLeft: 5, padding: '3px', marginTop: 5, marginBottom: 5, width: '130px', textAlign: 'center' }} data-toggle="tooltip" data-placement="bottom" onClick={()=>{SquadChangeStatus(todo.project_id,todo.project_name, sprintActiveStatus)}} >{sprintActiveStatus}</p>
                                                                <p style={{ backgroundColor: '#81B622', cursor: 'pointer', color: 'white', marginLeft: 5, padding: '3px', marginTop: 5, marginBottom: 5, width: '130px', textAlign: 'center' }} data-toggle="tooltip" data-placement="bottom" title={AGILE_PROJECT_NAME}>{todo.project_name.substring(0, 15)}</p>
                                                                {/* <div style={{ backgroundColor: '#81B622', cursor: 'pointer', color: 'white', marginLeft: 10, padding: '3px', marginTop: 5, marginBottom: 5, borderRadius: '90px', fontSize: '15px', width: '40px', textAlign: 'center', }} data-toggle="tooltip" data-placement="bottom">{todo.sprint_target_date >= pst ? 'Active Sprint' : "Not Active Sprint"}</div> */}
                                                                <p style={{ backgroundColor: '#5CDB95', cursor: 'pointer', color: 'white', marginLeft: 5, padding: '3px', marginTop: 5, marginBottom: 5, width: '130px', textAlign: 'center' }} data-toggle="tooltip" data-placement="bottom" title={PROJECTNAME}>{todo.epic_name === null ? 'NA' : todo.epic_name.substring(0, 15)}</p>
                                                                <p style={{ backgroundColor: 'teal', cursor: 'pointer', color: 'white', marginLeft: 5, padding: '3px', marginTop: 5, marginBottom: 5, width: '25px', textAlign: 'center' }} title={PRIORITY_LEVEL}>P:{todo.priority_level}</p>
                                                                <p style={{ backgroundColor: '#6495ED', cursor: 'pointer', color: 'white', marginLeft: 5, marginTop: 5, marginBottom: 5, padding: '3px', borderRadius: '70px', width: '25px', textAlign: 'center' }} title={STORY_POINTS}>{todo.story_points}</p>
                                                                <div className="dropdown show" style={{ cursor: 'pointer', marginLeft: 15, marginRight: 15, padding: '5px', marginTop: 5, float: "right" }}  onClick={(event) => handleOpen("taskInfo", index)}>
                                                                    <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '15px', height: '15px', borderRadius: '0' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : null}
                                    {
                                        open.action === "taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                        /> : null
                                    }
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title" style={{ paddingLeft: 10, paddingTop: 20 }}>{PRIVATE_TODO}</h4>
                                        <div style={{ paddingLeft: 10, paddingTop: 10 }}>
                                            <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" title={ADD_PRIVATE_TODO} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{ADD_PRIVATE_TODO}</span></button>
                                            {
                                                open.action === "add" ? <AddPrivateToDo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                                /> : null
                                            }
                                        </div>
                                    </div>
                                    {/* eslint-disable-next-line */}
                                    {state.privateToDo.length > 0 ? state.privateToDo.filter((val) => {
                                        if (searchWord === "") {
                                            return val
                                        } else if (val.story_title.toLowerCase().includes(searchWord.toLowerCase())) {
                                            return val
                                        }
                                    }).map((todo, index) => {
                                        return (
                                            <div className="col-12">
                                                <div className="card col-12 ">
                                                    <div className="container-fluid col-12 row" >
                                                        <div class="d-flex col-12"  >
                                                            <div class="mr-auto p-2">
                                                                <b style={{ width: '500px', cursor: 'pointer', paddingTop: 10, textTransform: 'capitalize' }} title={MAINTASKNAME}> {todo.personal_todo_status === "1" ? <p style={{ width: 500, color: 'black' }}>{todo.story_title}</p> : <del><p style={{ width: 500, color: 'black' }}>{todo.story_title}</p></del>} </b>
                                                            </div>
                                                            <p style={{ backgroundColor: 'teal', cursor: 'pointer', color: 'white', marginLeft: 5, padding: '3px', marginTop: 5, marginBottom: 5, width: '25px', textAlign: 'center' }} title={PRIORITY_LEVEL}>P:{todo.priority_level}</p>
                                                            <p style={{ backgroundColor: '#6495ED', cursor: 'pointer', color: 'white', marginLeft: 5, marginTop: 5, marginBottom: 5, padding: '3px', borderRadius: '70px', width: '25px', textAlign: 'center' }} title={STORY_POINTS}>{todo.story_points}</p>
                                                             <div className="dropdown show" style={{ cursor: 'pointer', marginLeft: 15, marginRight: 15, padding: '5px', marginTop: 5, float: "right" }}>
                                                                {/* eslint-disable-next-line */}
                                                                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                    <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '15px', height: '15px', borderRadius: '0' }} />
                                                                </a>
                                                                {todo.personal_todo_status === "1" ? 
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0'}}>
                                                                    <div>
                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }}
                                                                            onClick={(event) => handleOpen("addToProject", index, todo)}
                                                                        >Add to Project</button>
                                                                        <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor:'#FFC100', color: 'white' }} 
                                                                            onClick={(event) => handleOpen("modify",index, todo)}
                                                                            >Modify</button> 
                                                                        {getUser.user.empId === todo.assigned_by ?
                                                                            <button className="dropdown-item badge badge-pill badge-danger text-center" style={{ backgroundColor: "#76C54E",color:'white'}}
                                                                                onClick={(event) => handleOpen("complete", index, todo)}
                                                                            >Complete</button>
                                                                            : ""} 
                                                                        {getUser.user.empId === todo.assigned_by ?
                                                                            <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#FF4747", color: 'white' }}
                                                                                onClick={(event) => handleOpen("delete", index, todo)}
                                                                            >Delete</button>
                                                                            : ""}
                                                                    </div>
                                                                </div>:
                                                                 <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0'}}>
                                                                 <div>
                                                                     {getUser.user.empId === todo.assigned_by ?
                                                                         <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#FF4747", color: 'white' }}
                                                                             onClick={(event) => handleOpen("delete", index, todo)}
                                                                         >Delete</button>
                                                                         : ""}
                                                                 </div>
                                                             </div>}
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                        : null}
                                        {open.action === "addToProject" ?
                                            <AddToToDoProjects open={open.status} data={cardInfo} handleClose={handleClose} handleModalClose={handleModalClose}
                                            /> : null
                                        }
                                       {(open.action === "delete" || open.action === "complete") ?
                                            <DeletePrivateToDo open={open.status} data={cardInfo} handleClose={handleClose} handleModalClose={handleModalClose}
                                            /> : null
                                        }
                                        {open.action === "modify" ?
                                            <ModifyPrivateToDo open={open.status} data={cardInfo} handleClose={handleClose} handleModalClose={handleModalClose}
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