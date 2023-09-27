import { getTeam, getDesignation, isLoading, isLoaded, setModifyTeam, setModifyDesignation, setModifyTime,get_shifts } from "./action";
import API from "../../Common/Network/API";
import Alert from "../../Common/Alert";

export async function getTeams(dispatch, getUser) {
    dispatch(isLoading());
    try {
        var response = await API.post("spinner.php", {
            "crop": getUser.corp,
            "action": 'team',
        }, {}, false);
        if (response.status === "True") {
            dispatch(getTeam(response.data))
        } else {
            dispatch(getTeam([]))
        }
    } catch (error) {
        Alert('error', error.message);
    }
    dispatch(isLoaded());
}
//Add Team
export async function addTeam(state, dispatch, getUser) {
    if (state.teamName.value !== "" && state.teamName.value !== null) {
        dispatch(isLoading());
        try {
            var response = await API.post("teams.php", {
                "crop": getUser.corp,
                "action": 'addteam',
                "team": state.teamName.value
            }, {}, false);
            if (response.status === "True") {
                Alert("success", "Team Added Successfully")
                getTeams(dispatch, getUser)
                dispatch(setModifyTeam("", ""))
            } else {
                dispatch(setModifyTeam("", ""))
            }
        } catch (error) {
            Alert('error', error.message);
        }
    } else {
        Alert("warning", "Please give team name")
    }
    dispatch(isLoaded());
}
//Modify Team
export async function modifyTeam(state, dispatch, getUser) {
    if (state.teamName.value !== "" && state.teamName.value !== null) {
        dispatch(isLoading());
        try {
            var response = await API.post("teams.php", {
                "crop": getUser.corp,
                "action": 'modifyteam',
                "teamId": state.teamId.value,
                "team": state.teamName.value
            }, {}, false);
            if (response.status === "True") {
                Alert("success", "Team Modified Successfully")
                getTeams(dispatch, getUser)
                dispatch(setModifyTeam("", ""))
            } else {
                dispatch(setModifyTeam("", ""))
            }
        } catch (error) {
            Alert('error', error.message);
        }
    } else {
        Alert("warning", "Please give team name")
    }
    dispatch(isLoaded());
}
//Delete Team
export async function deleteTeam(teamId, dispatch, getUser) {
    dispatch(isLoading());
    try {
        var response = await API.post("teams.php", {
            "crop": getUser.corp,
            "action": 'deleteteam',
            "teamId": teamId
        }, {}, false);
        if (response.status === "True") {
            Alert("success", "Team Deleted Successfully")
            getTeams(dispatch, getUser)
            dispatch(setModifyTeam("", ""))
        } else {
            dispatch(setModifyTeam("", ""))
        }
    } catch (error) {
        Alert('error', error.message);
    }
    dispatch(isLoaded());
}
//Get Designation List
export async function getDesignations(dispatch, getUser) {
    dispatch(isLoading());
    try {
        var response = await API.post("spinner.php", {
            "crop": getUser.corp,
            "action": 'desig',
        }, {}, false);
        if (response.status === "True") {
            dispatch(getDesignation(response.data))
        } else {
            dispatch(getDesignation([]))
        }
    } catch (error) {
        Alert('error', error.message);
    }
    dispatch(isLoaded());
}
//Add Designation
export async function addDesignation(state, dispatch, getUser) {
    if (state.designationName.value !== "" && state.designationName.value !== null) {
        dispatch(isLoading());
        try {
            var response = await API.post("designations.php", {
                "crop": getUser.corp,
                "action": 'adddesignation',
                "designation": state.designationName.value
            }, {}, false);
            if (response.status === "True") {
                Alert("success", "Designation Added Successfully")
                getDesignations(dispatch, getUser)
                dispatch(setModifyDesignation("", ""))
            } else {
                dispatch(setModifyDesignation("", ""))
            }
        } catch (error) {
            Alert('error', error.message);
        }
    } else {
        Alert("warning", "Please give team name")
    }
    dispatch(isLoaded());
}
//Mpdify Designation
export async function modifyDesignation(state, dispatch, getUser) {
    if (state.designationName.value !== "" && state.designationName.value !== null) {
        dispatch(isLoading());
        try {
            var response = await API.post("designations.php", {
                "crop": getUser.corp,
                "action": 'modifydesignation',
                "designationId": state.designationId.value,
                "designation": state.designationName.value
            }, {}, false);
            if (response.status === "True") {
                Alert("success", "Designation Modified Successfully")
                getDesignations(dispatch, getUser)
                dispatch(setModifyDesignation("", ""))
            } else {
                dispatch(setModifyDesignation("", ""))
            }
        } catch (error) {
            Alert('error', error.message);
        }
    } else {
        Alert("warning", "Please give team name")
    }
    dispatch(isLoaded());
}
//Delete Designation
export async function deleteDesignation(designationId, dispatch, getUser) {
    dispatch(isLoading());
    try {
        var response = await API.post("designations.php", {
            "crop": getUser.corp,
            "action": 'deletedesignation',
            "designationId": designationId
        }, {}, false);
        if (response.status === "True") {
            Alert("success", "Designation Deleted Successfully")
            getDesignations(dispatch, getUser)
            dispatch(setModifyDesignation("", ""))
        } else {
            dispatch(setModifyDesignation("", ""))
        }
    } catch (error) {
        Alert('error', error.message);
    }
    dispatch(isLoaded());
}
export async function getShifts(dispatch){
    try {
        const response = await API.post("get_user_shifts.php", { action: "get_shifts" }, {}, false);
        if (response.status === "True") {
            dispatch(get_shifts(response.data))
        } else {
            dispatch(get_shifts([]))
        } 
    } catch (error) {
    }
}
//Modify Designation
export async function modifyTimeShift(state, dispatch) {
    if (state.start_time.value !== "" && state.end_time.value !== "" && state.zone.value !== "") {
        dispatch(isLoading());
        try {
            var response = await API.post("get_user_shifts.php", {
                action: 'modify_shift',
                start_time: state.start_time.value,
                end_time: state.end_time.value,
                time_zone: state.zone.value,
                ts_id:state.ts_id.value
            }, {}, false);
            if (response.status === "True") {
                Alert("success", "Shift Modified Successfully")
                getShifts(dispatch)
                dispatch(setModifyTime(""))
            } else {
                dispatch(setModifyTime(""))
            }
        } catch (error) {
            Alert('error', error.message);
        }
    } else {
        Alert("warning", "please give all details")
    }
    dispatch(isLoaded());
}
//Add Designation
export async function addTimeShift(state, dispatch) {
    if (state.start_time.value !== "" && state.end_time.value !== "" && state.zone.value !== "") {
        dispatch(isLoading());
        try {
            var response = await API.post("get_user_shifts.php", {
                action: 'add_shift',
                start_time: state.start_time.value,
                end_time: state.end_time.value,
                time_zone: state.zone.value,
            }, {}, false);
            if (response.status === "True") {
                Alert("success", "Shift Added Successfully")
                getShifts(dispatch)
                dispatch(setModifyTime())
            } else {
                dispatch(setModifyTime())
            }
        } catch (error) {
            Alert('error', error.message);
        }
    } else {
        Alert("warning", "please give all details")
    }
    dispatch(isLoaded());
}