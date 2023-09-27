import { combineReducers } from "redux";
import { loadingReducer } from "./loadingReducer";
import { authReducer } from './authReducer';// For Authentication
import { tasksReducer } from '../../UserModule/UserDashboard/tasksReducer'; //For Subtasks Store
import { moduleReducer } from "../../UserModule/Modules/moduleReducer";
import { propertiesReducer } from "../../AdminModule/Properties/propertiesReducer";
import { landingReducer } from "../../Authentication/LandingPage/landingReducer";


export default combineReducers({
    loading: loadingReducer, auth: authReducer, subtask: tasksReducer ,sprint: moduleReducer,propertiesReducer:propertiesReducer,landingReducer:landingReducer
});