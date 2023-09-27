
import { isLoaded, isLoading, modules, manageTasks, subTasks, roadblocks, roadBlockMessages, allMessages, mainTaskMessages } from "./actions";
import API from "../Network/API";
import Alert from '../Alert';

export async function getRoadBlockMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("roadblock_chat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
      "projectId":getUser.projectId

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

export async function getMainTaskMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("user_story_chat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
      "projectId":getUser.projectId
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

//Modules for Project
export async function getModules(dispatch, getUser, id) {
  dispatch(isLoading());
  try {
    var response = await API.post("projectInfo.php", {
      "crop": getUser.corp,
      "ideaId": id,
      "action": "modules",
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === "True") {
      dispatch(modules(response.data));
    } else {
      dispatch(modules([]));
    }
  } catch (error) {
    console.log(error)
  }
  dispatch(isLoaded());
}
//MainTasks for Project
export async function getMainTasks(dispatch, getUser, id) {
  dispatch(isLoading());
  try {
    var response = await API.post("epic_info.php", {
      "crop": getUser.corp,
      "ideaId": id,
      "action": "maintasks",
      "projectId":getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId
    }, {}, false);
    if (response.status === "True") {
      dispatch(manageTasks(response.data));
    } else {
      dispatch(manageTasks([]));
    }
  } catch (error) {
    console.log(error)
  }
  dispatch(isLoaded());
}

//SubTasks for Project
export async function getSubTasks(dispatch, getUser, id) {
  dispatch(isLoading());
  try {
    var response = await API.post("epic_info.php", {
      "crop": getUser.corp,
      "ideaId": id,
      "action": "subtasks",
      "projectId":getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId
    }, {}, false);
    if (response.status === "True") {
      dispatch(subTasks(response.data));
    } else {
      dispatch(subTasks([]));
    }
  } catch (error) {
    console.log(error)
  }
  dispatch(isLoaded());
}


//Roadblocks for Project
export async function getRoadblocks(dispatch, getUser, id) {
  dispatch(isLoading());
  try {
    var response = await API.post("epic_info.php", {
      "crop": getUser.corp,
      "ideaId": id,
      "action": "roadblocks",
      "projectId":getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId
    }, {}, false);
    if (response.status === "True") {
      dispatch(roadblocks(response.data));
    } else {
      dispatch(roadblocks([]));
    }
  } catch (error) {
    console.log(error)
  }
  dispatch(isLoaded());
}