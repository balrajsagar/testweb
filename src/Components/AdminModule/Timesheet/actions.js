export const TIMESHEET = "TIMESHEET"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'

export const DATES= 'DATES'

export const timesheet = (timesheet) => {
    return {
        type: TIMESHEET,
        payload: timesheet
    };
};
export const dates=(dates)=>{
    return{
        type:DATES,
        payload:dates
        
    }
}
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}