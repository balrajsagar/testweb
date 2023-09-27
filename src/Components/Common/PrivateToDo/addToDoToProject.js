/*
filename:modifyMainTask.js
purpose:To modify user story
Developers: G Naveen Kumar[G.N.K]
 */
import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import { getUsers, getProjects, getAgileProjects, addTodoToProject } from './network';
import { privateToDoReducer, initialState } from './privateToDoReducer';
import Select from 'react-select';
import {PROJECT,MAINTASK_DESCRIPTION,STORY_POINTS,SELECT_SQUAD_MEMBER,ACCEPTANCE_CRITERIA,DEFINITION_OF_DONE,PRIORITY_LEVEL, MAINTASKNAME, AGILE_PROJECT_NAME } from '../Headers';
import RootLoader from '../Loader/RootLoader';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2, 4, 3),
    },
}));

//For Add New Project
export default function AddToToDoProjects(props) {
    const [state, dispatch] = useReducer(privateToDoReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    useEffect(() => {
        getAgileProjects(dispatch,getUser.user.empId); // GNK --> 01
        getUsers(dispatch, getUser.user);
        getProjects(dispatch, getUser.user);

        dispatch(actions.setModifyMainTask(props.data.data.taskId, props.data.data.story_title, props.data.data.story_desc, "",
            "", props.data.data.acceptance_criteria, props.data.data.story_points, props.data.data.assigned_to, props.data.data.priority_level,
             props.data.data.targetDate,props.data.data.device_id))
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        getUsers(dispatch, getUser.user,state.agileProjectSelected);
        getProjects(dispatch, getUser.user,state.agileProjectSelected);
        // eslint-disable-next-line
    }, [state.agileProjectSelected])
    var userDetails = [];
    //Initalizing empty array to storyPoints and  priorityLevels[G.N.K]
    var storyPoints = [];
    var priorityLevels = [];
    var epicsList = [];
    var agileProjectsList = [];
    //Initalizing values to storyPointsArray and  priorityLevelsArray[S.S]
    var storyPointsArray = [{ id: '1', story: '1' }, { id: '2', story: '2' }, { id: '3', story: '3' }, { id: '5', story: '5' }, { id: '8', story: '8' }, { id: '13', story: '13' }]
    var priorityLevelsArray = [{ id: '1', priority: '1' }, { id: '2', priority: '2' }, { id: '3', priority: '3' }, { id: '4', priority: '4' }]
    //pushing values to the  storyPoints and priorityLevels[S.S]
    storyPointsArray.map((storyPointsArray) => {
        return (
            storyPoints.push({ 'value': storyPointsArray.id, 'label': storyPointsArray.story })
        );
    })
    priorityLevelsArray.map((priorityLevelsArray) => {
        return (
            priorityLevels.push({ 'value': priorityLevelsArray.id, 'label': priorityLevelsArray.priority })
        );
    })

    state.users.map((users) => {
        return (
            users.workingStatus === "Active" ?
            userDetails.push({ 'value': users.id, 'label': users.name,'device_id':users.device_id }) : null
        );
    })
    state.projects.map((epics) => {
        return (
            epicsList.push({
                'value': epics.idea_id, 'label': epics.idea_title
            })
        );
    })
    state.agileProjects.map((agileProjects) => {
        return (
            agileProjectsList.push({
                'value': agileProjects.id, 'label': agileProjects.value
            })
        );
    })
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                className={classNames.modal}
                open={props.open}
                onClose={props.handleClose}
                disableBackdropClick={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2"> Convert Task into User Story</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body overflow-auto" style={{height:500}}>
                                  

                                            <div class="form-group row pl-2" >
                                                <label for="recipient-name" class="col-form-labe pt-0" style={{ width: '150px' }}>{MAINTASKNAME}<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px',marginTop:'-10px'  }}
                                                    value={state.taskTitle.value}
                                                    onChange={(event) => dispatch(actions.taskTitle(event.target.value))} />
                                                    {/* <span style={{color:"red"}}>Please change story title</span> */}
                                                <label for="recipient-name" class="col-form-label pt-2" style={{ width: '100px' }}>{MAINTASK_DESCRIPTION}<span style={{ color: "red" }} >*</span></label>
                                                <textarea type="text" class="form-control" id="description" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black' }}
                                                    value={state.taskDescription.value}
                                                    onChange={(event) => dispatch(actions.taskDescription(event.target.value))} />
                                                <label for="story" className="col-form-label pt-2" style={{ width: '150px' }}>{AGILE_PROJECT_NAME}<span style={{ color: "red" }} >*</span></label>
                                                {/* Selecting Agile Project */}
                                                <Select
                                                    className="form-control"
                                                    placeholder="Select Agile Project"
                                                    value={agileProjectsList.value}
                                                    maxMenuHeight={130}
                                                    onChange={(selectedOption) => {
                                                        // dispatching selected value to the reducer
                                                        dispatch(actions.agileProjectSelected(selectedOption.value))
                                                    }}
                                                    options={agileProjectsList}
                                                />
                                                <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{PROJECT} Name</label>
                                                {/* Selecting Agile Project */}
                                                <Select
                                                    className="form-control"
                                                    placeholder="Select Epic"
                                                    // 'value' represents array of values which are added to the storyPoints
                                                    value={epicsList.value}
                                                    maxMenuHeight={130}
                                                    onChange={(selectedOption) => {
                                                        // dispatching selected value to the reducer
                                                        dispatch(actions.epicSelected(selectedOption.value))
                                                    }}
                                                    options={epicsList}
                                                />
                                                <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{STORY_POINTS}</label>
                                                {/* Selecting Strory Points */}
                                                <Select
                                                    className="form-control"
                                                    placeholder={props.data.data.story_points}
                                                    maxMenuHeight={130}
                                                    // 'value' represents array of values which are added to the storyPoints
                                                    value={storyPoints.value}
                                                    onChange={(selectedOption) => {
                                                        // dispatching selected value to the reducer
                                                        dispatch(actions.storySelected(selectedOption.value))
                                                    }}
                                                    options={storyPoints}
                                                />
                                                <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{PRIORITY_LEVEL}</label>
                                                <Select
                                                    className="form-control "
                                                    placeholder={props.data.data.priority_level}
                                                    value={priorityLevels.value}
                                                    maxMenuHeight={130}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.prioritySelected(selectedOption.value))
                                                    }}
                                                    options={priorityLevels}
                                                />
                                                <label for="user" className="col-form-label pt-2" style={{ width: '150px' }}>{SELECT_SQUAD_MEMBER}</label>
                                                <Select
                                                    className="form-control"
                                                    placeholder="Select Squad Member"
                                                    value={userDetails.value}
                                                    maxMenuHeight={130}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.userSelected(selectedOption.value))
                                                        dispatch(actions.userDeviceSelected(selectedOption.device_id))
                                                    }}
                                                    options={userDetails}
                                                />
                                                <label for="acceptance" class="col-form-label pt-2" style={{ width: '250px' }}>{ACCEPTANCE_CRITERIA}/{DEFINITION_OF_DONE}<span style={{ color: "red" }} >*</span></label>
                                                <textarea type="text" class="form-control" id="criteria" name="criteria" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black',height:'65px' }}
                                                    value={state.acceptanceCriteria.value}
                                                    onChange={(event) => dispatch(actions.acceptanceCriteria(event.target.value))} />
                                                      {/* <label for="target_date" class="col-form-label pt-0" style={{ width: '150px' }}>{TARGET_DATE}<span style={{ color: "red" }} >*</span></label>
                                                    <input type="date" class="form-control" id="target_date" name="target_date" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px',marginTop:'-10px' }}
                                                    value={state.targetDate.value}
                                                    onChange={(event) => dispatch(actions.targetDate(event.target.value))} /> */}

                                               
                                            
                                    </div>
                                    <div style={{ height: 20 }}></div>
                                </div>
                                <div class="modal-footer">
                                {state.isLoading ? <RootLoader/> : 
                                <div>
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} 
                                onClick={(event) => { addTodoToProject(state, dispatch, getUser.user,props.handleClose, props.data.data.pt_id, props.data.data.story_title)}} 
                                >Add</button> &nbsp;&nbsp;
                                </div>}
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}