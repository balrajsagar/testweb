import { employeeDesignations, employeeRoles, employees, isLoaded, isLoading, managers, allMessages, rolesList } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { PROJECT_SUCCESS } from "../../Common/Headers";
import * as actions from './actions';
import {PRODUCT_OWNER} from '../../Common/Headers'


const initialValue = "";
//For Getting Managers List(Team)
export async function getManagers(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      "action": PRODUCT_OWNER,
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      dispatch(managers(response.data))
    }
    else {
    }
  } catch (error) {
    Alert('error', error.message);
    dispatch(isLoaded());
  }
}
//For Get Employees List
export async function getEmployees(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "projectId": getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
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
//For Get Roles For First User
export async function getEmployeesRoles(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_user.php", {
      "corp": getUser.corp,
      "action":'get_user_role',
      "empId":getUser.empId,
      "projectId":getUser.projectId,
    }, {}, false);
    if (response.status === 'True') {
      dispatch(rolesList(response.data))
    }
    else {
      // dispatch(employees([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//Add New Project
export async function addProject(state, dispatch, getUser, handleClose) {
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
        Alert("success", PROJECT_SUCCESS);
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
//For Get Employees List
export async function deleteEmployee(dispatch, getUser, empId, handleClose, handleModalClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_user.php", {
      "crop": getUser.corp,
      "action": 'delete',
      "empId": empId,
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", 'Employee is Deleted')
      handleClose()
    }
    else {
      handleClose()
    }
  } catch (error) {
    handleClose()
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}

export async function empRoles(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("spinner.php", {
      "crop": getUser.corp,
      "action": 'team',
    }, {}, false);
    if (response.status === "True"){
      dispatch(employeeRoles(response.data))
    }else{
      dispatch(employeeRoles([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
export async function empDesignation(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("spinner.php", {
      "crop": getUser.corp,
      "action": 'desig',
    }, {}, false);
    if(response.status === "True"){
      dispatch(employeeDesignations(response.data))
    }else{
      dispatch(employeeDesignations([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//Add New Employee
export async function addEmployee(state, dispatch, getUser,handleClose) {
  console.log(state.empId.value)
  dispatch(isLoading());
  if ((state.email.value !== "" && state.fullName.value !== "" 
    &&  state.password.value !== "" 
    && state.userType.value !== "")) {
    // && state.roleSelected.value !== "" && state.designationSelected.value !== ""
    try {
      var response = await API.post("addEditEmployee.php", {
        empId: state.empId.value,
        fullname: state.fullName.value,
        email: state.email.value,
        username: state.email.value,
        mobile: state.mobile.value,
        action: "save",
        crop: getUser.corp,
        password: state.password.value,
        team: state.roleSelected.value,
        designation: state.designationSelected.value,
        reportingManager: state.reportingManagerSelected.value,
        functionalManager:state.functionalManagerSelected.value,
        userType: state.userType.value,
        user_status: state.userStatus.value,
        created_by: "admin",
      }, {}, false);
      if (response.status === "True") {
        Alert("success", response.message)
        handleClose()
      } else {
        Alert("warning", response.message)
      }
    } catch (error) {
      handleClose()
      Alert('error', error.message);
    }
  } else {
    Alert("warning", "please fill all the details")
  }
  dispatch(isLoaded());
}
//Check Existing Employee
export async function checkEmployee(state, dispatch, getUser,handleClose) {
  dispatch(isLoading());
  if (( state.email.value !== "" && state.fullName.value !== "" )) {
    try {
      var response = await API.post("addEditEmployee.php", {
        empId: state.empId.value,
        fullname: state.fullName.value,
        email: state.email.value,
        username: state.email.value,
        mobile: state.mobile.value,
        action: "check",
        crop: getUser.corp,
      }, {}, false);
      if (response.status === "True") {
        addEmployee(state, dispatch, getUser,handleClose)
      } else {
        Alert("warning", response.message)
        handleClose()
      }
    } catch (error) {
      Alert('error', error.message);
    }
  } else {
    Alert("warning", "please fill all the details")
  }
  dispatch(isLoaded());
}
//Update Employee
export async function updateEmployee(state, dispatch, getUser,handleClose) {
  dispatch(isLoading());
  if ((state.empId.value !== "" && state.employeeId.value !== "" && state.email.value !== "" && state.fullName.value !== "" && state.userName.value !== ""
    && state.mobile.value !== "" && state.userType.value !== "" && state.userStatus.value !== "")) {
    // && state.roleSelected.value !== "" && state.designationSelected.value !== ""
    try {
      var response = await API.post("addEditEmployee.php", {
        empId: state.empId.value,
        employeeId: state.employeeId.value,
        fullname: state.fullName.value,
        email: state.email.value,
        username: state.userName.value,
        mobile: state.mobile.value,
        designation: state.designationSelected.value,
        user_status: state.userStatus.value,
        team: state.roleSelected.value,
        reportingManager: state.reportingManagerSelected.value,
        functionalManager:state.functionalManagerSelected.value,
        action: 'update',
        userType: state.userType.value,
        crop: getUser.corp
      }, {}, false);
      if (response.status === "True") {
        Alert("success", "Updated successfully")
        handleClose();
      } else {
        Alert("warning", response.message)
      }
    } catch (error) {
      Alert('error', error.message);
    }
  } else {
    Alert("warning", "please fill all the details")
  }
  dispatch(isLoaded());
}

export async function getAllMessages(dispatch,getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("user_chat.php", {
      corp_code: getUser.corp,
      action: "get_all_messages",
      sendBy: getUser.empId,
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

//First User Add from Admin
//Check Existing Employee
export async function checkFirstUser(state, dispatch, getUser) {
  console.log(state)
  dispatch(isLoading());
  if ((state.empId.value !== "" && state.email.value !== "" && state.fullName.value !== "" 
    && state.mobile.value !== "")) {
    try {
      var response = await API.post("addEditEmployee.php", {
        empId: state.empId.value,
        fullname: state.fullName.value,
        email: state.email.value,
        username: state.email.value,
        mobile: state.mobile.value,
        action: "check",
        crop: getUser.corp,
      }, {}, false);
      if (response.status === "True") {
        addFirstUser(state, dispatch, getUser)
      } else {
        Alert("warning", response.message)
      }
    } catch (error) {
      Alert('error', error.message);
    }
  } else {
    Alert("warning", "please fill all the details")
  }
  dispatch(isLoaded());
}

//Add First Employee (Approver,Manager and Employee)
export async function addFirstUser(state, dispatch, getUser) {
  console.log(state.userType.value)
  dispatch(isLoading());
  if ((
    state.userType.value !== "")) {
    // && state.roleSelected.value !== "" && state.designationSelected.value !== ""
    try {
      var response = await API.post("addEditEmployee.php", {
        empId: state.empId.value,
        fullname: state.fullName.value,
        email: state.email.value,
        username: state.email.value,
        mobile: state.mobile.value,
        action: "save",
        crop: getUser.corp,
        password: state.password.value,
        team: state.roleSelected.value,
        designation: state.designationSelected.value,
        reportingManager: state.reportingManagerSelected.value,
        functionalManager:state.functionalManagerSelected.value,
        userType: state.userType.value,
        user_status: state.userStatus.value,
        created_by: "admin",
      }, {}, false);
      if (response.status === "True") {
        Alert("success", response.message)
        dispatch(actions.empId(initialValue))
        dispatch(actions.fullName(initialValue))
        dispatch(actions.mobile(initialValue))
        dispatch(actions.email(initialValue))
        dispatch(actions.password(initialValue))
        dispatch(actions.userStatus(initialValue))
        dispatch(actions.userType(initialValue))
        dispatch(actions.roleSelected(initialValue))
        dispatch(actions.designationSelected(initialValue))
        dispatch(actions.reportingManagerSelected(initialValue))
        dispatch(actions.functionalManagerSelected(initialValue))
        getEmployeesRoles(dispatch,getUser)
      } else {
        Alert("warning", response.message)
      }
    } catch (error) {
      Alert('error', error.message);
    }
  } else {
    Alert("warning", "please fill all the details")
  }
  dispatch(isLoaded());
}
export async function updateFirstUser(state, dispatch, getUser) {
  console.log(state.userType.value)
  dispatch(isLoading());
  if ((
    state.userType.value !== "")) {
    // && state.roleSelected.value !== "" && state.designationSelected.value !== ""
    try {
      var response = await API.post("manage_user.php", {
        action: "update_role",
        corp: getUser.corp,
        empId:getUser.empId,
        projectId:getUser.projectId,
        password: state.password.value,
        userType: state.userType.value,
      }, {}, false);
      if (response.status === "True") {
        Alert("success", response.message)   
        getEmployeesRoles(dispatch,getUser)      
      } else {
        Alert("warning", response.message)
      }
    } catch (error) {
      Alert('error', error.message);
    }
  } else {
    Alert("warning", "please fill all the details")
  }
  dispatch(isLoaded());
}