import {
  involvedEmployees,
  isLoaded,
  isLoading,
  allMessages,
  todo,
  doing,
  done,
  roadblock,
  userRoadblock,
  activeSprint,
  todoFilter,
  doingFilter,
  doneFilter,
  roadblockFilter,
  workingHours,
  workingDays,
} from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { modules } from "./actions";
import { PROJECT_SUCCESS, MAINTASK } from "../../Common/Headers";
import store from "../../Common/Store";



//For ToDo and Doing Subtask List based on task active status
export async function getModules(dispatch, getUser) {
  dispatch(isLoading());
  try {
    // Future Sprints Name list with epic by -->GNK -->01 on version 1.0.4 start

    // var response = await API.post("get_sprints.php", {
    //   "crop": getUser.corp,
    //   "userType": getUser.role,
    //   "empId": getUser.empId,
    //   "action": "getModules"
    // }, {}, false);
    // Future Sprints Name list with epic by -->GNK -->01 on version 1.0.4 end

    // Future Sprints Name list with out epic by -->SS -->02 on version 1.0.6 start
    var response = await API.post(
      "getUpdateSprint.php",
      {
        crop: getUser.corp,
        action: "getModules",
        projectId: getUser.projectId,
      },
      {},
      false
    );
    // Future Sprints Name list with out epic by -->SS -->02 on version 1.0.6 end
    if (response.status === "True") {
      dispatch(modules(response.data));
    } else {
      store.dispatch(modules([]));
    }
  } catch (error) {
    Alert("error", error.message);
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
      dispatch(modules(response.data));
    } else {
      store.dispatch(modules([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());

}

export async function getActiveKanbans(dispatch, getUser, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    // Current Active Sprint Name with epic by -->GNK -->01 on version 1.0.4 start
    // var response = await API.post("getSprints.php", {
    //   "crop": getUser.corp,
    //   "userType": getUser.role,
    //   "empId": getUser.empId,
    //   "action": "getActiveSprint"
    // }, {}, false);
    // Current Active Sprint Name with epic by -->GNK -->01 on version 1.0.4 end

    // Current Active Sprint with out epic by -->SS -->01 on version 1.0.6 start
    var response = await API.post(
      "getUpdateSprint.php",
      {
        crop: getUser.corp,
        action: "get_kanbans",
        projectId: getUser.projectId,
      },
      {},
      false
    );
    // Current Active Sprint with out epic by -->SS -->01 on version 1.0.6 end
    if (response.status === "True") {
      const moduleId = response.data[0].moduleId;
      // console.log( response.data[0])
      store.dispatch(activeSprint(response.data[0]));
      getToDo(dispatch, getUser, moduleId, refresh);
      getRoadBlockToKanban(dispatch, getUser, moduleId, refresh);
      getDoneToKanban(dispatch, getUser, moduleId, refresh);
      getInvolvedEmployees(dispatch, getUser, moduleId, refresh);
    } else {
      store.dispatch(todo([]));
      store.dispatch(doing([]));
      store.dispatch(todoFilter([]));
      store.dispatch(doingFilter([]));
      store.dispatch(roadblock([]));
      store.dispatch(roadblockFilter([]));
      store.dispatch(activeSprint([]));
      store.dispatch(done([]));
      store.dispatch(doneFilter([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}
export async function getActiveSprints(dispatch, getUser, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    // Current Active Sprint Name with epic by -->GNK -->01 on version 1.0.4 start
    // var response = await API.post("getSprints.php", {
    //   "crop": getUser.corp,
    //   "userType": getUser.role,
    //   "empId": getUser.empId,
    //   "action": "getActiveSprint"
    // }, {}, false);
    // Current Active Sprint Name with epic by -->GNK -->01 on version 1.0.4 end

    // Current Active Sprint with out epic by -->SS -->01 on version 1.0.6 start
    var response = await API.post(
      "getUpdateSprint.php",
      {
        crop: getUser.corp,
        action: "get_sprints",
        projectId: getUser.projectId,
      },
      {},
      false
    );
    // Current Active Sprint with out epic by -->SS -->01 on version 1.0.6 end
    if (response.status === "True") {
      const moduleId = response.data[0].moduleId;
      // console.log( response.data[0])
      store.dispatch(activeSprint(response.data[0]));
      getToDo(dispatch, getUser, moduleId, refresh);
      getRoadBlock(dispatch, getUser, moduleId, refresh);
      getDone(dispatch, getUser, moduleId, refresh);
      getInvolvedEmployees(dispatch, getUser, moduleId, refresh);
    } else {
      store.dispatch(todo([]));
      store.dispatch(doing([]));
      store.dispatch(todoFilter([]));
      store.dispatch(doingFilter([]));
      store.dispatch(roadblock([]));
      store.dispatch(roadblockFilter([]));
      store.dispatch(activeSprint([]));
      store.dispatch(done([]));
      store.dispatch(doneFilter([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}
export async function getInvolvedEmployees(dispatch, getUser, moduleId, refresh) {
  // console.log(moduleId)
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "get_sprints.php",
      {
        crop: getUser.corp,
        moduleId: moduleId,
        action: "get_involved_employees",
        projectId: getUser.projectId,
      },
      {},
      false
    );
    if (response.status === "True") {
      dispatch(involvedEmployees(response.data));
      // console.log(response.data)
    } else {
      dispatch(involvedEmployees([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}
//Add New Module
export async function addModule(state, dispatch, getUser, handleClose) {
  dispatch(isLoading());
  if (state.moduleTitle.value !== "") {
    try {
      const data = {
        proj_title: state.projectTitle.value,
        proj_desc: state.projectDescription.value,
        empId: getUser.empId, //Async
        action: "add",
        corp: getUser.corp,
      };
      const response = await API.post("manage_epics.php", data, {}, false);
      if (response.status === "True") {
        dispatch(getModules(dispatch, getUser));
        Alert("success", PROJECT_SUCCESS);
      }
    } catch (error) {
      Alert("error", error.message);
    }
    handleClose();
  } else {
    Alert("warning", "please fill project title and project");
  }
  dispatch(isLoaded());
}

export async function updateChat(sno, dispatch, getUser) {
  const msgId = sno
    ? sno.map((msgId, index) => {
      return msgId.sno;
    })
    : null;
  dispatch(isLoading());
  try {
    // eslint-disable-next-line
    var response = await API.post(
      "user_story_chat.php",
      {
        action: "updateChat",
        corp_code: getUser.corp,
        messagedBy: getUser.empId,
        msgId: msgId ? msgId : " ",
      },
      {},
      false
    );
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}

export async function getAllTaskMessages(dispatch, getUser, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "user_story_chat.php",
      {
        corp_code: getUser.corp,
        action: "getAllTaskMessages",
      },
      {},
      false
    );
    // console.log(response.data)
    if (response.status === "True") {
      dispatch(allMessages(response.data));
      store.dispatch(allMessages(response.data));
    } else {
      dispatch(allMessages([]));
    }
  } catch (error) {
    Alert("error", error.message);
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
      store.dispatch(workingHours(response.data));
    } else {
      dispatch(workingHours([]));
      store.dispatch(workingHours([]));
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
      store.dispatch(workingDays(response.data));
    } else {
      dispatch(workingDays([]));
      store.dispatch(workingDays([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}

//For ToDo and Doing Subtask List based on task active status
export async function getToDo(dispatch, getUser, moduleId, refresh) {
  // console.log(moduleId,getUser.corp)
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "get_user_stories.php",
      {
        crop: getUser.corp,
        moduleId: moduleId,
        action: "pending",
        projectId: getUser.projectId,
        userType: getUser.role,
        empId: getUser.empId,
      },
      {},
      false
    );
    var toDoList = [];
    var doingList = [];

    response.data.map((pending) => {
      return pending.activeStatus === "0"
        ? toDoList.push(pending)
        : pending.activeStatus === "1"
          ? doingList.push(pending)
          : null;
    });
    store.dispatch(todo(toDoList));
    store.dispatch(doing(doingList));
    store.dispatch(todoFilter(toDoList));
    store.dispatch(doingFilter(doingList));
  } catch (error) {
    console.log(error);
  }

  dispatch(isLoaded());
}
//For Doing Subtask List
export async function getDoing(dispatch, getUser, moduleId, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "get_user_stories.php",
      {
        crop: getUser.corp,
        userType: getUser.role,
        empId: getUser.empId,
        moduleId: moduleId,
        action: "completed",
      },
      {},
      false
    );

    store.dispatch(doing(response.data));
    store.dispatch(doingFilter(response.data));
  } catch (error) {
    console.log(error);
  }

  dispatch(isLoaded());
}
//For Completed Tasks List
export async function getDone(dispatch, getUser, moduleId, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "get_user_stories.php",
      {
        crop: getUser.corp,
        userType: getUser.role,
        empId: getUser.empId,
        moduleId: moduleId,
        action: "completed",
        projectId: getUser.projectId,
      },
      {},
      false
    );
    // console.log(response)
    if (response.status === "True") {
      store.dispatch(done(response.data));
      store.dispatch(doneFilter(response.data));
    } else {
      store.dispatch(done([]));
      store.dispatch(doneFilter([]));
    }
  } catch (error) {
    console.log(error);
  }

  dispatch(isLoaded());
}

//For Kanban Completed Tasks List
export async function getDoneToKanban(dispatch, getUser, moduleId, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "get_user_stories.php",
      {
        crop: getUser.corp,
        userType: getUser.role,
        empId: getUser.empId,
        moduleId: moduleId,
        action: "kanban_completed",
        projectId: getUser.projectId,
      },
      {},
      false
    );
    // console.log(response)
    if (response.status === "True") {
      store.dispatch(done(response.data));
      store.dispatch(doneFilter(response.data));
    } else {
      store.dispatch(done([]));
      store.dispatch(doneFilter([]));
    }
  } catch (error) {
    console.log(error);
  }

  dispatch(isLoaded());
}

//For RoadBlock List
export async function getRoadBlock(dispatch, getUser, moduleId, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "get_user_stories.php",
      {
        crop: getUser.corp,
        action: "roadBlock",
        moduleId: moduleId,
        projectId: getUser.projectId,
        userType: getUser.role,
        empId: getUser.empId
      },
      {},
      false
    );
    // console.log(response)
    if (response.message === "No Data Available") {
      store.dispatch(roadblock([]));
      store.dispatch(roadblockFilter([]));
    } else {
      if (!response.data) {
        store.dispatch(roadblock([]));
        store.dispatch(roadblockFilter([]));
      } else {
        store.dispatch(roadblock(response.data));
        store.dispatch(roadblockFilter(response.data));
      }
    }
  } catch (error) {
  }

  dispatch(isLoaded());
}
export async function getRoadBlockToKanban(dispatch, getUser, moduleId, refresh) {
  if (refresh) { dispatch(isLoading()); }
  try {
    var response = await API.post(
      "get_user_stories.php",
      {
        crop: getUser.corp,
        action: "roadBlockToKanban",
        moduleId: moduleId,
        projectId: getUser.projectId,
        userType: getUser.role,
        empId: getUser.empId
      },
      {},
      false
    );
    // console.log(response)
    if (response.message === "No Data Available") {
      store.dispatch(roadblock([]));
      store.dispatch(roadblockFilter([]));
    } else {
      if (!response.data) {
        store.dispatch(roadblock([]));
        store.dispatch(roadblockFilter([]));
      } else {
        store.dispatch(roadblock(response.data));
        store.dispatch(roadblockFilter(response.data));
      }
    }
  } catch (error) {
  }

  dispatch(isLoaded());
}
//RoadBlock List
export async function getUserRoadblocks(dispatch, getUser, subTaskId) {
  dispatch(isLoading());
  try {
    var response = await API.post(
      "userRoadblocks.php",
      {
        crop: getUser.corp,
        action: "getting",
        subTaskId: subTaskId,
      },
      {},
      false
    );
    if (response.status === "True") {
      dispatch(userRoadblock(response.data));
    } else {
      dispatch(userRoadblock([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}
export async function getActive(
  dispatch,
  getUser,
  story_id,
  moduleId,
  handleClose,
  handleOpen,
  message
) {
  dispatch(isLoading());
  try {
    var response = await API.post(
      "manage_userstories.php",
      {
        crop: getUser.corp,
        story_id: story_id,
        empId: getUser.empId,
        action: "activate_user_story",
      },
      {},
      false
    );
    if (response.status === "true") {
      getCurrentSprintUserStories(dispatch, getUser, moduleId);
      addCommentUserStory(dispatch, getUser, story_id, message, "1");
      handleClose();

    } else if (response.status === "true1") {
      handleClose();
      const data = { inprogressStoryId: response.data, todoStoryId: story_id, currentSprint: moduleId, assignedTo: response.assignedTo, projectName: response.project_name, story_title: response.story_title, inprogress_story_title: response.inprogress_story_title }
      handleOpen("changeUserstoryStatus", data)

    } else {
      Alert("warning", response.message);

    }
  } catch (error) {
    console.log(error);
  }

  dispatch(isLoaded());

}
export async function getActiveToKanban(
  dispatch,
  getUser,
  story_id,
  moduleId,
  handleClose,
  handleOpen,
  message
) {
  dispatch(isLoading());
  try {
    var response = await API.post(
      "manage_userstories.php",
      {
        crop: getUser.corp,
        story_id: story_id,
        empId: getUser.empId,
        action: "activate_user_story",
      },
      {},
      false
    );
    if (response.status === "true") {
      getCurrentSprintUserStoriesToKanban(dispatch, getUser, moduleId);
      addCommentUserStory(dispatch, getUser, story_id, message, "1");
      handleClose();

    } else if (response.status === "true1") {
      handleClose();
      const data = { inprogressStoryId: response.data, todoStoryId: story_id, currentSprint: moduleId, assignedTo: response.assignedTo, projectName: response.project_name, story_title: response.story_title, inprogress_story_title: response.inprogress_story_title }
      handleOpen("changeUserstoryStatus", data)

    } else {
      Alert("warning", response.message);

    }
  } catch (error) {
    console.log(error);
  }

  dispatch(isLoaded());

}
export async function updateUserstotyStaus(state, dispatch, getUser, todoStoryId, inProgressStoryId, moduleId, assignedTo, handleClose) {
  // console.log(todoStoryId+'\n'+inProgressStoryId+'\n'+moduleId)
  dispatch(isLoading());
  const message = `${MAINTASK} in progress`;
  const message1 = `${MAINTASK} moved into To Do`;
  try {
    var response = await API.post(
      "manage_userstories.php",
      {
        crop: getUser.corp,
        empId: getUser.empId,
        todoStoryId: todoStoryId,
        inprogressStoryId: inProgressStoryId,
        action: "change_userstory_status",
        assignedTo: assignedTo
      },
      {},
      false
    );
    if (response.status === "true") {
      getCurrentSprintUserStories(dispatch, getUser, moduleId);
      addCommentUserStory(dispatch, getUser, todoStoryId, message, "1");
      addCommentUserStory(dispatch, getUser, inProgressStoryId, message1, "10");
      handleClose();

    } else {
      Alert("warning", response.message);

    }
  } catch (error) {
    Alert("warning", error);

  }

  dispatch(isLoaded());
  handleClose()

}
//Update the Task Status
export async function updateUserStory(
  dispatch,
  getUser,
  userStoryId,
  sprintId,
  handleClose, message
) {
  dispatch(isLoading());
  try {
    const response = await API.post(
      "manage_userstories.php",
      {
        action: "update",
        task_id: userStoryId,
        crop: getUser.corp,
        task_status: 100,
        task_status_desc: "completed",
        task_complete_status: 1,
        empId: getUser.empId,
      },
      {},
      false
    );
    if (response.status === "True") {
      getCurrentSprintUserStories(dispatch, getUser, sprintId);
      addCommentUserStory(dispatch, getUser, userStoryId, message, "2");
      // Alert('success', "")
    } else {
      Alert("warning", response.message);
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
  handleClose();
}


//Update the Task Status
export async function updateUserStoryToKanban(
  dispatch,
  getUser,
  userStoryId,
  sprintId,
  handleClose, message
) {
  dispatch(isLoading());
  try {
    const response = await API.post(
      "manage_userstories.php",
      {
        action: "update",
        task_id: userStoryId,
        crop: getUser.corp,
        task_status: 100,
        task_status_desc: "completed",
        task_complete_status: 1,
        empId: getUser.empId,
      },
      {},
      false
    );
    if (response.status === "True") {
      getCurrentSprintUserStoriesToKanban(dispatch, getUser, sprintId);
      addCommentUserStory(dispatch, getUser, userStoryId, message, "2");
      // Alert('success', "")
    } else {
      Alert("warning", response.message);
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
  handleClose();
}

//Add Comments for UserStory  Where We Have and Who can Add comments for that
export async function addCommentUserStory(
  dispatch,
  getUser,
  userStoryId,
  message,
  cardId
) {
  dispatch(isLoading());
  try {
    const response = await API.post(
      "story_comments.php",
      {
        action: "add_story_comment",
        storyId: userStoryId,
        corp: getUser.corp,
        userId: getUser.empId,
        message: message,
        cardId: cardId,
      },
      {},
      false
    );
    if (response.status === "True") {
    } else {
      Alert("warning", response.message);
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}
//Get Sprint Cycle User stories if any action performed in sprint cycle only User stories of that sprint can modified and it doesn't goes to active sprint -->GNK --> version 1.0.6.03
export async function getCurrentSprintUserStories(dispatch, getUser, sprintId) {
  dispatch(isLoading());
  try {
    getToDo(dispatch, getUser, sprintId);
    getRoadBlock(dispatch, getUser, sprintId);
    // getRoadBlockToKanban(dispatch, getUser, sprintId);
    getDone(dispatch, getUser, sprintId);
    getInvolvedEmployees(dispatch, getUser, sprintId);
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}

export async function getCurrentSprintUserStoriesToKanban(dispatch, getUser, sprintId) {
  dispatch(isLoading());
  try {
    getToDo(dispatch, getUser, sprintId);
    getRoadBlockToKanban(dispatch, getUser, sprintId);
    getDoneToKanban(dispatch, getUser, sprintId);
    getInvolvedEmployees(dispatch, getUser, sprintId);
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}
