import { isLoaded, isLoading } from "../Actions/loading";
import Alert from "../Alert";
import API from "../Network/API";
import { taskComments } from "./actions";

// for update chat
export async function updateChat(sno,dispatch,getUser) {
  const msgId = sno ? sno.map((msgId, index) => {
    return msgId.sno
}):null
  dispatch(isLoading());
  try {
    // eslint-disable-next-line
    var response = await API.post("squad_chat.php", {
     action: "updateChat",
  corp_code: getUser.corp,
  messagedBy: getUser.empId, 
  msgId: msgId ? msgId : " "
    }, {}, false);
    // console.log(response)
  } catch (error) {
    Alert('error',error.message)
  }
  dispatch(isLoaded());
}
//Get User Comments 
export async function getMessages(dispatch,getUser,data) {
    dispatch(isLoading());
    try {
      var response = await API.post("squad_chat.php", {
        corp_code: getUser.corp,
        action: "get_messages",
        sendBy: getUser.empId,
        receivedBy: data.id
      }, {}, false);
      if (response.status === 'True') {
         dispatch(taskComments(response.data));
      }else{
        dispatch(taskComments([]));
      }
    } catch (error) {
      Alert('error',error.message)
    }
    dispatch(isLoaded());
  }