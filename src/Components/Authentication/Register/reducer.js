import { IS_LOADED, IS_LOADING, CONFIRM_PASSWORD, NEW_PASSWORD,REDIRECT, EMAIL } from "./actions";
import { validateConfirmPassword, validateNewPassword, validateEmail } from "./validators";


const initialValue = {
    value: "",
    errorStatus: false,
    errormessage: "Please enter valid ",
};
export const initialState = {
    email: initialValue,
    newpassword: initialValue,
    confirmpassword: initialValue,
    emailredirect:initialValue,
    isLoading: false,
};

export function reducer(state, action) {
    switch (action.type) {
        case EMAIL:
            if (validateEmail(action.payLoad)) {
                return {
                    ...state,
                    email: {
                        ...state.email,
                        value: action.payLoad,
                        errorStatus: false,
                    },
                };
            } else {
                return {
                    ...state,
                    email: {
                        ...state.email,
                        value: action.payLoad,
                        errorStatus: true,
                        errormessage:"Enter Valid Email"
                    },
                };
            }
        case NEW_PASSWORD:
            if (validateNewPassword(action.payLoad)) {
                return {
                    ...state,
                    newpassword: {
                        ...state.newpassword,
                        value: action.payLoad,
                        errorStatus: false,
                    },
                };
            } else {
                return {
                    ...state,
                    newpassword: {
                        ...state.newpassword,
                        value: action.payLoad,
                        errorStatus: true,
                        errormessage:"please enter password with 'a-z ,A-Z,0-9'"
                    },
                };
            }
        case CONFIRM_PASSWORD:
            if (validateConfirmPassword(action.payLoad)) {
                return {
                    ...state,
                    confirmpassword: {
                        ...state.confirmpassword,
                        value: action.payLoad,
                        errorStatus: false,
                    },
                };
            } else {
                return {
                    ...state,
                    confirmpassword: {
                        ...state.confirmpassword,
                        value: action.payLoad,
                        errorStatus: true,
                        errormessage:"please enter password with 'a-z ,A-Z,0-9'"
                    },
                };
            }
        case IS_LOADING:
            return { ...state, isLoading: true };
        case IS_LOADED:
            return {
                ...state,
                isLoading: false,
            };
            case REDIRECT: //page navigation
            return {...state,
                emailredirect: {
                ...state.emailredirect,
                value: action.payLoad,
                errorStatus: false,
              },
            }
        default:
            return state
    }
}
