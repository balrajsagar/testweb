export const PROJECTS = "PROJECTS"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'

export const projects = (projects) => {
    return {
        type: PROJECTS,
        payload: projects
    };
};
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}