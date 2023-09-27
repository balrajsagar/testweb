import API from "../../Common/Network/API";
import { subtasks, maintasks, projects, roadblocks, isLoading, allMessages, isLoaded, allRoadBlockMessages, mainTaskMessages } from "./actions";
import Alert from "../Alert";

export async function getMainTaskMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("mainTaskChat.php", {
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

export async function getAllRoadBlockMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("roadBlockChat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
    }, {}, false);
    if (response.status === 'True') {
       dispatch(allRoadBlockMessages(response.data));
    }else{
      dispatch(allRoadBlockMessages([]));
    }
  } catch (error) {
    Alert('error',error.message)
  }
  dispatch(isLoaded());
}


//For ToDo and Doing Subtask List based on task active status
export async function getSubTasks(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("getUserPendingSprints.php", {
      "crop": getUser.corp,
      "empId": getUser.empId,
    }, {}, false); 
    dispatch(subtasks(response.data));
  } catch (error) {
    Alert('error',error.message);
  }
  dispatch(isLoaded());
}
export async function getMainTasks(dispatch,getUser,empId,sprintId) {
    dispatch(isLoading());
    try {
      var response = await API.post("backlogspage.php", {
        "crop": getUser.corp,
        "empId": empId,
        "action": "Empcurrentsprint",
        "sprintId": sprintId,
        "projectId":getUser.projectId

      },{},false);
      if(response.status === 'true') {
        dispatch(maintasks(response.data))
      }else{
        dispatch(maintasks([]))
      }
    } catch (error) {
      Alert('error',error.message);
      dispatch(isLoaded());
    }
    dispatch(isLoaded());
  }
  export async function getDashboardMainTasks(dispatch,getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("getManageMaintasks.php", {
        "crop": getUser.corp,
        "empId": getUser.empId,
        "action": "pending"
      },{},false);
      if(response.status === 'true') {
        dispatch(maintasks(response.data))
      }else{
        dispatch(maintasks([]))
      }
    } catch (error) {
      Alert('error',error.message);
      dispatch(isLoaded());
    }
    dispatch(isLoaded());
  }

  //For Get Projects List
export async function getProjects(dispatch,getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("get_epics.php", {
        "corp": getUser.corp,
        "empId": getUser.empId,
        "action": "approved"
      },{},false);
      if(response.status === 'True') {
          dispatch(projects(response.data))
      }
      else{
        dispatch(projects([]))
      }
    } catch (error) {
      Alert('error',error.message);
    }
    dispatch(isLoaded());
  }

  //For RoadBlock List
export async function getRoadBlocks(dispatch,getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("userRoadblocks.php", {
        "crop": getUser.corp,
        "empId":getUser.empId,
        "action": "userRoadblocks"
      }, {}, false);
      // console.log(response)
      if(response.message === "No Data Available"){
        dispatch(roadblocks([]));
      }else{
        dispatch(roadblocks(response.data));
      }
    } catch (error) {
      Alert("error",error.message)
   }
    dispatch(isLoaded());
  }

  //Update the Roadblock Status
  export async function updateStatus(state,dispatch,getUser,roadblockId,handleClose,isChecked){
    // console.log(state.taskDescription + state.taskStatus + isChecked)
    dispatch(isLoading());
    if (state.roadblockDescription !== "" && state.roadblockStatus !== "") {
        try {
            const response = await API.post("userRoadblocks.php", {
                action: "updateRoadblock",
                roadblockId: roadblockId,
                crop: getUser.user.corp,
                roadblockStatus: state.roadblockStatus,
                statusDescription: state.roadblockDescription,
                task_complete_status: isChecked ? 1 : 0,
                empId: getUser.user.empId,
            }, {}, false);
            if (response.status === "True") {
                Alert('success', "Your Roadblock is Updated Successfully")
            } else {
                Alert('warning', response.message)
            }
        }
        catch (error) {
            Alert('error', error.message)
            handleClose()
        }
    }
    else {
        Alert('warning', "please confirm all details before update the roadblock")
    }
    dispatch(isLoaded());
    handleClose()
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



       

