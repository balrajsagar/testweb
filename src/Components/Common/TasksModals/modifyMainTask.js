/*
filename:modifyMainTask.js
purpose:To modify user story
Developers: G Naveen Kumar[G.N.K],Satya Siddha[S.S]
 */
import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import { getUsers, modifyMainTask, getProjects,reassignMainTask } from './network';
import { tasksReducer, initialState } from './tasksReducer';
import Select from 'react-select';
import {TARGET_DATE,PROJECT,MAINTASK_DESCRIPTION,STORY_POINTS,SELECT_SQUAD_MEMBER,MAINTASK,ACCEPTANCE_CRITERIA,DEFINITION_OF_DONE,PRIORITY_LEVEL, MODIFYMAINTASK, MAINTASKNAME, REASSIGN } from '../Headers';

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
export default function ModifyMainTask(props) {
    const [state, dispatch] = useReducer(tasksReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    useEffect(() => {
        getUsers(dispatch, getUser.user);
        getProjects(dispatch, getUser.user);

        dispatch(actions.setModifyMainTask(props.data.taskId, props.data.title, props.data.description, props.data.ideaId, props.data.moduleId, props.data.acceptanceCriteria, props.data.storyPoints, props.data.id, props.data.priorityLevel,props.data.targetDate,props.data.device_id,props.data.player_id))
        // eslint-disable-next-line
    }, [])
    var userDetails = [];
    //Intializing empty array to storyPoints and  priorityLevels[S.S]
    var storyPoints = [];
    var priorityLevels = [];
    var epicsList = [{'value':'NA','label':'NA'}];
    //Intializing values to storyPointsArray and  priorityLevelsArray[S.S]
    var storyPointsArray = [{ id: '1', story: '1',hrs:'1hr' }, { id: '2', story: '2',hrs:'2hrs' }, { id: '3', story: '3',hrs:'3hrs' }, { id: '5', story: '5',hrs:'5hrs' }, { id: '8', story: '8',hrs:'8hrs' }, { id: '13', story: '13',hrs:'13hrs' }]
    var priorityLevelsArray = [{ id: '1', priority: '1' }, { id: '2', priority: '2' }, { id: '3', priority: '3' }, { id: '4', priority: '4' }]
    //pushing values to the  storyPoints and priorityLevels[S.S]
    storyPointsArray.map((storyPointsArray) => {
        return (
            storyPoints.push({ 'value': storyPointsArray.id, 'label': `${storyPointsArray.story}-${storyPointsArray.hrs}` })
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
            userDetails.push({ 'value': users.id, 'label': users.name,'device_id':users.device_id ,player_id:users.player_id}) : null
        );
    })
    state.projects.map((epics) => {
        return (
            epicsList.push({
                'value': epics.idea_id, 'label': epics.idea_title
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
                                    {props.data.action === "reassign" ? <h5 class="modal-title p-2">{REASSIGN} {MAINTASK}</h5>:<h5 class="modal-title p-2">{MODIFYMAINTASK}</h5>}
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body overflow-auto" style={{height:500}}>
                                  

                                            <div class="form-group row pl-2" >
                                                <label for="recipient-name" class="col-form-labe pt-0" style={{ width: '150px' }}>{MAINTASKNAME}<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px',marginTop:'-10px'  }}
                                                    value={state.taskTitle.value}
                                                    onChange={(event) => dispatch(actions.taskTitle(event.target.value))} />
                                                <label for="recipient-name" class="col-form-label pt-2" style={{ width: '100px' }}>{MAINTASK_DESCRIPTION}<span style={{ color: "red" }} >*</span></label>
                                                <textarea type="text" class="form-control" id="ddescription" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black' }}
                                                    value={state.taskDescription.value}
                                                    onChange={(event) => dispatch(actions.taskDescription(event.target.value))} />
                                                <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{PROJECT} Name</label>
                                                {/* Selcting Strory Points */}
                                                <Select
                                                    className="form-control"
                                                    placeholder={(props.data.ideaId !== '0')?props.data.projectName:'NA'}
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
                                                {/* Selcting Strory Points */}
                                                <Select
                                                    className="form-control"
                                                    placeholder={props.data.storyPoints}
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
                                                    placeholder={props.data.priorityLevel}
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
                                                    placeholder={props.data.userDetails}
                                                    value={userDetails.value}
                                                    maxMenuHeight={130}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.userSelected(selectedOption.value))
                                                        dispatch(actions.userDeviceSelected(selectedOption.device_id))
                                                        dispatch(actions.userPlayerSelected(selectedOption.player_id))
                                                    }}
                                                    options={userDetails}
                                                />
                                                <label for="acceptance" class="col-form-label pt-2" style={{ width: '250px' }}>{ACCEPTANCE_CRITERIA}/{DEFINITION_OF_DONE}<span style={{ color: "red" }} >*</span></label>
                                                <textarea type="text" class="form-control" id="criteria" name="criteria" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black',height:'65px' }}
                                                    value={state.acceptanceCriteria.value}
                                                    onChange={(event) => dispatch(actions.acceptanceCriteria(event.target.value))} />
                                                     {state.targetDate.value !== '0001-01-01' && <label for="target_date" class="col-form-label pt-0" style={{ width: '150px' }}>{TARGET_DATE}<span style={{ color: "red" }} >*</span></label>}
                                                     {state.targetDate.value !== '0001-01-01' && <input type="date" class="form-control" id="target_date" name="target_date" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px',marginTop:'-10px' }}
                                                    value={state.targetDate.value}
                                                    onChange={(event) => dispatch(actions.targetDate(event.target.value))} />}

                                               
                                            
                                    </div>
                                    <div style={{ height: 20 }}></div>
                                </div>
                                <div class="modal-footer">
                                {state.isLoading ? <RootLoader/> : props.data.action === "reassign" ? <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { reassignMainTask(props.data.backlogs,props.data.activeStatus,props.data.currentDate,props.data.sprintTargetDate,state, dispatch, getUser.user, props.data.ideaId, props.data.moduleId, props.handleClose) }}>Reassign</button>
                                :<button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { modifyMainTask(props.data.backlogs,props.data.activeStatus,props.data.currentDate,props.data.sprintTargetDate,state, dispatch, getUser.user, props.data.ideaId, props.data.moduleId, props.handleClose) }}>Save</button>}
                                    {/* onClick={(event) => { addProject(state, dispatch, getUser.user, props.handleClose) }} */}
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}