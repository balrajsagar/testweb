import { isLoaded, isLoading } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { modules } from "./actions";
import { PROJECT_SUCCESS } from "../../Common/Headers";

//For ToDo and Doing Subtask List based on task active status
export async function getModules(dispatch,getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("get_sprints.php", {
        "crop": getUser.corp,
        "userType": getUser.role,
        "empId": getUser.empId,
        "action": "getModules"
      },{},false);
      if(response.status === 'True') {
          dispatch(modules(response.data))
      }
      else{
        dispatch(modules([]))
      }
    } catch (error) {
      Alert('error',error.message);
    }
    dispatch(isLoaded());
  }
//Add New Module
  export async function addModule(state, dispatch,getUser,handleClose) {
    dispatch(isLoading());
    if ((state.moduleTitle.value !== "")) {
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
               dispatch(getModules(dispatch,getUser))
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