import { isLoaded, isLoading, users, projects, agileProjects } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { ADD_TO_TODO_PROJECTS, SUBTASK_MODIFY, SUBTASK_DELETE, SUBTASK_COMPLETE } from "../Headers";

export async function getProjects(dispatch, getUser,projectId) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_epics.php", {
      "corp": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "action": "get_epics",
      "projectId":projectId
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


//For Getting Users List(Team)
export async function getUsers(dispatch, getUser,projectId) {
    dispatch(isLoading());
    try {
      var response = await API.post("agile_squads.php", {
        "crop": getUser.corp,
        "projectId":projectId,
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
 // GNK --> start 01
  // Squads List Getting Based on UserName
  export async function getAgileProjects(dispatch,empId){
    try {
      var response = await API.post("squads.php", {
        empId: empId,
        action:"get_squads"
      }, {}, false);
      if (response.status === 'True') {
        dispatch(agileProjects(response.data))
      } else {
        dispatch(agileProjects([]))
      }
    } catch (error) {
    }
  }
//For Add Private ToDo(Task) Only
export async function addPrivateToDo(state, dispatch, getUser,handleClose) {
    dispatch(isLoading());
     if (state.taskTitle.value.trim() !== "" ) {
      try {
        var response = await API.post("private_todo.php", {
          crop: getUser.corp,
          action: "personal_todo_add",
          title: state.taskTitle.value,
          description: state.taskDescription.value,
          added_to: state.userSelected,
          added_by: getUser.empId,
          acceptanceCriteria: state.acceptanceCriteria.value,
          storyPoints: state.storySelected,
          priorityLevel: state.prioritySelected,  
        }, {}, false);
        if (response.status === 'True') {
          Alert("success", "Personal ToDo added successfully ");
        }
      } catch (error) {
        Alert('error', error.message);
        dispatch(isLoaded());
      }
      handleClose()
    }
   
    else {
      Alert("warning", "Please enter required fields ")
      dispatch(isLoaded());
    }
  }
// Modify Private ToDo (Task)
 export async function modifyPrivateToDo(state, dispatch, getUser,handleClose,pt_id) {
    dispatch(isLoading());
     if (state.taskTitle.value.trim() !== "" ) {
      try {
        var response = await API.post("private_todo.php", {
          action: "personal_todo_modify",
          title: state.taskTitle.value,
          description: state.taskDescription.value,
          added_by: getUser.empId,
          acceptanceCriteria: state.acceptanceCriteria.value,
          storyPoints: state.storySelected,
          priorityLevel: state.prioritySelected,
          pt_id:pt_id  
        }, {}, false);
        if (response.status === 'True') {
          Alert("success", SUBTASK_MODIFY);
        }
      } catch (error) {
        Alert('error', error.message);
        dispatch(isLoaded());
      }
      handleClose()
    }
   
    else {
      Alert("warning", "Please enter required fields ")
      dispatch(isLoaded());
    }
  }
//Add ToDo to Project (Task)
export async function addTodoToProject(state, dispatch, getUser,handleClose, pt_id,storyTitle) {
    if(storyTitle === state.taskTitle.value){
      Alert("warning", "Please change user story title ")
      dispatch(isLoaded());
    }else if(state.agileProjectSelected !== ""){
    dispatch(isLoading());
     if (state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
      try {
        var response = await API.post("private_todo.php", {
          crop: getUser.corp,
          action: "add",
          title: state.taskTitle.value,
          description: state.taskDescription.value,
          added_by: getUser.empId,
          acceptanceCriteria: state.acceptanceCriteria.value,
          added_to: state.userSelected === "" ? state.id.value : state.userSelected,
          storyPoints: state.storySelected === "" ? state.storyPoints.value : state.storySelected,
          priorityLevel: state.prioritySelected === "" ? state.priorityLevel.value : state.prioritySelected,
          idea_id: state.epicSelected === "" ? state.ideaId.value : state.epicSelected,
          projectId:state.agileProjectSelected,
          device_id: state.device_id,
          pt_id:pt_id
        }, {}, false);
        if (response.status === 'True') {
          Alert("success", ADD_TO_TODO_PROJECTS);
        }
      } catch (error) {
        Alert('error', error.message);
        dispatch(isLoaded());
      }
      handleClose()
    }
   
    else {
      Alert("warning", "Please enter required fields ")
      dispatch(isLoaded());
    }
  }else{
    Alert("warning", "Please select the Agile Project ")
    dispatch(isLoaded());
  }
  } 
//Delete Task
export async function deletePrivateToDo(state, dispatch, getUser, pt_id, handleClose) {
  dispatch(isLoading());
    try {
      var response = await API.post("private_todo.php", {
        action: "delete",
        pt_id: pt_id,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", SUBTASK_DELETE);
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
} 
//Delete Task
export async function completePrivateToDo(state, dispatch, getUser, pt_id, handleClose) {
  dispatch(isLoading());
    try {
      var response = await API.post("private_todo.php", {
        action: "complete",
        pt_id: pt_id,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", SUBTASK_COMPLETE);
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
} 