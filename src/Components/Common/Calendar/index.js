import React, { useEffect, useReducer, useRef } from 'react';
import {
    Inject, ScheduleComponent, Day, Week, WorkWeek,
    Month, Agenda, ResourceDirective, ResourcesDirective, DragAndDrop, Resize
} from '@syncfusion/ej2-react-schedule';
import API from '../Network/API';
import { applyCategoryColor } from './helper';
import { initialState, reducer } from './reducer';
import { getEvent, getEmployees, getModules, getToDo, getSprint } from './network';
import Header from '../TopNav';
import AdminSideBar from '../../UserModule/Utility/SideNav';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { isLoaded, isLoading } from '../Actions/loading';
import Alert from '../Alert';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement, L10n } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import "./calendar.css"
import { URL } from '../Headers'
import RootLoader from '../Loader/RootLoader';
// to change names of buttons
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
    // ref values from schedular component and getting all data like current action, updated data, current data
    const scheduleObj = useRef(null);
    useEffect(() => {
        getEmployees(dispatch, getUser.user);
        getEvent(getUser.user, dispatch)
        getModules(dispatch, getUser.user);
        getSprint(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])

// for add validation to the fields
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
    // user stories to display on calendar 
    state.section.map((story) => {
        return (
            stories.push({
                Subject: story.story_title,
                EndTime: story.target_date,
                StartTime: story.target_date,
                // make it all day event to display it on top of calendar
                IsAllDay: "1",
                IsReadonly: "1",
                Color: '#df5286',
                Members: story.assignedto,
                Location: story.active_status === "0" ? "To Do"
                    : story.active_status === "1" ? "In Progress"
                        : story.active_status === "-1" ? "Blocked" : "Completed"
            })
        );
    })  


    const urlBase = `${URL}calendarPathSetUp?key=${getUser.user.corp}&projectId=${getUser.user.projectId}&empId=`;
    // for handling operations performed by calendar like add, delete, edit, resize, drag and drop 
    const handleData = async (e) => {
        const data = e.result
        const length = e.result.length
        dispatch(isLoading());
        if (scheduleObj.current.currentAction === "Delete" || scheduleObj.current.currentAction === "DeleteSeries") {
            console.log("ADD1")
            try {
                // eslint-disable-next-line
                var response = await API.post("calendar.php", {
                    urlBase: urlBase,
                    action: scheduleObj.current.currentAction,
                    current: scheduleObj.current.activeEventData.event,
                    corp_code: getUser.user.corp,
                    projectId: getUser.user.projectId,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
            } catch (error) {
                console.log(error)
                Alert('error', error.message);
            }
        } else if (scheduleObj.current.currentAction === "Add" && scheduleObj.current.activeEventData.event === undefined) {
            console.log("ADD2")
            console.log(e.result[length - 1])
            dispatch(isLoading());
            try {
                // eslint-disable-next-line
                var response = await API.post("calendar.php", {
                    urlBase: urlBase,
                    addEvent: e.result[length - 1],
                    corp_code: getUser.user.corp,
                    action: scheduleObj.current.currentAction,
                    projectId: getUser.user.projectId,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
                dispatch(isLoaded());
                if (response.status === "True") {
                    alert("Event created successfully")

                }
                else{
                    alert("Something went wrong")
                }
            } catch (error) {
                Alert('error', error.message);
                dispatch(isLoaded());
            }


        } else if (scheduleObj.current.currentAction === "EditOccurrence") {
            console.log("ADD3")
            try {
                // eslint-disable-next-line
                var response = await API.post("calendar.php", {
                    urlBase: urlBase,
                    addEvent: e.result[length - 1],
                    corp_code: getUser.user.corp,
                    data: data,
                    action: scheduleObj.current.currentAction,
                    projectId: getUser.user.projectId,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
                if (response.status === "True") {
                }
            } catch (error) {
                console.log(error)
                Alert('error', error.message);
            }
        } else if (scheduleObj.current.currentAction === 'EditFollowingEvents') {
            console.log("ADD4")
            try {
                // eslint-disable-next-line
                var response = await API.post("calendar.php", {
                    urlBase: urlBase,
                    data: data,
                    addEvent: e.result[length - 1],
                    current: scheduleObj.current.activeEventData.event,
                    action: scheduleObj.current.currentAction,
                    corp_code: getUser.user.corp,
                    projectId: getUser.user.projectId,
                    fullName: getUser.user.fullName,
                    userName: getUser.user.userName
                }, {}, false);
            } catch (error) {
                console.log(error)
                Alert('error', error.message);
            }
        } else {
               console.log("ADD5")
               console.log(data)
            try {
                // eslint-disable-next-line
                var response = await API.post("calendar.php", {
                    urlBase: urlBase,
                    data: data,
                    action: "InsertUpdate",
                    corp_code: getUser.user.corp,
                    state: scheduleObj.current.currentAction,
                    current: scheduleObj.current.activeEventData.event,
                    projectId: getUser.user.projectId,
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
    // for adding extra field to default editor
    const editorTemplate = (args) => {
        if (args.type === 'Editor') {
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
            }
        }
    }
    // for managing color for cart
    const onEventRendered = (args) => {
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
    const selectSprint = (selectedOption) => {
        getToDo(dispatch, getUser.user, selectedOption.moduleId);
    }
    const events = [...state.user, ...stories]

    // for getting user name by default in Members field
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

    // while searching any event
    const globalSearch = (args) => {
        // console.log(args.target.value)
        // console.log(scheduleObj)
        // console.log(scheduleObj.current.eventsData)
        let searchString = args.target.value;
        if (searchString !== '') {
            new DataManager(scheduleObj.current.eventsData).executeQuery(new Query().search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e) => {
                if (e.result.length > 0) {
                    // console.log("result",e.result)
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
    // for display searched results
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
            <Header />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="d-flex justify-content-between col-12 row p-2">
                                            <h2 className="card-title" style={{ paddingTop: 20, paddingLeft: 20 }}>CALENDAR</h2>

                                            {/* <label className="p-2" >Sprints</label> */}
                                            
                                             <div className="d-flex justify-content-end mt-2">
                                             <div style={{width:200,marginRight:10}}>

                                                 {/* for selecting data sprint vise  */}
                                             <Select
                                                className="form-control "
                                                style={{ width: 10, boarderRadius: 2, }}
                                                // placeholder="Select Active Points"
                                                maxMenuHeight={130}
                                                placeholder={state.sprint.moduleDesc}
                                                value={sprints.value}
                                                onChange={(selectedOption) => {
                                                    selectSprint(selectedOption)
                                                }
                                                }
                                                options={sprints}
                                            />
                                            </div>
                                            <div class="input-group-prepend" style={{marginTop:5}}>
                                                <span class="text" style={{ color: 'black', marginTop: '3px', fontSize: '13px', paddingRight: 10 }}>Search:</span>
                                            </div>
                                            <input type="text" class="form-control" style={{ backgroundColor: 'transparent', borderBottom: '2px solid black', borderTop: '2px solid black', borderLeft: '12x solid black', borderRight: '2px solid black',width: 250, height: '35px' }}
                                                onKeyUp={(args) => globalSearch(args)} />
                                        </div>
                                        </div>
                                       
                                        {state.isLoading ? <RootLoader/> :
                                        <div>
                                        <div id="grid"></div>
                                        {/* all UI for calendar include in ScheduleComponent  */}
                                        <ScheduleComponent
                                            height='550px'
                                            ref={scheduleObj}
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
                                            {/* for adding Members */}
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
                                        </div>
                                        }
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