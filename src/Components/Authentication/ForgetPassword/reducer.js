import { IS_LOADED, IS_LOADING, CONFIRM_PASSWORD, NEW_PASSWORD,REDIRECT } from "./actions";
import { validateConfirmPassword, validateNewPassword } from "./validators";


const initialValue = {
    value: "",
    errorStatus: false,
    errormessage: "Please enter valid ",
};
export const initialState = {
    newpassword: initialValue,
    confirmpassword: initialValue,
    passwordredirect:initialValue,
    isLoading: false,
};

export function reducer(state, action) {
    switch (action.type) {
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
                        errormessage:"please enter password with 'a-z ,A-Z,0-9,spacial charecters'"
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
                        errormessage:"please enter password with 'a-z ,A-Z,0-9,spacial charecters'"
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
              passwordredirect: {
                ...state.passwordredirect,
                value: action.payLoad,
                errorStatus: false,
              },
            }
        default:
            return state
    }
}
