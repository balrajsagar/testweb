import Alert from "../Alert";
import API from "../Network/API";
import { isLoaded, isLoading } from "../TasksModals/actions";
import { SUBTASK_VERIFY, MAINTASK_VERIFY, MAINTASK_VERIFY_FAIL } from "../Headers";

//Verify MainTask
export async function verifyMainTask(dispatch,getUser,mainTaskId,handleClose,handleModalClose) {
  // console.log(mainTaskId)
    dispatch(isLoading());
    try {
      var response = await API.post("manageMaintasks.php", {
        crop: getUser.corp,
        mainTaskId: mainTaskId,
        action: "verify"
      },{},false);
      // console.log(response)
      if(response.status === 'True') {
        Alert("success", MAINTASK_VERIFY)
        handleClose()
      }else if( response.status === "false")
      {
        handleModalClose()
        Alert("warning", MAINTASK_VERIFY_FAIL )
      }else{

      }  
    } catch (error) {
      Alert('error',error.message);
      // handleClose()
    }
    dispatch(isLoaded());
  }

  //Verify SUubTask
export async function verifySubTask(dispatch,getUser,subtaskId,mainTaskId,handleClose,handleModalClose) {
  // console.log(subtaskId)
    dispatch(isLoading());
    try {
      var response = await API.post("manageSubtasks.php", {
        crop: getUser.corp,
        subtaskid: subtaskId,
        maintaskId:mainTaskId,
        action: "verify"
      },{},false);
      // console.log(response)
      if(response.status === 'true') {
        Alert("success",SUBTASK_VERIFY)
        handleClose()
      }else if( response.status === "false")
      {
        handleModalClose()
        Alert("warning","you can not verify tasks untill subtasks are verified")
      }else{

      }  
    } catch (error) {
      Alert('error',error.message);
      handleClose()
    }
    dispatch(isLoaded());
  }
  //Update the Task Status --> GNK -->version 1.0.6.01
export async function updateUserStory(dispatch, getUser, userStoryId,handleClose,handleModalClose) {
  dispatch(isLoading());
  try {
    const response = await API.post("manage_userstories.php", {
      action: "update",
      task_id: userStoryId,
      crop: getUser.corp,
      task_status: 100,
      task_status_desc: "completed",
      task_complete_status: 1,
      empId: getUser.empId,
    }, {}, false);
    if (response.status === "True") {
      addCommentUserStory(dispatch, getUser, userStoryId,"2",handleClose,handleModalClose) //Add Comments for UserStory  Where We Have and Who can Add comments for that --> GNK -->version 1.0.6.01
    } else {
      Alert('warning', response.message)
      handleModalClose();
    }
  }
  catch (error) {
    Alert('error', error.message)
    handleModalClose();
  }
  dispatch(isLoaded());
}

//Add Comments for UserStory  Where We Have and Who can Add comments for that --> GNK -->version 1.0.6.01
export async function addCommentUserStory(dispatch, getUser, userStoryId,cardId,handleClose,handleModalClose) {
  var message = "User story is done/completed";
  dispatch(isLoading());
  try {
    const response = await API.post("story_comments.php", {
      action: "add_story_comment",
      storyId: userStoryId,
      corp: getUser.corp,
      userId: getUser.empId,
      message: message,
      cardId: cardId
    }, {}, false);
    console.log(response)
    if (response.status === "True") {
      handleClose();
    } else {
      Alert('warning', response.message)
      handleModalClose();
    }
  }
  catch (error) {
    Alert('error', error.message)
    handleModalClose();
  }
  dispatch(isLoaded());
}