export const IS_LOADING = 'ISLOADING'
export const IS_LOADED = 'ISLOADED'
export const CONFIRM_PASSWORD = 'CONFIRM_PASSWORD'
export const CURRENT_PASSWORD = 'CURRENT_PASSWORD'
export const NEW_PASSWORD = 'NEW_PASSWORD'
export const REDIRECT ='REDIRECT'

export function isLoading() {
  return { type: IS_LOADING };
}
export function isLoaded() {
  return { type: IS_LOADED }
}
export function updateCurrentPassword(currentpassword) {
  return {
    type: CURRENT_PASSWORD,
    payLoad: currentpassword
  }
}
export function updateNewPassword(newpassword) {
  return {
    type: NEW_PASSWORD,
    payLoad: newpassword
  }
}
export function updateConfirmPassword(confirmpassword) {
  return {
    type: CONFIRM_PASSWORD,
    payLoad: confirmpassword
  }
}
export function redirect(passwordredirect){
  return {type : REDIRECT,
    payLoad:passwordredirect}
}