import { isLoading,isLoaded, consolidatedToDo, privateToDo } from "./actions";
import API from "../../Common/Network/API";
import Alert from "../../Common/Alert";

export async function getConsolidatedTodo(dispatch,getUser) {
    dispatch(isLoading());
    try {
      var response = await API.post("get_user_stories.php", {
        "empId": getUser.empId,
        "action": "consolidated_todo",
      },{},false);
      if(response.status === 'True') {
          dispatch(consolidatedToDo(response.data))
      }
      else{
        dispatch(consolidatedToDo([]))
      }
    } catch (error) {
      Alert('error',error.message);
    }
    dispatch(isLoaded());
  }
export async function getPrivateTodo(dispatch, getUser) {
    dispatch(isLoading());
      try {
        var response = await API.post("private_todo.php", {
          "crop": getUser.corp,
          "action": 'private_todo',
          "added_by": getUser.empId,
        }, {}, false);
        // console.log(response)
        if (response.status === 'True') {
          dispatch(privateToDo(response.data))
        }
        else {
          dispatch(privateToDo([]))
        }
      } catch (error) {
        Alert('error', error.message);
      }
    dispatch(isLoaded());
  }