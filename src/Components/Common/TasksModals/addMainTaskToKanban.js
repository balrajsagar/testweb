import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import { getUsers, getProjects, addMainTaskToKanban} from './network';
import { tasksReducer, initialState } from './tasksReducer';
import Select from 'react-select';
import { NEWMAINTASK, MAINTASKNAME, PROJECT, MAINTASK_DESCRIPTION, STORY_POINTS, SELECT_SQUAD_MEMBER, ACCEPTANCE_CRITERIA, DEFINITION_OF_DONE, PRIORITY_LEVEL } from '../Headers';
import RootLoader from '../Loader/RootLoader';
// import EdiText from 'react-editext'
// import { Link } from 'react-router-dom';

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
export default function AddMainTaskToKanban(props) {
    const [state, dispatch] = useReducer(tasksReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    useEffect(() => {
        getUsers(dispatch, getUser.user);
        getProjects(dispatch, getUser.user);

        // eslint-disable-next-line
    }, [])
    var userDetails = [];
    var storyPoints = [];
    var priorityLevels = [];
    var epicsList = [];
    var storyPointsArray = [{ id: '1', story: '1',hrs:'1hr' }, { id: '2', story: '2',hrs:'2hrs' }, { id: '3', story: '3',hrs:'3hrs' }, { id: '5', story: '5',hrs:'5hrs' }, { id: '8', story: '8',hrs:'8hrs' }, { id: '13', story: '13',hrs:'13hrs' }]
    var priorityLevelsArray = [{ id: '1', priority: '1' }, { id: '2', priority: '2' }, { id: '3', priority: '3' }, { id: '4', priority: '4' }]

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
                userDetails.push({ 'value': users.id, 'label': users.name, 'device_id': users.device_id }) : null
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
                    {state.isLoading ? <RootLoader /> : <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">{NEWMAINTASK}</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body overflow-auto" style={{ height: 500 }}>

                                    <div class="form-group" style={{ height: 'auto' }}>
                                        <label for="recipient-name" class="col-form-label pt-0" style={{ width: '150px' }}>{MAINTASKNAME}<span style={{ color: "red" }} >*</span></label>
                                        <input type="text" class="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                            value={state.taskTitle.value}
                                            onChange={(event) => dispatch(actions.taskTitle(event.target.value))} />
                                        <span style={{ color: "red", fontSize: '12px' }}>{state.taskTitle.errorStatus ? state.taskTitle.errormessage : ""}</span>
                                    </div>

                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="recipient-name" class="col-form-label pt-2" style={{ width: '100px' }}>{MAINTASK_DESCRIPTION}<span style={{ color: "red" }} >*</span></label>

                                        <textarea class="form-control" id="description" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid blackpx', borderLeft: '1px solid black', borderRight: '1px solid black', height: '65px', }}
                                            value={state.taskDescription.value}
                                            placeholder="As a [person],____ I [want to],____ [so that]____"
                                            onChange={(event) => dispatch(actions.taskDescription(event.target.value))} />
                                        <span style={{ color: "gray", fontSize: '12px' }}>{state.taskDescription.errorStatus ? state.taskDescription.errormessage : ""}</span>
                                    </div>
                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="epic" className="col-form-label pt-2" style={{ width: '100px' }}>{PROJECT} Name<span style={{ color: "red" }} >*</span></label>

                                        <Select
                                            className="form-control "
                                            placeholder={`Select ${PROJECT}`}
                                            value={epicsList.value}
                                            maxMenuHeight={130}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.epicSelected(selectedOption.value))
                                            }}
                                            options={epicsList}
                                        />
                                        <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{STORY_POINTS}<span style={{ color: "red" }} >*</span></label>
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
                                        {/* drop down  for priorityLevel[S.S]  */}
                                        <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{PRIORITY_LEVEL}<span style={{ color: "red" }} >*</span></label>
                                        <Select
                                            className="form-control "
                                            placeholder={`Select ${PRIORITY_LEVEL}`}
                                            value={priorityLevels.value}
                                            maxMenuHeight={130}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.prioritySelected(selectedOption.value))
                                            }}
                                            options={priorityLevels}
                                        />
                                        <label for="user" className="col-form-label pt-2" style={{ width: '150px' }}>{SELECT_SQUAD_MEMBER}<span style={{ color: "red" }} >*</span></label>
                                        <Select
                                            className="form-control"
                                            placeholder={` ${SELECT_SQUAD_MEMBER}`}
                                            maxMenuHeight={130}
                                            value={userDetails.value}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.userSelected(selectedOption.value))
                                                dispatch(actions.userDeviceSelected(selectedOption.device_id))
                                            }}
                                            options={userDetails}
                                        />
                                    </div>
                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="acceptance" class="col-form-label pt-2" style={{ width: '250px' }}>{ACCEPTANCE_CRITERIA}/{DEFINITION_OF_DONE}<span style={{ color: "red" }} >*</span></label>
                                        <textarea type="text" class="form-control" id="criteria" name="criteria" style={{ backgroundColor: 'transparent', border: '1px solid grey', height: '65px' }}
                                            value={state.acceptanceCriteria.value}
                                            onChange={(event) => dispatch(actions.acceptanceCriteria(event.target.value))} />
                                        <span style={{ color: "red", fontSize: '12px' }}>{state.acceptanceCriteria.errorStatus ? state.acceptanceCriteria.errormessage : ""}</span>
                                    </div>
                                    <div style={{ height: 20 }}></div>
                                </div>
                                <div class="modal-footer">
                                    {state.isLoading ? <RootLoader /> :
                                     
                                            <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }}
                                                onClick={(event) => { addMainTaskToKanban(props.data, state, dispatch, getUser.user, props.handleClose) }}>Add</button>
                                            
                                    }
                                    {/* onClick={(event) => { addProject(state, dispatch, getUser.user, props.handleClose) }} */}
                                </div>

                            </div>
                        </div>
                    </div>}
                </Fade>
            </Modal>
        </div>
    );
}