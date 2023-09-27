export const TEAMS_LIST = "TEAMS_LIST"
export const MODIFY_TEAM = "MODIFY_TEAM"
export const ADD_TEAM = "ADD_TAEAM"
export const TEAM_ID = "TEAM_ID"
export const DESIGNATION_ID = "DESIGNATION_ID"
export const DESIGNATION_LIST = "DESIGNATION_ID"
export const ADD_DESIGNATION = "ADD_DESIGNATION"
export const MODIFY_DESIGNATION = "MODIFY_DESIGNATION"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const MODIFY_TIME = 'MODIFY_TIME'
export const ADD_TIME_ZONE= "ADD_TIME_ZONE"
export const ADD_START_TIME= "ADD_START_TIME"
export const ADD_END_TIME= "ADD_END_TIME"
export const SHIFTS = "SHIFTS"

export const getTeam = (team) => {
    return {
        type: TEAMS_LIST,
        payload: team
    };
};
export const newTeam = (team) => {
    return {
        type: ADD_TEAM,
        payload: team
    };
};
export const newTeamId = (teamId) => {
    return {
        type: TEAM_ID,
        payload: teamId
    };
};
export function setModifyTeam(teamId,teamName) {
    return {
      type: MODIFY_TEAM,
      payload: { teamId,teamName}
    }
  }
export const newDesignation = (designation) => {
    return {
        type: ADD_DESIGNATION,
        payload: designation
    };
};
export function setModifyDesignation(designationId, designationName) {
    return {
      type: MODIFY_DESIGNATION,
      payload: { designationId, designationName }
    }
  }
  export const newDesignationId = (designationId) => {
    return {
        type: DESIGNATION_ID,
        payload: designationId
    };
};
export const getDesignation = (designation) => {
    return {
        type: DESIGNATION_LIST,
        payload: designation
    };
};
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}
export function setModifyTime(ts_id,start_time, end_time,zone) {
    return {
      type: MODIFY_TIME,
      payload: { ts_id,start_time, end_time,zone}
    }
  }

  export const new_start_time = (start_time) => {
    return {
        type: ADD_START_TIME,
        payload: start_time
    };
};
export const new_end_time = (end_time) => {
    return {
        type: ADD_END_TIME,
        payload: end_time
    };
};
export const new_time_zone = (zone) => {
    return {
        type: ADD_TIME_ZONE,
        payload: zone
    };
};
export const get_shifts = (shifts) => {
    return {
        type: SHIFTS,
        payload: shifts
    };
};