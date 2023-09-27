/* 
filename:network.js
purpose:Api calls for backlog page
developers:G Naveen Kumar[N.K],Saty Siddha[S.S]

*/
import { isLoaded, isLoading, pendingTasks, sprints, unAssignedTasks, projects, users } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { allMessages, currentSptintTasks, activeSprint, involvedEmployees, modules, template, workingHours, workingDays } from "./actions";
import { MODULE, MAINTASK } from '../../Common/Headers';
import { addCommentUserStory } from '../Modules/network'

// import Moment from 'moment';

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
    // console.log(response)
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


export async function getAllTaskMessages(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("user_story_chat.php", {
      corp_code: getUser.corp,
      action: "getAllTaskMessages",
      "projectId": getUser.projectId
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
//for getting involved scrum team in active sprint
export async function getInvolvedEmployees(dispatch, getUser, moduleId) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_sprints.php", {
      "crop": getUser.corp,
      "moduleId": moduleId,
      "action": "get_involved_employees",
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(involvedEmployees(response.data))
    }
    else {
      dispatch(involvedEmployees([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//getting current and future modules
export async function getModules(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_sprints.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "action": "getModules",
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(modules(response.data))
      // getToDo(dispatch, getUser);
    }
    else {
      dispatch(modules([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

//for getting active sprint id
export async function getActiveSprints(dispatch, getUser) {
  dispatch(isLoading());
  try {
    // Current Active Sprint Name with epic by -->GNK -->01 on version 1.0.4 start
    // var response = await API.post("getSprints.php", {
    //   "crop": getUser.corp,
    //   "userType": getUser.role,
    //   "empId": getUser.empId,
    //   "action": "getActiveSprint"
    // }, {}, false);
    // Current Active Sprint Name with epic by -->GNK -->01 on version 1.0.4 end

    // Current Active Sprint witout epic by -->SS -->01 on version 1.0.6 start
    var response = await API.post("getUpdateSprint.php", {
      "crop": getUser.corp,
      "action": "get_sprints",
      "projectId": getUser.projectId
    }, {}, false);
    // Current Active Sprint witout epic by -->SS -->01 on version 1.0.6 end
    if (response.status === 'True') {
      const moduleId = response.data[0].moduleId
      dispatch(activeSprint(response.data[0]))
      getInvolvedEmployees(dispatch, getUser, moduleId);
      getCurrentSprint(dispatch, getUser, moduleId)
    }
    else {
      // getUnactiveSprintTasks(dispatch, getUser)
      dispatch(activeSprint([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

//for getting current sprint user stories

export async function getCurrentSprint(dispatch, getUser, sprintId) {
  dispatch(isLoading());
  try {
    var response = await API.post("backlogspage.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "sprintId": sprintId,
      "action": "currentsprint",
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'true') {
      getInvolvedEmployees(dispatch, getUser, sprintId);
      dispatch(currentSptintTasks(response.data))
    }
    else {
      dispatch(currentSptintTasks([]))
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
  dispatch(isLoaded());

}

//for getting recent sprint userstories
export async function getPending(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("backlogspage.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "action": "pending",
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'true') {
      dispatch(pendingTasks(response.data))
    }
    else {
      dispatch(pendingTasks([]))
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
}
//for getting unassigned user stories
export async function getUnassigned(dispatch, getUser) {

  dispatch(isLoading());
  try {
    var response = await API.post("backlogspage.php", {
      "crop": getUser.corp,
      "projectId": getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId
    }, {}, false);
    if (response.status === 'true') {
      dispatch(unAssignedTasks(response.data))
    }
    else {
      dispatch(unAssignedTasks([]))

    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
}


//For Completed MainTasks
// export async function getCompleted(dispatch, getUser, pending) {
//   dispatch(isLoading());
//   try {
//     var response = await API.post("getManageMaintaskstest.php", {
//       "crop": getUser.corp,
//       "userType": getUser.role,
//       "empId": getUser.empId,
//       action: "completed",
//     }, {}, false);
//     if (response.status === 'true') {
//       getManageTasks(dispatch, pending, response.data) //Call MainTask List
//       // dispatch(completedTasks(response.data))
//     }
//     else {
//       getManageTasks(dispatch, pending, [])
//     }
//   } catch (error) {
//     Alert('error', error.message);
//     dispatch(isLoaded());
//   }
// }
//For ManageTasks
// export async function getManageTasks(dispatch, pending, unassigned) {
//   dispatch(isLoading());
//   try {
//     dispatch(manageTasks(pending.concat(unassigned)))
//   } catch (error) {
//     Alert('error', error.message);
//   }
//   dispatch(isLoaded());
// }
export async function getProjects(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_epics.php", {
      "corp": getUser.corp,
      "userType": getUser.role,
      // "empId": getUser.empId,
      "action": "get_epics",
      "projectId": getUser.projectId
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

// to get active sprints in add to sprint model class
export async function getSprints(dispatch, getUser) {

  dispatch(isLoading());
  try {
    var response = await API.post("getUpdateSprint.php", {
      "crop": getUser.corp,
      "action": "getModules",
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(sprints(response.data))
      // getToDo(dispatch, getUser);
    }
    else {
      dispatch(sprints([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

export async function getKanbans(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post(
      "getUpdateSprint.php",
      {
        crop: getUser.corp,
        action: "getKanbanList",
        projectId: getUser.projectId,
      },
      {},
      false
    );
    if (response.status === "True") {
      dispatch(sprints(response.data));
    } else {
      dispatch(sprints([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());

}



//Add userstory to sprint
export async function addKanban(assignedto, taskId, state, dispatch, getUser, handleClose, device_id, assign_to, sprintDesc, title, storyPoints) {
  dispatch(isLoading());
  if (assignedto === null) {
    Alert(`warning', 'Assign squad member to ${MAINTASK}`);
  }
  else if (state.sprintSelected !== "") {
    try {
      var response = await API.post("getUpdateSprint.php", {
        crop: getUser.corp,
        action: "sprint_update",
        sprintId: state.sprintSelected.value,
        updatedBy: getUser.empId,
        userStoryId: taskId,
        "projectId": getUser.projectId,
        targetDate: '0001-01-01',
        device_id: device_id === null ? state.device_id : device_id,
        sprintDesc: sprintDesc,
        assign_to: assign_to === null ? state.userSelected : assign_to,
        emp_id: getUser.empId,
        title: title,
        storyPoints: storyPoints,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", "UPDATED");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "Something went wrong")
  }
}


//Add userstory to sprint
export async function addSprint(sprint_status, assignedto, currentDate, sprintTargetDate, targetDate, taskId, state, dispatch, getUser, handleClose, device_id, assign_to, sprintDesc, title, storyPoints) {
  dispatch(isLoading());
  if (assignedto === null) {
    Alert(`warning', 'Assign squad member to ${MAINTASK}`);
  }
  else if (targetDate < currentDate && currentDate && targetDate !== '') {
    Alert('warning', 'Select valid date');

  }
  else if (targetDate > sprintTargetDate && currentDate && targetDate !== '') {
    Alert('warning', `Target Date should not exceed ${MODULE} target date`);
  }
  else if (sprint_status === 'commited') {
    Alert('warning', `You cannot add more user stories to this Sprint as it is committed. If you would still like to add more user stories then change the status of the sprint to uncommitted`);
  }

  else if (state.sprintSelected !== "") {
    try {
      var response = await API.post("getUpdateSprint.php", {
        crop: getUser.corp,
        action: "sprint_update",
        sprintId: state.sprintSelected.value,
        updatedBy: getUser.empId,
        userStoryId: taskId,
        "projectId": getUser.projectId,
        targetDate: (targetDate === '') ? sprintTargetDate : targetDate,
        device_id: device_id === null ? state.device_id : device_id,
        sprintDesc: sprintDesc,
        assign_to: assign_to === null ? state.userSelected : assign_to,
        emp_id: getUser.empId,
        title: title,
        storyPoints: storyPoints,
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", "UPDATED");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "Something went wrong")
  }
}
//adding userstory to kanban
export async function addToKanban(currentDate, sprintTargetDate, targetDate, taskId, sprintId, state, dispatch, getUser, handleClose, device_id, assign_to, sprintDesc, title, player_id, storyPoints) {
  const message = `This ${MAINTASK} added in sprint ${(getUser.corp).substring(0, 3).toUpperCase()} - ${sprintDesc}`
  dispatch(isLoading());
  if (targetDate < currentDate && targetDate !== '') {
    Alert('warning', 'Select valid date');

  }
  else if (targetDate > sprintTargetDate && targetDate !== '') {
    Alert('warning', `Target Date shouild not exceed  ${MODULE} target date`);
  }
  else {

    try {
      var response = await API.post("getUpdateSprint.php", {
        crop: getUser.corp,
        action: "sprint_update",
        sprintId: sprintId,
        userStoryId: taskId,
        targetDate: (targetDate === '') ? sprintTargetDate : targetDate,
        "projectId": getUser.projectId,
        device_id: device_id === null ? state.device_id : device_id,
        player_id: player_id === null ? state.player_id : player_id,
        sprintDesc: sprintDesc,
        assign_to: assign_to === null ? state.userSelected : assign_to,
        emp_id: getUser.empId,
        title: title,
        storyPoints : storyPoints === '0' ? state.storySelected : storyPoints,
      }, {}, false);
      if (response.status === 'True') {
        addCommentUserStory(dispatch, getUser, taskId, message, "11");

        Alert("success", "UPDATED");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  }

}

export async function deleteSprint(state, dispatch, getUser, sprintId, handleClose, handleClose1) {
  dispatch(isLoading());
  try {
    const data = {
      moduleId: sprintId,
      action: "delete",
      crop: getUser.corp,
      empId: getUser.empId
    };
    const response = await API.post("manage_sprints.php", data, {}, false);
    if (response.status === 'True') {
      //dispatch(getModules(dispatch,getUser))
      //  updateDeletedSprintUserStories(dispatch,getUser,sprintId)
      Alert("success", 'deleted successfully');
      handleClose()
    }
    else {
      Alert("warning", response.message);
      handleClose1()
    }
  } catch (error) {
    Alert("error", error.message);
  }
  handleClose()
  dispatch(isLoaded());
}
//network call to move into archive
export async function moveToArchive(state, dispatch, getUser, sprintId, handleClose, handleClose1) {
  dispatch(isLoading());
  try {
    const data = {
      moduleId: sprintId,
      action: "move_to_archive",
      crop: getUser.corp,
      empId: getUser.empId
    };
    const response = await API.post("manage_sprints.php", data, {}, false);
    if (response.status === 'True') {
      //dispatch(getModules(dispatch,getUser))
      //  updateDeletedSprintUserStories(dispatch,getUser,sprintId)
      Alert("success", 'Moved Successfully');
      handleClose()
    }
    else {
      Alert("warning", response.message);
      handleClose1()
    }
  } catch (error) {
    Alert("error", error.message);
  }

  dispatch(isLoaded());
}

//network call to commit sprint
export async function commitSprint(action, state, dispatch, getUser, sprintId, handleClose, title, targetDate, startDate) {
  dispatch(isLoading());
  try {
    const data = {
      moduleId: sprintId,
      action: "commit_sprint",
      crop: getUser.corp,
      empId: getUser.empId,
      sprint_status: (action === 'uncommit_sprint') ? "pending" : "commited"
    };
    const response = await API.post("manage_sprints.php", data, {}, false);
    if (response.status === 'True') {
      var title1 = { 'moduleId': sprintId, 'moduleDesc': title, 'startDate': startDate, 'targetDate': targetDate, sprint_status: (action === 'uncommit_sprint') ? 'pending' : 'commited' }
      Alert("success", (action === 'uncommit_sprint') ? 'Uncommited Successfully' : 'Commited Successfully');
      handleClose(title1)
    }

  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}

// export async function updateDeletedSprintUserStories(dispatch,getUser,sprintId) {
//   dispatch(isLoading());
//       try {
//           const data = {
//             moduleId: sprintId,
//             empId: getUser.empId
//           };
//           await API.post("update_deleted_sprint_user_stories.php", data, {}, false);
//           Alert("success", 'deleted successfully');
//       } catch (error) {
//           Alert("error", error.message);
//       }
//       dispatch(isLoaded());
//     }
//remove from sprint

export async function removeFromSprint(taskId, sprintId, state, dispatch, getUser, handleClose, sprintDesc) {
  const message = `This ${MAINTASK} removed from sprint ${sprintDesc}`

  dispatch(isLoading());

  try {
    var response = await API.post("getUpdateSprint.php", {
      crop: getUser.corp,
      action: "remove_from_sprint",
      sprintId: sprintId,
      userStoryId: taskId,
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      addCommentUserStory(dispatch, getUser, taskId, message, "11");
      Alert("success", "UPDATED");
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
  handleClose()
}
export async function addEpic(taskId, state, dispatch, getUser, handleClose) {
  dispatch(isLoading());
  if (state.sprintSelected !== "") {
    try {
      var response = await API.post("getUpdateSprint.php", {
        crop: getUser.corp,
        action: "epic_update",
        epicId: state.epicSelected.value,
        updatedBy: getUser.empId,
        userStoryId: taskId,
        "projectId": getUser.projectId
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", "UPDATED");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "Something went wrong")
  }
}

export async function setDoing(dispatch, getUser, subtaskId, mainTaskId, handleClose) {
  dispatch(isLoading());
  try { //manageSubtasks.php
    var response = await API.post("get_tasks.php", {
      crop: getUser.corp,
      action: 'setSubtaskDoing',
      task_id: subtaskId,
      maintaskId: mainTaskId,
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'True') {

      Alert("success", 'status changed')
      handleClose()
    } else if (response.status === "false") {

      handleClose()
      Alert("warning", response.message)
    }
  } catch (error) {
    Alert('error', error.message);
    handleClose()
  }
  dispatch(isLoaded());
}
export async function setDone(dispatch, getUser, subtaskId, mainTaskId, handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_tasks.php", {
      crop: getUser.corp,
      action: 'setSubtaskDone',
      task_id: subtaskId,
      maintaskId: mainTaskId,
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", 'status changed')
      handleClose()
    } else if (response.status === "false") {
      handleClose()
      Alert("warning", response.message)
    }
  } catch (error) {
    Alert('error', error.message);
    handleClose()
  }
  dispatch(isLoaded());
}

export async function getWorkingHours(dispatch, getUser) {
  try {
    var response = await API.post(
      "get_user_stories.php",
      {
        projectId: getUser.projectId,
        action: "working_hours",
      },
      {},
      false
    );
    if (response.status === "True") {
      dispatch(workingHours(response.data));
    } else {
      dispatch(workingHours([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}

export async function getWorkingDays(dispatch, getUser) {
  try {
    var response = await API.post(
      "active_time.php",
      {
        projectId: getUser.projectId,
      },
      {},
      false
    );
    if (response.status === "True") {
      dispatch(workingDays(response.data));
    } else {
      dispatch(workingDays([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}

export async function getUsers(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      "projectId": getUser.projectId,
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