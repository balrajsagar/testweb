import React, { useEffect, useState, useReducer} from "react";
import Board from "react-trello";
import TopNav from "../Utility/TopNav";
import SideBar from "../Utility/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { getActive, getDone, getRoadBlock, getTasksCount, getToDo, getAllTaskMessages, updateUserStory, } from "./network";
import ChatBox from "../../Common/Chat";
import UpdateTask from "./updateTask";
import TaskInfo from "./taskInfo";
import RoadBlockModal from "./roadblockModal";
import Alert from "../../Common/Alert";
import { tasksReducer, initialState } from './tasksReducer';
// import { getToken } from "../../Common/LocalStorage";
// import jwt_decode from "jwt-decode";
import RoadBlock from "../../Common/RoadBlock";
import RootLoader from "../../Common/Loader/RootLoader";
import { Link } from "react-router-dom";
import { MAINTASKS, ROADBLOCKS, ROADBLOCK, PROJECTS,MODULES, CHAT } from "../../Common/Headers";

// const onDataChange = (nextData) => {
//   console.log("data has changed123");
//   console.log(nextData);
// };
// const onCardMoveAcrossLanes = (from, to, data, cardtitle) => {
//   console.log(from + to);
//   // updateTask(from, to, data, cardtitle)
// };
// async function updateTask(from, to, data, cardtitle) {
//   const tokenDetails = jwt_decode(getToken('auth'));
//   if (from === "Doing" && to === "Completed") {
//     console.log(tokenDetails.data)
//     return <TaskInfo open="true" data={data}></TaskInfo>
// try {
//     const response = await API.post("getSubtasks.php", {
//         action: "update",
//         task_id: data,
//         // dependencyId: props.data.dependencyId,
//         crop: tokenDetails.data.corp,
//         task_status: "100",
//         task_status_desc: "completed",
//         task_complete_status:1,
//         empId: tokenDetails.data.empId,
//         // mainTaskId: props.data.mainTaskId,
//     }, {}, false);
//     if (response.status === "True") {
//         Alert('success', "Your Task is Updated Successfully")
//         // props.handleClose()
//     } else {
//         Alert('warning', response.message)
//     }
// }
// catch (error) {
//     Alert('error', error.message)
// }
//  return <div><TaskInfo open="true"  handleClose="false" data={data}/></div>
//   } else { Alert("success", from + to + data) }

