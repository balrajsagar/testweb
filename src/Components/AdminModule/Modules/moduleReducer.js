import { IS_LOADED, IS_LOADING, MODULES, MODULE_TITLE } from "./actions";

const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "Please Enter valid ",
};
export const initialState = {
    modules: [],
    moduleTitle: initialValue,
};

export function moduleReducer(state = initialState, action) {

    switch (action.type) {
        case MODULES:
            return {
                ...state,
                modules: action.payload
            };
        case MODULE_TITLE:
            return {
                ...state,
                moduleTitle: {
                    ...state.moduleTitle,
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
        default:
            return state;
    }
}
