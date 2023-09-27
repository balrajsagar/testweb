import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { employees, isLoaded, isLoading, details, adminGroups, allMessages,adminGroupsMsg } from "./action";

export async function getAllGroupMessages(dispatch, getUser,refresh) {
  if(refresh) {dispatch(isLoading());}
  try {
    var response = await API.post(
      "group_chat.php",
      {
        corp_code: getUser.corp,
        action: "getAllGroupMessages",
        created_by: getUser.userName,
        "userType": getUser.role,
        "empId": getUser.empId
      },
      {},
      false
    );
    // console.log(response.data)
    if (response.status === "True") {
      dispatch(allMessages(response.data));
      // store.dispatch(allMessages(response.data));
    } else {
      dispatch(allMessages([]));
    }
  } catch (error) {
    Alert("error", error.message);
  }
  dispatch(isLoaded());
}


export async function getGroupDetails(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("group_chat.php", {
      action :'getGroupDetails',
      created_by: getUser.userName,
      projectId: getUser.projectId,
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

export async function createGroup(state, mem, label, dispatch, getUser,handleClose) {
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
   }else {
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
// for getting group deatils created by admin
  export async function getAdminGroup(dispatch, getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("group_chat.php", {
        action :'getAdminGroup',
        created_by: getUser.userName,
        projectId: getUser.projectId,
        // "userType": getUser.role,
        // "empId": getUser.empId,
      }, {}, false);
      if (response.status === 'True') {
        dispatch(adminGroups(response.data))
      }
      else {
        dispatch(adminGroups([]))
      }
    } catch (error) {
      Alert('error', error.message);
    }
    dispatch(isLoaded());
  }


  export async function getAdminGroupNew(dispatch, getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("group_chat.php", {
        // action :'getAdminGroup',
        created_by: getUser.userName,
        projectId: getUser.projectId,
        action :'getAdminGroup_msg_time',
        // "userType": getUser.role,
        // "empId": getUser.empId,
      }, {}, false);
      if (response.status === 'True') {
        dispatch(adminGroupsMsg(response.data))
      }
      else {
        dispatch(adminGroupsMsg([]))
      }
    } catch (error) {
      Alert('error', error.message);
    }
    dispatch(isLoaded());
  }

  