import API from "../../Common/Network/API";
// import Alert from "../../Common/Alert";
import { isLoaded, isLoading, properties, webProperties } from "./actions";
import { setToken } from '../../Common/LocalStorage';
import store from '../../Common/Store';


export async function getProps(state, dispatch) {

  let defaultProps = {
    "MODULES": "Sprint",
    "MAINTASKS": "User Story",
    "SUBTASKS": "Task",
    "PROJECT": "Epic",
    "KANBAN": "Kanban board",
    "KANBAN_NAME": "Kanban Name",
    "BACKLOG": "Backlog",
    "WHITEBOARD": "WhiteBoard",
    "AGILE": "Agile",
    "USER_STORIES": "User Stories",
    "ROADBLOCKS": "Roadblock",
    "ARCHIVE": "Archive",
    "STORY_POINTS": "Story Points",
    "SPRINT_CYCLE": "Sprint Cycle",
    "ACCEPTANCE_CRITERIA": "Acceptance Criteria",
    "SQUAD": "Squad",
    "PRIORITY_LEVEL": "Priority Level",
    "SPRINT_VELOCITY": "Sprint Velocity",
    "BURN_UP_REPORT": "Burn Up Report",
    "BURN_DOWN_REPORT": "Burn Down Report",
    "INDIVIDUAL_VELOCITY": "Individual Velocity",
    "EPIC_VELOCITY": "Epic Velocity",
    "INDIVIDUAL_WORKLOAD": "Individual Workload",
    "AGILE_PROJECT_NAME": "Agile Project Name",
    "IMG_SRC": "images/common/agile.png",
    "SCRUM_BOARD": "Scrum-Board",
    "ACTIVE_SPRINT": "Active Sprint",
    "COMPLETED_EPICS": "Completed Epics",
    "CONTRIBUTOR": "Contributor",
    "PRODUCT_OWNER": "Product Owner",
    "SCRUM_MASTER": "Scrum Master",
    "USERS_ROADBLOCKS": "Users Road Blocks",
    "ROADBLOCK_PERCENTAGE": "Roadblock Percentage",
    "AGILE_SQUAD": "Agile Squad",
    "USAGE_REPORTS": "Agile Usage Reports",
    "USER_EFFICIENCY": "Employee Efficiency"
  }

  dispatch(isLoading());
  try {
    var response = await API.post("properties.php", {
      "action": "getProps",
      "app_name": window.location.origin,
      "properties": JSON.stringify(defaultProps),
      "prop_type": "app_props"
    }, {}, false);
    setToken('properties', response.data.properties)
    store.dispatch(properties(JSON.parse(response.data.properties))); //store the user information
  } catch (error) {
    // Alert('error',error.message);
  }
  dispatch(isLoaded());
}

export async function getWebProps(state, dispatch) {

  let defaultProps = {
    "APP_NAME": "Task24x7",
    "SUPPORT_EMAIL": "support@task24X7.com",
    "CONTENT1": "Software teams that embrace task project management methodologies increase their development speed, expand collaboration, and foster the ability to better respond to market trends.",
    "SUB_CONTENT1": "We help organize your work, so your team can strike a healthy balance between structure, flexibility, and launching Products according to the client need on time.",
    "CONTENT1_IMAGE" : 'CONTENT1_IMAGE',
    "CONTENT1_BG_COLOR": "#47974B",
    "IMAGE1": "IMAGE1",
    "IMAGE_CONTENT1": "Task 24X7 is the software that handles any Sprint, User Story without any confusion.",
    "IMAGE_SUB_CONTENT1": "Manage your sprint planning, User Stories, and tasks with Task 24X7 and keep everyone in-the-loop.",
    "IMAGE2": "IMAGE2",
    "IMAGE_CONTENT2": "Manage iterations and task workflows all in one place Release quality products faster, together",
    "IMAGE_SUB_CONTENT2": "With all communication and updates in one place, work better together to push the product forward.",
    "IMAGE3": "IMAGE3",
    "IMAGE_CONTENT3": "Epics, Sprint, User Stories, Backlogs",
    "IMAGE_SUB_CONTENT3": "These simple structures help task teams gracefully manage scope and structure work. With all communication and updates in one place, your team work better together to push the product forward.",
    "IMAGE4": "IMAGE4",
    "IMAGE_CONTENT4": "Better User experience with Easy To Use Dashboard Stay on top of your sprints",
    "IMAGE_SUB_CONTENT4": "Use dashboards to easily track User stories and backlogs to see where your team stands against each EPIC.",
    "IMAGE_SLIDER": "IMAGE_SLIDER",
    "FOOTER_CONTENT1": "Try Task 24x7 for your team",
    "FOOTER_SUB_CONTENT1": "Sign up and look who is using Task 24x7 to get their work done.",
    "CONTENT1_COLOR": "#FFFFFF",
    "SUB_CONTENT1_COLOR": "#FFFFFF",
    "IMAGE_CONTENT1_COLOR": "#000000",
    "IMAGE_SUB_CONTENT1_COLOR": "#233656",
    "IMAGE_CONTENT2_COLOR": "#000000",
    "IMAGE_SUB_CONTENT2_COLOR": "#233656",
    "IMAGE_CONTENT3_COLOR": "#000000",
    "IMAGE_SUB_CONTENT3_COLOR": "#233656",
    "IMAGE_CONTENT4_COLOR": "#000000",
    "IMAGE_SUB_CONTENT4_COLOR": "#233656",
    "FOOTER_CONTENT1_COLOR": "#FFFFFF",
    "FOOTER_SUB_CONTENT1_COLOR": "#FFFFFF",
    "APP_FAVICON": "APP_FAVICON"
  }

  dispatch(isLoading());
  try {
    var response = await API.post("properties.php", {
      "action": "getWebProps",
      "app_name": window.location.origin,
      "properties": JSON.stringify(defaultProps),
      "prop_type": "web_props"
    }, {}, false);

    setToken('web_properties', response.data.properties)
    store.dispatch(webProperties(JSON.parse(response.data.properties))); //store the user information
  } catch (error) {
    // Alert('error',error.message);
  }
  dispatch(isLoaded());
}