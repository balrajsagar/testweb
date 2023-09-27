import { toBeAssignedRoadBlocks, isLoaded, isLoading, assignedRoadBlocks,roadBlocks } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";

//For toBeAssigned RoadBlocks
export async function getToBeAssignedRoadBlocks(dispatch,getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("userRoadblocks.php", {
        "crop": getUser.corp,
        "action": "roadblocks"
      },{},false);
      if(response.status === 'True') {
        dispatch(toBeAssignedRoadBlocks(response.data))
      }
      else{
        dispatch(toBeAssignedRoadBlocks([]))
      }
    } catch (error) {
      Alert('error',error.message);
    }
    dispatch(isLoaded());
  }

//For assigned Roadblocks
export async function getAssignedRoadBlocks(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("userRoadblocks.php", {
      "crop": getUser.corp,
      action: "assignedroadblocks",
    },{},false);
    if(response.status === 'True') {
      dispatch(assignedRoadBlocks(response.data))
    }
    else{
      dispatch(assignedRoadBlocks([]))
    }
  } catch (error) {
    Alert('error',error.message);
  }
  dispatch(isLoaded());
}
//RoadBlock List
export async function getRoadBlockList(dispatch,getUser,subTaskId) {
  dispatch(isLoading());
  try {
    var response = await API.post("roadBlock.php", {
      "crop": getUser.corp,
      action: "getting",
      subTaskId:subTaskId
    },{},false);
    if(response.status === 'True') {
      dispatch(roadBlocks(response.data))
    }
    else{
      dispatch(roadBlocks([]))
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
              //  dispatch(getProjects(dispatch,getUser))
               Alert("success", "Project Added Successfully");
            }
        } catch (error) {
            Alert("error", error.message);
        }
        handleClose()
    } else {
        Alert("warning", "please fill project title and project")
    }
    dispatch(isLoaded());
}