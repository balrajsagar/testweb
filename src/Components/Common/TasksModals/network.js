import { isLoaded, isLoading, manageTasks, users, allMessages, projects, template } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { MAINTASK_ADD, MAINTASK_MODIFY, MAINTASK_DELETE, MAINTASK_REASSIGN ,MODULE,MAINTASK} from "../Headers";
// import Moment from 'moment';


export async function getProjects(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_epics.php", {
      "corp": getUser.corp,
      "userType": "all",
      "empId": getUser.empId,
      "action": "get_epics",
      "projectId":getUser.projectId
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
export async function getAllTaskMessages(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("mainTaskChat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(allMessages(response.data));
    } else {
      dispatch(allMessages([]));
    }
  } catch (error) {
    Alert('error', error.message)
  }
  dispatch(isLoaded());
}

//For Getting Users List(Team)
export async function getUsers(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      "projectId":getUser.projectId,
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

//For Get MainTask List From Modules
export async function getModuleMainTasks(dispatch, getUser, moduleId) {
  dispatch(isLoading());
  try {
    var response = await API.post("getModuleMaintasks.php", {
      crop: getUser.corp,
      moduleId: moduleId,
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(manageTasks(response.data))
    }
    else {
      dispatch(manageTasks([]))
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
  dispatch(isLoaded());
}

//For Add MainTask To Kanban
export async function addMainTaskToKanban(sprintData,state, dispatch, getUser,handleClose) {
  dispatch(isLoading());
  if (state.epicSelected !== "" && state.userSelected !=="" && state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
    try {
      var response = await API.post("manage_userstories.php", {
        crop: getUser.corp,
        module_id:sprintData.moduleId,
        action: "addMainTaskToKanban",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        added_to: state.userSelected,
        added_by: getUser.empId,
        acceptanceCriteria: state.acceptanceCriteria.value,
        storyPoints: state.storySelected === "" ? '0' : state.storySelected,
        priorityLevel: state.prioritySelected === "" ? '0' : state.prioritySelected,
        idea_id: state.epicSelected,
        "projectId":getUser.projectId,
        device_id: state.device_id,
        player_id: state.player_id,

      }, {}, false);
      if (response.status === 'True') {
        Alert("success", MAINTASK_ADD);
      }
      else{
        alert(`something went wrong, ${MAINTASK} is already present`)
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
//For Add MainTask
export async function addMainTask(state, dispatch, getUser,handleClose) {
  dispatch(isLoading());
  if (state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
    try {
      var response = await API.post("manage_userstories.php", {
        crop: getUser.corp,
        action: "add",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        added_to: state.userSelected,
        added_by: getUser.empId,
        acceptanceCriteria: state.acceptanceCriteria.value,
        storyPoints: state.storySelected === "" ? '0' : state.storySelected,
        priorityLevel: state.prioritySelected === "" ? '0' : state.prioritySelected,
        idea_id: state.epicSelected,
        "projectId":getUser.projectId,
        device_id: state.device_id,
        player_id: state.player_id,

      }, {}, false);
      if (response.status === 'True') {
        Alert("success", MAINTASK_ADD);
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
//For Modify MainTask
export async function modifyMainTask(backlogs,activeStatus,currentDate,sprintTargetDate,state, dispatch, getUser, ideaId, moduleId, handleClose) {
  dispatch(isLoading());
  if (state.targetDate.value < currentDate && backlogs === '1') {
    dispatch(isLoaded());
    Alert('warning', 'Select valid date');

  }
  else if(state.targetDate.value  > sprintTargetDate && backlogs === '1'){
    dispatch(isLoaded());
    Alert('warning', `Target Date should not exceed ${MODULE} target date`);
  }
  // else if(state.id.value === null && state.userSelected === ''){
  //   dispatch(isLoaded());
  //   Alert('warning', `Select the Squad Member to assign ${MAINTASK}`);
  // }
  else if (state.taskTitle.value !== "" && state.taskDescription.value !== "" && state.acceptanceCriteria.value !== "") {
    try {
      var response = await API.post("manage_userstories.php", {
        crop: getUser.corp,
        action: "modify",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        acceptanceCriteria: state.acceptanceCriteria.value,
        targetDate: state.targetDate.value === null ? currentDate : state.targetDate.value,
        module_id: state.moduleId.value,
        idea_id: state.epicSelected === "" ? state.ideaId.value : state.epicSelected,
        added_to: state.userSelected === "" ? state.id.value : state.userSelected,
        added_by: getUser.empId,
        mainTaskId: state.taskId.value,
        storyPoints: state.storySelected === "" ? state.storyPoints.value : state.storySelected,
        priorityLevel: state.prioritySelected === "" ? state.priorityLevel.value : state.prioritySelected,
        "projectId":getUser.projectId,
        assignedTo:state.id.value,
        change_assign:state.userSelected,
        activeStatus:activeStatus,
        device_id: state.device_id,
        player_id: state.player_id,

      }, {}, false);
      if (response.status === 'True') {
        // dispatch(getModuleMainTasks(dispatch, getUser, moduleId))
        Alert("success", MAINTASK_MODIFY);
      }
      else{
        Alert("warning", response.message);
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "please give all the details")
  }
}
//For Modify MainTask
export async function reassignMainTask(backlogs,activeStatus,currentDate,sprintTargetDate,state, dispatch, getUser, ideaId, moduleId, handleClose) {
  dispatch(isLoading());
  if(!state.targetDate.value){
    dispatch(isLoaded());
    Alert('error', 'Select Target date');
  }
  else if (state.targetDate.value < currentDate) {
    dispatch(isLoaded());
    Alert('error', 'Select valid date');

  }
  else if(state.targetDate.value  > sprintTargetDate && backlogs === '1'){
    dispatch(isLoaded());
    Alert('error', `Target Date should not exceed ${MODULE} target date`);
  }
 else if (state.taskTitle.value !== "" && state.taskDescription.value !== "" && state.acceptanceCriteria.value !== "") {
    try {
      var response = await API.post("manage_userstories.php", {
        crop: getUser.corp,
        action: "reassign",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        acceptanceCriteria: state.acceptanceCriteria.value,
        module_id: state.moduleId.value,
        idea_id: state.epicSelected === "" ? state.ideaId.value : state.epicSelected,
        added_to: state.userSelected === "" ? state.id.value : state.userSelected,
        added_by: getUser.empId,
        mainTaskId: state.taskId.value,
        storyPoints: state.storySelected === "" ? state.storyPoints.value : state.storySelected,
        priorityLevel: state.prioritySelected === "" ? state.priorityLevel.value : state.prioritySelected,
        "projectId":getUser.projectId,
        targetDate: state.targetDate.value,
        device_id: state.device_id,
        player_id: state.player_id,

      }, {}, false);
      if (response.status === 'True') {
        addCommentUserStory(dispatch, getUser, state.taskId.value, "User story Reassigned", "5")
        // dispatch(getModuleMainTasks(dispatch, getUser, moduleId))
        // Alert("success", MAINTASK_REASSIGN);
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "please give all the details")
  }
}


export async function deleteMainTask(dispatch, getUser, maintaskId, moduleId, handleClose, handleModalClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("tasksDelete.php", {
      "crop": getUser.corp,
      action: 'maintaskdelete',
      maintaskId: maintaskId,
      moduleId: moduleId,
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", MAINTASK_DELETE)
      handleClose()
    } else if (response.status === "false") {
      handleModalClose()
      Alert("warning", response.message)
    }
    else {
      // console.log(response)
    }
  } catch (error) {
    Alert('error', error.message);
    handleClose()
  }
  dispatch(isLoaded());
}
//Add Comments for UserStory  Where We Have and Who can Add comments for that
export async function addCommentUserStory(dispatch, getUser, userStoryId, message,cardId) {

  dispatch(isLoading());
  try {
    const response = await API.post("story_comments.php", {
      action: "add_story_comment",
      storyId: userStoryId,
      corp: getUser.corp,
      userId: getUser.empId,
      message: message,
      cardId: cardId,
      "projectId":getUser.projectId
    }, {}, false);
    // console.log(response)
    if (response.status === "True") {
      Alert("success", MAINTASK_REASSIGN);

    } else {
      Alert('warning', response.message)
    }
  }
  catch (error) {
    Alert('error', error.message)
  }
  dispatch(isLoaded());
}



// Rohini (Template)
//For Add MainTask as template
export async function addMainTaskTemplate(state, dispatch, getUser,handleClose) {
  dispatch(isLoading());
  if (state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
    try {
      var response = await API.post("manage_template.php", {
        crop: getUser.corp,
        action: "add",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        added_to: state.userSelected,
        added_by: getUser.empId,
        acceptanceCriteria: state.acceptanceCriteria.value,
        storyPoints: state.storySelected,
        priorityLevel: state.prioritySelected,
        idea_id: state.epicSelected,
        "projectId":getUser.projectId,
        device_id: state.device_id,
        player_id: state.player_id,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", MAINTASK_ADD);
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
// get templates
export async function getTemplate(dispatch, getUser) {
    dispatch(isLoading());
      try {
        var response = await API.post("manage_template.php", {
          "crop": getUser.corp,
          projectId: getUser.projectId,
          action: 'getTemplateTemp',
          sendBy: getUser.empId
          // "empId": getUser.empId,
        }, {}, false);
        if (response.status === 'True') {
          dispatch(template(response.data))
        }
        else {
          dispatch(template([]))
        }
      } catch (error) {
        Alert('error', error.message);
      }
    dispatch(isLoaded());
  }

// Add user story from Template
export async function addUserStoryTemplate(state, dispatch, getUser,handleClose, storyTitle) {
  if(storyTitle !== state.taskTitle.value){
  dispatch(isLoading());
   if (state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
    try {
      var response = await API.post("manage_userstories.php", {
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
        "projectId":getUser.projectId,
        device_id: state.device_id,
        player_id: state.player_id,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", MAINTASK_ADD);
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
  Alert("warning", "Please change user story title ")
  dispatch(isLoaded());
}
}

//add template from template
export async function addTemplate(state, dispatch, getUser,handleClose, storyTitle) {
  if (storyTitle !== state.taskTitle.value){
  dispatch(isLoading());
  if (state.taskTitle.value === "" && state.id.value === "") {
    Alert("warning", "Please enter required fields")
    dispatch(isLoaded());
  }
  else if (state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
    try {
      var response = await API.post("manage_template.php", {
        crop: getUser.corp,
        action: "add",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        added_by: getUser.empId,
        acceptanceCriteria: state.acceptanceCriteria.value,
        "projectId":getUser.projectId,
        device_id: state.device_id,
        player_id: state.player_id,
        added_to: state.userSelected === "" ? state.id.value : state.userSelected,
        storyPoints: state.storySelected === "" ? state.storyPoints.value : state.storySelected,
        priorityLevel: state.prioritySelected === "" ? state.priorityLevel.value : state.prioritySelected,
        idea_id: state.epicSelected === "" ? state.ideaId.value : state.epicSelected,

      }, {}, false);
      if (response.status === 'True') {
        Alert("success", MAINTASK_ADD);
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
  Alert("warning", "Please change user story title ")
    dispatch(isLoaded());
}
}

// delete template
export async function deleteTemplate(state, dispatch, getUser, id, handleClose) {
  dispatch(isLoading());
    try {
      var response = await API.post("manage_template.php", {
        crop: getUser.corp,
        action: "delete",
        us_id: id,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", "Template deleted successfully!");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
}

//For edit template
export async function editUserstoryTemplate(state, dispatch, getUser,handleClose, us_id) {
  dispatch(isLoading());
   if (state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
    try {
      var response = await API.post("manage_template.php", {
        // var response = await API.post("", {
        crop: getUser.corp,
        action: "editTemplate",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        added_by: getUser.empId,
        acceptanceCriteria: state.acceptanceCriteria.value,
        "projectId":getUser.projectId,
        device_id: state.device_id,
        player_id: state.player_id,
        us_id: us_id,
        added_to: state.userSelected === "" ? state.id.value : state.userSelected,
        storyPoints: state.storySelected === "" ? state.storyPoints.value : state.storySelected,
        priorityLevel: state.prioritySelected === "" ? state.priorityLevel.value : state.prioritySelected,
        idea_id: state.epicSelected === "" ? state.ideaId.value : state.epicSelected,

      }, {}, false);
      // console.log(response)
      if (response.status === 'True') {
        Alert("success", "Template updated successfully");
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

//For Add template Only
export async function addTemplateOnly(state, dispatch, getUser,handleClose) {
  dispatch(isLoading());
   if (state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
    try {
      var response = await API.post("manage_template.php", {
        crop: getUser.corp,
        action: "templateOnly",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        added_to: state.userSelected,
        added_by: getUser.empId,
        acceptanceCriteria: state.acceptanceCriteria.value,
        storyPoints: state.storySelected,
        priorityLevel: state.prioritySelected,
        idea_id: state.epicSelected,
        "projectId":getUser.projectId,
        device_id: state.device_id,
        player_id: state.player_id,
      }, {}, false);
      // console.log("response",response)
      if (response.status === 'True') {
        Alert("success", "Template added successfully ");
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
//for add template only for modifyTemplate.js
export async function addTemplateOnlyMod(state, dispatch, getUser,handleClose, storyTitle) {
  dispatch(isLoading());
  if (storyTitle === state.taskTitle.value){
    Alert("warning", "Please change user story title ")
    dispatch(isLoaded());
  }else if (state.taskTitle.value.trim() !== "" && state.taskDescription.value.trim() !== "" && state.acceptanceCriteria.value.trim() !== "") {
    try {
      var response = await API.post("manage_template.php", {
        crop: getUser.corp,
        action: "templateOnly",
        title: state.taskTitle.value,
        description: state.taskDescription.value,
        added_to: state.userSelected,
        added_by: getUser.empId,
        acceptanceCriteria: state.acceptanceCriteria.value,
        storyPoints: state.storySelected,
        priorityLevel: state.prioritySelected,
        idea_id: state.epicSelected,
        "projectId":getUser.projectId,
        device_id: state.device_id,
        player_id: state.player_id,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", "Template added successfully ");
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