import API from "../Network/API";
// eslint-disable-next-line
import { isLoading, isLoaded, user, employees, modules, section, sprint, calendarDashStory, events, allProjects } from "./action";
// import swal from "sweetalert";
import Alert from '../Alert';
// import store from "../Store";

// get list of all user stories
export async function getToDo(dispatch, getUser, moduleId) {
  // console.log(moduleId,getUser.corp)
  dispatch(isLoading());
  try {
    var response = await API.post("get_user_stories.php", {
      "crop": getUser.corp,
      "moduleId": moduleId,
      "action": "pending",
      "projectId": getUser.projectId,
      "userType": getUser.role,
      "empId": getUser.empId,
    }, {}, false);
    var toDoList = [];
    var doingList = [];
    // console.log(response.data)
    dispatch(section(response.data))
    response.data.map((pending) => {
      return (
        (pending.activeStatus === "0") ? toDoList.push(pending) 
        :(pending.activeStatus === "1")? doingList.push(pending):null
      );
    })
    // store.dispatch(todo(toDoList));
    // store.dispatch(doing(doingList));
    // store.dispatch(todoFilter(toDoList));
    // store.dispatch(doingFilter(doingList))
  } catch (error) {
    console.log(error)
  }

  dispatch(isLoaded());
}
// for getting active sprint
export async function getSprint(dispatch, getUser) {
  dispatch(isLoading());
  try {

     // Future Sprints Name list witout epic by -->SS -->02 on version 1.0.6 start
     var response = await API.post("getUpdateSprint.php", {
     "crop": getUser.corp, 
     "action": "get_sprints",
     "projectId":getUser.projectId,
     }, {}, false);
      // Future Sprints Name list witout epic by -->SS -->02 on version 1.0.6 end
      // console.log(response)
    if (response.status === 'True') {
      dispatch(sprint(response.data[0]))
      getToDo(dispatch, getUser, response.data[0].moduleId);
    }
    else {
      // dispatch(modules([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
// for getting modules
export async function getModules(dispatch, getUser) {
  dispatch(isLoading());
  try {

     // Future Sprints Name list witout epic by -->SS -->02 on version 1.0.6 start
     var response = await API.post("getUpdateSprint.php", {
      "crop": getUser.corp, 
      "action": "getModules",
      "projectId": getUser.projectId,
    }, {}, false);
      // Future Sprints Name list witout epic by -->SS -->02 on version 1.0.6 end
      // console.log(response)
    if (response.status === 'True') {
      dispatch(modules(response.data))
    }
    else {
      dispatch(modules([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//to get event
export async function getEvent(getUser,dispatch) {
  dispatch(isLoading());
  // console.log(getUser.corp)
  try {
    var response = await API.post("calendar.php", {
      action: "GetEvent",
      corp_code: getUser.corp,
      projectId: getUser.projectId,
      "userType": getUser.role,
      userName: getUser.userName,
  }, {}, false);
  // dispatch(user(response.data));
  // console.log(response)
  if (response.status === 'True') {
    // console.log(response.data)
    dispatch(user(response.data))
  }
  else {
    dispatch(user([]))
  }
  } catch (error) {
      console.log(error)
      Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//For Get Employees List
export async function getEmployees(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      projectId: getUser.projectId,
    }, {}, false);
    if (response.status === 'True') {
      // console.log(response.data)
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

// for calendar Dash
// getting user stories related to user
export async function getCalendarDashStory(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("get_user_stories.php", {
      "empId": getUser.empId,
      "action": "calendarDash",
    },{},false);
    // console.log("stories",response)
    if(response.status === 'True') {
        dispatch(calendarDashStory(response.data))
    }
    else{
      dispatch(calendarDashStory([]))
    }
  } catch (error) {
    Alert('error',error.message);
  }
  dispatch(isLoaded());
}
//to get event for calear Dash
export async function getEventCalendarDash(getUser,dispatch) {
  dispatch(isLoading());
  // console.log(getUser.corp)
  try {
    var response = await API.post("calendarDash.php", {
      action: "GetEventCalendarDash",
      // corp_code: getUser.corp,
      // projectId: getUser.projectId,
      userName: getUser.userName,
  }, {}, false);
  // dispatch(user(response.data));
  // console.log("events",response)
  if (response.status === 'True') {
    // console.log(response.data)
    dispatch(events(response.data))
  }
  else {
    dispatch(events([]))
  }
  } catch (error) {
      console.log(error)
      Alert('error', error.message);
  }
  dispatch(isLoaded());
}
// get all project List
export async function getSquadsList(dispatch, empId) {
  console.log(empId)
  dispatch(isLoading())
  try {
      var response = await API.post("squads.php", {
          empId: empId,
          action: "get_squads"
      }, {}, false);
      if (response.status === 'True') {
          dispatch(allProjects(response.data))
      } else {
          dispatch(allProjects([]))
      }
  } catch (error) {
      Alert('error', error.message)
  }
  dispatch(isLoaded())

}
// for get employee list in calendarDash
export async function getEmployeesDash(dispatch, getUser) {
  const domain = getUser.userName.split('@')[1]
    dispatch(isLoading());
    if(domain === 'gmail.com' || domain === 'yahoo.com' || domain === 'outlook.com'){
      try {
        var response = await API.post("squad_chat.php", {
          "crop": getUser.corp,
          projectId: getUser.projectId,
          action: 'get_all_employees_new',
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
        action: 'get_all_employees',
        domain: domain,
        sendBy: getUser.empId
        // "empId": getUser.empId,
      }, {}, false);
      console.log(response)
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





