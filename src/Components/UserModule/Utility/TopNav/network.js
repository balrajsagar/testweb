
import { isLoaded, isLoading, allMessages, adminDetails} from "./actions";
import Alert from "../../../Common/Alert";
import API from "../../../Common/Network/API";

export async function getAllMessages(dispatch, getUser, admin) {
    dispatch(isLoading());
    try {
      var response = await API.post("squad_chat.php", {
        // corp_code: 'GpsGTM',
        action: "get_all_messages",
        sendBy: getUser.empId,
        // projectId: '7ab645b4002e76bfc15ebadf0f329d87',
      }, {}, false);
      if (response.status === 'True') {
        dispatch(allMessages(response.data));
      } else {
        dispatch(allMessages([]));
      }
    } catch (error) {
      Alert('error', error.message)
    }
    dispatch(isLoaded());
  }

export async function getAdmin(dispatch) {
    dispatch(isLoading());
    try {
      var response = await API.post("admin_chat.php", {
        action: "get_admin",
      }, {}, false);
      if (response.status === 'True') {
        dispatch(adminDetails(response.data));
      } else {
        dispatch(adminDetails([]));
      }
    } catch (error) {
      Alert('error', error.message)
    }
    dispatch(isLoaded());
  }  