export const IS_LOADING = 'ISLOADING'
export const IS_LOADED = 'ISLOADED'
export const SECTION = 'SECTION'
export const REDIRECT ='REDIRECT'
export const APP = 'APP'
export const APPDETAILS = 'APPDETAILS'
export const ALLAPP = 'ALLAPP'
export const EDIT_FAQ = 'EDIT_FAQ'
export const QUES = 'QUES'
export const ANS = 'ANS'

export const setEditFaq = (id,ques,ans) =>{
    return {
        type: EDIT_FAQ,
        payload: {id,ques,ans}
    };
}
export function ques(ques) {
    return {
        type: QUES,
        payLoad: ques
    }
}
export function ans(ans) {
    return {
        type: ANS,
        payLoad: ans
    }
}

export function redirect(addredirect){
    return {type : REDIRECT,
      payLoad:addredirect}
  }
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}

export function section(section) {
    return {
        type: SECTION,
        payLoad: section
    }
}

export function app(app) {
    return {
        type: APP,
        payLoad: app
    }
}

export function allApp(allApp) {
    return {
        type: ALLAPP,
        payLoad: allApp
    }
}

export function appDetails(appDetails) {
    return {
        type: APPDETAILS,
        payLoad: appDetails
    }
}


