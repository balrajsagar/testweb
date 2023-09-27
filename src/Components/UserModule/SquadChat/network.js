import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { employees, isLoaded, isLoading, allMessages, allMessagesLast } from "./action";

// for all squad message for last msg 
export async function getAllMessagesLast(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("squad_chat.php", {
      corp_code: getUser.corp,
      action: "get_all_messages_for_display_last_msg",
      sendBy: getUser.empId,
    }, {}, false);
    if (response.status === 'True') {
      dispatch(allMessagesLast(response.data));
    } else {
      dispatch(allMessagesLast([]));
    }
  } catch (error) {
    Alert('error', error.message)
  }
  dispatch(isLoaded());
}

// for all squad message 
export async function getAllMessages(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("squad_chat.php", {
      corp_code: getUser.corp,
      action: "get_all_messages",
      sendBy: getUser.empId,
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

// get all employee list
export async function getEmployees(dispatch, getUser) {
  const domain = getUser.userName.split('@')[1]
    dispatch(isLoading());
    if(domain === 'gmail.com' || domain === 'yahoo.com' || domain === 'outlook.com'){
      try {
        var response = await API.post("squad_chat.php", {
          "crop": getUser.corp,
          projectId: getUser.projectId,
          action: 'get_all_employees_new_msg_time',
          // action: 'get_all_employees_new',
          sendBy: getUser.empId
          // "empId": getUser.empId,
        }, {}, false);
        if (response.status === 'True') {
          var employee=[];
          response.data.map((x) => {
            return (x.email !== getUser.userName ? employee.push(x):null);
        })
          dispatch(employees(employee))
        }
        else {
          dispatch(employees([]))
        }
      } catch (error) {
        Alert('error', error.message);
      }
    }else{
    try {
      var responseData = await API.post("squad_chat.php", {
        "crop": getUser.corp,
        projectId: getUser.projectId,
        // action: 'get_all_employees',
        action: 'get_all_employees_msg_time',
        domain: domain,
        sendBy: getUser.empId
        // "empId": getUser.empId,
      }, {}, false);
      // console.log("reponse",responseData)
      if (responseData.status === 'True') {
        var employeeList=[];
        responseData.data.map((x) => {
          return (x.email !== getUser.userName ? employeeList.push(x):null);
      })
        dispatch(employees(employeeList))
      }
      else {
        dispatch(employees([]))
      }
    } catch (error) {
      Alert('error', error.message);
    }}
    dispatch(isLoaded());
  }
 