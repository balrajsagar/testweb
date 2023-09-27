import { PROFILE_INFO, IS_LOADED, IS_LOADING, USER_NAME, MOBILE_NUMBER, EMAIL, REDIRECT, DESIGNATION, TEAM, ROLE, STATUS, EMP_ID, AWARDS } from "./actions";

const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
const initialValue1 = {
    value: "0",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
function validateMobileNumber(mobile) {
    var reg = /^[0]?[6789]\d{9}$/
    return (mobile.length === 10 && reg.test(mobile)) ? true : false
}
export const initialState = {
    empId: initialValue,
    account_type: initialValue,
    license_key: initialValue,
    free_licenses: initialValue1,
    username: initialValue,
    fullName: initialValue,
    mobile: initialValue,
    license_validity: initialValue,
    remaining_projects: initialValue,
    email: initialValue,
    designation: initialValue,
    team: initialValue,
    role: initialValue,
    email_status: initialValue,
    reportingManager: initialValue,
    functionalManager: initialValue,
    status: initialValue,
    isLoading: false,
    profile: initialValue,
    shift_hours: initialValue,
    awards: [],
};

export function reducer(state, action) {
    switch (action.type) {
        case EMP_ID:
            return {
                ...state,
                empId: {
                    ...state.empId,
                    value: action.payLoad,
                    errorStatus: false,
                },
            };
        case AWARDS:
            return {
                ...state,
                awards: action.payload
            };
        case USER_NAME:
            return {
                ...state,
                username: {
                    ...state.username,
                    value: action.payLoad,
                    errorStatus: false,
                },
            };
        case MOBILE_NUMBER:
            if (validateMobileNumber(action.payLoad)) {
                return {
                    ...state,
                    mobile: {
                        ...state.mobile,
                        value: action.payLoad,
                        errorStatus: false,
                    },
                };
            } else {
                return {
                    ...state,
                    mobile: {
                        ...state.mobile,
                        value: action.payLoad,
                        errorStatus: true,
                        errorMessage: "Please Enter Valid Mobile Number"
                    },
                };
            }
        case EMAIL:
            return {
                ...state,
                email: {
                    ...state.email,
                    value: action.payLoad,
                    errorStatus: false,
                },
            };
        case DESIGNATION:
            return {
                ...state,
                designation: {
                    ...state.designation,
                    value: action.payLoad,
                    errorStatus: false,
                },
            };
        case TEAM:
            return {
                ...state,
                team: {
                    ...state.team,
                    value: action.payLoad,
                    errorStatus: false,
                },
            };
        case ROLE:
            return {
                ...state,
                role: {
                    ...state.role,
                    value: action.payLoad,
                    errorStatus: false,
                },
            };
        case STATUS:
            return {
                ...state,
                status: {
                    ...state.status,
                    value: action.payLoad,
                    errorStatus: false,
                },
            };

        case PROFILE_INFO:
            return {
                ...state,
                username: {
                    ...state.username,
                    value: action.payLoad.username,
                    errorStatus: false
                },
                fullName: {
                    ...state.fullName,
                    value: action.payLoad.fullName,
                    errorStatus: false
                },
                mobile: {
                    ...state.mobile,
                    value: action.payLoad.mobile,
                    errorStatus: false,
                },
                email: {
                    ...state.mobile,
                    value: action.payLoad.email,
                    errorStatus: false,
                },
                designation: {
                    ...state.designation,
                    value: action.payLoad.designation,
                    errorStatus: false
                },
                team: {
                    ...state.team,
                    value: action.payLoad.team,
                    errorStatus: false,
                },
                role: {
                    ...state.role,
                    value: action.payLoad.role,
                    errorStatus: false,
                },
                reportingManager: {
                    ...state.team,
                    value: action.payLoad.reportingManager,
                    errorStatus: false,
                },
                functionalManager: {
                    ...state.role,
                    value: action.payLoad.functionalManager,
                    errorStatus: false,
                },
                status: {
                    ...state.status,
                    value: action.payLoad.status,
                    errorStatus: false,
                },
                empId: {
                    ...state.empId,
                    value: action.payLoad.empId,
                    errorStatus: false
                },
                shift_hours: {
                    ...state.shift_hours,
                    value: action.payLoad.shift_hours,
                    errorStatus: false
                },
                account_type: {
                    ...state.account_type,
                    value: action.payLoad.account_type,
                    errorStatus: false
                },
                license_key: {
                    ...state.license_key,
                    value: action.payLoad.license_key,
                    errorStatus: false
                },
                email_status: {
                    ...state.email_status,
                    value: action.payLoad.email_status,
                    errorStatus: false
                },
                free_licenses: {
                    ...state.free_licenses,
                    value: action.payLoad.free_licenses,
                    errorStatus: false
                },
                license_validity: {
                    ...state.license_validity,
                    value: action.payLoad.license_validity,
                    errorStatus: false
                },
                remaining_projects: {
                    ...state.remaining_projects,
                    value: action.payLoad.remaining_projects,
                    errorStatus: false
                }
            }
        case REDIRECT: //page navigation
            return {
                ...state,
                profile: {
                    ...state.profile,
                    value: action.payLoad,
                    errorStatus: false,
                },
            }
        case IS_LOADING:
            return { ...state, isLoading: true };
        case IS_LOADED:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state
    }
}