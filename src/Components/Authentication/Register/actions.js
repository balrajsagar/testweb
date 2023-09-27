export const IS_LOADING = 'ISLOADING'
export const IS_LOADED = 'ISLOADED'
export const CONFIRM_PASSWORD = 'CONFIRM_PASSWORD'
export const NEW_PASSWORD = 'NEW_PASSWORD'
export const REDIRECT ='REDIRECT'
export const EMAIL = 'EMAIL'

export function isLoading() {
  return { type: IS_LOADING };
}
export function isLoaded() {
  return { type: IS_LOADED }
}
export function updateEmail(email) {
  return {
    type: EMAIL,
    payLoad: email
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
export function redirect(emailredirect){
  return {type : REDIRECT,
    payLoad:emailredirect}
}