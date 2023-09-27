import { EMPLOYEES, ALLMESSAGES, EMP_DESIGNATIONS, EMP_ROLES, SELECT_ROLE, SELECT_DESIGNATION, IS_LOADED, IS_LOADING, EMP_ID, FULL_NAME, EMAIL, PASSWORD, MOBILE, USERNAME, TEAM, DESIGNATION, USER_TYPE, USER_STATUS, MODIFY_EMPLOYEE, MANAGER_LIST, REPORTING_MANAGER, FUNCTIONAL_MANAGER, EMPLOYEE_ID, ROLES_LIST, PRODUCT_OWNER_COUNT, SCRUM_MASTER_COUNT, SQUAD_LIST } from "./actions";
import { validateName, validateEmail, validateNewPassword } from '../../Common/validators';
import {CONTRIBUTOR} from '../../Common/Headers'


const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
// const selectRole = { id: 0, name: "Select Role", status: 0 };
// const selectDesignation = { id: 0, name: "Select Designation", status: 0 };
export const initialState = {
    allMessages: [],
    employees: [],
    squadList: [],
    managers: [],
    roles: [],
    designations: [],
    rolesList: [],
    roleSelected: initialValue,
    designationSelected: initialValue,
    reportingManagerSelected: initialValue,
    functionalManagerSelected: initialValue,
    empId: initialValue,
    employeeId: initialValue,
    fullName: initialValue,
    email: initialValue,
    password: initialValue,
    mobile: initialValue,
    userName: initialValue,
    team: initialValue,
    designation: initialValue,
    scrumMasterCount: initialValue,
    productOwnerCount: initialValue,
    userType: {
        value: 'Contributor',
        errorStatus: false,
        errorMessage: "Please Enter valid ",
    },
    userStatus: {
        value: "Active",
        errorStatus: false,
        errorMessage: "Please Enter valid ",
    }
};

export function empReducer(state = initialState, action) {

    switch (action.type) {
        case ROLES_LIST:
            return {
                ...state,
                rolesList: action.payload
            };
        case EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            };
        case SQUAD_LIST:
            return {
                ...state,
                squadList: action.payload
            };
        case ALLMESSAGES:
            return {
                ...state,
                allMessages: action.payload
            };
        case MANAGER_LIST:
            return {
                ...state,
                managers: action.payload
            };
        case EMP_ROLES:
            return { ...state, roles: action.payload };
        case EMP_DESIGNATIONS:
            return {
                ...state,
                designations: action.payload
            };
        case SELECT_ROLE:
            return {
                ...state,
                roleSelected: {
                    ...state.roleSelected,
                    value: action.payload,
                    errorStatus: false,
                },
                // roleSelected: action.payload
            };
        case SELECT_DESIGNATION:
            return {
                ...state,
                designationSelected: {
                    ...state.designationSelected,
                    value: action.payload,
                    errorStatus: false,
                },
                // designationSelected: action.payload
            };
        case REPORTING_MANAGER:
            return {
                ...state,
                reportingManagerSelected: {
                    ...state.reportingManagerSelected,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case FUNCTIONAL_MANAGER:
            return {
                ...state,
                functionalManagerSelected: {
                    ...state.functionalManagerSelected,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case IS_LOADING:
            return { ...state, isLoading: true };
        case IS_LOADED:
            return {
                ...state,
                isLoading: false,
            };
        case EMP_ID:
            return {
                ...state,
                empId: {
                    ...state.empId,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case EMPLOYEE_ID:
            return {
                ...state,
                employeeId: {
                    ...state.employeeId,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case FULL_NAME:
            if(validateName(action.payload)){
            return {
                ...state,
                fullName: {
                    ...state.fullName,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        }else{
            return {
                ...state,
                fullName: {
                    ...state.fullName,
                    value: action.payload,
                    errorStatus: true,
                    errormessage: 'Please enter valid name'
                },
            };
        }
        case EMAIL:
            if(validateEmail(action.payload)){
            return {
                ...state,
                email: {
                    ...state.email,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        }else{
            return {
                ...state,
                email: {
                    ...state.email,
                    value: action.payload,
                    errorStatus: true,
                    errormessage: 'Please enter valid email'
                },
            };
        }
        case PASSWORD:
            if(validateNewPassword(action.payload)){
            return {
                ...state,
                password: {
                    ...state.password,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        }else{
            return {
                ...state,
                password: {
                    ...state.password,
                    value: action.payload,
                    errorStatus: true,
                    errormessage: "please enter password with 'a-z ,A-Z,0-9'"
                },
            };
        }
        case MOBILE:
            // if(validateMobileNumber(action.payload)){
            return {
                ...state,
                mobile: {
                    ...state.mobile,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        // }else{
        //     return {
        //         ...state,
        //         mobile: {
        //             ...state.mobile,
        //             value: action.payload,
        //             errorStatus: true,
        //             errormessage: 'Please enter valid mobile number'
        //         },
        //     };
        // }
        case SCRUM_MASTER_COUNT:
            return {
                ...state,
                scrumMasterCount: {
                    ...state.scrumMasterCount,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case PRODUCT_OWNER_COUNT:
            return {
                ...state,
                productOwnerCount: {
                    ...state.productOwnerCount,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case USERNAME:
            return {
                ...state,
                userName: {
                    ...state.userName,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case TEAM:
            return {
                ...state,
                team: {
                    ...state.team,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case DESIGNATION:
            return {
                ...state,
                designation: {
                    ...state.designation,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case USER_TYPE:
            return {
                ...state,
                userType: {
                    ...state.userType,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case USER_STATUS:
            return {
                ...state,
                userStatus: {
                    ...state.userStatus,
                    value: action.payload,
                    errorStatus: false,
                },
            };
        case MODIFY_EMPLOYEE:
            return {
                ...state,
                empId: {
                    ...state.empId,
                    value: action.payload.empId,
                    errorStatus: false
                },
                employeeId: {
                    ...state.employeeId,
                    value: action.payload.employeeId,
                    errorStatus: false
                },
                fullName: {
                    ...state.fullName,
                    value: action.payload.fullName,
                    errorStatus: false
                },
                email: {
                    ...state.email,
                    value: action.payload.email,
                    errorStatus: false
                },
                mobile: {
                    ...state.mobile,
                    value: action.payload.mobile,
                    errorStatus: false
                },
                userName: {
                    ...state.userName,
                    value: action.payload.userName,
                    errorStatus: false
                },
                roleSelected: {
                    ...state.roleSelected,
                    value: action.payload.roleSelected,
                    // errorStatus: false
                },
                designationSelected: {
                    ...state.designationSelected,
                    value: action.payload.designationSelected,
                    // errorStatus: false
                },
                reportingManagerSelected: {
                    ...state.reportingManagerSelected,
                    value: action.payload.reportingManagerSelected,
                    // errorStatus: false
                },
                functionalManagerSelected: {
                    ...state.functionalManagerSelected,
                    value: action.payload.functionalManagerSelected,
                    // errorStatus: false
                },
                userType: {
                    ...state.userType,
                    value: action.payload.userType,
                    errorStatus: false
                },
                userStatus: {
                    ...state.userStatus,
                    value: action.payload.userStatus,
                    errorStatus: false
                },
            }
        default:
            return state;
    }
}
