import { isLoaded, isLoading } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { manageTasks } from "./actions";
import { PROJECT_SUCCESS } from "../../Common/Headers";

//For Pending MainTasks
export async function getPending(dispatch,getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("getManageMaintasks.php", {
        "crop": getUser.corp,
        "userType": getUser.role,
        "empId": getUser.empId,
        "action": "pending"
      },{},false);
      if(response.status === 'true') {
        getCompleted(dispatch,getUser,response.data)
        // dispatch(pendingTasks(response.data))
      }
      else{
        getCompleted(dispatch,getUser,[])
      }
    } catch (error) {
      Alert('error',error.message);
      dispatch(isLoaded());
    }
  }

//For Completed MainTasks
export async function getCompleted(dispatch,getUser,pending) {
  dispatch(isLoading());
  try {
    var response = await API.post("getManageMaintasks.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      action: "completed",
    },{},false);
    if(response.status === 'true') {
      getManageTasks(dispatch,pending,response.data) //Call MainTask List
      // dispatch(completedTasks(response.data))
    }
    else{
      getManageTasks(dispatch,pending,[])
    }
  } catch (error) {
    Alert('error',error.message);
    dispatch(isLoaded());
  }
}
//For ManageTasks
export async function getManageTasks(dispatch,pending,completed) {
  dispatch(isLoading());
  try {
      dispatch(manageTasks(pending.concat(completed)))
  } catch (error) {
    Alert('error',error.message);
  }
  dispatch(isLoaded());
}

//Add New Project
  export async function addProject(state, dispatch,getUser,handleClose) {
    dispatch(isLoading());
    if ((state.projectTitle.value !== "" && state.projectDescription.value !== "")) {
        try {
            const data = {
              proj_title: state.projectTitle.value,
              proj_desc: state.projectDescription.value,
              empId: getUser.empId, //Async
              action: "add",
              corp: getUser.corp
            };
            const response = await API.post("manage_epics.php", data, {}, false);
            if (response.status === 'True') {
              //  dispatch(getProjects(dispatch,getUser))
               Alert("success", PROJECT_SUCCESS);
            }
        } catch (error) {
            Alert("error", error.message);
        }
        handleClose()
    } else {
        Alert("warning", "please fill project title and project")
    }
    dispatch(isLoaded());
}