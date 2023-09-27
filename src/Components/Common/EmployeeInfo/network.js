import Alert from "../Alert";

import API from "../Network/API";
import { awards,isLoaded, isLoading, manageTasks, projects, roadBlocks, subTasks, tasksCount,thanksPoints, roadBlockMessages, allMessages, mainTaskMessages } from "./action";

export async function getRoadBlockMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("roadblock_chat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
    }, {}, false);
    if (response.status === 'True') {
       dispatch(roadBlockMessages(response.data));
    }else{
      dispatch(roadBlockMessages([]));
    }
  } catch (error) {
    Alert('error',error.message)
  }
  dispatch(isLoaded());
}

export async function getTaskMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("user_story_chat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
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

export async function getMainTaskMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("user_story_chat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
    }, {}, false);
    if (response.status === 'True') {
       dispatch(mainTaskMessages(response.data));
    }else{
      dispatch(mainTaskMessages([]));
    }
  } catch (error) {
    Alert('error',error.message)
  }
  dispatch(isLoaded());
}


//For Tasks Count (Pending Project,RoadBlock,SubTasks and MainTasks)
export async function getTasksCount(dispatch, getUser, empId) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_employee_info.php", {
      "crop": getUser.corp,
      "empId": empId,
      "projectId": getUser.projectId
    }, {}, false);
    dispatch(tasksCount(response));
  } catch (error) {
    console.log(error)
  }
  dispatch(isLoaded());
}
//Get Projects of Employee
export async function getProjects(dispatch, getUser, empId, role) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_epics.php", {
      "corp": getUser.corp,
      empId: empId,
      // userType: role, //Based For User level only showing 
      action: 'approved',
      projectId:getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(projects(response.data))
    }
    else {
      dispatch(projects([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//Get ManageTasks  of Employee
export async function getManageTasks(dispatch, getUser, empId, role) {
  dispatch(isLoading());
  try {
    var response = await API.post("backlogspage.php", {
      "crop": getUser.corp,
      empId: empId,
      userType: getUser.role, //Based For User level only showing 
      action: 'Empcurrentsprint',
      projectId:getUser.projectId
    }, {}, false);
    if (response.status === 'true') {
      dispatch(manageTasks(response.data))
    }
    else {
      dispatch(manageTasks([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//Get RoadBlocks of Employee
export async function getRoadBlocks(dispatch, getUser, empId, role) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_roadblocks.php", {
      "crop": getUser.corp,
      "empId":empId,
      "action": "userRoadblocks",
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(roadBlocks(response.data))
    }
    else {
      dispatch(roadBlocks([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//Get Employee Subtask
export async function getSubTasks(dispatch, getUser, empId, role) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_user_pending_sprints.php", {
      "crop": getUser.corp,
      "empId": empId,
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'true') {
      dispatch(subTasks(response.data))
    }
    else {
      dispatch(subTasks([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

//Get PUser Thanks Points
export async function awardThanksPoints(state,dispatch, getUser,empId,handleClose) {
  // console.log(state,empId,getUser.empId)
  dispatch(isLoading());
  try {
    var response = await API.post("usersAwards.php", {
      "crop": getUser.corp,
      awardedTo: empId,
      awardedBy:getUser.empId,
      thanksPointId:state.awardSelected.value,
      description:state.awardDescription.value,
      subtaskId:"NA",
      action: 'userawards',
    }, {}, false);
    // console.log(response)
    if (response.status === 'True') {
      Alert('success',"Awards Presented Successfully")
    }
    else {
    }
    handleClose()
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

//Get PUser Thanks Points
export async function getThanksPoints(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("usersAwards.php", {
      "crop": getUser.corp,
      action: 'getThanksPoints',
    }, {}, false);
    // console.log(response)
    if (response.status === 'True') {
      dispatch(thanksPoints(response.data))
    }
    else {
      dispatch(thanksPoints([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

//Get PUser Thanks Points
export async function getUserThanksPoints(dispatch, getUser,empId) {
  dispatch(isLoading());
  try {
    var response = await API.post("usersAwards.php", {
      "crop": getUser.corp,
      empId: empId,
      action: 'getUserAwards',
    }, {}, false);
    // console.log(response)
    if (response.status === 'True') {
      dispatch(awards(response.data))
    }
    else {
      dispatch(awards([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
