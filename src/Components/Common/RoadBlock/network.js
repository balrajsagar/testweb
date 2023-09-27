import { dependencyUser, isLoaded, isLoading, users } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";

//For Getting Users List(Team)
export async function getUsers(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      "projectId": getUser.projectId
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
  dispatch(isLoaded());
}

//For Getting Dependency Task List(Team)
export async function getDependency(dispatch, getUser,ideaId) {
    dispatch(isLoading());
    try {
      var response = await API.post("getSubtasks.php", {
        crop: getUser.corp,
        action:"setdependency",
        ideaId:ideaId
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
    dispatch(isLoaded());
  }
export async function getActive(dispatch,getUser,story_id) {
    console.log(story_id)
    dispatch(isLoading());
    try {
      var response = await API.post("manage_userstories.php", {
        "crop": getUser.corp,
        "story_id": story_id,
        "empId": getUser.empId,
        "action": "activate_user_story"
      }, {}, false);
      if (response.status === 'true') {
        dispatch(getUser(response.data))
        // getToDo(dispatch,getUser);
        Alert("success","Activated successfully");
      } else {
        Alert("warning",response.message)
      }
    } catch (error) {
      Alert("error",error.message)
    }
    dispatch(isLoaded());
  }

  export async function modifyRoadBlock(state,dispatch,getUser,taskId,roadblockId,handleClose){
    let EstHours = Number(state.days.value * 24) + Number(state.hours.value);

    if (state.roadblockTitle.value !== "" && state.userSelected.value!== "") {
        dispatch(isLoading());
        try {
            var response = await API.post("userRoadblocks.php", {
                crop: getUser.user.corp,
                action:'modifyRoadblock',
                subTaskId: taskId,
                days:state.days.value,
                hours: state.hours.value,
                assignedBy: getUser.user.empId,
                EstimatedHours: EstHours,
                assignedTo: state.userSelected.value,
                roadblockId: roadblockId,
                roadBlockDescription: state.roadblockTitle.value,
                prioritySelected:state.prioritySelected.value,
                severitySelected:state.severitySelected.value
                // targetDate:
            },{},false);
            if(response.status === "True"){
              Alert("success",response.message) 
            }else{

            }
            handleClose();
        } catch (error) {
            Alert("error",error.message)
        }
        handleClose();
    } else {
        Alert("warning", "please add description");
    }
    dispatch(isLoaded());
}