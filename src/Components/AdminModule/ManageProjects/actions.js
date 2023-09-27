export const PROJECTS = "PROJECTS"
export const PROJECT_TITLE = "PROJECT_TITLE"
export const PROJECT_DESCRIPTION = "PROJECT_DESCRIPTION"
export const MODIFY_PROJECT = "MODIFY_PROJECT"
export const IS_LOADING = 'IS_LOADING'
export const IS_LOADED = 'IS_LOADED'
export function setModifyProject(projectId,projectTitle,projectDescription) {
    return {
      type: MODIFY_PROJECT,
      payload: { projectId,projectTitle,projectDescription }
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
export function isLoading() {
    return { type: IS_LOADING };
  }
  export function isLoaded() {
    return { type: IS_LOADED }
  }