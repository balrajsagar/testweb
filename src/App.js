import React from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import Login from './Components/Authentication/Login';
import PublicRoute from './Components/Authorization/PublicRoutes';
import { setCurrentUser } from './Components/Common/Actions';

import jwt_decode from "jwt-decode";
import axios from 'axios';
import { clearToken, getToken } from './Components/Common/LocalStorage';
import store from './Components/Common/Store';
import UserDashboard from './Components/UserModule/UserDashboard';
import ManageProjects from './Components/UserModule/ManageProjects';
import Modules from './Components/UserModule/Modules';
import ManageTasks from './Components/UserModule/ManageTasks';
import Teams from './Components/UserModule/Team';
import UserProfile from './Components/UserModule/UserProfile';
import UpdateProfile from './Components/UserModule/UserProfile/updateProfile';
import Payement from './Components/UserModule/UserProfile/payement';
import Dashboard from './Components/UserModule/Dashboard/Dashboard';


import Projects from './Components/AdminModule/ManageProjects';
import { AdminRoute, UserRoute } from './Components/Authorization/PrivateRoutes';
import CompletedProjects from './Components/UserModule/CompletedProjects';
import AddModules from './Components/Common/Modules';
import ViewMainTasks from './Components/Common/TasksModals';
import ViewSubTasks from './Components/Common/SubTaskModals';
import AdminModules from './Components/AdminModule/Modules';
import Properties from './Components/AdminModule/Properties/Properties';

import AdminManageTasks from './Components/AdminModule/ManageTasks';
import AgileSquad from './Components/AdminModule/Team';
import AgileAccount from './Components/AdminModule/Accounts';
import AdminChat from './Components/AdminModule/GroupChat';
import Timesheet from './Components/AdminModule/Timesheet';
import AdminRoadBlocks from './Components/AdminModule/RoadBlocks';
import RoadBlockList from './Components/AdminModule/RoadBlocks/roadBlockList';
import EmployeeInfo from './Components/Common/EmployeeInfo';
import ProjectInfo from './Components/Common/ProjectInfo';
import UserProjects from './Components/Common/UserTasksInfo/userProjects';
import UserMainTasks from './Components/Common/UserTasksInfo/userMainTasks';
import UserSubTasks from './Components/Common/UserTasksInfo/userSubTasks';
import UserRoadBlocks from './Components/Common/UserTasksInfo/userRoadBlocks';
import ChangePassword from './Components/Authentication/ChangePassword';
import UserPendingSubTasks from './Components/UserModule/UserSubTasks';
import EmployeesRoadBlocks from './Components/UserModule/RoadBlocks';
import UsersRoadBlockList from './Components/UserModule/RoadBlocks/roadBlockList';
import ChangePasswordUser from './Components/UserModule/ChangePassword';
import AdminSettings from './Components/AdminModule/Settings';
import Instruction from './Components/AdminModule/Employees/instruction';
import forgetPassword from './Components/Authentication/ForgotPassword';
import Register from './Components/Authentication/Register';
import SquadRegister from './Components/Authentication/Register/squadRegister';
import UserSprints from './Components/UserModule/Modules/sprints';
import Home from './Components/Authentication/LandingPage';
import ReleaseNote from './Components/Common/Support/ReleaseNote';
import ContactUs from './Components/Common/Support/ReleaseNote/Contactus';
import ReportBug from './Components/Common/Support/ReportBug';
import Faqs from './Components/Common/Support/Faqs';
import Forget from './Components/Authentication/ForgetPassword';
import Verify from './Components/Authentication/Register/verify';
import ResetPassword from './Components/Authentication/ForgetPassword/resetPassword';
import Archive from './Components/UserModule/Archive';
// import Archive1 from './Components/UserModule/Archive/Archive1';

import CompletedUserStories from './Components/UserModule/Archive/completedUserStories';
import Reports from './Components/UserModule/Reports';
import Kanbanboard from './Components/UserModule/Backlogs/kanbanBoard';
import Mural from './Components/UserModule/MuralBoard/';
import WhiteBoard from './Components/UserModule/MuralBoard/drawingBoard';
import AdminReports from './Components/AdminModule/Reports/reports'
import ProjectReports from './Components/AdminModule/Reports/projectReports'
import AgileUsageReports from './Components/AdminModule/Reports/agileUsageReports'
import IndividualReports from './Components/AdminModule/Reports/userIndReports'
import Calendar from './Components/Common/Calendar';
import UnderMaintenance from '../src/Components/Maintenance/UnderMaintenance';
import Error404 from '../src/Components/Maintenance/404 Error';
import GroupChat from './Components/UserModule/GroupChat';
import CalendarPathSetUp from './Components/Common/PathSetup/calendar';
import SquadChat from './Components/UserModule/SquadChat';
import TemplateView from './Components/UserModule/Backlogs/templateView';
import ConsolidatedTodoList from './Components/UserModule/ConsolidatedToDo';
import UserArchiveProjects from './Components/UserModule/ArchiveProjects';
import calendarDash from './Components/Common/Calendar/calendarDash';
import FAQs from './Components/AdminModule/FAQs';
import Details from './Components/AdminModule/FAQs/details';
import ReportBugUser from './Components/UserModule/Support';
import UserFAQs from './Components/Common/Support/UserFAQs';
import UserKanban from './Components/UserModule/Modules/kanban';
import ArchiveProjects from './Components/AdminModule/ArchiveProjects';

