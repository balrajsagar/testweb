import { SET_CURRENT_USER } from '../Actions/actions'

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {}
};
export function authReducer(state = initialState, action) {

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}


