
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const ALLMESSAGES = 'ALLMESSAGES'
export const ADMINDETAILS = 'ADMINDETAILS'


export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}

export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
};

export const adminDetails = (adminDetails) => {
    return {
        type: ADMINDETAILS,
        payload: adminDetails
    };
};