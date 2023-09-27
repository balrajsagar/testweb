import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import * as actions from './actions';
import { initialState, roadblockReducer } from './roadblockReducer';
import { getUsers } from './network';
import API from '../Network/API';
import { isLoaded, isLoading } from '../Actions/loading';
import Alert from '../Alert';
import Select from 'react-select';
import { ASSIGN_ROADBLOCK, SUBTASKTITLE, ROADBLOCK_DESCRIPTION,PRIORITY_LEVEL, ACCEPTANCE_CRITERIA,SELECT_SQUAD_MEMBER,DEFINITION_OF_DONE,STORY_POINTS,SEVERITY} from '../Headers';
import { priority } from '../Json/priority';
import { severity } from '../Json/severity';

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

//To add the roadblock from subtask
export default function AssignedBlocked(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(roadblockReducer, initialState)
    const classNames = useStyles();
    // console.log(props.data)
    useEffect(() => {
        getUsers(dispatch, getUser.user);
        //getDependency(dispatch, getUser.user, props.data.ideaId);
        dispatch(actions.setModifyRoadBlock(props.data.taskName, props.data.roadBlockDescription, props.data.severitySelected, props.data.prioritySelected))
        // eslint-disable-next-line
    }, [])
    var userDetails = [];
    var dependencyDetails = [];
    var storyPoints = [];

    var storyPointsArray = [{ id: '1', story: '1' }, { id: '2', story: '2' }, { id: '3', story: '3' }, { id: '5', story: '5' }, { id: '8', story: '8' }, { id: '13', story: '13' }]

    storyPointsArray.map((storyPointsArray) => {
        return (
            storyPoints.push({ 'value': storyPointsArray.id, 'label': storyPointsArray.story })
        );
    })
    state.users.map((users) => {
        return (
            userDetails.push({ 'value': users.id, 'label': users.name })
        );
    })
    state.dependencyUser.map((users) => {
        return (
            dependencyDetails.push({ 'value': users.id, 'label': users.name })
        );
    })

    const assignedRoadBlock = async () => {
      
        if (state.userSelected.value !== "") {
            dispatch(isLoading());
            try {
                var response = await API.post("manage_roadblocks.php", {
                    crop: getUser.user.corp,
                    action: 'assignRoadblock',
                    subTaskId: props.data.taskId,
                    assignedBy: getUser.user.empId,
                    assignedTo: state.userSelected.value,
                    roadblockId: props.data.roadblockId,
                    prioritySelected: state.prioritySelected.value === "" ? '0' :state.prioritySelected.value,
                    severitySelected: state.severitySelected.value === "" ? '0' :state.severitySelected.value,
                    // module_id: moduleId,
                    acceptanceCriteria: state.acceptanceCriteria.value,
                    storyPoints: state.storySelected === "" ? '0' :state.storySelected,
                    title: state.taskTitle.value,
                    roadBlockDescription: state.roadblockTitle.value,
                    description: state.taskDescription.value,
                    projectId: getUser.user.projectId
                }, {}, false);
                if (response.status === "True") {
                    
                    Alert("success", response.message)
                    
                } else {

                }
            } catch (error) {
                console.log(error)
            }
            props.handleClose();
            dispatch(isLoaded());
        } else {
            Alert("warning", "please Select user");
        }
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classNames.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                disableBackdropClick={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content col-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">{ASSIGN_ROADBLOCK} </h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={props.handleModalClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>


                                <div className="modal-body overflow-auto" style={{ height: 500 }}>
                                    <div class="form-group" style={{ height: 'auto' }}>
                                        <label for="recipient-name" class="col-form-label pt-0" style={{ width: '150px' }}>{SUBTASKTITLE}<span style={{ color: "red" }} >*</span></label>
                                        <input type="text" class="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                            value={state.taskTitle.value}
                                        />
                                    </div>
                                    <div class="form-group" style={{ height: 'auto' }}>
                                        <label for="recipient-name" class="col-form-label" style={{ width: '200px' }}>{ROADBLOCK_DESCRIPTION}</label>
                                        <input type="text" class="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                            value={state.roadblockTitle.value}
                                        />
                                    </div>



                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="recipient-name" class="col-form-label pt-2" style={{ width: '100px' }}>Description<span style={{ color: "red" }} >*</span></label>

                                        <textarea class="form-control" id="description" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid blackpx', borderLeft: '1px solid black', borderRight: '1px solid black', height: '65px', }}
                                            value={state.taskDescription.value}
                                            onChange={(event) => dispatch(actions.taskDescription(event.target.value))} />
                                        <span style={{ color: "red", fontSize: '12px' }}>{state.taskDescription.errorStatus ? state.taskDescription.errormessage : ""}</span>
                                    </div>


                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="user" className="col-form-label pt-2" style={{ width: '100px' }}>{SELECT_SQUAD_MEMBER} <span style={{ color: "red" }} >*</span></label>
                                        <Select
                                            className="form-control "
                                            placeholder="Select User"
                                            maxMenuHeight={130}
                                            value={userDetails.value}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.userSelected(selectedOption.value))
                                            }}
                                            options={userDetails}
                                        />
                                    </div>

                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="user" className="col-form-label pt-2" style={{ width: '100px' }}>{SEVERITY}</label>
                                        <Select
                                            className="form-control"
                                            placeholder="Select Severity"
                                            maxMenuHeight={130}
                                            value={severity.value}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.severitySelected(selectedOption.value))
                                            }}
                                            options={severity}
                                        />
                                    </div>
                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="user" className="col-form-label pt-2" style={{ width: '100px' }}>{PRIORITY_LEVEL}</label>
                                        <Select
                                            className="form-control"
                                            placeholder="Select Priority"
                                            maxMenuHeight={130}
                                            value={priority.value}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.prioritySelected(selectedOption.value))
                                            }}
                                            options={priority}
                                        />
                                    </div>
                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="user" className="col-form-label pt-2" style={{ width: '100px' }}>{STORY_POINTS}</label>
                                        <Select
                                            className="form-control"
                                            placeholder="Select Story Points"
                                            value={storyPoints.value}
                                            maxMenuHeight={100}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.storySelected(selectedOption.value))
                                            }}
                                            options={storyPoints}
                                        />
                                    </div>

                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="acceptance" class="col-form-label pt-2" style={{ width: '250px' }}>{ACCEPTANCE_CRITERIA}/{DEFINITION_OF_DONE}<span style={{ color: "red" }} >*</span></label>
                                        <textarea type="text" class="form-control" id="criteria" name="criteria" style={{ backgroundColor: 'transparent', border: '1px solid grey', height: '65px' }}
                                            value={state.acceptanceCriteria.value}
                                            onChange={(event) => dispatch(actions.acceptanceCriteria(event.target.value))} />
                                        <span style={{ color: "red", fontSize: '12px' }}>{state.acceptanceCriteria.errorStatus ? state.acceptanceCriteria.errormessage : ""}</span>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={() => assignedRoadBlock()} style={{ borderRadius: '20px' }}>Assign</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}