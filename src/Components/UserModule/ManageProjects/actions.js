export const PROJECTS = "PROJECTS"
export const PROJECT_TITLE = "PROJECT_TITLE"
export const PROJECT_DESCRIPTION = "PROJECT_DESCRIPTION"
export const MODIFY_PROJECT = "MODIFY_PROJECT"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export const UNCOMPLETED_STORIES = 'UNCOMPLETED_STORIES'
export const CHECK_CURRENT_SPRINT = 'CHECK_CURRENT_SPRINT'
export const TARGET_DATE = "TARGET_DATE"


export function setModifyProject(projectId,projectTitle,projectDescription,targetDate) {
    return {
      type: MODIFY_PROJECT,
      payload: { projectId,projectTitle,projectDescription,targetDate }
    }
  }
export const unCompletedStories=(data)=>{
  return{
    type:UNCOMPLETED_STORIES,
    payload:data
  }
}
export const checkCurrentSprint=(data)=>{
  return{
    type:CHECK_CURRENT_SPRINT,
    payload:data
  }
}
export const projects = (projects) => {
    return {
        type: PROJECTS,
        payload: projects
    };
};

export const projectTitle = (title) => {
    console.log(title)
    return {
        type: PROJECT_TITLE,
        payload: title
    };
};

export const projectDescription = (description) => {
    return {
        type: PROJECT_DESCRIPTION,
        payload: description
    };
};

export const targetDate = (targetDate) => {
  return {
      type: TARGET_DATE,
      payload: targetDate
  };
};
export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }