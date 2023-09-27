/* 
filename:network.js
purpose:Api calls for archive  page
developers:Satya Siddha[S.S]

*/
import { completedSprints, completedUserStories, isLoaded, isLoading, allMessages, completedSubTasks } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";

export async function getAllTaskMessages(dispatch, getUser, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "user_story_chat.php",
      {
        corp_code: getUser.corp,
        action: "getAllTaskMessages",
      },
      {},
      false
    );
    // console.log(response.data)
    if (response.status === "True") {
      dispatch(allMessages(response.data));
      // store.dispatch(allMessages(response.data));
    } else {
      dispatch(allMessages([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}


//for getting completed sprints 
export async function getCompletedSprints(dispatch, getUser) {
  try {
    var response = await API.post("archive.php", {
      "crop": getUser.corp,
      "action": "getCompletedSprints",
      "projectId": getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId

    }, {}, false);
    if (response.status === 'True') {
      dispatch(completedSprints(response.data))
      // getCompletedUserStories(dispatch, getUser, response.data)
    }
    else {
      dispatch(completedSprints([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
}
export async function getCompletedUserStories(dispatch, getUser, sprintId) {
  dispatch(isLoading());
  try {
    var response = await API.post("archive.php", {
      "crop": getUser.corp,
      "action": "getCompletedUserStories",
      "projectId": getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId,
      "sprintId": sprintId

    }, {}, false);
    if (response.status === 'true') {
      // var archive_data = []
      // var stories=[]

      // for (let i = 0; i < sprints.length; i++) {
      //   archive_data.push({ "sprint_id": sprints[i].sprint_id})
      //   for (let j = 0; j < response.data.length; j++) {

      //     if (sprints[i].sprint_id === response.data[j].sprint_id) {
      //       stories.push(response.data[j])
      //     }
      //     archive_data["user_stories"]=stories

      //   }

      // }
      // console.log(archive_data)
      dispatch(completedUserStories(response.data))
    }
    else {
      dispatch(completedUserStories([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

export async function getUserStoriesBySprint(dispatch, getUser, sprintId) {
  dispatch(isLoading());
  try {
    var response = await API.post("archive.php", {
      "crop": getUser.corp,
      "action": "getStoriesBySprint",
      "projectId": getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId,
      "sprintId": sprintId

    }, {}, false);
    if (response.status === 'true') {

      dispatch(completedUserStories(response.data))
    }
    else {
      dispatch(completedUserStories([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

export async function getSubTasksBySprint(dispatch, getUser, sprintId) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_tasks.php", {
      "crop": getUser.corp,
      "action": "getsubtasksCompleted",
      "projectId": getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId,
      "sprintId": sprintId

    }, {}, false);
    if (response.status === 'true') {
      dispatch(completedSubTasks(response.data))
    }
    else {
      dispatch(completedSubTasks([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}


export async function getUserStoriesByKanban(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("archive.php", {
      "crop": getUser.corp,
      "action": "getStoriesByKanban",
      "projectId": getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId,

    }, {}, false);
    if (response.status === 'true') {
      for (let i = 0; i < 5; i++) {
        delete response.data[i]
      }
      dispatch(completedUserStories(response.data))
    }
    else {
      dispatch(completedUserStories([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
