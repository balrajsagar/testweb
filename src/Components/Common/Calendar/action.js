export const IS_LOADING = 'ISLOADING'
export const IS_LOADED = 'ISLOADED'
export const GET_USER = 'GET_USER'
export const EMPLOYEES = "EMPLOYEES"
export const MODULES = "MODULES"
export const SECTION = 'SECTION'
export const SPRINT = "SPRINT"
export const CALENDARDASHSTORY = "CALENDARDASHSTORY"
export const EVENTS = "EVENTS"
export const ALLPROJETS = "ALLPROJECTS"


export function allProjects(allProjects) {
    return {
        type: ALLPROJETS,
        payLoad: allProjects
    }
}
export function events(events) {
    return {
        type: EVENTS,
        payLoad: events
    }
}
export function calendarDashStory(calendarDashStory) {
    return {
        type: CALENDARDASHSTORY,
        payLoad: calendarDashStory
    }
}
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}

export function user(user) {
    return {
        type: GET_USER,
        payLoad: user
    }
}
export function section(section) {
    return {
        type: SECTION,
        payLoad: section
    }
}
export function sprint(sprint) {
    return {
        type: SPRINT,
        payLoad: sprint
    }
}
export function modules(modules) {
    return {
        type: MODULES,
        payLoad: modules
    }
}
export const employees = (employees) => {
    return {
        type: EMPLOYEES,
        payload: employees
    };
};
