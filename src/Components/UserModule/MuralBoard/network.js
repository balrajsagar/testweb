/* 
filename:network.js
purpose:Api calls for Mural Page
developers:Saty Siddha[S.S]

*/
import { isLoaded, isLoading, savedMuralBoards } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";

export async function saveMuralBoard(state, dispatch, getUser, muralName, handleClose) {

  dispatch(isLoading());
  try {
    var response = await API.post("mural.php", {
      crop: getUser.corp,
      muralname: muralName,
      createdBy: getUser.empId,
      action: "saveMural",
      "projectId":getUser.projectId

    }, {}, false);
    if (response.status === 'True') {
      Alert("success", response.message);

    }
    else {
      Alert('error', 'Failed');
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());

  }
  handleClose()

}
function trimObj(obj) {
  if (!Array.isArray(obj) && typeof obj != 'object') return obj;
  return Object.keys(obj).reduce(function(acc, key) {
    acc[key.trim()] = typeof obj[key] == 'string'? obj[key].trim() : trimObj(obj[key]);
    return acc;
  }, Array.isArray(obj)? []:{});
}
export async function updateMuralBoard(state, dispatch, getUser,id,data) {
  dispatch(isLoading());
  try {
    var response = await API.post("mural.php", {
      crop: getUser.corp,
      id: id,
      savedboard:trimObj(data),
      createdBy: getUser.empId,
      action: "updateMural",
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", response.message);
      dispatch(isLoaded());
    }
    else {
      Alert('error', response.message);
      dispatch(isLoaded());
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());

  }

}
export async function muralBoards(dispatch, getUser) {

  dispatch(isLoading());
  try {
    var response = await API.post("mural.php", {
      crop: getUser.corp,
      action: "muralBoards",
      "projectId":getUser.projectId,
      userType: getUser.role,
      createdBy: getUser.empId,


    }, {}, false);
    if (response.status === 'True') {

      dispatch(savedMuralBoards(response.data))
    }
    else {
      dispatch(savedMuralBoards([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

