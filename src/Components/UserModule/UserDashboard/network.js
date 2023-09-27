import { isLoading, isLoaded } from "../../Common/Actions/loading"
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import store from '../../Common/Store';
import { doing, done, roadblock, tasksCount, todo, userRoadblock, allMessages } from "./actions";
import { SUBTASK_ACTIVE,MAINTASK } from "../../Common/Headers";

export async function updateChat(sno,dispatch,getUser) {
  const msgId = sno ? sno.map((msgId, index) => {
    return msgId.sno
}):null
  dispatch(isLoading());
  try {
    // eslint-disable-next-line
    var response = await API.post("taskChat.php", {
     action: "updateChat",
  corp_code: getUser.corp,
  messagedBy: getUser.empId, 
  msgId: msgId ? msgId : " "
    }, {}, false);
  } catch (error) {
    Alert('error',error.message)
  }
  dispatch(isLoaded());
}

export async function getAllTaskMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("taskChat.php", {
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

//For ToDo and Doing Subtask List based on task active status
export async function getToDo(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("getSubtasks.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "action": "pending"
    }, {}, false);
        var toDoList = [];
        var doingList = [];
        response.data.map((pending) => {
            return (
           (pending.activeStatus === "0") ? toDoList.push(pending) : doingList.push(pending)
            );
        })
    store.dispatch(todo(toDoList));
    store.dispatch(doing(doingList));
  } catch (error) {
    console.log(error)
  }

  dispatch(isLoaded());
}
//For Doing Subtask List
export async function getDoing(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("getSubtasks.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "action": "completed"
    }, {}, false);

    store.dispatch(doing(response.data));

  } catch (error) {
    console.log(error)
  }

  dispatch(isLoaded());
}
//For Completed Tasks List
export async function getDone(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("getSubtasks.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "action": "completed"
    }, {}, false);
    // console.log(response)
    store.dispatch(done(response.data));
  } catch (error) {
    console.log(error)
  }

  dispatch(isLoaded());
}
//For RoadBlock List
export async function getRoadBlock(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("roadBlock.php", {
      "crop": getUser.corp,
      "action": "roadBlock"
    }, {}, false);
    // console.log(response)
    if(response.message === "No Data Available"){
      // store.dispatch(roadblock());
    }else{
      store.dispatch(roadblock(response.data));
    }
  } catch (error) {
    console.log(error)
  }

  dispatch(isLoaded());
}
//For Tasks Count (Pending Project,RoadBlock,SubTasks and MainTasks)
export async function getTasksCount(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("getEmployeeInfo.php", {
      "crop": getUser.corp,
      "empId": getUser.empId,
    }, {}, false);
    store.dispatch(tasksCount(response));
  } catch (error) {
    console.log(error)
  }
  dispatch(isLoaded());
}
//For Active the Task from ToDo to Doing
export async function getActive(dispatch,getUser,subtaskId) {

  dispatch(isLoading());
  try {
    var response = await API.post("manage_userstories.php", {
      "crop": getUser.corp,
      "story_id": subtaskId,
      "empId": getUser.empId,
      "action": "activate_user_story"
    }, {}, false);
    if (response.status === 'true') {
      getToDo(dispatch,getUser);
      Alert("success",SUBTASK_ACTIVE);
    } else {
      Alert("warning",response.message)
    }
  } catch (error) {
    console.log(error)
  }

  dispatch(isLoaded());
}
//RoadBlock List
export async function getUserRoadblocks(dispatch,getUser,subTaskId) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_roadblocks.php", {
      "crop": getUser.corp,
      action: "getting",
      subTaskId:subTaskId
    },{},false);
    if(response.status === 'True') {
      dispatch(userRoadblock(response.data))
    }
    else{
      dispatch(userRoadblock([]))
    }
  } catch (error) {
    Alert('error',error.message);
  }
  dispatch(isLoaded());
}
 //Update the Task Status
 export async function updateUserStory(dispatch,getUser,userStoryId) {
   dispatch(isLoading());
      try {
          const response = await API.post("manage_userstories.php", {
              action: "update",
              task_id: userStoryId,
              crop: getUser.corp,
              task_status: 100,
              task_status_desc: "completed",
              task_complete_status: 1,
              empId: getUser.empId,
          }, {}, false);
          if (response.status === "True") {
              getToDo(dispatch,getUser)//For ToDo and Doing Tasks
              getDone(dispatch,getUser)//For Done Tasks
              getTasksCount(dispatch,getUser)//For Update Count
              Alert('success', `Your ${MAINTASK} is Updated Successfully`)
          } else {
              Alert('warning', response.message)
          }
      }
      catch (error) {
          Alert('error', error.message)
      }
  dispatch(isLoaded());
}