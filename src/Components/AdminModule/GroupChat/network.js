import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { employees, isLoaded, isLoading, details, allMessages } from "./action";

// for getting all group messages
export async function getAllGroupMessages(dispatch, getUser,refresh) {
  if(refresh) {dispatch(isLoading());}
  try {
    var response = await API.post(
      "group_chat.php",
      {
        corp_code: getUser.corp,
        action: "getAllGroupMessages",
        created_by: getUser.userName,
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

// for getting group list created by admin
export async function getAdminGroupDetails(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("group_chat.php", {
      action :'getAdminGroupDetails',
      created_by: getUser.userName,
      // projectId: getUser.projectId,
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
export async function createGroup(selectedValue,state, mem, label, dispatch, getUser,handleClose) {
  // console.log(state.title)
  // console.log(selectedValue.length)
  dispatch(isLoading());
  if (state.title === "") {
    Alert("warning", "Please add Group Name ")
    dispatch(isLoaded());
  }
  else if(selectedValue.length <= 0){
    Alert("warning", "Please add Group Members")
    dispatch(isLoaded());
  }
  
  else {
    try {
      var response = await API.post("group_chat.php", {
        crop: getUser.corp,
        action: "create",
        // projectId: getUser.projectId,
        group_name: state.title,
        created_by: getUser.userName,
        created_by_name: getUser.fullName,
        // for members names
        members: mem,
        // for members email
        label: label,
      }, {}, false);
      if (response.status === 'True') {
        getAdminGroupDetails(dispatch, getUser)
        Alert("success", "Group created successfully!");
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    handleClose()
   }
}

// for getting all employee details
export async function getEmployees(dispatch, getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("agile_squads.php", {
        // "crop": getUser.corp,
        // projectId: getUser.projectId,
        "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      }, {}, false);
      // console.log(response.data)
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

// for update group
export async function updateGroup(state, mem, label, dispatch, getUser,handleClose) {
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
        getAdminGroupDetails(dispatch, getUser)
        Alert("success", "Group updated successfully!");
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