export const TOBEASSIGNED = "TOBEASSIGNED"
export const TO_BE_ASSIGNED = "TO_BE_ASSIGNED"
export const ROADBLOCK_LIST = "ROADBLOCK_LIST"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'

export const toBeAssignedRoadBlocks = (toBeAssigned) => {
    return {
        type: TOBEASSIGNED,
        payload: toBeAssigned
    };
};

export const assignedRoadBlocks = (assigned) => {
    return {
        type: TO_BE_ASSIGNED,
        payload: assigned
    };
};

export const roadBlocks = (roadBlocks) => {
    return {
        type: ROADBLOCK_LIST,
        payload: roadBlocks
    };
};
export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }