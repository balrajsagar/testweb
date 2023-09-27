import { isLoaded, isLoading, projects } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { modules } from "./actions";
import { MODULE_ADD, MODULE_MODIFY, MODULE_DELETE,KANBAN } from "../Headers";

//For ToDo and Doing Subtask List based on task active status
export async function getModules(dispatch,getUser,idea_id) {
    dispatch(isLoading());
    try {
      var response = await API.post("manage_sprints.php", {
        "crop": getUser.corp,
        "idea_id":idea_id,
        "action": "get"
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
    // console.log(id)
    // console.log(state.startDate.value,)
    if(state.date.value < state.startDate.value){
      Alert("warning", "End Date should be greater than Start Date")
    }
    else if (( state.moduleTitle.value !== "" && state.date.value !== "" && state.startDate.value !== ""  && !(state.moduleTitle.errorStatus) )) {
        try {
            const data = {
              module_Name: state.moduleTitle.value,
              empId: getUser.empId, //Async
              action: "add",
              targetDate: state.date.value,
              startDate:state.startDate.value,
              crop: getUser.corp,
              projectId: getUser.projectId
            };
            const response = await API.post("manage_sprints.php", data, {}, false);
            if (response.status === 'True') {
               dispatch(getModules(dispatch,getUser))
               Alert("success", MODULE_ADD);
            }
        } catch (error) {
            Alert("error", error.message);
        }
        handleClose()
    } else {
        Alert("warning", "please fill the required fields")
    }
    dispatch(isLoaded());
}

//Add new Kanban
export async function addKanban(state, dispatch,getUser,handleClose) {
  dispatch(isLoading());
 if (( state.moduleTitle.value !== "" && !(state.moduleTitle.errorStatus) )) {
      try {
          const data = {
            module_Name: state.moduleTitle.value,
            empId: getUser.empId, //Async
            action: "add",
            targetDate: '0001-01-01',
            startDate:'0001-01-01',
            crop: getUser.corp,
            projectId: getUser.projectId
          };
          const response = await API.post("manage_sprints.php", data, {}, false);
          if (response.status === 'True') {
            //  dispatch(getModules(dispatch,getUser))
             Alert("success", `${KANBAN} added`);
          }
          else{
            alert("something went wrong")
          }
      } catch (error) {
          Alert("error", error.message);
      }
      handleClose()
  } else {
      Alert("warning", "please fill the required fields")
  }
  dispatch(isLoaded());
}

//Add New Module
export async function modifyModule(state, dispatch,getUser,handleClose) {
  console.log(state)
  dispatch(isLoading());
  if ((state.moduleTitle.value !== "" && state.date.value !== "" && state.startDate.value !== "" )) {
      try {
          const data = {
            moduleId: state.moduleId.value,
            module_Name: state.moduleTitle.value,
            empId: getUser.empId, //Async
            action: "modify",
            targetDate: state.date.value,
            startDate:state.startDate.value,
            crop: getUser.corp
          };
          const response = await API.post("manage_sprints.php", data, {}, false);
          if (response.status === 'True') {
             //dispatch(getModules(dispatch,getUser))
             var title = { 'moduleId': state.moduleId.value, 'moduleDesc':state.moduleTitle.value, 'startDate':state.startDate.value, 'targetDate':state.date.value,sprint_status:state.sprint_status.value  }
             Alert("success", MODULE_MODIFY);
          }
      } catch (error) {
          Alert("error", error.message);
      }
      handleClose(title)
  } else {
      Alert("warning", "please fill the required fields")
  }
  dispatch(isLoaded());
}

//Delete Module
export async function deleteModule(dispatch,getUser,moduleId,ideaId,handleClose,handleModalClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manageModule.php", {
      crop: getUser.corp,
      moduleid: moduleId,
      idea_id:ideaId,
      action: "delete",
      empId:getUser.empId
    },{},false);
    if(response.status === 'True') {
      Alert("success", MODULE_DELETE)
      handleClose()
    }else if( response.status === "false")
    {
      handleModalClose()
      Alert("warning",response.message)
    }
    // handleClose()
  } catch (error) {
    Alert('error',error.message);
    handleClose()
  }
  dispatch(isLoaded());
}
//For Get Projects List
export async function getProjects(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_epics.php", {
      "corp": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "action": "get_epics"
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