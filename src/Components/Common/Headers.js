import { Client_URL, Server_URL } from "./config"
import { getProperties, getWebProperties } from './getProperties';
import { getToken } from "./LocalStorage";
let userProperties = JSON.parse(getToken('properties')) || getProperties();
let webproperties = JSON.parse(getToken('web_properties')) || getWebProperties();
/*labels file for defining label information for presentation view*/
export const URL = Client_URL; //client url  from config.js v2.0.5
export const BaseUrl = Server_URL; //api for chat from config.js v2.0.5
export const CHATAPI = Server_URL; //api for chat user story and roadblock level from config.js v2.0.5
/*Projects*/
export const PROJECT = `${userProperties.PROJECT}`
export const PROJECTS = `${userProperties.PROJECT}s`
export const PROJECT_DESCRIPTION = `Description`
export const PROJECT_REQUESTED_BY = `Requested by`
export const PROJECT_APPROVED_BY = `Approved By`
export const PROJECT_APPROVAL_STATUS = `Approval Status`
export const PROJECT_STATUS = `${userProperties.PROJECT} Status`
export const MANAGEPROJECTS = `${userProperties.PROJECT}s`
export const NEWPROJECT = `Add ${userProperties.PROJECT}`
export const PROJECTNO = `${userProperties.PROJECT} Id`
export const PROJECTNAME = `${userProperties.PROJECT} Name`
export const PROJECT_SUCCESS = `${userProperties.PROJECT} Added Successfully`
export const PROJECT_MODIFY = `${userProperties.PROJECT} Modified Successfully`
export const PROJECT_APPROVE = `${userProperties.PROJECT} Approved Successfully`
export const PROJECT_REJECT = `${userProperties.PROJECT} Is Rejected`
export const PROJECT_DELETE = `${userProperties.PROJECT} Deleted`
export const PROJECT_VERIFY = `${userProperties.PROJECT} Verified Successfully`
export const COMPLETED_PROJECTS = `${userProperties.COMPLETED_EPICS}`
export const PROJECT_APPROVED_DATE = `Approved Date`
export const PROJECT_COMPLETED_DATE = `Completed Date`
export const PROJECT_REOPEN = `Reopen`
export const COMPLETED_PROJECT = `Complete ${userProperties.PROJECT}`

export const CALENDAR = `Calendar`
export const SUPPORT = 'Support'


/*Modules*/
export const MODULES = `${userProperties.MODULES}s`
export const MODULE = `${userProperties.MODULES}`
export const NEWMODULE = `Add ${userProperties.MODULES}`
export const VIEWMODULES = `View ${userProperties.MODULES}`
export const ADDMODULE = `Add ${userProperties.MODULES}`
export const MODULENAME = `${userProperties.MODULES} Name`
export const MODIFYMODULE = `Modify ${userProperties.MODULES}`
export const MODULE_ADD = `${userProperties.MODULES} Added Successfully`
export const MODULE_MODIFY = `${userProperties.MODULES} Modified Successfully`
export const MODULE_DELETE = `${userProperties.MODULES} Deleted Successfully`
export const ACTIVE_SPRINT = `${userProperties.ACTIVE_SPRINT}`


/*Maintasks */
export const MAINTASKS = `${userProperties.USER_STORIES}`;
export const MAINTASK = `${userProperties.MAINTASKS}`
export const NEWMAINTASK = `Add ${userProperties.MAINTASKS}`;
export const VIEWMAINTASKS = `View ${userProperties.MAINTASKS}`;
export const MAINTASKID = `${userProperties.MAINTASKS} Id`
export const MAINTASKNAME = `${userProperties.MAINTASKS} Name`
export const MAINTASK_DESCRIPTION = `Description`
export const MAINTASKPROGRESS = `${userProperties.MAINTASKS} Progress`
export const MODIFYMAINTASK = `Modify ${userProperties.MAINTASKS}`
export const MAINTASK_ADD = `${userProperties.MAINTASKS} added successfully`
export const MAINTASK_MODIFY = `${userProperties.MAINTASKS} Modified Successfully`
export const MAINTASK_REASSIGN = `${userProperties.MAINTASKS} Reassigned Successfully`
export const MAINTASK_DELETE = `${userProperties.MAINTASKS} Delete Successfully`
export const MAINTASK_VERIFY = `${userProperties.MAINTASKS} Verified Successfully`
export const MAINTASK_VERIFY_FAIL = `You can not verify ${userProperties.MAINTASKS} untill ${userProperties.SUBTASKS}s are verified`
export const ACTIVE_STORIES = `Active User Stories` //user stories Count

