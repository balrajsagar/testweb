
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const MURAL_TITLE = "MURAL_TITLE"
export const MURAL_BOARDS = "MURAL_BOARDS"



export const muralTitle = (muralTitle) => {
    return {
        type: MURAL_TITLE,
        payload: muralTitle
    };
};

export const savedMuralBoards = (muralboards) => {
    return {
        type: MURAL_BOARDS,
        payload: muralboards
    };
};
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}
