export const PROFILE_INFO = 'PROFILE_INFO'
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const EMP_ID = "EMP_ID"
export const USER_NAME = 'USER_NAME'
export const MOBILE_NUMBER = 'MOBILE_NUMBER'
export const EMAIL = 'EMAIL'
export const DESIGNATION = "DESIGNATION"
export const TEAM = "TEAM"
export const ROLE = "ROLE"
export const STATUS = "STATUS"
export const REDIRECT='REDIRECT'
export const AWARDS = "AWARDS"

export function setUserInfo(empId ,username,fullName, mobile, email, designation, team, role,reportingManager, functionalManager, status, shift_hours,account_type,license_key,email_status,license_validity,free_licenses,remaining_projects) {
  return {
    type: PROFILE_INFO,
    payLoad: { empId, username, fullName, mobile, email, designation, team, role,reportingManager, functionalManager, status, shift_hours,account_type,license_key,email_status,license_validity,free_licenses,remaining_projects}
  }
}
export function updateUserName(username) {
  return {
    type: USER_NAME,
    payLoad: username,
  };
}
export function updateEmpId(empId) {
    return {
      type: EMP_ID,
      payLoad: empId,
    };
  }
export function updateMobileNumber(mobile) {
  return {
    type: MOBILE_NUMBER,
    payLoad: mobile,
  };
}

export function updateEmail(email) {
  return {
    type: EMAIL,
    payLoad: email,
  };
}
export function updateDesignation(designation) {
    return {
      type: DESIGNATION,
      payLoad: designation,
    };
  }
  export function updateTeam(team) {
    return {
      type: TEAM,
      payLoad: team,
    };
  }
  
  export function updateRole(role) {
    return {
      type: ROLE,
      payLoad: role,
    };
  }
  export function updateStatus(status) {
    return {
      type: STATUS,
      payLoad: status,
    };
  }
export function isLoading() {
  return { type: IS_LOADING };
}
export function isLoaded() {
  return { type: IS_LOADED }
}
export function redirect(profile){
  return {type : REDIRECT,
    payLoad:profile}
}

  //For Awards Getting 
  export const awards = (awards) => {
    return {
        type: AWARDS,
        payload: awards
    };
  };