/*Subtasks*/
export const SUBTASKS = `${userProperties.SUBTASKS}s`;
export const SUBTASK = `${userProperties.SUBTASKS}`
export const PENDING_SUBTASKS = `${userProperties.BACKLOG}`
export const SUBTASKID = `${userProperties.SUBTASKS} Id`
export const SUBTASKTITLE = `${userProperties.SUBTASKS} Name`
export const SUBTASK_DESCRIPTION = `${userProperties.SUBTASKS} Description`
export const SUBTASK_PROGRESS = `${userProperties.SUBTASKS} Progress`
export const NEWSUBTASK = `Add ${userProperties.SUBTASKS}`;
export const VIEWSUBTASKS = `View ${userProperties.SUBTASKS}s`;
export const MODIFYSUBTASK = `Modify ${userProperties.SUBTASKS}`
export const SUBTASK_ADD = `${userProperties.SUBTASKS} Added Successfully`
export const SUBTASK_MODIFY = `${userProperties.SUBTASKS} Modified Successfully`
export const SUBTASK_DELETE = `${userProperties.SUBTASKS} Deleted Successfully`
export const SUBTASK_VERIFY = `${userProperties.SUBTASKS} Verified Successfully`
export const SUBTASK_ACTIVE = `${userProperties.SUBTASKS} Activated successfully`
export const SUBTASK_COMPLETE = `${userProperties.SUBTASKS} Completed Successfully`


// export const SUBTASK_VERIFY_FAIL = `you can not verify module untill subtasks are verified`



/*Roadblocks*/
export const ROADBLOCK = `Blocked`
export const ROADBLOCKS = `${userProperties.ROADBLOCKS}s`
export const USERS_ROADBLOCKS = `${userProperties.USERS_ROADBLOCKS}`
export const TO_BE_ASSIGN = `To Be Assigned`
export const ASSIGNED = `Assigned`
export const ROADBLOCK_DESCRIPTION = `${userProperties.ROADBLOCKS} Description`
export const ASSIGNED_TO = `Assigned To`
export const ASSIGNED_BY = `Assigned By`
export const ASSIGNED_DATE = `Assigned Date`
export const TARGET_DATE = `Target Date`
export const ROADBLOCK_DATE = `${userProperties.ROADBLOCKS} Date`
export const REQUESTED_BY = `Raised By`
export const ROADBLOCK_PERCENTAGE = `${userProperties.ROADBLOCK_PERCENTAGE}`
export const ROADBLOCK_STATUS = `Status`
export const ROADBLOCK_LIST = `${userProperties.ROADBLOCKS} List`
export const PENDING_ROADBLOCKS = `Pending ${userProperties.ROADBLOCKS}s`
export const ASSIGN_ROADBLOCK = `Assign ${userProperties.ROADBLOCKS}`
export const MODIFY_ROADBLOCK = `Modify ${userProperties.ROADBLOCKS}`
export const PRIORITY = `Priority`
export const SEVERITY = `Severity`



/*Common Lables*/
export const RELEASE_OWNER = `RO`
export const ARCHIVE = `${userProperties.ARCHIVE}`
export const EDIT = `Modify`
export const VIEW_DETAILS = `View Details`
export const ADD_TO_SPRINT = `Add to ${userProperties.MODULES}`
export const ADD_TO_EPIC = `Add to ${userProperties.PROJECT}`
export const MEMBERS = `Members`




export const REASSIGN = `Reassign`
export const CHANGE_STATUS = `Change Status`

export const DELETE = `Delete`
export const APPROVE = `Approve`
export const VERIFY = `Verify`
export const REJECT = `Reject`
export const ACTION = `Action`
export const ESTIMATEDTIME = `Estimation Time`
export const DAYS = `Days`
export const HOURS = `Hours`
export const CHAT = `Chat`
export const MESSAGES = `Messages`
export const STATUS = `Status`
export const ASSIGNED_ON = `Assigned On`
export const CREATED_BY = `Created By`
export const CREATED_DATE = `Created Date`
export const TIME_LEFT = `Time Left`
export const REPORTS = `Reports`
export const TIMESHEET = `Timesheet`
export const MURAL_BOARD = `${userProperties.WHITEBOARD}`
export const NEW_MURAL_BOARD = `${userProperties.WHITEBOARD}`
export const SELECT_DATE_RANGE = `Select Date Range`