// }
// const onShow = (cardId, metadata, description) => {
//   console.log("data has changed123" + cardId + description);
//   console.log(JSON.stringify(metadata));
//   alert(
//     "data has changed123" + cardId + JSON.stringify(metadata) + description
//   );
// };
const CustomCard = ({
  onClick,
  className,
  laneId,
  title,
  id,
  subTaskDesc,
  status,
  taskStatus,
  mainTaskid,
  activeStatus,
  dependencyId,
  timeLeft,
  extraHours,
  mainTaskTitle,
  taskDesc,
  ideaTitle,
  moduleDesc,
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
}) => {
  // const clickDelete = e => {
  //   onDelete()
  //   e.stopPropagation()
  // }
  const [chatOpen, setChatOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState({ status: false })
  const [cardInfo, setCardInfo] = useState()
  const getUser = useSelector(state => state.auth)
  // eslint-disable-next-line
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const info = useSelector(state => state.subtask)

  //For Open Chat
  const handleOpenChat = (action, id, sno) => {
    setChatOpen(true)
    // updateChat(sno,dispatch,getUser.user)
    var info = { action: action, id: id, sno:sno}
    setCardInfo(info)
  }
  //for Update Task
  const handleOpenUpdate = (title, description, id, mainTaskId, dependencyId) => {
    setUpdateOpen(true)
    var info = { title: title, description: description, id: id, mainTaskId: mainTaskId, dependencyId: dependencyId }
    setCardInfo(info)
  }
  const handleChatClose = () => {
    setChatOpen(false);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };
  
  //for Update Task
  const handleOpenTaskInfo = (title, description, id, mainTaskId, dependencyId, timeLeft, status, extraHours, mainTaskTitle, taskDesc, ideaTitle, laneId, moduleDesc,action) => {
    setInfoOpen({status: true, action: action})
    var info = {
      title: title, description: description, id: id, mainTaskId: mainTaskId,
      mainTaskTitle: mainTaskTitle, dependencyId: dependencyId,
      status: status, timeLeft: timeLeft, extraHours: extraHours, taskDesc: taskDesc,
      ideaTitle: ideaTitle, laneId: laneId, moduleDesc: moduleDesc
    }
    setCardInfo(info)
  }
  const handleTaskInfoClose = () => {
    setInfoOpen(false);
  };
  const handleModalClose = () => {
    setChatOpen(false);
  }

  const getMessagesCount = (id, msg, empId) => {
    const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === id  ).map((messages, i) => {
   // eslint-disable-next-line
      return i,messages
    // eslint-disable-next-line
})
return (
    <i>
        {msgCount.length > 0 ? msgCount.length : null}
        {
            msgCount.length > 0 ?
                <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px',marginLeft:"-8px", backgroundColor: 'green' }}  onClick={() => handleOpenChat("subtask", id, msgCount)} />
                :
                <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px',marginLeft:"-8px" }}  onClick={() => handleOpenChat("subtask", id, msgCount)} />

        }
    </i>
)
}
  return (
    <div
      onClick={onClick}
      // style={cardStyle}
      style={{ border: '0.2px solid grey', borderRadius: '10px', padding: '10px', marginBottom: '5px' }}
    // className={title === "Dispose Garbage" ? "bg-white" :"bg-primary"}
    >
      <header
        style={{
          borderBottom: '1px solid #eee',
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: cardColor,
          width: 260
        }}>
        {laneId === "RoadBlock" ? <div style={{ fontSize: 14, fontWeight: 'bold', cursor:'pointer'}} className="row"
          onClick={() => handleOpenTaskInfo(title, subTaskDesc, id, mainTaskid, dependencyId, timeLeft, status, extraHours, mainTaskTitle, taskDesc, ideaTitle, laneId, moduleDesc, "roadblockInfo")}><u className="text-dark ml-1">{(getUser.user.corp).substring(0, 3).toUpperCase()} - {id}</u> <p className="text-success ml-1">{title}</p></div>:
        <div style={{ fontSize: 14, fontWeight: 'bold', cursor:'pointer'}} className="row"
          onClick={() => handleOpenTaskInfo(title, subTaskDesc, id, mainTaskid, dependencyId, timeLeft, status, extraHours, mainTaskTitle, taskDesc, ideaTitle, laneId, moduleDesc , "taskInfo")}><u className="text-dark ml-1">{(getUser.user.corp).substring(0, 3).toUpperCase()} - {id}</u> <p className="text-success ml-1">{title}</p></div>}
        {/* <div style={{ fontSize: 11 }}>{dueOn}</div>
        {showDeleteButton && <button onClick={clickDelete} />} */}
      </header>
      <div style={{ fontSize: 12, color: '#BD3B36' }}>
        {laneId === "RoadBlock" ? <div style={{ color: '#4C4C4C', fontWeight: 'bold', width: '260px', overflowWrap: "break-word" }}>{taskDesc}</div> : <div style={{ color: '#4C4C4C', fontWeight: 'bold', width: '260px', overflowWrap: "break-word" }}>{subTaskDesc}</div>}
        <div className="row" style={{ padding: '5px 0px' }}>
          {/* <p style={{ marginTop: 10, textAlign: 'right', color: cardColor, fontSize: 15, fontWeight: 'bold' }}>{taskStatus}</p> */}
          {status === "pending" && activeStatus !== "0" ?

            <button style={{ border: '0', width: '10px', height: '40px', backgroundColor: 'transparent' }} type="button" onClick={() => handleOpenUpdate(title, subTaskDesc, id, mainTaskid, dependencyId)}><img src="images/common/update.svg" alt="logo" style={{ width: '17px', height: '20px',marginLeft:"-8px" }} /></button>
            : null}
          {/* <button style={{ border: '0', width: '10px', height: '40px', backgroundColor: 'transparent',  }} type="button" onClick={() => handleOpenChat("subtask", id)}> <img src="images/common/chat.svg" alt="logo" style={{ width: '20px', height: '20px',marginLeft:"-8px" }} /></button> */}
               <button type="button" style={{ border: '0', width: '10px', height: '40px', backgroundColor: 'transparent',  }} >
                {
                    getMessagesCount(id, info.allMessages, getUser.user.empId)
                }
             </button>
            

          {activeStatus !== "0" ?

            <i className="ml-4 mr-2 text-warning" style={{ textAlign: 'right', color: cardColor, fontSize: 10, fontWeight: 'bold', paddingLeft: '145px', marginTop: '-20px' }}>Status : {taskStatus} % /100 %</i> : null}
        </div>
        {tags && (
          <div
            style={{
              borderTop: '1px solid #eee',
              paddingTop: 6,
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}>
            {/* {tags.map(tag => (
                <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
              ))} */}
          </div>
        )}
      </div>
      {
        chatOpen ? <ChatBox open={chatOpen} handleClose={handleChatClose} data={cardInfo} handleModalClose={handleModalClose}
        /> : null
      }
      {
        updateOpen ? <UpdateTask open={updateOpen} handleClose={handleUpdateClose} data={cardInfo} handleModalClose={handleModalClose}
        /> : null
      }
      {
        infoOpen.status && infoOpen.action === "taskInfo" ? <TaskInfo open={infoOpen} handleClose={handleTaskInfoClose} data={cardInfo} handleModalClose={handleModalClose}
        /> : null
      }
      {
        infoOpen.status && infoOpen.action === "roadblockInfo" ? <RoadBlockModal open={infoOpen} handleClose={handleTaskInfoClose} data={cardInfo} handleModalClose={handleModalClose}
        /> : null
      }
    </div>
  )
}
// let eventBus

// const PER_PAGE = 3
// function generateCards(requestedPage = 1) {
//   const cards = []
//   let fetchedItems = (requestedPage - 1) * PER_PAGE
//   for (let i = fetchedItems + 1; i <= fetchedItems + PER_PAGE; i++) {
//     cards.push({
//       id: `${i}`,
//       title: `Card${i}`,
//       description: `Description for #${i}`,
//       metadata: {cardId: `${i}`}
//     })
//   }
//   return cards
// }

// function delayedPromise  (durationInMs, resolutionPayload) {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve(resolutionPayload)
//     }, durationInMs)
//   })
// }

// function paginate  (requestedPage, laneId) {
//   let newCards = generateCards(requestedPage)
//   return delayedPromise(2000, newCards)
// }
export default function UserDashboard() {
  // const [state, dispatch] = useReducer(tasksReducer, initialState)
  const getUser = useSelector(state => state.auth)
  const loaderStatus = useSelector(state => state.loading.status)
  const [open, setOpen] = useState(false)
  const [cardInfo, setCardInfo] = useState()
  const dispatch = useDispatch();
  useEffect(() => {
    getTasksCount(dispatch, getUser.user);
    getToDo(dispatch, getUser.user); //for todo and doing information
    getRoadBlock(dispatch, getUser.user);
    getDone(dispatch, getUser.user);
    getAllTaskMessages(dispatch, getUser.user);
    // eslint-disable-next-line
  }, [])

  const info = useSelector(state => state.subtask)
  var data = {

    "lanes": [
      {
        "id": "ToDo",
        "title": "To Do",
        "style": {
          "width": 310,
          "height": 450,
          "fontSize": 15,
          "fontWeight": "bold",
          "backgroundColor": "white",
          "borderRadius": "15px",
          "boxShadow": "3px 3px 20px 10px #f1f1f1",
          "margin": "10px"

        },
        "cards": info.todo
      },
      {
        "id": "Doing",
        "title": "Working",
        // "label": "10/20",
        "style": {
          "width": 310,
          "height": 450,
          "fontSize": 15,
          "fontWeight": "bold",
          "backgroundColor": "white",
          "borderRadius": "15px",
          "boxShadow": "3px 3px 20px 10px #f1f1f1",
          "margin": "10px"
        },
        "cards": info.doing
      },
      {
        "id": "Completed",
        "title": "Completed",
        "style": {
          "width": 310,
          "height": 450,
          "fontSize": 15,
          "fontWeight": "bold",
          "backgroundColor": "white",
          "borderRadius": "15px",
          "boxShadow": "3px 3px 20px 10px #f1f1f1",
          "margin": "10px"
        },
        // "label": "2/5",
        "cards": info.done
      },
      {
        "id": "RoadBlock",
        "title": ROADBLOCK,
        // "label": "0/0",
        "style": {
          "width": 310,
          "height": 450,
          "fontSize": 15,
          "fontWeight": "bold",
          "backgroundColor": "white",
          "borderRadius": "15px",
          "boxShadow": "3px 3px 20px 10px #f1f1f1",
          "margin": "10px"
        },
        "cards": info.roadblock
      },
    ]
  }


  function handleCardMove(from, to, data) {
    // setOpen(true);
    console.log(from, to, data)
    const check = from + to;
    console.log(check)
    if (check === "ToDoDoing") {
      getActive(dispatch, getUser.user, data)
    } else if (check === "ToDoRoadBlock") {
      Alert("warning", "You are not able to add RoadBlock from To Do")
      // Alert("warning", "ToDoRoadBlock"+from + to + data);
    } else if (check === "DoingRoadBlock") {
      var info = { "taskId": data }
      setCardInfo(info)
      setOpen(true)
    } else if (check === "DoingCompleted") {
      updateUserStory(dispatch,getUser.user,data)
    }
    else {
      // Alert("warning", from + to + data);
    }
    // switch (check) {
    //   case "ToDoDoing":
    //     getActive(dispatch, getUser.user, data)
    //   case "DoingCompleted":
    //     Alert("warning", "+DoingCompleted"+from + to + data);
    //   case "ToDoCompleted":
    //     Alert("warning", "ToDoCompleted"+from + to + data);
    //   case "DoingRoadBlock":
    //     // setOpen(action)
    //     // var info = {taskId: data }
    //      Alert("warning", "DoingRoadBlock"+from + to + data);
    //   case "ToDoRoadBlock":
    //     // setOpen(action)
    //     // var info = {taskId: data }
    //      Alert("warning", "ToDoRoadBlock"+from + to + data);
    //   // default:
    //   //   return Alert("warning", from + to + data);
    // }
  }

  const handleClose = () => {
    setOpen(false);
    getAllTaskMessages(dispatch, getUser.user);
  };
  const handleModalClose = () => {
    setOpen(false);
  }
  return (
    <div className="container-scroller">
      <TopNav />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div>
              <div className="row" style={{ backgroundImage: "linear-gradient(135deg,#2DCE8B, #2DCECB)", marginTop: '-35px', }} >
                <div className="col-sm-6 col-md-6 col-lg-3 mt-4 mb-4 " >
                  <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="content" >
                      <div className="row" >
                        <div className="col-sm-8 ">
                          <div className="detail pl-3 pt-4" style={{cursor:'pointer'}}>
                            {info.tasksCount.subTaskCount > '0'  ?
                              <Link to={{ pathname: '/userSubtasks' }} style={{ color: 'black',fontWeight: "bold" }}>
                                <p>{MODULES}</p>
                                <span className="number">{info.tasksCount.subTaskCount}</span>
                              </Link> :
                              <div onClick={() => Alert("warning", "You don`t have "+MODULES)}>
                                <p style={{ fontWeight: "bold"}}>{MODULES}</p>
                                <span className="number" >{info.tasksCount.subTaskCount}</span>
                              </div>
                            }
                          </div>
                        </div>
                        <div className="col-md-3 row p-4">
                          <div className="icon-big text-center">
                            <img src="images/common/pending.svg" alt="logo" style={{ width: '45px', height: '45px' }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mt-4 mb-4 " >
                  <div className="card " style={{ borderRadius: '20px' }}>
                    <div className="content" >
                      <div className="row" >

                        <div className="col-sm-8  ">
                          <div className="detail pl-3 pt-4" style={{cursor:'pointer'}}>
                            {info.tasksCount.mainTaskCount !== '0' ?
                              <Link to={{ pathname: '/userMaintasks', state: { dashboard:'dashboard'} }} style={{ color: 'black',fontWeight: "bold" }}>
                                <p>{MAINTASKS}</p>
                                <span className="number">{info.tasksCount.mainTaskCount}</span>
                              </Link> :
                              <div onClick={() => Alert("warning", "You don`t have "+MAINTASKS)}style={{ color: 'black',fontWeight: "bold" }} >
                                <p>{MAINTASKS}</p>
                                <span className="number">{info.tasksCount.mainTaskCount}</span>
                              </div>}
                          </div>
                        </div>
                        <div className="col-md-3 row p-4">
                          <div className="icon-big text-center">
                            <img src="images/common/pending.svg" alt="logo" style={{ width: '45px', height: '45px' }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mt-4 mb-4 " >
                  <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="content" >
                      <div className="row" >

                        <div className="col-sm-8 ">
                          <div className="detail pl-3 pt-4" style={{cursor:'pointer'}}>
                            {info.tasksCount.IdeaCount !== '0' ?
                              <Link to={{ pathname: '/userProjects' }} style={{ color: 'black',fontWeight: "bold" }}>
                                <p>{PROJECTS}</p>
                                <span className="number">{info.tasksCount.IdeaCount}</span>
                              </Link> :
                              <div onClick={() => Alert("warning", "You don`t have approved "+PROJECTS)} style={{ color: 'black',fontWeight: "bold" }}>
                                <p>{PROJECTS}</p>
                                <span className="number">{info.tasksCount.IdeaCount}</span>
                              </div>}
                          </div>
                        </div>
                        <div className="col-md-3 row p-4">
                          <div className="icon-big text-center">
                            <img src="images/common/projects.svg" alt="logo" style={{ width: '45px', height: '45px' }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mt-4 mb-4 " >
                  <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="content" >
                      <div className="row" >

                        <div className="col-sm-8 ">
                          <div className="detail pl-3 pt-4" style={{cursor:'pointer'}}>
                            {info.tasksCount.RoadBlockCount !== '0' ?
                              <Link to={{ pathname: '/userRoadblocks' }} style={{ color: 'black',fontWeight: "bold"}}>
                                <p>{ROADBLOCKS}</p>
                                <span className="number">{info.tasksCount.RoadBlockCount}</span>
                              </Link>
                              : <div onClick={() => Alert("warning", "You don`t have "+ROADBLOCKS)} style={{ color: 'black',fontWeight: "bold" }}>
                                <p>{ROADBLOCKS}</p>
                                <span className="number">{info.tasksCount.RoadBlockCount}</span>
                              </div>}
                          </div>
                        </div>
                        <div className="col-md-3 row p-4">
                          <div className="icon-big text-center">
                            <img src="images/common/roadblock.svg" alt="logo" style={{ width: '45px', height: '45px' }} />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            {loaderStatus ? <RootLoader /> :
              <Board

                tagStyle={{ fontSize: '20%', textAlign: 'left' }}
                data={data}
                draggable
                // onCardClick={(card, metadata, laneId) => alert(`Card with id:${JSON.stringify(card)} clicked. Card in lane: ${laneId}`)}
                // onCardClick={(cardId, metadata, card) =>
                //   onShow(cardId, metadata, card)
                // }
                onCardMoveAcrossLanes={(cardId, metadata, card) => handleCardMove(cardId, metadata, card)}
                components={{ Card: CustomCard }} //custom cards
                // ,alert(`Card with id:${cardId} ,clicked. Has metadata.id: ${JSON.stringify(metadata)}`)
                // collapsibleLanes //for collapse
                // onDataChange={onDataChange}
                cardDragClass="draggingCard"
                laneDragClass="draggingLane"
                // onCardMoveAcrossLanes={onCardMoveAcrossLanes}

                // onLaneScroll={paginate}
                style={{ backgroundColor: 'white', height:'auto', marginLeft: '-10px', marginRight: '-10px' }} //,height:400
              // laneStyle={{backgroundColor: '#666'}} style={{backgroundColor: '#eee'}}
              />}
          </div>
          {
            open ? <RoadBlock open={open} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
            /> : null
          }
        </div>
      </div>
    </div>
  );
}
