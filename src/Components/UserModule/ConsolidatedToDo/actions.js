export const CONSOLIDATED_TODO = "CONSOLIDATED_TODO"
export const PRIVATE_TODO = "PRIVATE_TODO"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'

export const consolidatedToDo = (consolidatedToDo) => {
    return {
        type: CONSOLIDATED_TODO,
        payload: consolidatedToDo
    };
};
export const privateToDo = (privateToDo) => {
    return {
        type: PRIVATE_TODO,
        payload: privateToDo
    };
};
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}