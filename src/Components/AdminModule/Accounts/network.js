/*
FileName: UserModule/Team/network.js
Purpose : All network calls done for squads (New,update,list,delete) squads member
Developers: Naveen Kumar Gade --> GNK 
Changes :  00,01(01-APR-2021),02(01-APR-2021)-->GNK
*/
import { employeeDesignations, employeeRoles, employees, isLoaded, isLoading, managers, rolesList, scrumMasterCount, productOwnerCount } from "./actions";
import Alert from "../../Common/Alert";
import API from "../../Common/Network/API";
import { APP_NAME, PROJECT_SUCCESS } from "../../Common/Headers";
import * as actions from './actions';
import {PRODUCT_OWNER} from '../../Common/Headers'
import { Client_URL } from "../../Common/config";


const initialValue = "";
//For Getting Managers List(Team)
export async function getManagers(dispatch, getUser) {
  dispatch(isLoading());
  try {
    var response = await API.post("agile_squads.php", {
      "crop": getUser.corp,
      "projectId": getUser.projectId,
      "action": PRODUCT_OWNER
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
  const [, extension] = (getUser.userName).split('@')

  dispatch(isLoading());
  // console.log(getUser.role)
  try {
    var response = await API.post("accounts.php", {
      "crop": getUser.corp,
      "userType": getUser.role,
      "empId": getUser.empId,
      "extension": extension,
      action:'get_accounts'
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
    var response = await API.post("addEditEmployee.php", {
      "crop": getUser.corp,
      "action": 'firstUser'
    }, {}, false);
    // console.log(response)
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
export async function deleteEmployee(dispatch, getUser, empId, email, handleClose, handleModalClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_user.php", {
      "corp": getUser.corp,
      "action": 'delete',
      "empId": empId,
      "projectId":getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      // deActivateEmployee(dispatch, getUser, email, handleClose, handleModalClose) //De Activate the Employee -->GNK -01
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
    if (response.status === "True") {
      dispatch(employeeRoles(response.data))
    } else {
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
    if (response.status === "True") {
      dispatch(employeeDesignations(response.data))
    } else {
      dispatch(employeeDesignations([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//Add New Employee
export async function addEmployee(state, dispatch, getUser, handleClose) {
  // console.log(state);
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var string_length = 8;
        var pass_code = '';
        for (var i=0; i<string_length; i++) {
            var num = Math.floor(Math.random() * chars.length);
            pass_code += chars.substring(num,num+1);
        }
  dispatch(isLoading());
  // if (state.roleSelected.value === "" ) {
  //   Alert("warning", "please select role ")
  // } else 
  if ((state.email.value !== "" && state.fullName.value !== "" && state.mobile.value !== ""
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
        projectId:getUser.projectId,
        password: pass_code, //state.password.value,
        team: state.roleSelected.value,
        designation: state.designationSelected.value,
        reportingManager: state.reportingManagerSelected.value,
        functionalManager: state.functionalManagerSelected.value,
        userType: state.userType.value,
        user_status: state.userStatus.value,
        created_by: getUser.empId,
      }, {}, false);
      if (response.status === "True") {
        // Alert("success", response.message)
        // handleClose()
        addAgileSquad(dispatch, state.email.value, state.password.value, state.userType.value, getUser, handleClose) //Adding Into Agile Squad for Shift the Squads without Login 00-->GNK
      } else {
        Alert("warning", response.message)
        dispatch(isLoaded());
      }
    } catch (error) {
      handleClose()
      dispatch(isLoaded());
      Alert('error', error.message);
    }
  } else {
    Alert("warning", "please fill all the details")
    dispatch(isLoaded());
  }
}
//Check Existing Employee
export async function checkEmployee(state, dispatch, getUser, handleClose) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var string_length = 8;
  var pass_code = '';
  for (var i=0; i<string_length; i++) {
      var num = Math.floor(Math.random() * chars.length);
      pass_code += chars.substring(num,num+1);
  }
  dispatch(isLoading());
  if ((state.email.value !== "" && state.fullName.value !== ""  && state.mobile.value !== "" && state.no_of_projects.value !== "" 
  && state.no_of_users.value !== "" && state.clientname.value !== "" && !(state.fullName.errorStatus || state.email.errorStatus ))) {
    try {
      const [username, extension] = (state.email.value).split('@')
      var response = await API.post("accounts.php", {
        fullname: state.fullName.value,
        email: state.email.value,
        username: state.fullName.value,
        mobile: state.mobile.value,
        action: "new_account",
        clientname: state.clientname.value,
        userscount: state.no_of_users.value,
        projectscount: state.no_of_projects.value,
        password: state.password.value !== "" ? state.password.value : pass_code, //state.password.value,
        created_by: getUser.empId,
        extension: extension,
        url: Client_URL,
        appName: APP_NAME,
      }, {}, false);
      if (response.status === "True") {
        Alert("success", response.message)
        handleClose()
        dispatch(isLoaded());
        // addEmployee(state, dispatch, getUser, handleClose)
      } else {
        Alert("warning", response.message)
        handleClose()
        dispatch(isLoaded());
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
  } else {
    Alert("warning", "please fill all the details")
    dispatch(isLoaded());
  }

}
//Update Employee
export async function updateEmployee(state, dispatch, getUser, handleClose) {
  dispatch(isLoading());
  if ((state.empId.value !== "" && state.email.value !== ""  && state.userName.value !== "" && state.mobile.value !== ""
   && state.clientname.value !== "" && state.no_of_projects.value !== "" && state.no_of_users.value !== "")) {
    try {
      var response = await API.post("accounts.php", {
        empId: state.empId.value,
        employeeId: state.employeeId.value,
        action: 'update_account',
        email: state.email.value,
        username: state.fullName.value,
        mobile: state.mobile.value,
        clientname: state.clientname.value,
        userscount: state.no_of_users.value,
        projectscount: state.no_of_projects.value,
        modified_by: getUser.empId,
        url: Client_URL
      }, {}, false);
      if (response.status === "True") {
        Alert("success", "Updated successfully")
        handleClose();
      } else {
        Alert("warning", response.message)
        dispatch(isLoaded());
      }
    } catch (error) {
      Alert('error', error.message);
      dispatch(isLoaded());
    }
  } else {
    Alert("warning", "please fill all the details")
  }

}

//First User Add from Admin
//Check Existing Employee
export async function checkFirstUser(state, dispatch, getUser) {
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
  // console.log(state.userType.value)
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
        functionalManager: state.functionalManagerSelected.value,
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
        getEmployeesRoles(dispatch, getUser)
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
  // console.log(state.userType.value)
  dispatch(isLoading());
  if ((
    state.userType.value !== "")) {
    try {
      var response = await API.post("addEditEmployee.php", {

        action: "update_first_user",
        crop: getUser.corp,
        password: state.password.value,
        userType: state.userType.value,

      }, {}, false);
      if (response.status === "True") {
        Alert("success", response.message)

        getEmployeesRoles(dispatch, getUser)

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

export async function getCount(dispatch, getUser) {


  dispatch(isLoading());
  try {
    var response = await API.post("addEditEmployee.php", {
      crop: getUser.corp,
      action: "count"
    }, {}, false);
    if (response.status === 'True') {

      dispatch(scrumMasterCount(response.scrumMasterCount))
      dispatch(productOwnerCount(response.productOwnerCount))
    }
    else {
      //dispatch(employees([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
// Add the SquadName into Agile Squads List for Shift Squads without login API start 01-->GNK  01-APR-2021
export async function addAgileSquad(dispatch, username, password,userType, getUser, handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("addAgileSquad.php", {
      corp: getUser.corp,
      projectId:getUser.projectId,
      username: username,
      password: password,
      userType:userType
    }, {}, false);
    if (response.status === "True") {
      Alert("success", response.message)
      handleClose();
      dispatch(isLoaded());
    } else {
      Alert("warning", response.message)
      dispatch(isLoaded());
    }
  } catch (error) {
    Alert('error', error.message)
    dispatch(isLoaded());
  }
}
// Add the SquadName into Agile Squads List for Shift Squads without login API end 01-->GNK 01-APR-2021

//For Get Employees List 02 --->GNK
export async function getSquadList(dispatch, getUser) {
  const [username, extension] = (getUser.userName).split('@')
  dispatch(isLoading());
  try {
    var response = await API.post("get_user.php", {
      username: username,
      extension: extension,
      action : "get_squads_list"
    }, {}, false);
    if (response.status === 'True') {
      dispatch(actions.squadList(response.data))
    }
    else {
      dispatch(actions.squadList([]))
    }
  } catch (error) {
    Alert('error', error.message);
  }
  dispatch(isLoaded());
}
//Activate the Squad Member from Existing Project -->GNK -01  01-APR-2021
export async function activateEmployee(dispatch, getUser, email, handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("squadStatus.php", {
      "corp": getUser.corp,
      "action": 'activate',
      "username": email,
      "projectId" :getUser.projectId
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", 'Squad Member is Activated')
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
//Activate the Squad Member from Existing Project End --GNK -02 01-APR-2021

//De Activate the Squad Member from Existing Project start --GNK -01 01-APR-2021
export async function deActivateEmployee(dispatch, getUser, email, handleClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("squadStatus.php", {
      "corp": getUser.corp,
      "action": 'deactivate',
      "username": email,
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", 'Squad Member is Deactivated')
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
//De Activate the Squad Member from Existing Project End --GNK -01 01-APR-2021

//For Get Employees List
export async function activeEmployee(dispatch, getUser, empId, email, handleClose, handleModalClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_user.php", {
      "corp": getUser.corp,
      "action": 'activate_user',
      "empId": empId,
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", 'Squad Member is Activated')
      handleClose()
      // activateEmployee(dispatch, getUser, email, handleClose, handleModalClose) //De Activate the Employee -->GNK -01
      // Alert("success", 'Employee is Deleted')
      // handleClose()
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
export async function deActiveEmployee(dispatch, getUser, empId, email, handleClose, handleModalClose) {
  dispatch(isLoading());
  try {
    var response = await API.post("manage_user.php", {
      "corp": getUser.corp,
      "action": 'deactivate_user',
      "empId": empId,
      
    }, {}, false);
    if (response.status === 'True') {
      Alert("success", 'Squad Member is Deactivated')
      handleClose()
      // deActivateEmployee(dispatch, getUser, email, handleClose, handleModalClose) //De Activate the Employee -->GNK -01
      // Alert("success", 'Employee is Deleted')
      // handleClose()
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