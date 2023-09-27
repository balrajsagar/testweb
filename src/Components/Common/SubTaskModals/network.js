import { dependencyUser, isLoaded, isLoading, manageSubTasks, users, allMessages } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { SUBTASK_ADD, SUBTASK_MODIFY, SUBTASK_DELETE,MAINTASK } from "../Headers";
import Moment from 'moment';


export async function getAllTaskMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("taskChat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
       dispatch(allMessages(response.data));
    }else{
      dispatch(allMessages([]));
    }
  } catch (error) {
    Alert('error',error.message)
  }
  dispatch(isLoaded());
}

//For Getting Users List(Team)
export async function getUsers(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(users(response.data))
    }
    else {
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
}

//For Getting Dependency Task List(Team)
export async function getDependency(dispatch, getUser, ideaId) {
  dispatch(isLoading());
  try {
    var response = await API.post("getSubtasks.php", {
      crop: getUser.corp,
      action: "setdependency",
      ideaId: ideaId,
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'true') {
      dispatch(dependencyUser(response.data))
    }
    else {
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
}

//For Get SubTask List From ManageTasks
export async function getSubTasks(dispatch, getUser, taskId) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_tasks.php", {
      crop: getUser.corp,
      mainTaskId: taskId,
      action: "getsubtasks",
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'true') {
      dispatch(manageSubTasks(response.data))
    }
    else {
      dispatch(manageSubTasks([]))
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
  dispatch(isLoaded());
}
//For Add SubTask
export async function addSubTask(state, dispatch, getUser, mainTaskId, moduleId,assignedTo,targetDate, handleClose) {
  dispatch(isLoading());
//   if (state.targetDate.value  > targetDate && targetDate !== '0001-01-01') {
//     Alert("warning", `Target date should not exceed ${MAINTASK} target date`)
//     dispatch(isLoaded());
//   }
//  else if (state.targetDate.value < Moment(Date.now()).format("YYYY-MM-DD")  && targetDate !== '0001-01-01') {
//     dispatch(isLoaded());
//     Alert('warning', 'Select valid date');

//   }
//   else 
  if (state.targetDate.value !== "" && state.taskTitle.value !== "" && state.taskDescription.value !== "" ) {
    // let EstHours = Number(state.days.value * 24) + Number(state.hours.value);
    try {
      var response = await API.post("manage_tasks.php", {
        assignedBy: getUser.empId,
        assignedTo:assignedTo,
        "projectId":getUser.projectId,
        maintaskId: mainTaskId,
        moduleId: moduleId,
        crop: getUser.corp,
        action: "add",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        targetDate:state.targetDate.value,
        
      }, {}, false);
      if (response.status === 'true') {
        dispatch(getSubTasks(dispatch, getUser, mainTaskId))
        Alert("success", SUBTASK_ADD);
      }
      else{
        Alert('error', 'Something went wrong');
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "please give task information")
  }
}
//For Modify SubTask
export async function modifySubTask(state, dispatch, getUser, mainTaskId, handleClose) {
  dispatch(isLoading());
  if (state.taskTitle.value !== "" && state.taskDescription.value !== "") {
    try {
      var response = await API.post("manage_tasks.php", {
        assignedBy: getUser.empId,
        subtaskId: state.subTaskId.value,
        "projectId":getUser.projectId,
        crop: getUser.corp,
        action: "modify",
        maintaskId: mainTaskId,
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        empId: getUser.empId,
      }, {}, false);
      if (response.status === 'true') {
        // dispatch(getSubTasks(dispatch, getUser, mainTaskId))
        Alert("success", SUBTASK_MODIFY);
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "please give task title and description")
  }
}
//delete subtask
export async function deleteSubTask(dispatch, getUser, subtaskId, mainTaskId, handleClose, handleModalClose) 
{
  console.log(subtaskId)
  dispatch(isLoading());
  try { //manageSubtasks.php
    var response = await API.post("manage_tasks.php", {
      "crop": getUser.corp,
      action: 'deletesubtask',
      subtaskId: subtaskId,
      maintaskId: mainTaskId,
      "projectId":getUser.projectId,
      empId: getUser.empId,
    }, {}, false);
    // console.log(response)
    if (response.status === 'true') {
      Alert("success", SUBTASK_DELETE)
      handleClose()
    } else if (response.status === "false") {
      handleModalClose()
      Alert("warning", response.message)
    }
  } catch (error) {
    Alert('error', error.message);
    handleClose()
  }
  dispatch(isLoaded());
}

