export const USERS = "USERS"
export const SELECT_USER ="SELECT_USER"
export const SELECTED = "SELECTED"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const users = (users) => {
    return {
        type: USERS,
        payload: users
    };
};
export function userSelected(user){
    return { type:SELECT_USER,
    payload:user}
 }
export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }