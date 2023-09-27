import React, { useEffect, useReducer, useRef } from 'react';
import {
    Inject, ScheduleComponent, Day, Week, WorkWeek,
    // eslint-disable-next-line
    Month, Agenda, EventSettingsModel, ResourceDirective, Timezone, ResourcesDirective, DragAndDrop, Resize
} from '@syncfusion/ej2-react-schedule';
// import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import API from '../Network/API';
import { applyCategoryColor } from './helper';
import { initialState, reducer } from './reducer';
// eslint-disable-next-line
import { getEmployeesDash, getModules, getCalendarDashStory, getEventCalendarDash, getSquadsList } from './network';
import SideBar from "../../UserModule/SquadChat/sideNav"
import TopNavWithOutProject from "../../UserModule/Utility/TopNav/topnav"
import { useSelector } from 'react-redux';
import { isLoaded, isLoading } from '../Actions/loading';
// eslint-disable-next-line
// import RootLoader from '../Loader/RootLoader';
import Alert from '../Alert';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement, L10n } from '@syncfusion/ej2-base';
// eslint-disable-next-line
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import "./calendar.css"
import { URL } from '../Headers'
// const CryptoJS = require("crypto-js"); 
L10n.load({
    'en-US': {
        'schedule': {
            'editSeries': '',
            'deleteSeries': '',
            'editFollowingEvent': 'Following Events',
        },
    }
});


