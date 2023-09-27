import { PROPERTIES,IS_LOADED, IS_LOADING,IMP_PROPERTIES } from "./actions";
export const initialState = {
    props: {},
    imp_props:{}
};

export function propertiesReducer(state = initialState, action) {

    switch (action.type) {
        case PROPERTIES:
            return {
                ...state,
                props: action.payload
            };
            case IMP_PROPERTIES:
                return {
                    ...state,
                    imp_props: action.payload
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
