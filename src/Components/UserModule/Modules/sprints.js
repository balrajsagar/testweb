import React, { useEffect, useState, useReducer } from "react";
import Board from "react-trello";
import TopNav from "../Utility/TopNav";
import SideBar from "../Utility/SideNav";
import API from "../../Common/Network/API";
import { setCurrentUser } from '../../Common/Actions';
import { useSelector } from "react-redux";
import {
  getActive,
  getAllTaskMessages,
  getModules,
  getActiveSprints,
  getToDo,
  getRoadBlock,
  getDone,
  getInvolvedEmployees,
  updateUserStory,
  // addCommentUserStory,
  getCurrentSprintUserStories,
  getWorkingHours,
  getWorkingDays,
} from "./network";
import ChatBox from "../../Common/ChatMainTask";
import Alert from "../../Common/Alert";
import RoadBlock from "../../Common/RoadBlock";
import RootLoader from "../../Common/Loader/RootLoader";
import { ROADBLOCK, NEWMODULE, COMMENTS, ALL_USERS, CHAT, UPDATE_STORY, USER_STORY_PROGRESS, LIMITED_ACCESS_CONTRIBUTOR, MODULES, SCRUM_MASTER, PRODUCT_OWNER, PRIORITY_LEVEL } from "../../Common/Headers";
import RoadBlockModal from "../UserDashboard/roadblockModal";
import TaskInfo from "../UserDashboard/taskInfo";
import UpdateTask from "../UserDashboard/updateTask";
import { moduleReducer, initialState } from "./moduleReducer";
import { ACTIVE_SPRINT, SCRUM_BOARD, MAINTASK_DESCRIPTION, STORY_POINTS, MAINTASK, ACCEPTANCE_CRITERIA, DEFINITION_OF_DONE, PROJECTNAME, ASSIGNED_DATE, PROJECT_COMPLETED_DATE } from '../../Common/Headers';

import Moment from "moment";
import Select from "react-select";
import {
  sprintSelected,
  activeSprint,
  activeUserStory,
  roadblockFilter,
  todoFilter,
  doingFilter,
  doneFilter,
} from "./actions";
import store from "../../Common/Store";
import { Link } from "react-router-dom";
import AddModule from "../../Common/Modules/addModule";
import { getSubStringId } from "../../Common/SubStringConvert";
import ChangeUserstoryStatus from "./changeUserstoryStatus";
import convertPSTtoLocalTime from "../../Common/convertPSTtoLocalTime";
import { role_array } from '../../Common/getDefaultRoles';
import { getToken, clearToken } from "../../Common/LocalStorage";
import jwt_decode from "jwt-decode";
import axios from 'axios'

