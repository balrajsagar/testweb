export const SUBTASKS ="SUBTASKS";
export const MAINTASKS = "MAINTASKS"
export const PROJECTS = "PROJECTS"
export const ROADBLOCKS = "ROADBLOCKS"
export const ROADBLOCK_STATUS = "ROADBLOCK_STATUS"
export const ROADBLOCK_DESCRIPTION = "ROADBLOCK_DESCRIPTION"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const ALLMESSAGES = 'ALLMESSAGES'
export const ALLROADBLOCKMESSAGES = 'ALLROADBLOCKMESSAGES'
export const MAINTASKMESSAGES = "MAINTASKMESSAGES"

export const subtasks = (subtasks) => {
    return {
        type: SUBTASKS,
        payload: subtasks
    };
};

export const maintasks = (maintasks) => {
    return {
        type: MAINTASKS,
        payload: maintasks
    };
};

export const mainTaskMessages = (mainTaskMessages) => {
    return {
        type: MAINTASKMESSAGES,
        payload: mainTaskMessages
    };
};
export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
};
export const allRoadBlockMessages = (allRoadBlockMessages) => {
    return {
        type: ALLROADBLOCKMESSAGES,
        payload: allRoadBlockMessages
    };
};

export const projects = (projects) => {
    return {
        type: PROJECTS,
        payload: projects
    };
};

export const roadblocks = (roadblocks) => {
    return {
        type: ROADBLOCKS,
        payload: roadblocks
    };
};
export const roadblockStatus = (status) => {
    return {
        type: ROADBLOCK_STATUS,
        payload: status
    };
};
export const roadblockDescription = (description) => {
    return {
        type: ROADBLOCK_DESCRIPTION,
        payload: description
    };
};
export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}