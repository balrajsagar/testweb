import Alert from "../Alert";
import API from "../Network/API";
import { users,isLoaded, isLoading } from "./action";
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
  }
//Add ReleaseOwner for Project
export async function addReleaseOwner(state,dispatch,getUser,ideaId,handleClose) {
    dispatch(isLoading());
  if(state.userSelected !== '' && state.userSelected!== 'NA'){
    try {
      var response = await API.post("manage_epics.php", {
        corp: getUser.corp,
        empId: state.userSelected,
        action: "ro",
        userType: getUser.role,
        ideaId: ideaId,
      },{},false);
      if(response.status === 'True') {
          Alert("success","RO Selected")
      }
      handleClose()
    } catch (error) {
      Alert('error',error.message);
      handleClose()
    }
  }else{
    Alert("warning" , "Please select user for add RO")
  }
    dispatch(isLoaded());
  }