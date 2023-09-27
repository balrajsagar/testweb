/* 
FileName:addToSprint.js
purpose:modal box when adding from card menu in backlogs
Developers:Satya Sidda[SS]

 */
import React, { useEffect, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { tasksReducer, initialState } from './tasksReducer';
import * as actions from './actions'

import { useSelector } from 'react-redux';
import { addSprint, getSprints, getProjects, addEpic } from './network';
import Select from 'react-select';
import {MODULE,TARGET_DATE,PROJECT } from '../../Common/Headers';




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

//adding backlogs to the active sprint
export default function AddToSprint(props) {
    const getUser = useSelector(state => state.auth)

    const [state, dispatch] = useReducer(tasksReducer, initialState);
    const [sprintTargetDate, setTargetDate] = useState('')
    const[sprint_status,setSprint_status]=useState('')


    // console.log(state)
    const classNames = useStyles();
    useEffect(() => {
        getSprints(dispatch, getUser.user);
        getProjects(dispatch, getUser.user);

        // eslint-disable-next-line
    }, [])
    var sprintDetails = [];
    var epicsList = [];
    state.sprints.map((sprints) => {
        const [year, month, date] = sprints.startDate.split('-');
        const [year1, month1, date1] = sprints.targetDate.split('-');
        return (
            sprintDetails.push({ 'value': sprints.moduleId,'sprint_status':sprints.sprint_status, 'epicId': sprints.ideaId, 'label': sprints.moduleDesc.concat('[' + month + '.' + date + '.' + year + '-' + month1 + '.' + date1 + '.' + year1 + ']'), 'targetDate': sprints.targetDate })
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
                                    {(props.data.view === 'epic') ? <h5 class="modal-title p-2">ASSIGN {PROJECT}</h5> : <h5 class="modal-title p-2">ASSIGN {MODULE}</h5>}
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <form >

                                            {(props.data.view === "epic") ?
                                                <div class="form-group row p-2" style={{ flexDirection: "row" }}>
                                                    <label for="story" className="col-form-label">Select {PROJECT}</label>
                                                    <Select
                                                        className="form-control "
                                                        placeholder={`Select ${PROJECT}`}
                                                        value={epicsList.value}
                                                        onChange={(selectedOption) => {
                                                            dispatch(actions.epicSelected(selectedOption.value))
                                                        }}
                                                        options={epicsList}
                                                    /></div>
                                                :
                                                <div>
                                                    <div class="form-group row p-2" style={{ flexDirection: "row" }}>
                                                        <label for="story" className="col-form-label">Select {MODULE}</label>
                                                        <Select
                                                            className="form-control "
                                                            placeholder={`Select ${MODULE}`}
                                                            value={sprintDetails.value}
                                                            onChange={(selectedOption) => {
                                                                dispatch(actions.sprintSelected(selectedOption.value))
                                                                setTargetDate(selectedOption.targetDate)
                                                                setSprint_status(selectedOption.sprint_status)

                                                            }}
                                                            options={sprintDetails}
                                                        />
                                                    </div>
                                                    <div> <label for="target_date" class="col-form-label pt-0" style={{ width: '150px' }}>{TARGET_DATE}<span style={{ color: "red" }} >*</span></label>
                                                        <input type="date" class="form-control" id="target_date" name="target_date" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                                            value={state.targetDate.value}
                                                            onChange={(event) => dispatch(actions.targetDate(event.target.value))} />

                                                    </div>
                                                </div>
                                            }







                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    {/* onClick={(event) => { addProject(state, dispatch, getUser.user, props.handleClose) }} */}
                                </div>
                                {(props.data.view === 'epic') ?
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { addEpic(props.data.taskId, state, dispatch, getUser.user, props.handleClose) }}>Add To Epic</button> :
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { addSprint(sprint_status,props.data.assignedTo,props.data.currentDate,sprintTargetDate,state.targetDate.value,props.data.taskId, state, dispatch, getUser.user, props.handleClose, props.data.device_id,props.data.assign_to,props.data.sprintDesc,props.data.title,props.data.storyPoints) }}>Add To Sprint</button>
                                }
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}