function Calender() {

    // eslint-disable-next-line
    const [state, dispatch] = useReducer(reducer, initialState);

    const getUser = useSelector(state => state.auth)
    const scheduleObj = useRef(null);
    useEffect(() => {
        getEmployeesDash(dispatch, getUser.user);
        getModules(dispatch, getUser.user);
        getCalendarDashStory(dispatch,getUser.user); 
        getEventCalendarDash(getUser.user, dispatch);
        getSquadsList(dispatch, getUser.user.empId)
        // eslint-disable-next-line
    }, [])
    // console.log("projets",state.allProjects)
    // console.log("getUser",getUser.user)
    // for field validation
    const fields = {
        subject: { name: 'Subject', validation: { required: true } },
        // location: {
        //     name: 'Location', validation: {
        //         required: true,
        //         regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
        //     }
        // },
        // description: {
        //     name: 'Description', validation: {
        //         required: true, minLength: 5, maxLength: 500
        //     }
        // },
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } }
    };
    var sprints = []
    state.modules.map((module) => {
        return (
            sprints.push({
                'value': module.moduleId, 'label': module.moduleDesc, assignbyId: module.assignbyId,
                average: module.average,
                createdBy: module.createdBy,
                created_on: module.created_on,
                ideaId: module.ideaId,
                ideaTitle: module.ideaTitle,
                moduleDesc: module.moduleDesc,
                moduleId: module.moduleId,
                startDate: module.startDate,
                status: module.status,
                targetDate: module.targetDate
            })
        );
    })
    var stories = []
    // display user story add event
    state.calendarDashStory.map((story) => {
        return (
            stories.push({
                Subject: story.story_title,
                EndTime: story.target_date,
                StartTime: story.target_date,
                IsAllDay: "1",
                IsReadonly: "1",
                Color: '#df5286',
                Members: story.assignedto,
                Location: story.active_status === "0" ? `To Do, ${story.project_name}`
                    : story.active_status === "1" ? `In Progress, ${story.project_name}`
                        : story.active_status === "-1" ? `Blocked, ${story.project_name}` : `Completed, ${story.project_name}`
            })
        );
    })  

    const urlBase = `${URL}calendarPathSetUp?key=${getUser.user.corp}&projectId=${getUser.user.projectId}&empId=`;

    // for handling api 
    const handleData = async (e) => {
        const data = e.result
        const length = e.result.length
        // console.log("data for send",e.result[length - 1])
        // console.warn(scheduleObj.current.currentAction)
        dispatch(isLoading());
        // for delete events
        if (scheduleObj.current.currentAction === "Delete" || scheduleObj.current.currentAction === "DeleteSeries") {
            // console.log(scheduleObj.current.activeEventData.event)
            try {
                // eslint-disable-next-line
                var response = await API.post("calendarDash.php", {
                    // data: data,
                    urlBase: urlBase,
                    action: scheduleObj.current.currentAction,
                    current: scheduleObj.current.activeEventData.event,
                    corp_code: getUser.user.corp,
                    // projectId: getUser.user.projectId,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
                // console.log(response)
            } catch (error) {
                console.log(error)
                Alert('error', error.message);
            }
            // for adding events
        } else if (scheduleObj.current.currentAction === "Add" && scheduleObj.current.activeEventData.event === undefined) {
            try {
                // eslint-disable-next-line
                var response = await API.post("calendarDash.php", {
                    urlBase: urlBase,
                    addEvent: e.result[length - 1],
                    corp_code: getUser.user.corp,
                    action: scheduleObj.current.currentAction,
                    // projectId: e.result[length - 1].ProjectName,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
                if (response.status === "True") {
                    // getEvent(getUser.user,dispatch)
                    // swal("Success");
                }
            } catch (error) {
                console.log(error)
                Alert('error', error.message);
            }


            // for edit occurrence
        } else if (scheduleObj.current.currentAction === "EditOccurrence") {
            try {
                // eslint-disable-next-line
                var response = await API.post("calendarDash.php", {
                    urlBase: urlBase,
                    addEvent: e.result[length - 1],
                    corp_code: getUser.user.corp,
                    // action:  'EditOccurrence',
                    data: data,
                    action: scheduleObj.current.currentAction,
                    // projectId: getUser.user.projectId,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
                if (response.status === "True") {
                    // getEvent(getUser.user,dispatch)
                    // swal("Success");
                }
            } catch (error) {
                console.log(error)
                Alert('error', error.message);
            }
            // for edit following events
        } else if (scheduleObj.current.currentAction === 'EditFollowingEvents') {
            try {
                // eslint-disable-next-line
                var response = await API.post("calendarDash.php", {
                    urlBase: urlBase,
                    data: data,
                    addEvent: e.result[length - 1],
                    current: scheduleObj.current.activeEventData.event,
                    action: scheduleObj.current.currentAction,
                    corp_code: getUser.user.corp,
                    // projectId: getUser.user.projectId,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
            } catch (error) {
                console.log(error)
                Alert('error', error.message);
            }
            // for getting resize, drag and drop and update 
        } else {

            try {
                // eslint-disable-next-line
                var response = await API.post("calendarDash.php", {
                    urlBase: urlBase,
                    data: data,
                    action: "InsertUpdate",
                    corp_code: getUser.user.corp,
                    state: scheduleObj.current.currentAction,
                    current: scheduleObj.current.activeEventData.event,
                    // projectId: getUser.user.projectId,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
            } catch (error) {
                console.log(error)
                Alert('error', error.message);
            }
            dispatch(isLoaded());
        }

    }
    // for adding extra field to the default editor
    const editorTemplate = (args) => {
        // console.log("editor", args)
        if (args.type === 'Editor') {
            // scheduleObj.eventWindow.recurrenceEditor.frequencies = ['none', 'daily', 'weekly'];
            // Create required custom elements in initial time
            if (!args.element.querySelector('.custom-field-row')) {
                let row = createElement('div', { className: 'custom-field-row' });
                let formElement = args.element.querySelector('.e-schedule-form');
                formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
                let container = createElement('div', { className: 'custom-field-container' });
                let inputEle = createElement('input', {
                    className: 'e-field', attrs: { name: 'EventStatus' }
                });
                container.appendChild(inputEle);
                row.appendChild(container);
                let drowDownList = new DropDownList({
                    dataSource: [
                        { text: 'Active', value: 'Active' },
                        { text: 'Cancel', value: 'Cancel' }
                    ],
                    fields: { text: 'text', value: 'value' },
                    value: args.data.EventStatus ? args.data.EventStatus : "Active",
                    floatLabelType: 'Always', placeholder: 'Event Status'
                });
                drowDownList.appendTo(inputEle);
                inputEle.setAttribute('name', 'EventStatus');

                // another field added
                let inputField = createElement('input', {
                    className: 'e-field', attrs: { name: 'ProjectName' }
                });
                container.appendChild(inputField);
                row.appendChild(container);
                let drowDownList1 = new DropDownList({
                    dataSource: state.allProjects,
                    fields: { text: 'value', value: 'id' },
                    value: args.data.ProjectName ? args.data.ProjectName : "Select Any one",
                    floatLabelType: 'Always', placeholder: 'ProjectName'
                });
                drowDownList1.appendTo(inputField);
                inputField.setAttribute('name', 'ProjectName');
            }
        }
    }
    // add color and styling to the event and user story
    const onEventRendered = (args) => {
        // console.log("eventrender",args)
        if (args.data.IsAllDay === '1') {
            args.data.CategoryColor = '#1aaa55'
        } else if (args.data.EventStatus === "Cancel" && args.data.IsAllDay === '') {
            args.data.CategoryColor = '#F57F17'
            args.data.TextLine = 'line-through'
            args.data.LineColor = 'black'
        } else {
            args.data.CategoryColor = '#357CD2'
        }
        applyCategoryColor(args, scheduleObj.currentView);
    }
    const events = [...state.events, ...stories]

    const deleteTask = (taskToDelete, addedEmp) => {
        const tasks = state.employees.filter(task => task.email !== taskToDelete);
        // eslint-disable-next-line
        const newEmpp = tasks.unshift(addedEmp)
        return { tasks };
    }
    const employeeDetails = deleteTask(getUser.user.userName, {
        id: getUser.user.empId, name: getUser.user.fullName,
        email: getUser.user.userName, userName: getUser.user.userName, role: getUser.user.role, empStatus: getUser.user.empStatus
    })

    // for serch events
    const globalSearch = (args) => {
        let searchString = args.target.value;
        if (searchString !== '') {
            new DataManager(scheduleObj.current.eventsData).executeQuery(new Query().search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e) => {
                if (e.result.length > 0) {
                    showSearchEvents('show', e.result);
                }
                else {
                    showSearchEvents('hide');
                }
            });
        }
        else {
            showSearchEvents('hide');
        }
    }
    // display searched events
    const showSearchEvents = (type, data) => {
        if (type === 'show') {
            if (document.getElementById('grid').classList.contains('e-grid')) {
                let gridObj = document.querySelector('#grid').ej2_instances[0];
                gridObj.dataSource = data;
                gridObj.dataBind();
                // console.log("in if",gridObj.dataSource)
            }
            else {
                let gridObj = new GridComponent({
                    dataSource: data,
                    height: 505,
                    width: 'auto',
                    columns: [
                        { field: 'Subject', headerText: 'Subject', width: 120 },
                        { field: 'Location', headerText: 'Location', width: 120 },
                        { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                        { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                    ]
                });
                gridObj.appendTo(document.querySelector('#grid'));
                // console.log("in else none display",gridObj.dataSource)
                // scheduleObj.element.style.display = 'none';
            }
        }
        else {
            let gridObj = document.querySelector('#grid').ej2_instances;
            if (gridObj && gridObj.length > 0 && !gridObj[0].isDestroyed) {
                gridObj[0].destroy();
            }
            // console.log("displyblock",gridObj.dataSource)
            // scheduleObj.element.style.display = 'block';
        }
    }
    return (

        <div className="container-scroller">
            <TopNavWithOutProject />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="d-flex justify-content-between col-12 row p-2">
                                            <h2 className="card-title" style={{ paddingTop: 20, paddingLeft: 20 }}>CALENDAR</h2>

                                            
                                             <div className="d-flex justify-content-end mt-2">
                                            <div class="input-group-prepend" style={{marginTop:5}}>
                                                <span class="text" style={{ color: 'black', marginTop: '3px', fontSize: '13px', paddingRight: 10 }}>Search:</span>
                                            </div>
                                            <input type="text" class="form-control" style={{ backgroundColor: 'transparent', borderBottom: '2px solid black', borderTop: '2px solid black', borderLeft: '12x solid black', borderRight: '2px solid black',width: 250, height: '35px' }}
                                                onKeyUp={(args) => globalSearch(args)} />
                                        </div>
                                        </div>
                                       
                                        {/* {state.isLoading ? <RootLoader/> : */}
                                        <div id="grid"></div>
                                        <ScheduleComponent
                                            height='550px'
                                            ref={scheduleObj}
                                            // eventSettings={{ dataSource: state.user }}
                                            eventSettings={{ dataSource: events, fields: fields, editFollowingEvents: true }}
                                            dataBinding={handleData}
                                            popupOpen={editorTemplate}
                                            group={{
                                                allowGroupEdit: true
                                                // for show members list and remove multiple meet column for multiple people
                                                // , resources: ['Conferences'] 
                                            }}
                                            eventRendered={onEventRendered}
                                        >
                                            <ResourcesDirective>
                                                <ResourceDirective field='Members' title='Attendees' name='Conferences' allowMultiple={true}
                                                    //   dataSource={state.employees}
                                                    dataSource={employeeDetails.tasks}
                                                    textField='name' idField='email'>
                                                </ResourceDirective>
                                            </ResourcesDirective>


                                            <Inject
                                                services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]} />
                                        </ScheduleComponent>
                                        {/* } */}
                                        {/* <div id="grid"></div> */}



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    );
}

export default Calender;