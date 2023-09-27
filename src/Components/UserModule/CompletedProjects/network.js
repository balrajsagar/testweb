import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { isLoading, isLoaded, projects } from "./actions";
import {PROJECT} from '../../Common/Headers';


//For Completed Projects
export async function getCompletedProjects(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_epics.php", {
      "corp": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "action": "completed",
      "projectId":getUser.projectId,
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
//For ReOpen Project
export async function ReOpenProject(dispatch,getUser, ideaId,reason,handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_epics.php", {
      "corp": getUser.corp,
      "ideaId" :ideaId,
      "action": "reopen",
      "reason": reason,
      "projectId":getUser.projectId,
    }, {}, false);
    if (response.status === 'True') {
      getCompletedProjects(dispatch, getUser)
      Alert('success',`${PROJECT} Re Opened`)
    }
    else {
      Alert('warning',response.message)
    }
  } catch (error) {
    Alert('error', error.message);
  }
  handleClose()
  dispatch(isLoaded());
}