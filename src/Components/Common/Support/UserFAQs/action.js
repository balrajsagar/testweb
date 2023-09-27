export const IS_LOADING = 'ISLOADING'
export const IS_LOADED = 'ISLOADED'
export const APPDETAILS = 'APPDETAILS'


export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}

export function appDetails(appDetails) {
    return {
        type: APPDETAILS,
        payLoad: appDetails
    }
}
