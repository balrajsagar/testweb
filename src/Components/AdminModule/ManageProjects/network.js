import { isLoaded, isLoading } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { projects } from "./actions";
import { PROJECT_SUCCESS, PROJECT_MODIFY, PROJECT_APPROVE, PROJECT_REJECT, PROJECT_DELETE, PROJECT_VERIFY } from "../../Common/Headers";

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
//Add New Project
  export async function addProject(state, dispatch,getUser,handleClose) {
    dispatch(isLoading());
    if ((state.projectTitle.value !== "" && state.projectDescription.value !== "")) {
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
               dispatch(getProjects(dispatch,getUser))
               Alert("success", PROJECT_SUCCESS);
            }
        } catch (error) {
            Alert("error", error.message);
        }
        handleClose()
    } else {
        Alert("warning", "please fill project title and project description")
    }
    dispatch(isLoaded());
}

//Modify Project Info
export async function modifyProject(state, dispatch,getUser,handleClose) {
  dispatch(isLoading());
  if ((state.projectTitle.value !== "" && state.projectDescription.value !== "")) {
      try {
          const data = {
            proj_title: state.projectTitle.value,
            proj_desc: state.projectDescription.value,
            idea_id:state.projectId.value,
            empId: getUser.empId, //Async
            action: "modify",
            corp: getUser.corp
          };
          const response = await API.post("manage_epics.php", data, {}, false);
          if (response.status === 'True') {
             dispatch(getProjects(dispatch,getUser))
             Alert("success", PROJECT_MODIFY);
          }
      } catch (error) {
          Alert("error", error.message);
      }
      handleClose()
  } else {
      Alert("warning", "please fill project title and project description")
  }
  dispatch(isLoaded());
}
//Approve Project
export async function approveProjects(dispatch,getUser,ideaId,handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_epics.php", {
      corp: getUser.corp,
      empId: getUser.empId,
      action: "accept",
      idea_id: ideaId,
    },{},false);
    if(response.status === 'True') {
      Alert("success", PROJECT_APPROVE);
    }
  } catch (error) {
    Alert('error',error.message);
  }
  handleClose()
  dispatch(isLoaded());
}
//Reject Project
export async function rejectProject(dispatch,getUser,ideaId,handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_epics.php", {
      corp: getUser.corp,
      empId: getUser.empId,
      action: "reject",
      idea_id: ideaId,
    },{},false);
    if(response.status === 'True') {
      Alert("success", PROJECT_REJECT);
    }
  } catch (error) {
    Alert('error',error.message);
  }
  handleClose()
  dispatch(isLoaded());
}
//Add ReleaseOwner for Project
export async function addReleaseOwner(dispatch,getUser,ideaId,handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_epics.php", {
      corp: getUser.corp,
      // empId: userSelected.value,
      action: "ro",
      userType: getUser.role,
      idea_id: ideaId,
    },{},false);
    if(response.status === 'True') {
        
    }
    handleClose()
  } catch (error) {
    Alert('error',error.message);
    handleClose()
  }
  dispatch(isLoaded());
}
//Verify Project
export async function verifyProject(dispatch,getUser,ideaId,handleClose,handleModalClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_epics.php", {
      corp: getUser.corp,
      idea_id: ideaId,
      action: "verify"
    },{},false);
    if(response.status === 'True') {
      handleClose()
      Alert("success",PROJECT_VERIFY)
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

//Delete Project
export async function deleteProject(dispatch,getUser,ideaId,handleClose,handleModalClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_epics.php", {
      corp: getUser.corp,
      idea_id: ideaId,
      action: "delete",
      empId:getUser.empId
    },{},false);
    if(response.status === 'True') {
      Alert("success", PROJECT_DELETE)
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