const CustomCard = ({
  onClick,
  className,
  laneId,
  title,
  id,
  us_id,
  story_desc,
  subTaskDesc,
  status,
  story_status,
  mainTaskid,
  activeStatus,
  dependencyId,
  timeLeft,
  extraHours,
  mainTaskTitle,
  taskDesc,
  ideaTitle,
  epic_name,
  moduleDesc,
  story_points,
  priority_level,
  acceptanceCriteria,
  assignedDate,
  modifiedDate,
  targetDate,
  complete_status,
  assignedto,
  blockedId,
  userStoryId,
  cardStyle,
  body,
  dueOn,
  cardColor,
  description,
  label,
  escalationText,
  tags,
  showDeleteButton,
  onDelete,
  blocked_id,
  story_id,
  task_end_date,
}) => {
  const [name] = assignedto.split("@");
  const [chatOpen, setChatOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState({ status: false });
  const [cardInfo, setCardInfo] = useState();
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(moduleReducer, initialState);
  const getUser = useSelector((state) => state.auth);
  // eslint-disable-next-line
  const info = useSelector((state) => state.subtask);
  const sprint = useSelector((state) => state.sprint); //updated with sprintId for user stories updated in sprint cycle -->GNK --> Version1.0.6.03
  //For Open Chat
  const handleOpenChat = (action, id, us_id, sno) => {
    setChatOpen(true);
    // updateChat(sno,dispatch,getUser.user)
    var info = { action: action, id: us_id, sno: sno };
    setCardInfo(info);
  };
  const priorityColorCodes = ['', '#FA8072', '#0BDA51', '#FFAA33', '#4682B4']
  //for Update Task

  const handleOpenUpdate = (
    title,
    description,
    id,
    mainTaskId,
    dependencyId,
    sprintId
  ) => {
    //updated with sprintId for user stories updated in sprint cycle -->GNK --> Version1.0.6.03
    setUpdateOpen(true);
    var info = {
      title: title,
      description: description,
      id: id,
      mainTaskId: mainTaskId,
      dependencyId: dependencyId,
      sprintId: sprintId,
    };
    setCardInfo(info);
  };
  const handleChatClose = () => {
    setChatOpen(false);
    getAllTaskMessages(dispatch, getUser.user);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  //for Update Task
  const handleOpenTaskInfo = (
    title,
    description,
    us_id,
    id,
    mainTaskId,
    dependencyId,
    timeLeft,
    complete_status,
    extraHours,
    mainTaskTitle,
    taskDesc,
    epic_name,
    laneId,
    moduleDesc,
    story_points,
    acceptanceCriteria,
    assignedDate,
    targetDate,
    modifiedDate,
    action,
    task_end_date
  ) => {
    setInfoOpen({ status: true, action: action });
    var info = {
      title: title,
      description: description,
      us_id: us_id,
      id: id,
      mainTaskId: mainTaskId,
      mainTaskTitle: mainTaskTitle,
      dependencyId: dependencyId,
      status: complete_status,
      timeLeft: timeLeft,
      extraHours: extraHours,
      taskDesc: taskDesc,
      ideaTitle: epic_name,
      laneId: laneId,
      moduleDesc: moduleDesc,
      storyPoints: story_points,
      acceptanceCriteria: acceptanceCriteria,
      assignedDate: assignedDate,
      targetDate: targetDate,
      modifiedDate: modifiedDate,
      action: action,
      openStatus: true,
      task_end_date: task_end_date
    };
    setCardInfo(info);
    store.dispatch(activeUserStory([info]));
  };
  const handleTaskInfoClose = () => {
    setInfoOpen(false);
  };
  const handleModalClose = () => {
    setChatOpen(false);
    getAllTaskMessages(dispatch, getUser.user); //For Chat Auto Refresh
  };
  // const getMessagesCount = (id, us_id, msg, empId) => {
  //   const msgCount = msg
  //     .filter(
  //       (message) =>
  //         message.readBy.split(",").indexOf(empId) === -1 &&
  //         message.messagedBy !== empId &&
  //         message.groupId === id
  //     )
  //     .map((messages, i) => {
  //       // eslint-disable-next-line
  //       return i, messages;
  //       // eslint-disable-next-line
  //     });
  // for getting unread message count
  const getMessagesCount = (id, us_id, msg, empId) => {
    const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1
      && message.messagedBy !== empId && message.groupId === us_id).map((messages, i) => {
        // eslint-disable-next-line
        return i, messages
      })
    return (
      <i>
        {/* {msgCount.length > 0 ? msgCount.length : null} */}
        {msgCount.length > 0 ? (
          <div className="row">
            <img
              src="images/common/chat.svg"
              alt="logo"
              title={CHAT}
              style={{ width: "20px", height: "20px", marginLeft: "-8px" }}
              onClick={() => handleOpenChat("maintask", id, us_id, msgCount)}
            />
            <span style={{ color: "red", fontWeight: "bold" }}>
              {msgCount.length}
            </span>
          </div>
        ) : (
          <div className="row">
            <img
              src="images/common/chat.svg"
              alt="logo"
              title={CHAT}
              style={{ width: "20px", height: "20px", marginLeft: "-8px" }}
              onClick={() => handleOpenChat("maintask", id, us_id, msgCount)}
            />
          </div>
        )}
      </i>
    );
  };

  const getHours = (id, timesheet) => {
    const hoursCount = timesheet.filter(list => list.story_id === id).map((list) => {
      return list.sum;
    });
    if (hoursCount[0] > 0) {
      return Math.round(hoursCount[0]);
    }
    else {
      return 0;
    }
  };

  const getDays = (id, count_days_no_weekend) => {
    const daysCount = count_days_no_weekend.filter(list => list.story_id === id).map((list) => {
      return list.count_days_no_weekend;
    });
    if (daysCount[0] > 0) {
      return Math.round(daysCount[0]);
    }
    else {
      return 0;
    }
  };

  return (
    <div
      onClick={onClick}
      // style={cardStyle}
      style={{
        border: "0.2px solid grey",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: 2,
      }}
    // className={title === "Dispose Garbage" ? "bg-white" :"bg-primary"}
    >
      <header
        style={{
          display: "flex",
          color: cardColor,
          width: 260,
          padding: 0,
        }}
      >
        {laneId === "RoadBlock" ? (
          <div
            style={{
              fontSize: 8,
              fontWeight: "bold",
              cursor: "pointer",
              flex: 1,
            }}
            className="column "
            onClick={() =>
              handleOpenTaskInfo(
                title,
                story_desc,
                us_id,
                id,
                mainTaskid,
                dependencyId,
                timeLeft,
                complete_status,
                extraHours,
                mainTaskTitle,
                taskDesc,
                epic_name,
                laneId,
                moduleDesc,
                story_points,
                acceptanceCriteria,
                assignedDate,
                targetDate,
                modifiedDate,
                "roadblockInfo",
                task_end_date
              )
            }
          >
            <div className="row d-flex justify-content-between">
              <div className="row pl-4">
                <u className="text-dark">
                  {getSubStringId(getUser.user.corp, 3)} -{" "}
                  {getSubStringId(id, 5)}{" "}
                </u>
                {epic_name != null ? (
                  <p
                    className="mb-0 ml-4"
                    style={{ marginRight: "2px", color: "orange" }}
                    data-toggle="tooltip"
                    data-placement="left"
                    title={epic_name}
                  >
                    {getSubStringId(epic_name, 5)}
                  </p>
                ) : null}
              </div>
              <div>
                <p
                  className="mr-4"
                  style={{ marginRight: "2px", color: "green" }}
                >
                  {name}
                </p>
              </div>
            </div>
            <p className="text" style={{ width: 250 }}>
              {title}
            </p>
          </div>
        ) : (
          <div
            style={{
              fontSize: "30",
              fontWeight: "bold",
              cursor: "pointer",
              flex: 1,
            }}
            className="column"
            onClick={() =>
              handleOpenTaskInfo(
                title,
                subTaskDesc,
                us_id,
                id,
                mainTaskid,
                dependencyId,
                timeLeft,
                complete_status,
                extraHours,
                mainTaskTitle,
                taskDesc,
                epic_name,
                laneId,
                moduleDesc,
                story_points,
                acceptanceCriteria,
                assignedDate,
                targetDate,
                modifiedDate,
                "taskInfo",
                task_end_date
              )
            }
          >
            <div className="row d-flex justify-content-between">
              <div className="row pl-4">
                <u className="text-dark">
                  {getSubStringId(getUser.user.corp, 3)} -{" "}
                  {getSubStringId(id, 5)}{" "}
                </u>
                {epic_name != null ? (
                  <p
                    className="mb-0 ml-4"
                    style={{ color: "orange" }}
                    data-toggle="tooltip"
                    data-placement="left"
                    title={epic_name}
                  >
                    {getSubStringId(epic_name, 5)}
                  </p>
                ) : null}
              </div>
              <div>
                <p
                  className="mr-4 mb-0"
                  style={{ marginRight: "2px", color: "green" }}
                >
                  {name}
                </p>
              </div>
            </div>
            <p className="text mb-0" style={{ width: 250 }}>
              {title}
            </p>
          </div>
        )}

        {/* <div style={{ fontSize: 11 }}>{dueOn}</div>
        {showDeleteButton && <button onClick={clickDelete} />} */}
      </header>
      <div
        className="column"
        style={{
          fontSize: 12,
          color: "#BD3B36",
          margin: 0,
          padding: 0,
          flex: 1,
        }}
      >
        {/* {laneId === "RoadBlock" ? <div style={{ color: '#4C4C4C', fontWeight: 'bold', width: '260px', overflowWrap: "break-word" }}>{taskDesc}</div> : <div style={{ color: '#4C4C4C', fontWeight: 'bold', width: '260px', overflowWrap: "break-word" }}>{subTaskDesc}</div>} */}
        <div className="row d-flex justify-content-between">
          <div className="row ml-2">
            {/* <p style={{ marginTop: 10, textAlign: 'right', color: cardColor, fontSize: 15, fontWeight: 'bold' }}>{taskStatus}</p> */}

            {/* <button style={{ border: '0', width: '10px', height: '40px', backgroundColor: 'transparent',  }} type="button" onClick={() => handleOpenChat("subtask", id)}> <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px',marginLeft:"-8px" }} /></button> */}
            <button
              type="button"
              style={{
                border: "0",
                width: "8px",
                height: "30px",
                backgroundColor: "transparent",
              }}
            >
              {getMessagesCount(
                id,
                us_id,
                info.allMessages,
                getUser.user.empId
              )}
            </button>
            {complete_status === "pending" && activeStatus !== "0" ? (
              <button
                style={{
                  border: "0",
                  width: "8px",
                  height: "30px",
                  backgroundColor: "transparent",
                }}
                type="button"
                onClick={() =>
                  handleOpenUpdate(
                    title,
                    subTaskDesc,
                    id,
                    mainTaskid,
                    dependencyId,
                    sprint.activeSprint.moduleId
                  )
                }
              >
                <img
                  src="images/common/update.svg"
                  alt="logo"
                  title={UPDATE_STORY}
                  style={{ width: "17px", height: "20px", marginLeft: "-17px" }}
                />
              </button>
            ) : null}
            {/*UserStory Comment  Box start GNK -->01 version 1.0.6 Start */}

            <button
              style={{
                border: "0",
                width: "8px",
                height: "30px",
                backgroundColor: "transparent",
              }}
              type="button"
              onClick={() =>
                handleOpenTaskInfo(
                  title,
                  subTaskDesc,
                  us_id,
                  id,
                  mainTaskid,
                  dependencyId,
                  timeLeft,
                  complete_status,
                  extraHours,
                  mainTaskTitle,
                  taskDesc,
                  epic_name,
                  laneId,
                  moduleDesc,
                  story_points,
                  acceptanceCriteria,
                  assignedDate,
                  targetDate,
                  modifiedDate,
                  "commentInfo",
                  task_end_date
                )
              }
            >
              <img
                src="images/common/comments.svg"
                alt="logo"
                title={COMMENTS}
                style={{ width: "20px", height: "25px", marginLeft: "-17px" }}
              />
            </button>

            {/* {complete_status === "completed" ? (
              <button
                style={{
                  border: "0",
                  width: "8px",
                  height: "30px",
                  backgroundColor: "transparent",
                }}
                type="button"
                onClick={() =>
                  handleOpenTaskInfo(
                    title,
                    subTaskDesc,
                    us_id,
                    id,
                    mainTaskid,
                    dependencyId,
                    timeLeft,
                    complete_status,
                    extraHours,
                    mainTaskTitle,
                    taskDesc,
                    epic_name,
                    laneId,
                    moduleDesc,
                    story_points,
                    acceptanceCriteria,
                    assignedDate,
                    targetDate,
                    modifiedDate,
                    "commentInfo"
                  )
                }
              >
                <img
                  src="images/common/comments.svg"
                  alt="logo"
                  style={{ width: "20px", height: "25px", marginLeft: "-17px" }}
                />
              </button>
            ) : null} */}
            {/*UserStory Comment  Box start GNK -->01 version 1.0.6 End */}
            {activeStatus !== "0" ? (
              <div
                className="d-flex justify-content-center mr-1"
                title={USER_STORY_PROGRESS}
                style={{
                  backgroundColor: "#EDCB77",
                  width: 25,
                  height: 20,
                  cursor: 'pointer',
                  textAlign: "center",
                  justifyContent: "center",
                  marginTop: '0.45rem',
                  marginLeft: '-0.25rem',
                }}
              >
                {" "}
                <i
                  className="text"
                  style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "bold",
                    paddingTop: 3,
                  }}
                >
                  {story_status}%
                </i>{" "}
              </div>
            ) : null}
            {laneId !== "RoadBlock" ? (
              blockedId != null ? (
                <p
                  className="mt-2 ml-1"
                  style={{ marginRight: "2px", color: "red" }}
                  data-toggle="tooltip"
                  data-placement="left"
                  title={getSubStringId(userStoryId, 5)}
                >
                  {getSubStringId(getUser.user.corp, 3)}-
                  {getSubStringId(userStoryId, 5)}
                </p>
              ) : null
            ) : null}
          </div>
          <div style={{ display: 'inline-flex' }}>
            <div
              className="d-flex justify-content-center mt-2 mr-2"
              style={{ backgroundColor: priorityColorCodes[priority_level], width: 20, height: 20, cursor: 'pointer' }}
              title={PRIORITY_LEVEL}
            >
              {" "}
              <i
                className="text"
                style={{
                  color: "white",
                  fontSize: 10,
                  fontWeight: "bold",
                  paddingTop: 3,
                }}
              >
                {priority_level}{" "}
              </i>
            </div>
            <div
              className="d-flex justify-content-center mt-2 mr-2"
              style={{ backgroundColor: 'green', width: 20, height: 20, cursor: 'pointer' }}
              title={complete_status === "pending" && activeStatus === "0" ? "Days Spent" : "Hours Spent"}
            >
              {" "}
              <i
                className="text"
                style={{
                  color: "white",
                  fontSize: 10,
                  fontWeight: "bold",
                  paddingTop: 3,
                }}
              >
                {complete_status === "pending" && activeStatus === "0" ? getDays(id, info.workingDays) : getHours(id, info.workingHours)}
              </i>
            </div>
            <div
              className="d-flex justify-content-center mt-2 mr-2"
              style={{ backgroundColor: "#6DAE8C", width: 20, height: 20, cursor: 'pointer' }}
              title={STORY_POINTS}
            >
              {" "}
              <i
                className="text"
                style={{
                  color: "white",
                  fontSize: 10,
                  fontWeight: "bold",
                  paddingTop: 3,
                }}
              >
                {story_points}{" "}
              </i>
            </div>
          </div>
        </div>
        {tags && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            {/* {tags.map(tag => (
                <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
              ))} */}
          </div>
        )}
      </div>
      {chatOpen ? (
        <ChatBox
          open={chatOpen}
          handleClose={handleChatClose}
          data={cardInfo}
          handleModalClose={handleModalClose}
        />
      ) : null}
      {updateOpen ? (
        <UpdateTask
          open={updateOpen}
          handleClose={handleUpdateClose}
          data={cardInfo}
          handleModalClose={handleModalClose}
        />
      ) : null}
      {infoOpen.status && infoOpen.action === "commentInfo" ? (
        <TaskInfo
          open={infoOpen}
          handleClose={handleTaskInfoClose}
          data={cardInfo}
          handleModalClose={handleModalClose}
        />
      ) : null}
      {infoOpen.status && infoOpen.action === "roadblockInfo" ? (
        <RoadBlockModal
          open={infoOpen}
          handleClose={handleTaskInfoClose}
          data={cardInfo}
          handleModalClose={handleModalClose}
        />
      ) : null}
    </div>
  );
};

