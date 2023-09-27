import { ADD_TEAM, ADD_DESIGNATION, IS_LOADED, IS_LOADING, TEAMS_LIST, DESIGNATION_LIST, MODIFY_TEAM, TEAM_ID, DESIGNATION_ID, MODIFY_DESIGNATION, MODIFY_TIME, ADD_TIME_ZONE, ADD_START_TIME, ADD_END_TIME, SHIFTS } from "./action";

export const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
export const initialState = {
    teamId: initialValue,
    teamName: initialValue,
    designationId: initialValue,
    designationName: initialValue,
    start_time: initialValue,
    end_time: initialValue,
    zone: initialValue,
    ts_id: initialValue,
    shifts: [],
    team: [],
    designation: [],
};

export function settingsReducer(state = initialState, action) {

    switch (action.type) {
        case TEAMS_LIST:
            return {
                ...state,
                team: action.payload
            };
        case ADD_TEAM:
            return {
                ...state,
                teamName: {
                    ...state.teamName,
                    value: action.payload,
                    errorStatus: false,
                    buttonStatus: "new"
                },
            };
        case TEAM_ID:
            return {
                ...state,
                teamId: {
                    ...state.teamId,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case MODIFY_TEAM:
            return {
                ...state,
                teamId: {
                    ...state.teamId,
                    value: action.payload.teamId,
                    errorStatus: false
                },
                teamName: {
                    ...state.teamName,
                    value: action.payload.teamName,
                    errorStatus: false,
                },
            }
        case DESIGNATION_LIST:
            return {
                ...state,
                designation: action.payload
            };
        case ADD_DESIGNATION:
            return {
                ...state,
                designationName: {
                    ...state.designationName,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case DESIGNATION_ID:
            return {
                ...state,
                designationId: {
                    ...state.designationId,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case MODIFY_DESIGNATION:
            return {
                ...state,
                designationId: {
                    ...state.designationId,
                    value: action.payload.designationId,
                    errorStatus: false
                },
                designationName: {
                    ...state.designationName,
                    value: action.payload.designationName,
                    errorStatus: false,
                },
            }
        case MODIFY_TIME:
            return {
                ...state,
                ts_id: {
                    ...state.ts_id,
                    value: action.payload.ts_id,
                    errorStatus: false
                },
                start_time: {
                    ...state.start_time,
                    value: action.payload.start_time,
                    errorStatus: false
                },
                end_time: {
                    ...state.end_time,
                    value: action.payload.end_time,
                    errorStatus: false,
                },
                zone: {
                    ...state.zone,
                    value: action.payload.zone,
                    errorStatus: false,
                },
            }
        case ADD_END_TIME:
            return {
                ...state,
                end_time: {
                    ...state.end_time,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case ADD_START_TIME:
            return {
                ...state,
                start_time: {
                    ...state.start_time,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case ADD_TIME_ZONE:
            return {
                ...state,
                zone: {
                    ...state.zone,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case SHIFTS:
            return {
                ...state,
                shifts: action.payload
            };
        case IS_LOADING:
            return { ...state, isLoading: true };
        case IS_LOADED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
