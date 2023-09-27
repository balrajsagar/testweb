export const EMPLOYEES = "EMPLOYEES"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const EMP_ROLES = "EMP_ROLES"
export const EMP_DESIGNATIONS = "EMP_DESIGNATIONS"
export const SELECT_ROLE = "SELECT_ROLE"
export const SELECT_DESIGNATION = "SELECT_DESIGNATION"
export const EMP_ID = "EMP_ID"
export const EMPLOYEE_ID = "EMPLOYEE_ID"
export const FULL_NAME = "FULL_NAME"
export const EMAIL = "EMAIL"
export const MOBILE = "MOBILE"
export const PASSWORD = "PASSWORD"
export const USERNAME = "USERNAME"
export const TEAM = "TEAM"
export const DESIGNATION = "DESIGNATION"
export const USER_TYPE = "USER_TYPE"
export const USER_STATUS = "USER_STATUS"
export const MODIFY_EMPLOYEE = "MODIFY_EMPLOYEE"
export const MANAGER_LIST = "MANAGER_LIST"
export const REPORTING_MANAGER = "REPORTING_MANAGER"
export const FUNCTIONAL_MANAGER = "FUNCTIONAL_MANAGER"
export const ALLMESSAGES = 'ALLMESSAGES'
export const ROLES_LIST = "ROLES_LIST"

export const rolesList = (roleslist) => {
    return {
        type: ROLES_LIST,
        payload: roleslist
    };
};
export const employees = (employees) => {
    return {
        type: EMPLOYEES,
        payload: employees
    };
};
//For Reporting Managers List
export function reportingManagerSelected(user){
    return { type:REPORTING_MANAGER,
    payload:user}
 }
//For Functional Managers List
 export function functionalManagerSelected(user){
    return { type:FUNCTIONAL_MANAGER,
    payload:user}
 }
 //For Managers List

export const managers = (managers) => {
    return {
        type: MANAGER_LIST,
        payload: managers
    };
};
export const employeeRoles = (roles) => {
    return {
        type: EMP_ROLES,
        payload: roles
    };
};
export const employeeDesignations = (designations) => {
    return {
        type: EMP_DESIGNATIONS,
        payload: designations
    };
};
export function roleSelected(role){
    return { type:SELECT_ROLE,
    payload:role}
 }
 export function designationSelected(designation){
    return {
        type: SELECT_DESIGNATION,
        payload: designation
    }
}
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}
// New Employee add
export function setModifyEmployee(empId,employeeId,fullName,email,mobile,userName,roleSelected,designationSelected,reportingManagerSelected,functionalManagerSelected,userType,userStatus) {
    return {
      type: MODIFY_EMPLOYEE,
      payload: {empId,employeeId,fullName,email,mobile,userName,roleSelected,designationSelected,reportingManagerSelected,functionalManagerSelected,userType,userStatus}
    }
}

export const empId = (empId) => {
    return {
        type: EMP_ID,
        payload: empId
    };
};
export const employeeId = (employeeId) => {
    return {
        type: EMPLOYEE_ID,
        payload: employeeId
    };
};
export const fullName = (fullName) => {
    return {
        type: FULL_NAME,
        payload: fullName
    };
};
export const email = (email) => {
    return {
        type: EMAIL,
        payload: email
    };
};
export const password = (password) => {
    return {
        type: PASSWORD,
        payload: password
    };
};
export const mobile = (mobile) => {
    return {
        type: MOBILE,
        payload: mobile
    };
};
export const userName = (userName) => {
    return {
        type: USERNAME,
        payload: userName
    };
};
export const team = (team) => {
    return {
        type: TEAM,
        payload: team
    };
};
export const designation = (designation) => {
    return {
        type: DESIGNATION,
        payload: designation
    };
};
export const userType = (userType) => {
    return {
        type: USER_TYPE,
        payload: userType
    };
};
export const userStatus = (userStatus) => {
    return {
        type: USER_STATUS,
        payload: userStatus
    };
};
export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
};