export default function UserSprints() {
  const openmodal = {
    backgroundColor: "white",
    // height: 570,
    // marginLeft: "-10px",
    // marginRight: "-10px",
    // width: 1000,
    // margin: 20,
  };

  const closemodal = {
    backgroundColor: "white",
    // height: 570,
    // marginLeft: "-10px",
    // marginRight: "-10px",
    // margin: 20,
  };

  const [state, dispatch] = useReducer(moduleReducer, initialState);
  const getUser = useSelector((state) => state.auth);
  // const loaderStatus = useSelector(state => state.loading.status)
  const [open, setOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState();
  const [openModule, setOpenModule] = useState({ status: false, index: 0 });
  const [moduleInfo, updateModuleInfo] = useState();
  //   const [open, setOpen] = useState({ status: false, index: 0 })
  //   const dispatch = useDispatch();
  useEffect(() => {
    // fun()
    checkToken()
    // eslint-disable-next-line
  }, [])
  const checkToken = () => {
    if (getToken('auth')) {
      const tokenDetails = jwt_decode(getToken('auth'));
      store.dispatch(setCurrentUser(tokenDetails.data)); //store the user information
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (tokenDetails.exp < currentTime) {
        localStorage.removeItem('auth');
        // Remove auth header for future requests
        delete axios.defaults.headers.common['x-access-token'];
        // Set current user to empty object {} which will set isAuthenticated to false
        clearToken();
        localStorage.removeItem('persist:main-root');
        store.dispatch(setCurrentUser({}));
        window.location.href = "/";
      }
    }
  }
  const fun = () => {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
  }
  useEffect(() => {
    getActiveSprints(dispatch, getUser.user);
    getModules(dispatch, getUser.user);
    // getToDo(dispatch, getUser.user); //for todo and doing information
    // getRoadBlock(dispatch, getUser.user);
    // getDone(dispatch, getUser.user);
    getAllTaskMessages(dispatch, getUser.user);
    getWorkingHours(dispatch, getUser.user);
    getWorkingDays(dispatch, getUser.user);
    store.dispatch(activeUserStory([{ openStatus: false }]));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      getActiveSprints(dispatch, getUser.user, false);// for active sprint user stories
      getWorkingHours(dispatch, getUser.user, false);
      getWorkingDays(dispatch, getUser.user, false);
      // getModules(dispatch, getUser.user,false);
      getAllTaskMessages(dispatch, getUser.user, false);//messages
      // store.dispatch(activeUserStory([{ openStatus: false }]));
    }, 60 * 3000);
    return () => {
      clearInterval(timer); // Return a function to clear the timer so that it will stop being called on unmount
    }
    // eslint-disable-next-line     
  }, []);
  // console.log(state.sprint)
  const info = useSelector((state) => state.sprint);
  // console.log(info.workingHours);
  var data = {
    lanes: [
      {
        id: "ToDo",
        title: "To Do",
        style: {
          width: 310,
          // height: 550,
          fontSize: 15,
          fontWeight: "bold",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "3px 3px 20px 10px #f1f1f1",
          margin: "7px",
        },
        cards: info.todoFilter,
      },
      {
        id: "Doing",
        title: "In Progress",
        // "label": "10/20",
        style: {
          width: 310,
          // height: 550,
          fontSize: 15,
          fontWeight: "bold",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "3px 3px 20px 10px #f1f1f1",
          margin: "7px",
        },
        cards: info.doingFilter,
      },
      {
        id: "RoadBlock",
        title: ROADBLOCK,
        // "label": "0/0",
        style: {
          width: 310,
          // height: 550,
          fontSize: 15,
          fontWeight: "bold",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "3px 3px 20px 10px #f1f1f1",
          margin: "7px",
        },
        cards: info.roadblockFilter,
      },
      {
        id: "Completed",
        title: "Done",
        style: {
          // width: 310,
          // height: 550,
          fontSize: 15,
          fontWeight: "bold",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "3px 3px 20px 10px #f1f1f1",
          margin: "7px",
        },
        // "label": "2/5",
        cards: info.doneFilter,
      },
    ],
  };
  // console.log(info.todo)
  function handleCardMove(from, to, data, sprintId) {
    //updated with "sprintId" for user stories updated in sprint cycle -->GNK --> Version1.0.6.03
    // setOpen(true);
    // console.log("story_id" + data);
    const check = from + to;
    // console.log("sprint_id" + sprintId);
    var message;
    if (check === "ToDoDoing") {
      UserStatus('Available')
      message = `${MAINTASK} in progress`;
      getActive(
        dispatch,
        getUser.user,
        data,
        sprintId,
        handleClose,
        handleOpen,
        message
      ); //updated with "sprintId" for user stories updated in sprint cycle -->GNK --> Version1.0.6.03
      // addCommentUserStory(dispatch, getUser.user, data, message, "1");
    } else if (check === "ToDoRoadBlock") {
      UserStatus('Available')
      Alert("warning", "You are not able to add RoadBlock from To Do");
      // Alert("warning", "ToDoRoadBlock"+from + to + data);
    } else if (check === "DoingRoadBlock") {
      UserStatus('Available')
      message = `${MAINTASK} is blocked`;
      var info = { taskId: data, message: message };
      setCardInfo(info);
      setOpen(true);
    } else if (check === "DoingCompleted") {
      UserStatus('Available')
      message = `${MAINTASK} is completed`;
      updateUserStory(dispatch, getUser.user, data, sprintId, handleClose, message); //updated with sprintId for user stories updated in sprint cycle -->GNK --> Version1.0.6.03
      // addCommentUserStory(dispatch, getUser.user, data, message, "2");
    } else {
      // Alert("warning", from + to + data);
    }
  }
  const handleOpen = (action, data) => {
    var info;
    setOpenModule({ status: true, action: action });

    if (action === "addSprint") {
      info = { action: action };
    } else {
      info = {
        action: action,
        inprogress: data.inprogressStoryId,
        todo: data.todoStoryId,
        currentSprint: data.currentSprint,
        assignedTo: data.assignedTo,
        projectName: data.projectName,
        story_title: data.story_title,
        inprogress_story_title: data.inprogress_story_title
      }
    }

    updateModuleInfo(info);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenModule({ status: false });
    getCurrentSprintUserStories(
      dispatch,
      getUser.user,
      info.activeSprint.moduleId
    ); //updated with "sprintId" and method name changed from getActiveSprint() for user stories updated in sprint cycle -->GNK --> Version1.0.6.03
    getModules(dispatch, getUser.user);
    getAllTaskMessages(dispatch, getUser.user);
  };
  const handleModalClose = () => {
    setOpen(false);
    setOpenModule({ status: false });
  };
  // console.log(state.modules)
  var sprints = [];
  state.modules.map((module) => {
    return sprints.push({
      value: module.moduleId,
      label: module.moduleDesc,
      assignbyId: module.assignbyId,
      average: module.average,
      createdBy: module.createdBy,
      created_on: module.created_on,
      ideaId: module.ideaId,
      ideaTitle: module.ideaTitle,
      moduleDesc: module.moduleDesc,
      moduleId: module.moduleId,
      startDate: module.startDate,
      sprint_status: module.sprint_status,
      targetDate: module.targetDate,
      task_end_date: module.task_end_date
    });
  });
  const selectSprint = (selectedOption) => {
    // console.log(selectedOption.moduleId)
    dispatch(sprintSelected(selectedOption.value));
    store.dispatch(activeSprint(selectedOption));
    getToDo(dispatch, getUser.user, selectedOption.moduleId);
    getAllTaskMessages(dispatch, getUser.user);
    getRoadBlock(dispatch, getUser.user, selectedOption.moduleId);
    getDone(dispatch, getUser.user, selectedOption.moduleId);
    getInvolvedEmployees(dispatch, getUser.user, selectedOption.moduleId);
    store.dispatch(activeUserStory([{ openStatus: false }]));
  };
  const allUserBacklogs = () => {
    store.dispatch(todoFilter(info.todo));
    store.dispatch(doingFilter(info.doing));
    store.dispatch(doneFilter(info.done));
    store.dispatch(roadblockFilter(info.roadblock));
    store.dispatch(activeUserStory([{ openStatus: false }]));
  };

  const UserStatus = async (status) => {
    try {
      const response = await API.post("user_status.php", {
        corp: getUser.user.corp,
        action: 'update_status',
        status: status,
        empId: getUser.user.empId
      }, {}, false);
      if (response.status === 'True') {

        getUser.user.empStatus = status
        dispatch(setCurrentUser(getUser.user));

      } else {
        dispatch(setCurrentUser(getUser.user));
      }
    } catch (error) {
      // Alert('error',error.message)
    }
    // dispatch(isLoaded());
  }
  const userBacklogs = (assignedToId, moduleId) => {
    // console.log(assignedToId + "   " + moduleId)
    var todoList = [];
    var doingList = [];
    var doneList = [];
    var roadBlockList = [];
    store.dispatch(activeUserStory([{ openStatus: false }]));
    // info.todo.map((todo) => {
    //   console.log(assignedToId)
    //   return todo.assignedTo === assignedToId ? todoList.push(todo) : [];
    // });
    // info.doing.map((doing) => {
    //   return doing.assignedTo === assignedToId ? doingList.push(doing) : [];
    // });
    // info.done.map((done) => {
    //   return done.assignedTo === assignedToId ? doneList.push(done) : [];
    // });
    // info.roadblock.filter((roadblock) => {
    //   return roadblock.assignedTo === assignedToId
    //     ? roadBlockList.push(roadblock)
    //     : [];
    // });

    todoList = info.todo.filter((todo) => (todo.assignedTo === assignedToId));
    doingList = info.doing.filter((doing) => (doing.assignedTo === assignedToId));
    doneList = info.done.filter((done) => (done.assignedTo === assignedToId));
    roadBlockList = info.roadblock.filter((roadblock) => (roadblock.assigned_to === assignedToId));
    store.dispatch(todoFilter(todoList));
    store.dispatch(doingFilter(doingList));
    store.dispatch(doneFilter(doneList));
    store.dispatch(roadblockFilter(roadBlockList));
  };
  // console.log(info.activeUserStory[0])
  return (
    <div className="container-scroller">
      <TopNav />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel">
          {/* <div className="content-wrapper"> */}
          {state.modules.length > 0 ? (
            <div style={{ flexDirection: "row" }}>
              <div className="col-12 row p-2">
                <div
                  className="col-6"
                  style={{
                    overflowWrap: "break-word",
                    color: "blue", marginTop: '5px',
                    backgroundColor: "transparent",
                  }}

                >
                  <b>
                    {getSubStringId(getUser.user.corp, 3)}{" "}
                    {info.activeSprint.moduleDesc}
                  </b>{" "}
                  [{Moment(info.activeSprint.startDate).format("MM.DD.YYYY")}-
                  {Moment(info.activeSprint.targetDate).format("MM.DD.YYYY")}] -
                  {SCRUM_BOARD}
                  {info.activeSprint.sprint_status === 'commited' &&
                    <b style={{ marginLeft: '10px', marginTop: '5px', backgroundColor: '#E9967A', color: 'white', padding: '5px', borderRadius: '5px', height: '25px' }}>COMMITTED</b>
                  }
                </div>

                <label className="p-2">{MODULES}</label>
                <Select
                  className="form-control col-3"
                  style={{ width: 10, boarderRadius: 2 }}
                  // placeholder="Select Active Points"
                  placeholder={info.activeSprint.moduleDesc}
                  value={sprints.value}
                  onChange={(selectedOption) => selectSprint(selectedOption)}
                  options={sprints}
                />
                <div className="mb-2 ">
                  {(role_array[getUser.user.role] === SCRUM_MASTER || role_array[getUser.user.role] === PRODUCT_OWNER) && <button
                    style={{ backgroundColor: "transparent", border: "0" }}
                    type="button"
                    onClick={() => handleOpen("addSprint", "")}
                  >
                    {" "}
                    <img
                      src="images/common/add.png"
                      alt="logo"
                      title={NEWMODULE}
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span className="m-1">{NEWMODULE}</span>
                  </button>}
                  {openModule.action === "addSprint" ? (
                    <AddModule
                      open={openModule.status}
                      handleClose={handleClose}
                      data={moduleInfo}
                      handleModalClose={handleModalClose}
                    />
                  ) : null}
                </div>
              </div>

              {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR && <h6 className="col-lg-12 row" >
                <div style={{ marginTop: -25, marginLeft: 10 }}>
                  <input
                    type="image"
                    src="images/common/teams.png"
                    title={ALL_USERS}
                    style={{
                      textTransform: "capitalize",
                      padding: 1,
                      textAlign: "center",
                      marginTop: 20,
                    }}
                    alt="logo"
                    width="25"
                    height="25"
                    onClick={() => allUserBacklogs()}
                  />
                </div>
                {state.involvedEmployees.map((involved, index) => {
                  const input = involved.assignedTo;
                  const [name] = input.split("@");
                  return (
                    <Link
                      style={{
                        textTransform: "capitalize",
                        padding: "1px",
                        textAlign: "center",
                        marginLeft: "10px",
                        color: "green",
                      }}
                      onClick={() =>
                        userBacklogs(
                          involved.assignedToId,
                          info.activeSprint.moduleId
                        )
                      }
                      title={"Pending Points:" + involved.pending_points + " \n\nCompleted Points:" + involved.completed_points}
                    >
                      {name}-{involved.points}{" "}
                    </Link>
                  );
                })}{" "}
              </h6>}
            </div>
          ) : (
            <div className="col-12 row p-2">
              <h5
                className="col-6"
                style={{
                  overflowWrap: "break-word",
                  color: "blue",
                  backgroundColor: "transparent",
                }}
              >
                {state.isLoading || info.activeSprint.length !== 0 ? null : <div style={{ marginLeft: '50%', marginTop: '30%' }}>
                  {/* No Active Sprint */}
                  <img
                    src="images/common/nosprint.png"
                    alt="logo"
                    style={{}}
                  />
                  <b>No {ACTIVE_SPRINT}</b>
                </div>
                }
              </h5>

              <label className="p-2">{MODULES}</label>
              <Select
                className="form-control col-3"
                style={{ width: 10, boarderRadius: 2 }}
                // placeholder="Select Active Points"
                placeholder={info.activeSprint.moduleDesc}
                value={sprints.value}
                onChange={(selectedOption) => selectSprint(selectedOption)}
                options={sprints}
              />
              <div className="mb-2 ">
                {(role_array[getUser.user.role] === SCRUM_MASTER || role_array[getUser.user.role] === PRODUCT_OWNER) && <button
                  style={{ backgroundColor: "transparent", border: "0" }}
                  type="button"
                  onClick={() => handleOpen("addSprint", "")}
                >
                  {" "}
                  <img
                    src="images/common/add.png"
                    title={NEWMODULE}
                    alt="logo"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span className="m-1">{NEWMODULE}</span>
                </button>}
                {openModule.action === "addSprint" ? (
                  <AddModule
                    open={openModule.status}
                    handleClose={handleClose}
                    data={moduleInfo}
                    handleModalClose={handleModalClose}
                  />
                ) : null}
              </div>
            </div>
          )}
          {state.isLoading ? (
            <RootLoader />
          ) : (
            <div className="row" style={{ flexDirection: "row" }}>
              <div
                className={
                  info.activeUserStory[0].openStatus &&
                    info.activeUserStory[0].action === "taskInfo"
                    ? "col-9"
                    : "col-12"
                }
              >
                {info.activeSprint.length !== 0 ?
                  <Board
                    tagStyle={{ fontSize: "20%", textAlign: "left" }}
                    data={data}
                    draggable
                    // collapsibleLanes
                    onCardMoveAcrossLanes={(cardId, metadata, card) =>
                      handleCardMove(
                        cardId,
                        metadata,
                        card,
                        info.activeSprint.moduleId
                      )
                    }
                    components={{ Card: CustomCard }} //custom cards
                    cardDragClass="draggingCard"
                    laneDragClass="draggingLane"
                    // onCardMoveAcrossLanes={onCardMoveAcrossLanes}
                    style={
                      info.activeUserStory[0].openStatus &&
                        info.activeUserStory[0].action === "taskInfo"
                        ? openmodal
                        : closemodal
                    } //,height:400
                  // laneStyle={{backgroundColor: '#666'}} style={{backgroundColor: '#eee'}}
                  />
                  : null}
              </div>
              {info.activeUserStory[0].openStatus &&
                info.activeUserStory[0].action === "taskInfo" ? (
                <div
                  className={
                    info.activeUserStory[0].openStatus ? "col-3 mt-4" : null
                  }
                  style={{
                    padding: 10,
                    borderLeft: "1px solid grey",
                    borderBottom: "1px solid grey",
                    borderRight: "1px solid grey",
                    borderTop: "1px solid grey",
                    backgroundColor: "#f8f8f8",
                    // height: 550,
                    overflowY: "scroll",
                  }}
                >
                  <div style={{ flexDirection: "row" }}>
                    <text
                      style={{ fontWeight: "bold", fontSize: 14, width: 30 }}
                    >
                      {getSubStringId(getUser.user.corp, 3)} -{" "}
                      {getSubStringId(info.activeUserStory[0].id, 5)}{" "}
                    </text>
                    <button
                      style={{ backgroundColor: "transparent", border: "0" }}
                      type="button"
                      data-dismiss="modal"
                      onClick={() =>
                        store.dispatch(activeUserStory([{ openStatus: false }]))
                      }
                    >
                      <i class="mdi mdi-close text-black"></i>
                    </button>
                  </div>
                  {/* <hr /> */}
                  {/* <div>
                                    <text style={{fontSize:12}}>{info.activeUserStory[0].id}</text>
                                </div> */}

                  <div>
                    <text style={{ fontWeight: "bold", fontSize: 12 }}>
                      {" "}
                      {PROJECTNAME}
                    </text>
                  </div>
                  <div>
                    <text style={{ fontSize: 12 }}>
                      {info.activeUserStory[0].ideaTitle}
                    </text>
                  </div>

                  <div className="pt-2">
                    <text style={{ fontWeight: "bold", fontSize: 12 }}>
                      {" "}
                      {MAINTASK} Title
                    </text>
                  </div>
                  <div>
                    <text style={{ fontSize: 12 }}>
                      {info.activeUserStory[0].title}
                    </text>
                  </div>

                  <div className="pt-2">
                    <text style={{ fontWeight: "bold", fontSize: 12 }}>
                      {MAINTASK_DESCRIPTION}
                    </text>
                  </div>
                  <div>
                    <text style={{ fontSize: 12 }}>
                      {info.activeUserStory[0].description}
                    </text>
                  </div>

                  <div className="pt-2">
                    <text style={{ fontWeight: "bold", fontSize: 12 }}>
                      {STORY_POINTS}
                    </text>
                  </div>
                  <div>
                    <text style={{ fontSize: 12 }}>
                      {info.activeUserStory[0].storyPoints}
                    </text>
                  </div>

                  <div className="pt-2">
                    <text style={{ fontWeight: "bold", fontSize: 12 }}>
                      {ACCEPTANCE_CRITERIA}/{DEFINITION_OF_DONE}
                    </text>
                  </div>
                  <div>
                    <text style={{ fontSize: 12, whiteSpace:'break-spaces' }} >
                      {info.activeUserStory[0].acceptanceCriteria}
                    </text>
                  </div>

                  <div>
                    <div className="pt-2">
                      <text style={{ fontWeight: "bold", fontSize: 12 }}>
                        {ASSIGNED_DATE}
                      </text>
                    </div>
                    <div>
                      <text style={{ fontSize: 12 }}>
                        {convertPSTtoLocalTime(info.activeUserStory[0].assignedDate)}
                      </text>
                    </div>
                  </div>
                  {info.activeUserStory[0].status === "completed" ? (
                    <div>
                      <div className="pt-2">
                        <text style={{ fontWeight: "bold", fontSize: 12 }}>
                          {PROJECT_COMPLETED_DATE}
                        </text>
                      </div>
                      <div>
                        <text style={{ fontSize: 12 }}>
                          {convertPSTtoLocalTime(info.activeUserStory[0].task_end_date)}
                        </text>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          )}
          {/* </div> */}
          {open ? (
            <RoadBlock
              open={open}
              handleClose={handleClose}
              data={cardInfo}
              handleModalClose={handleModalClose}
            />
          ) : null}
          {openModule.action === "changeUserstoryStatus" && moduleInfo != null ? (
            <ChangeUserstoryStatus
              open={openModule.status}
              handleClose={handleClose}
              data={moduleInfo}
              handleModalClose={handleModalClose}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
