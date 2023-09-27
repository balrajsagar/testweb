import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { employees, isLoaded, isLoading, details, taskComments, groupName, groupList, groupEmail } from "./action";
// start for group chat modal
// getting group chat details
export async function getGroupChatDetails(dispatch, getUser, data) {
  dispatch(isLoading());
  try {
    var response = await API.post("group_chat.php", {
      action: 'getGroupChatDetails',
      created_by: getUser.userName,
      group_Id: data.id,
      // "empId": getUser.empId,
    }, {}, false);
    if (response.status === 'True') {
      dispatch(groupName(response.data[0].group_name))
      dispatch(groupList(response.data[0].members_name))
      dispatch(groupEmail(response.data[0].members_email))
    }
    else {
      dispatch(details([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
// get all messages to display in group chat modal
export async function getMessages(dispatch, getUser, data) {
  dispatch(isLoading());
  try {
    var response = await API.post("group_chat.php", {
      corp_code: getUser.corp,
      action: "getmessages",
      group_Id: data.id
    }, {}, false);
    if (response.status === 'True') {
      // console.log("getmessages",response)
      dispatch(taskComments(response.data));
    } else {
      dispatch(taskComments([]));
    }
  } catch (error) {
    Alert(error.message)
  }
  dispatch(isLoaded());
}
// for updating chat count
export async function updateChat(sno, dispatch, getUser) {
  const msgId = sno ? sno.map((msgId, index) => {
    return msgId.sno
  }) : null
  dispatch(isLoading());
  try {
    // eslint-disable-next-line
    var response = await API.post("group_chat.php", {
      action: "updateChat",
      corp_code: getUser.corp,
      messagedBy: getUser.empId,
      msgId: msgId ? msgId : " "
    }, {}, false);
  } catch (error) {
    Alert('error', error.message)
  }
  dispatch(isLoaded());
}
// end for group chat modal


// start for create group modal
// for getting group details
export async function getGroupDetails(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("group_chat.php", {
      "crop": getUser.corp,
      created_by: getUser.userName,
      // "userType": getUser.role,
      // "empId": getUser.empId,
    }, {}, false);
    if (response.status === 'True') {
      dispatch(details(response.data))
    }
    else {
      dispatch(details([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
// for create group
export async function createGroup(state, mem, label, dispatch, getUser, handleClose) {
  dispatch(isLoading());
  if (state.title === "") {
    Alert("warning", "Please add Group Name ")
    dispatch(isLoaded());
  }
  else if (state.title !== "") {
    try {
      var response = await API.post("group_chat.php", {
        crop: getUser.corp,
        action: "create",
        projectId: getUser.projectId,
        group_name: state.title,
        created_by: getUser.userName,
        created_by_name: getUser.fullName,
        // for members names
        members: mem,
        // for members email
        label: label,
      }, {}, false);
      if (response.status === 'True') {
        getGroupDetails(dispatch, getUser)
        Alert("success", "Group created successfully!");
      }
      if (response.status === 'GroupExist') {
        getGroupDetails(dispatch, getUser)
        Alert("warning", "Group Already Exist!");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "Please enter required fields ")
    dispatch(isLoaded());
  }
}
//for create default Group
export async function createDefaultGroup(state, mem, label, dispatch, getUser, handleClose) {
  dispatch(isLoading());
  if (getUser.corp === "") {
    Alert("warning", "Please add Group Name ")
    dispatch(isLoaded());
  }
  else if (getUser.corp !== "") {
    try {
      var response = await API.post("group_chat.php", {
        crop: getUser.corp,
        action: "create",
        projectId: getUser.projectId,
        group_name: getUser.corp,
        created_by: getUser.userName,
        created_by_name: getUser.fullName,
        // for members names
        members: mem,
        // for members email
        label: label,
      }, {}, false);
      if (response.status === 'True') {
        getGroupDetails(dispatch, getUser)
        Alert("success", "Group created successfully!");
      }
      if (response.status === 'GroupExist') {
        getGroupDetails(dispatch, getUser)
        Alert("warning", "Group Already Exist!");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "Please enter required fields ")
    dispatch(isLoaded());
  }
}
// for getting employee details
export async function getEmployees(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      projectId: getUser.projectId,
      // "userType": getUser.role,
      // "empId": getUser.empId,
    }, {}, false);
    if (response.status === 'True') {
      dispatch(employees(response.data))
    }
    else {
      dispatch(employees([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
// end for create group modal


//  start for edit group
// for update group
export async function updateGroup(state, mem, label, dispatch, getUser, handleClose) {
  dispatch(isLoading());
  if (state.title === "") {
    Alert("warning", "Please add Group Name ")
    dispatch(isLoaded());
  }
  else if (state.title !== "") {
    try {
      var response = await API.post("group_chat.php", {
        crop: getUser.corp,
        action: "update",
        group_name: state.title.value ? state.title.value : state.title,
        group_Id: state.id.value,
        // for members names
        members: mem,
        // for members email
        label: label,
      }, {}, false);
      if (response.status === 'True') {
        getGroupDetails(dispatch, getUser)
        Alert("success", "Group updated successfully!");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
  } else {
    Alert("warning", "Please enter required fields ")
    dispatch(isLoaded());
  }
}
// end for edit group


//start delete and exit group modal
// for delete  group
export async function deleteGroup(state, dispatch, getUser, id, handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("group_chat.php", {
      crop: getUser.corp,
      action: "delete",
      created_by: getUser.userName,
      group_Id: id,
    }, {}, false);
    if (response.status === 'True') {
      getGroupDetails(dispatch, getUser)
      Alert("success", "Group deleted successfully!");
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
  handleClose()
}
//  for exit group
export async function exitGroup(state, dispatch, newMem, newLabel, getUser, id, handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("group_chat.php", {
      // var response = await API.post("", {
      crop: getUser.corp,
      newMem: newMem,
      newLabel: newLabel,
      action: "exitGroup",
      created_by: getUser.userName,
      group_Id: id,
    }, {}, false);
    if (response.status === 'True') {
      getGroupDetails(dispatch, getUser)
      Alert("success", "Successfully Exited!");
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
  handleClose()
}
// end delete and exit group modal