/*Employees */
export const EMPLOYEES = `${userProperties.AGILE_SQUAD}`

/*Teams and Designation*/
export const TEAM = `Department`
export const DESIGNATION = `Title`
export const TEAM_NAME = `Department Name`
export const DESIGNATION_NAME = `Title Name`




export const STORY_POINTS = `${userProperties.STORY_POINTS}`
export const SELECT_SQUAD_MEMBER = `Select ${userProperties.SQUAD} Member`
export const ACCEPTANCE_CRITERIA = `${userProperties.ACCEPTANCE_CRITERIA}`
export const DEFINITION_OF_DONE = `Definition of Done`
export const PRIORITY_LEVEL = `${userProperties.PRIORITY_LEVEL}`
export const AGILE_PROJECT_NAME = `${userProperties.AGILE_PROJECT_NAME}`


export const CONTRIBUTOR = `${userProperties.CONTRIBUTOR}`
export const PRODUCT_OWNER = `${userProperties.PRODUCT_OWNER}`
export const SCRUM_MASTER = `${userProperties.SCRUM_MASTER}`
export const LIMITED_ACCESS_CONTRIBUTOR = `Limited Access Contributor`


export const START_DATE = `Start Date`
export const END_DATE = `End Date`



export const ADD_SQUAD_MEMBER = `Add ${userProperties.SQUAD} Member`
export const AGILE_SQUAD = `${userProperties.AGILE} ${userProperties.SQUAD}`
export const SQUAD_MEMBER_NAME = `${userProperties.SQUAD} Member Name`
export const USERNAME_EMAIL = `Username/Email`
export const CONTACT = `Contact`
export const ROLE = `Role`
export const SHIFT_TIMINGS = `Shift Timings`
export const WORKING_STATUS = `Working Status`
export const AGILE_EDIT = `Edit`
export const USER_STATUS = `User Status`
export const AGILE=userProperties.AGILE


// Reports
export const PROJECT_NAME = `Project Name`
export const SPRINT_NAME = `${userProperties.MODULES} Name`
export const ASSIGNED_STORY_POINTS = `Assigned ${userProperties.STORY_POINTS}`
export const PENDING = `Pending`
export const COMPLETED = `Completed`
export const INDIVIDUAL_EMPLOYEE_REPORTS = `Individual Employee Reports`
export const EMPLOYEE_NAME = `User Name`
export const NO_OF_PROJECTS_INVOLVED = `No of Projects Involved`
export const PROJECTS_INVOLVED = `Projects Involved`
export const DATE = `Date`
export const SPRINT_VELOCITY = `${userProperties.SPRINT_VELOCITY}`
export const TASK_VELOCITY = `Task Velocity`
export const BURN_UP_REPORT = `${userProperties.BURN_UP_REPORT}`
export const BURN_DOWN_REPORT = `${userProperties.BURN_DOWN_REPORT}`
export const INDIVIDUAL_VELOCITY = `${userProperties.INDIVIDUAL_VELOCITY}`
export const EPIC_VELOCITY = `${userProperties.EPIC_VELOCITY}`
export const INDIVIDUAL_WORKLOAD = `${userProperties.INDIVIDUAL_WORKLOAD}`
export const SPRINT_CYCLE = `${userProperties.SPRINT_CYCLE}`

export const PROFILE = ` Profile`
export const LICENSE = `License`
export const CHANGE_PASSWORD = `Change Password`
export const LOGOUT = `Logout`
export const SETTINGS = `Settings`
export const SQUAD_MEMBER_ID = `${userProperties.SQUAD} Member ID`
export const PAYEMENT = `Payment`
export const USERNAME = `Username`
export const FULLNAME = `Full Name`
export const EMAIL = `Email`
export const MOBILE = `Mobile`
export const WORKING_HOURS = `Working Hours`
export const TOTAL_HOURS = `Total No of Hours Worked`
export const TOTAL_HOURS_SPENT = `Total Hours Spent`

export const TOTAL_USER_STORIES = `No of ${userProperties.USER_STORIES} Assigned`
export const USER_EFFICIENCY = `${userProperties.USER_EFFICIENCY}`
export const ACCOUNT_STATUS = "Account Status"
export const VERIFIED_ACCOUNT = "Account Verified"
export const NOT_VERIFIED_ACCOUNT = "Not Verified"

