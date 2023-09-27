import { isLoaded, isLoading } from "../Actions/loading";
import Alert from "../Alert";
import API from "../Network/API";
import { taskComments } from "./actions";

// for updating message count
export async function updateChat(sno,dispatch,getUser) {
  const msgId = sno ? sno.map((msgId, index) => {
    return msgId.sno
}):null
  dispatch(isLoading());
  try {
    // eslint-disable-next-line
    var response = await API.post("user_chat.php", {
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
  // console.log(getUser.corp)
  // console.log(getUser.empId)
  // console.log(data.id)
    dispatch(isLoading());
    try {
      var response = await API.post("admin_chat.php", {
        // corp_code: getUser.corp,
        // projectId:getUser.projectId,
        action: "get_messages_admin_squad",
        sendBy: getUser.empId,
        receivedBy: data.id,
        // corp_code: 'GpsGTM',
        // projectId: '7ab645b4002e76bfc15ebadf0f329d87',
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