import { IS_LOADED, IS_LOADING, SERVER_REDIRECT } from './action';
const initialValue = {
    value: "",
    errorStatus: false,
    errorMessage: "",
};
export const serverInitialState = {
    server: initialValue,
    isLoading: false,
};
export function maintenanceReducer(state, action) {

    switch (action.type) {
        case IS_LOADING:
      return { ...state, isLoading: true };
    case IS_LOADED:
      return { ...state, isLoading: false };
    case SERVER_REDIRECT: //page navigation
      return {
        ...state,
        server: {
          ...state.server,
          value: action.payLoad,
          errorStatus: false,
        },
      }
      default:
        return state;
    }
}