/* 
FileName:addToSprint.js
purpose:modal box when dragging user stories  backlogs
Developers:Satya Sidda[SS]

 */
import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { tasksReducer, initialState } from './tasksReducer';
import { useSelector } from 'react-redux';
import { addToKanban, removeFromSprint } from './network';
import * as actions from './actions'
import Select from 'react-select';
import { MODULE, TARGET_DATE, MAINTASKS, MAINTASK, SELECT_SQUAD_MEMBER, STORY_POINTS } from '../../Common/Headers';
import { getUsers } from '../../Common/TasksModals/network';






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

//For adding backlogs to the active sprint board
export default function AddToKanban(props) {

    const getUser = useSelector(state => state.auth)

    const [state, dispatch] = useReducer(tasksReducer, initialState);
    const classNames = useStyles();
    useEffect(() => {
        getUsers(dispatch, getUser.user);
        dispatch(actions.targetDate(props.data.targetDate))
        // eslint-disable-next-line
    }, [])
    var userDetails = [];
    state.users.map(({ id, name, player_id, device_id, workingStatus }) => {
        return (
            workingStatus === "Active" ?
                userDetails.push({ 'value': id, 'label': name, 'device_id': device_id, player_id: player_id }) : null
        );
    })

    var storyPoints = [];
    var storyPointsArray = [{ id: '1', story: '1' }, { id: '2', story: '2' }, { id: '3', story: '3' }, { id: '5', story: '5' }, { id: '8', story: '8' }, { id: '13', story: '13' }]

    storyPointsArray.map((storyPointsArray) => {
        return (
            storyPoints.push({ 'value': storyPointsArray.id, 'label': storyPointsArray.story })
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
                            <div className="modal-content col-5 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">MOVE ISSUE</h5>
                                </div>
                                <div className="modal-body">
                                    {(props.data.completeStatus !== 'completed' && props.data.sprint_status !== 'commited') ? <b style={{ backgroundColor: '#FFFACD' }}>{MODULE} scope will be affected by this action</b> : null}
                                    {(props.data.action === 'add_to_kanban' && props.data.sprint_status !== 'commited')
                                        ? <p style={{ marginTop: '10px' }}>
                                            <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{'-'}{(props.data.taskId).substring(0, 5).toUpperCase()}</b> will be moved from backlog to {MODULE} <b>{props.data.sprintDesc}</b>
                                        </p>
                                        // : (props.data.action === 'add_to_kanban' && props.data.assignedTo === null && props.data.sprint_status !== 'commited')
                                        //     ? <b>Assign squad member to the {MAINTASK}</b>
                                            : (props.data.sprint_status === 'commited' && props.data.action === 'add_to_kanban')
                                                ? <b>You cannot add more user stories to this Sprint as it is committed. If you would still like to add more user stories then change the status of the sprint to uncommitted</b>
                                                : (props.data.action === 'remove_from_sprint' && props.data.completeStatus !== 'completed')
                                                    ? <div> <p style={{ marginTop: '10px' }}>
                                                        <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{'-'}{(props.data.taskId).substring(0, 5).toUpperCase()}</b> will be removed from  {MODULE} <b>{props.data.sprintDesc}</b>
                                                    </p></div>
                                                    : <b>Completed {MAINTASKS} cannot be moved</b>}




                                    {(props.data.action === 'add_to_kanban' && props.data.assignedTo === null && props.data.sprint_status !== 'commited') ?
                                        <div>
                                            <label for="user" className="col-form-label pt-2" style={{ width: '150px' }}>{SELECT_SQUAD_MEMBER}</label>
                                            <Select
                                                className="form-control"
                                                placeholder="Select Squad Member"
                                                value={userDetails.value}
                                                maxMenuHeight={130}
                                                onChange={(selectedOption) => {
                                                    dispatch(actions.userSelected(selectedOption.value))
                                                    dispatch(actions.userDeviceSelected(selectedOption.device_id))
                                                    dispatch(actions.userPlayerSelected(selectedOption.player_id))
                                                }}
                                                options={userDetails}
                                            />
                                        </div> : null
                                    }
                                    {(props.data.action === 'add_to_kanban' && props.data.storyPoints === '0' && props.data.sprint_status !== 'commited') ?
                                        <div>
                                    <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{STORY_POINTS}</label>
                                        <Select
                                            className="form-control "
                                            placeholder={`Select ${STORY_POINTS}`}
                                            value={storyPoints.value}
                                            maxMenuHeight={130}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.storySelected(selectedOption.value))
                                            }}
                                            options={storyPoints}
                                        />
                                          </div> : null
                                    }
                                    {(props.data.action === 'add_to_kanban' && props.data.sprint_status !== 'commited') ?
                                        <div> <label for="target_date" class="col-form-label pt-0" style={{ width: '150px' }}>{TARGET_DATE}<span style={{ color: "red" }} ></span></label>
                                            <input type="date" class="form-control" id="target_date" name="target_date" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                                value={state.targetDate.value}
                                                onChange={(event) => dispatch(actions.targetDate(event.target.value))} />

                                        </div> : null
                                    }


                                </div>


                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    {(props.data.action === 'add_to_kanban' && ((props.data.assignedTo !== null || state.userSelected !== "") && (props.data.storyPoints !== '0' || state.storySelected !== 0)) && props.data.sprint_status !== 'commited') ?

                                        <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { addToKanban(props.data.currentDate, props.data.targetDate, state.targetDate.value, props.data.taskId, props.data.sprintId, state, dispatch, getUser.user, props.handleClose, props.data.device_id, props.data.assign_to, props.data.sprintDesc, props.data.title, props.data.player_id, props.data.storyPoints) }}>Confirm</button> : (props.data.action === 'remove_from_sprint' && props.data.completeStatus !== 'completed') ?
                                            <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { removeFromSprint(props.data.taskId, props.data.sprintId, state, dispatch, getUser.user, props.handleClose, props.data.sprintDesc) }}  >Confirm</button> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}
