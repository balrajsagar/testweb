import API from "../../Common/Network/API";
import { isLoading, isLoaded, manageSubTasks, allMessages } from "./actions";
import Alert from "../../Common/Alert";

//For Get SubTask List For All Users(Employees)
export async function getUserSubTasks(dispatch, getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("getSubtasks.php", {
        crop: getUser.corp,
        action: "Users"
      }, {}, false);
      if (response.status === 'True') {
        dispatch(manageSubTasks(response.data))
      }
      else {
        dispatch(manageSubTasks([]))
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
    dispatch(isLoaded());
  }

  export async function getAllTaskMessages(dispatch,getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("taskChat.php", {
        corp_code: getUser.corp,
        action: "getAllTaskMessages",
      }, {}, false);
      if (response.status === 'True') {
         dispatch(allMessages(response.data));
      }else{
        dispatch(allMessages([]));
      }
    } catch (error) {
      Alert('error',error.message)
    }
    dispatch(isLoaded());
  }

  





     
