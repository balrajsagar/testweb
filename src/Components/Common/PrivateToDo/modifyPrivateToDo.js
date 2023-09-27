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
import { modifyPrivateToDo } from './network';
import { privateToDoReducer, initialState } from './privateToDoReducer';
import Select from 'react-select';
import {  MAINTASK_DESCRIPTION, STORY_POINTS, ACCEPTANCE_CRITERIA, DEFINITION_OF_DONE, PRIORITY_LEVEL, MAINTASKNAME } from '../Headers';

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
export default function ModifyPrivateToDo(props) {
    const [state, dispatch] = useReducer(privateToDoReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    useEffect(() => {
        dispatch(actions.setModifyMainTask(props.data.data.taskId, props.data.data.story_title, props.data.data.story_desc, props.data.data.epic_id,
            props.data.data.moduleId, props.data.data.acceptance_criteria, props.data.data.story_points, props.data.data.assigned_to, props.data.data.priority_level,
            props.data.data.targetDate, props.data.data.device_id))
        // eslint-disable-next-line
    }, [])
    //Initializing empty array to storyPoints and  priorityLevels[S.S]
    var storyPoints = [];
    var priorityLevels = [];
    //Initializing values to storyPointsArray and  priorityLevelsArray[S.S]
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
                                    <h5 class="modal-title p-2"> Modify Task</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body overflow-auto" style={{ height: 500 }}>


                                    <div class="form-group row pl-2" >
                                        <label for="recipient-name" class="col-form-labe pt-0" style={{ width: '150px' }}>{MAINTASKNAME}<span style={{ color: "red" }} >*</span></label>
                                        <input type="text" class="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                            value={state.taskTitle.value}
                                            onChange={(event) => dispatch(actions.taskTitle(event.target.value))} />
                                        {/* <span style={{color:"red"}}>Please change story title</span> */}
                                        <label for="recipient-name" class="col-form-label pt-2" style={{ width: '100px' }}>{MAINTASK_DESCRIPTION}</label>
                                        <textarea type="text" class="form-control" id="ddescription" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black' }}
                                            value={state.taskDescription.value}
                                            onChange={(event) => dispatch(actions.taskDescription(event.target.value))} />
                                        <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{STORY_POINTS}</label>
                                        {/* Selecting Story Points */}
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
                                        <label for="acceptance" class="col-form-label pt-2" style={{ width: '250px' }}>{ACCEPTANCE_CRITERIA}/{DEFINITION_OF_DONE}</label>
                                        <textarea type="text" class="form-control" id="criteria" name="criteria" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black', height: '65px' }}
                                            value={state.acceptanceCriteria.value}
                                            onChange={(event) => dispatch(actions.acceptanceCriteria(event.target.value))} />
                                    </div>
                                    <div style={{ height: 20 }}></div>
                                </div>
                                <div class="modal-footer">
                                    {state.isLoading ? <RootLoader /> :
                                        <div>
                                            <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }}
                                                onClick={(event) => { modifyPrivateToDo(state, dispatch, getUser.user, props.handleClose, props.data.data.pt_id) }}
                                            >Modify</button> &nbsp;&nbsp;
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