export const ALL_EMPLOYEE_REPORTS = `All Employee Reports`
export const PROJECT_REPORTS = `Project Reports`
export const TOTAL_USERS = 'No of Total Users'
export const ACTIVE_USERS = 'No of Active Users'
export const INACTIVE_USERS = `No of Inactive Users`
export const WORKING_USERS = `No of Working Users`

export const USAGE_REPORTS = `${userProperties.USAGE_REPORTS}`
export const TOTAL_PROJECTS = `Total No of Projects`
export const ACTIVE_PROJECTS = `No of Active Projects`
export const AGILE_PROJECT_STATUS = `Project Status`
export const AGILE_PROJECT_REOPEN = `Project Reopen`
export const ARCHIVE_PROJECT = "Archive Project"
export const LOGIN_TIME = `Last Login Date`
export const REGISTERED_DATE = `Registered Date`
// Image Icon Hovers
export const COMMENTS = "Comments"
export const ALL_USERS = "All Users"
export const UPDATE_STORY = "Update User Story Progress"
export const USER_STORY_PROGRESS = "User Story Progress"
export const ACTION_ICON = `More`
export const ATTACH_FILE = `Attach Image`

// Group Chat
export const CHAT_ROOM = 'Chat Room'
export const CREATE_GROUP = 'Create Group'
export const EDIT_GROUP = 'Edit Group'

export const NEW_PROJECT = 'New Project'
export const SCRUM_BOARD = `${userProperties.SCRUM_BOARD}`


export const IMG_SRC = `${userProperties.IMG_SRC}`

export const CONSOLIDATED_TODO = "To Do"
export const TODO = "To Do"
export const PRIVATE_TODO = "Personal To Do"
export const ADD_PRIVATE_TODO = "Add Task"
export const ADD_TO_TODO_PROJECTS = `Task added to Agile project Successfully`

/* Awards */
export const AWARDS = "Kudos Points"
export const ADD_AWARDS = "Award Kudos Points"
export const AWARD_BY = "Awarded By"
export const AWARD_TO = "Awarded To"
export const DATE_OF_AWARD = "Date of Award"
export const THANKS_REASON = "Kudos Reason"
export const THANKS_DESCRIPTION = "Kudos Description"
export const THANKS_POINTS = "Kudos Award"
export const USERS_AWARDS = "Users Awards"
export const THANKS_POINTS_SUMMARY = "Kudos POINTS SUMMARY"

// kanban board

export const KANBAN = `${userProperties.KANBAN}` || "Kanban"
export const KANBAN_NAME = `${userProperties.KANBAN_NAME}` || "Kanban Name"


/* website props */
export const APP_NAME = `${webproperties.APP_NAME}`
export const SUPPORT_EMAIL = `${webproperties.SUPPORT_EMAIL}`
export const CONTENT1 = `${webproperties.CONTENT1}`
export const SUB_CONTENT1 = `${webproperties.SUB_CONTENT1}`
export const IMAGE1 = "IMAGE1"
export const IMAGE_CONTENT1 = `${webproperties.IMAGE_CONTENT1}`
export const IMAGE_SUB_CONTENT1 = `${webproperties.IMAGE_SUB_CONTENT1}`
export const IMAGE2 = "IMAGE2"
export const IMAGE_CONTENT2 = `${webproperties.IMAGE_CONTENT2}`
export const IMAGE_SUB_CONTENT2 = `${webproperties.IMAGE_SUB_CONTENT2}`
export const IMAGE3 = "IMAGE3"
export const IMAGE_CONTENT3 = `${webproperties.IMAGE_CONTENT3}`
export const IMAGE_SUB_CONTENT3 = `${webproperties.IMAGE_SUB_CONTENT3}`
export const IMAGE4 = "IMAGE4"
export const IMAGE_CONTENT4 = `${webproperties.IMAGE_CONTENT4}`
export const IMAGE_SUB_CONTENT4 = `${webproperties.IMAGE_SUB_CONTENT4}`
export const IMAGE_SLIDER = "IMAGE_SLIDER"
export const FOOTER_CONTENT1 = `${webproperties.FOOTER_CONTENT1}`
export const FOOTER_SUB_CONTENT1 = `${webproperties.FOOTER_SUB_CONTENT1}`


// Accounts Information
export const ACCOUNTS = 'Accounts'
export const ACCOUNTS_STATUS = 'Account Status'
export const CLIENT_NAME= 'Client Name'
export const NO_OF_PROJECTS= 'No of Projects'
export const NO_OF_USERS= 'No of Users'

/*Version and Date*/
export const VERSION = `Version 3.0.23`
export const VERSION_DATE = `08-30-2023`


