export const PROJECTS = "PROJECTS";
export const MANAGE_TASKS = "MANAGE_TASKS";
export const SUB_TASKS = "SUB_TASKS";
export const ROAD_BLOCKS = "ROAD_BLOCKS";
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const TASKS_COUNT = "TASKS_COUNT";
export const ALLMESSAGES = 'ALLMESSAGES'
export const MAINTASKMESSAGES = 'MAINTASKMESSAGES'
export const ROADBLOCKMESSAGES = 'ROADBLOCKMESSAGES'
export const THANKS_POINTS = "THANKS_POINTS"
export const AWARDS = "AWARDS"
export const SELECT_AWARD = "SELECT_AWARD"
export const AWARD_DESCRIPTION = "AWARD_DESCRIPTION"




export const allMessages = (allMessages) => {
    return {
        type: ALLMESSAGES,
        payload: allMessages
    };
  };

  export const mainTaskMessages = (mainTaskMessages) => {
    return {
        type: MAINTASKMESSAGES,
        payload: mainTaskMessages
    };
  };

  export const roadBlockMessages = (roadBlockMessages) => {
    return {
        type: ROADBLOCKMESSAGES,
        payload: roadBlockMessages
    };
  };

//for tasks count
export const tasksCount = (tasksCount) => {
    return {
        type: TASKS_COUNT,
        payload: tasksCount
    };
};
export const projects = (projects) => {
    return {
        type: PROJECTS,
        payload: projects
    };
};
export const subTasks = (subTasks) => {
    return {
        type: SUB_TASKS,
        payload: subTasks
    };
};
export const manageTasks = (manageTasks) => {
    return {
        type: MANAGE_TASKS,
        payload: manageTasks
    };
};
export const roadBlocks = (roadBlocks) => {
    return {
        type: ROAD_BLOCKS,
        payload: roadBlocks
    };
};

export const thanksPoints = (thanksPoints) => {
    return {
        type: THANKS_POINTS,
        payload: thanksPoints
    };
};

export const awards = (awards) => {
    return {
        type: AWARDS,
        payload: awards
    };
};

export function awardSelected(award){
    return { type:SELECT_AWARD,
            payload:award
           }
}

export const awardDescription = (description) => {
    return {
        type: AWARD_DESCRIPTION,
        payload: description
    };
};

export function isLoading() {
    return { type: IS_LOADING };
}
export function isLoaded() {
    return { type: IS_LOADED }
}