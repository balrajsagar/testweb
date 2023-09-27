import React, { useEffect, useState, useReducer } from "react";
import Board from "react-trello";
import TopNav from "../Utility/TopNav";
import SideBar from "../Utility/SideNav";
import { useSelector } from "react-redux";
import { getAllTaskMessages, getActiveSprints, getUnassigned } from './network';
import AddToSprint from '../Backlogs/addToSprint';
import AddMainTask from '../../Common/TasksModals/addMainTask';
import { NEWMAINTASK, EDIT, ACTION_ICON } from '../../Common/Headers';
import { tasksReducer, initialState } from './tasksReducer';
import Moment from 'moment';
import MainTaskInfo from '../../Common/TasksModals/mainTaskInfo';
import Alert from "../../Common/Alert";
import { Link } from 'react-router-dom';

import RootLoader from "../../Common/Loader/RootLoader";


const CustomCard = ({
  tasktitle,
  laneId,
  completeStatus,
  id,
  priorityLevel,
  projectitle,
  storyPoints,
  assigntto,
  moduletitle,
  taskdescription,
  assignedon,
  taskStatus,
  acceptanceCriteria,
  assignby, modifiedDate

}) => {
  const getUser = useSelector(state => state.auth)
  const [open, setOpen] = useState({ status: false, index: 0 })
  const [cardInfo, setCardInfo] = useState()
  const handleOpen = (action, index, sno) => {
    var info
    setOpen({ status: true, index: index, action: action });

    if (action === "unassigned_taskInfo") {

      var view_status1 = "taskInfo"
      info = {
        view: view_status1,
        projectName: projectitle,
        moduleName: moduletitle,
        title: tasktitle,
        description: taskdescription,
        taskId: (getUser.user.corp).substring(0, 3).toUpperCase().concat('-', id),
        createdDate: assignedon,
        taskProgress: taskStatus,
        storyPoints: storyPoints,
        acceptanceCriteria: acceptanceCriteria,
        assignedTo: assigntto,
        assignedBy: assignby,
        completedDate: modifiedDate,
        completedStatus: completeStatus,



      }

    }
    else {
      info = { action: action, id: id, sno: sno }
    }
    setCardInfo(info)
  };
  const handleClose = () => {

    setOpen({ status: false, index: 0 });

  };
  const handleModalClose = () => {
    setOpen({ status: false, index: 0 });
  }
  const [name] = assigntto.split('@')
  return (
    <div >
      {laneId === "current_sprint" ?
        <div className="col-12" key={id} >
          <div className="card col-12" >
            <div className="container-fluid col-12 row" >
              <div class="d-flex col-12" style={{ padding: 0 }}>
                <div class="mr-auto p-2">
                  <b style={{ cursor: 'pointer', paddingTop: 10 }} onClick={(event) => handleOpen("unassigned_taskInfo")}> {completeStatus === 'pending' ? <p style={{ width: 180 }}>{(getUser.user.corp).substring(0, 3).toUpperCase()}{id}{'-'}{tasktitle}</p> : <del> <p>{(getUser.user.corp).substring(0, 3).toUpperCase()}{id}{'-'}{tasktitle}</p></del>}</b>
                </div>
                <p style={{ backgroundColor: '#81B622', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, height: 30, }}>{name}</p>

                <p style={{ backgroundColor: '#f37778', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, height: 30, }}>{projectitle}</p>
                <p style={{ backgroundColor: 'teal', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, height: 30, }}>P:{priorityLevel}</p>


                <p style={{ backgroundColor: '#6495ED', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, height: 30, }}>{storyPoints}</p>
                <div className="dropdown show" style={{ padding: '10px' }}>
                  {/* eslint-disable-next-line */}
                  <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                    <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>

                    <div>

                      {(completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("modify")}>{EDIT}</button> : null}

                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>



        : <div className="col-12" key={id}>
          <div className="card col-12">
            <div className="container-fluid col-12 row" >
              <div class="d-flex col-12" style={{ padding: 0 }}>
                <div class="mr-auto p-2">
                  <b style={{ cursor: 'pointer', paddingTop: 10, }} onClick={(event) => handleOpen("unassigned_taskInfo")} > {<p style={{ width: 180 }}>{(getUser.user.corp).substring(0, 3).toUpperCase()}{id}{'-'}{tasktitle}</p>}</b>
                </div>
                <p style={{ backgroundColor: '#81B622', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, height: 30 }}>{name}</p>

                <p style={{ backgroundColor: '#f37778', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, height: 30 }}>{projectitle === '0' ? 'NA' : projectitle}</p>
                <p style={{ backgroundColor: 'teal', color: 'white', marginLeft: 10, padding: 5, marginTop: 5, height: 30, }}>P:{priorityLevel}</p>


                <p style={{ backgroundColor: '#6495ED', color: 'white', marginLeft: 10, marginTop: 5, padding: '5px', height: 30, }}>{storyPoints}</p>

                <div className="dropdown show" style={{ padding: '10px' }}>
                  {/* eslint-disable-next-line */}
                  <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                    <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '20px', height: '20px', borderRadius: '0' }} />
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>

                    <div>

                      {(completeStatus === 'pending') ? <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }} onClick={(event) => handleOpen("modify")}>{EDIT}</button> : null}

                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      }
      {
        open.action === "unassigned_taskInfo" ? <MainTaskInfo open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
        /> : null
      }
    </div>


  )
}

export default function Dragdrop() {
  const getUser = useSelector(state => state.auth)
  const [state, dispatch] = useReducer(tasksReducer, initialState)


  const [open, setOpen] = useState(false)
  const [cardInfo, setCardInfo] = useState()
  const [open1, setOpen1] = useState(false)
  const [cardInfo1, setCardInfo1] = useState()

  // const dispatch = useDispatch();
  useEffect(() => {
    /*to fetch squad members from the data base through network function[SS] */
    getActiveSprints(dispatch, getUser.user)
    getUnassigned(dispatch, getUser.user)
    getAllTaskMessages(dispatch, getUser.user);
    // getCompleted(dispatch, getUser.user);
    // eslint-disable-next-line
  }, [])
  const backlogs = state.pendingTasks.concat(state.unassignedTasks)
  const manageTasks = backlogs
  var data = {

    "lanes": [
      {
        "id": "current_sprint",
        "title": state.currentTasks.length > 0 ?
          <h4 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent' }}> {(getUser.user.corp).substring(0, 3).toUpperCase().concat('-', state.activeSprint.moduleId, '   ', state.activeSprint.moduleDesc, '[', Moment(state.activeSprint.startDate).format('MM.DD.YYYY'), '-', Moment(state.activeSprint.targetDate).format('MM.DD.YYYY'), ']')}</h4> : <h4>Current Sprint</h4>,
        "style": {
          "width": 'auto',
          "height": 'auto',
          "backgroundColor": "white",

          // "borderRadius": "15px",
          "boxShadow": "3px 3px 20px 10px #f1f1f1",
          "marginTop": "10px",
          "marginBottom": "30px"

        },
        "cards": state.currentTasks
      },
      {
        "id": "backlogs",
        "title": <h4 className="card-title" >Backlogs</h4>,
        // "label": "10/20",
        "style": {
          "width": 'auto',
          "height": 'auto',
          "backgroundColor": "white",
          // "borderRadius": "15px",
          "boxShadow": "3px 3px 20px 10px #f1f1f1",
          "marginTop": "10px",
          "marginBottom": "30px"
        },
        "cards": manageTasks
      },

    ]
  }


  function handleCardMove(from, to, data) {
    // setOpen(true);
    console.log(from, to, data)
    const check = from + to;
    console.log(check)
    if (check === "backlogscurrent_sprint") {
      var info = { "taskId": data, }
      setCardInfo(info)
      setOpen(true)

    }
    else {
      Alert('warning', 'UserStory cannot be moved from Current Task ');
      getActiveSprints(dispatch, getUser.user);
      getAllTaskMessages(dispatch, getUser.user);
      getUnassigned(dispatch, getUser.user)
    }

  }
  const handleOpen = (action) => {

    setOpen1({ status: true, action: action });
    var info

    if (action === "add") {
      var status = "backlog_addUser"
      info = {
        view: status,
      }
    }
    setCardInfo1(info)
  }
  const handleClose = () => {
    getActiveSprints(dispatch, getUser.user);
    getAllTaskMessages(dispatch, getUser.user);
    getUnassigned(dispatch, getUser.user)
    setOpen1(false);
    setOpen(false);



  };
  const handleModalClose = () => {
    setOpen1(false);
    setOpen(false);

  }


  return (
    <div className="container-scroller">
      <TopNav />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel">
          <div className="content-wrapper col-12">

            {state.isLoading ? <RootLoader /> :
              <div>
                {state.currentTasks.length > 0 ?
                  <div>

                    <h6>  {state.involvedEmployees.map((employee, index) => {
                      const input = employee.assignedTo;
                      const [name] = input.split('@');
                      return <Link to={{ pathname: '/userMaintasks', state: { dashboard: 'backlogs', id: state.involvedEmployees[index].assignedToId, moduleid: state.activeSprint.moduleId } }} style={{ textTransform: "capitalize", padding: '1px', textAlign: 'center', marginLeft: '20px' }}>{name}-{employee.points}</Link>
                    })}</h6>
                  </div> : null}

                <div className="d-flex justify-content-end mb-2">
                  <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen("add")}> <img src="images/common/add.png" title={NEWMAINTASK} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">{NEWMAINTASK}</span></button>
                  {
                    open1.action === "add" ? <AddMainTask open={open1.status} handleClose={handleClose} data={cardInfo1} handleModalClose={handleModalClose}
                    /> : null
                  }
                </div>


                <Board
                  className="col-12"
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
                  style={{ backgroundColor: 'white', height: 'auto', flexDirection: 'column' }} //,height:400
                // laneStyle={{backgroundColor: '#666'}} style={{backgroundColor: '#eee'}}
                />
              </div>
            }
          </div>
          {
            open ? <AddToSprint open={open} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
            /> : null
          }

        </div>
      </div>
    </div>
  );
}