import { MODULES, MURAL_BOARD, PENDING_SUBTASKS, MANAGEPROJECTS, ARCHIVE, COMPLETED_PROJECTS, USERS_ROADBLOCKS, APP_NAME, KANBAN_NAME, IMG_SRC } from './Components/Common/Headers';
import { getProps, getWebProps } from './Components/Authentication/LandingPage/network';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { landingReducer, initialState } from './Components/Authentication/LandingPage/landingReducer';
import { useSelector } from 'react-redux';
import MainTaskSubTaskTabs from './Components/UserModule/Archive/mainTaskSubtaskTab';
import Privacy from './Components/UserModule/Utility/Privacy';


if (getToken('auth')) {
  const tokenDetails = jwt_decode(getToken('auth'));
  store.dispatch(setCurrentUser(tokenDetails.data)); //store the user information
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (tokenDetails.exp < currentTime) {
    localStorage.removeItem('auth');
    // Remove auth header for future requests
    delete axios.defaults.headers.common['x-access-token'];
    // Set current user to empty object {} which will set isAuthenticated to false
    clearToken();
    localStorage.removeItem('persist:main-root');
    store.dispatch(setCurrentUser({}));
    window.location.href = "/";
  }
}

function Routes() {

  const [state, dispatch] = useReducer(landingReducer, initialState)
  const webProperties = useSelector(state => state.landingReducer.webProperties)


  useEffect(() => {
    getProps(state, dispatch)
    getWebProps(state, dispatch)
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    document.title = webProperties?.APP_NAME || APP_NAME;
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = webProperties?.APP_FAVICON !== 'APP_FAVICON' ?  webProperties?.APP_FAVICON : 'images/task24x7favicon/favicon-32x32.png'
  }, [webProperties]);


  return (
    <HashRouter>
      <Switch>
        <PublicRoute path="/" component={Home} exact />
        <PublicRoute path="/release" component={ReleaseNote} exact />
        <PublicRoute path="/contact" component={ContactUs} exact />
        <PublicRoute path="/reportBug" component={ReportBug} exact />
        <PublicRoute path="/faqs" component={Faqs} exact />
        <PublicRoute path="/login" component={Login} exact />
        <PublicRoute path="/register" component={Register} exact />
        <PublicRoute path="/verify" component={Verify} exact />
        <PublicRoute path="/squadRegister" component={SquadRegister} exact />
        <PublicRoute path="/forgetPassword" component={forgetPassword} exact />
        <PublicRoute path="/resetPassword" component={ResetPassword} exact />
        <PublicRoute path="/forget" component={Forget} exact />
        <PublicRoute path="/homeProperties" component={Properties} exact />
        <PublicRoute path="/privacyPolicy" component={Privacy} exact />

        <UserRoute path="/calendarPathSetUp" component={CalendarPathSetUp} exact />
        <UserRoute path="/instruction" component={Instruction} exact />
        <UserRoute path="/userDashboard" component={UserDashboard} exact />
        <UserRoute path={`/${MODULES}`} component={UserSprints} exact />
        <UserRoute path={`/${KANBAN_NAME}`} component={UserKanban} exact />
        <UserRoute path="/userProjects" component={UserProjects} exact />
        <UserRoute path="/userMaintasks" component={UserMainTasks} exact />
        <UserRoute path="/usersTodo" component={UserPendingSubTasks} exact />
        <UserRoute path="/userSubtasks" component={UserSubTasks} exact />
        <UserRoute path="/userRoadblocks" component={UserRoadBlocks} exact />
        <UserRoute path={`/user/${MANAGEPROJECTS}`} component={ManageProjects} exact />
        <UserRoute path={`/${USERS_ROADBLOCKS}`} component={EmployeesRoadBlocks} exact />
        <UserRoute path="/empRoadblockLists" component={UsersRoadBlockList} exact />
        <UserRoute path="/userProjectInfo" component={ProjectInfo} exact />
        <UserRoute path="/modules" component={Modules} exact />
        <UserRoute path="/addModules" component={AddModules} exact />
        <UserRoute path="/viewMainTasks" component={ViewMainTasks} exact />
        <UserRoute path="/viewSubTasks" component={ViewSubTasks} exact />
        <UserRoute path="/manageTasks" component={ManageTasks} exact />
        <UserRoute path={`/${PENDING_SUBTASKS}`} component={Kanbanboard} exact />
        <UserRoute path={`/${MURAL_BOARD}`} component={Mural} exact />
        <UserRoute path="/whiteBoard" component={WhiteBoard} exact />
        <UserRoute path={`/${ARCHIVE}`} component={Archive} exact />
        {/* <UserRoute path="/archive" component={Archive} exact /> */}
        {/* <UserRoute path="/archive1" component={Archive1} exact /> */}

        <UserRoute path="/completedUserStories" component={CompletedUserStories} exact />
        <UserRoute path="/reports" component={Reports} exact />
        <UserRoute path="/teams" component={Teams} exact />
        <UserRoute path="/empTrack" component={EmployeeInfo} exact />
        <UserRoute path="/manageTasks" component={ManageTasks} exact />
        <UserRoute path={`/${COMPLETED_PROJECTS}`} component={CompletedProjects} exact />
        <UserRoute path="/userProfile" component={UserProfile} exact />
        <UserRoute path="/updateProfile" component={UpdateProfile} exact />
        <UserRoute path="/roadblocks" component={RoadBlockList} exact />
        <UserRoute path="/changePasswordUser" component={ChangePasswordUser} exact />
        <UserRoute path="/calendar" component={Calendar} exact />
        <UserRoute path='/payement' component={Payement} exact />
        <UserRoute path="/chat" component={GroupChat} exact />
        <UserRoute path="/squadChat" component={SquadChat} exact />
        <UserRoute path='/dashboard' component={Dashboard} exact />
        <UserRoute path='/dashboard/todo' component={ConsolidatedTodoList} exact />
        <UserRoute path='/user/archiveProjetcs' component={UserArchiveProjects} exact />
        <UserRoute path="/templateView" component={TemplateView} exact />
        <UserRoute path="/calendarDash" component={calendarDash} exact />
        <UserRoute path="/reportBugUser" component={ReportBugUser} exact />
        <UserRoute path="/userFaqs" component={UserFAQs} exact />
        <UserRoute path="/mainTaskSubTaskTabs" component={MainTaskSubTaskTabs} exact />

        <AdminRoute path="/changePassword" component={ChangePassword} exact />
        <AdminRoute path="/properties" component={Properties} exact />
        <AdminRoute path="/projects" component={Projects} exact />
        <AdminRoute path="/projectInfo" component={ProjectInfo} exact />
        <AdminRoute path="/adminModules" component={AdminModules} exact />
        <AdminRoute path="/adminManageTasks" component={AdminManageTasks} exact />
        <AdminRoute path="/roadBlock" component={AdminRoadBlocks} exact />
        <AdminRoute path="/roadblockList" component={RoadBlockList} exact />
        <AdminRoute path="/completedProjects" component={CompletedProjects} exact />
        <AdminRoute path="/employees" component={AgileSquad} exact />
        <AdminRoute path="/accounts" component={AgileAccount} exact />
        <AdminRoute path="/timesheet" component={Timesheet} exact />
        <AdminRoute path="/empInfo" component={EmployeeInfo} exact />
        <AdminRoute path="/viewModules" component={AddModules} exact />
        <AdminRoute path="/viewManageTasks" component={ViewMainTasks} exact />
        <AdminRoute path="/subTasks" component={ViewSubTasks} exact />
        <AdminRoute path="/settings" component={AdminSettings} exact />
        <AdminRoute path="/admin/reports" component={AdminReports} exact />
        <AdminRoute path="/admin/projectReports" component={ProjectReports} exact />
        <AdminRoute path="/admin/usageReports" component={AgileUsageReports} exact />
        <AdminRoute path="/admin/indReports" component={IndividualReports} exact />
        <AdminRoute path="/admin/chat" component={AdminChat} exact />
        <AdminRoute path="/admin/faqs" component={FAQs} exact />
        <AdminRoute path="/admin/details" component={Details} exact />
        <AdminRoute path='/admin/adminPayment' component={Payement} exact />
        <AdminRoute path="/admin/archiveProject" component={ArchiveProjects} exact />

        <Route path="/UnderMaintenance" component={UnderMaintenance} exact />
        <Route path="*" component={Error404} exact />

      </Switch >
    </HashRouter >
  );
}

export default Routes;