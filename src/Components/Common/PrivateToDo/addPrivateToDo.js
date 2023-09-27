import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import { addPrivateToDo} from './network';
import { privateToDoReducer, initialState } from './privateToDoReducer'
import Select from 'react-select';
import { MAINTASKNAME,MAINTASK_DESCRIPTION,STORY_POINTS,ACCEPTANCE_CRITERIA,DEFINITION_OF_DONE,PRIORITY_LEVEL, ADD_PRIVATE_TODO } from '../Headers';
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
export default function AddPrivateToDo(props) {
    const [state, dispatch] = useReducer(privateToDoReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    // useEffect(() => {
        // getUsers(dispatch, getUser.user);
        // getProjects(dispatch, getUser.user);
        // eslint-disable-next-line
    // }, [])
    var storyPoints = [];
    var priorityLevels = [];
    var storyPointsArray = [{ id: '1', story: '1' }, { id: '2', story: '2' }, { id: '3', story: '3' }, { id: '5', story: '5' }, { id: '8', story: '8' }, { id: '13', story: '13' }]
    var priorityLevelsArray = [{ id: '1', priority: '1' }, { id: '2', priority: '2' }, { id: '3', priority: '3' }, { id: '4', priority: '4' }]

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
    // state.users.map((users) => {
    //     return (
    //         users.workingStatus === "Active" ?
    //             userDetails.push({ 'value': users.id, 'label': users.name ,'device_id':users.device_id}) : null
    //     );
    // })
    // state.projects.map((epics) => {
    //     return (
    //         epicsList.push({
    //             'value': epics.idea_id, 'label': epics.idea_title
    //         })
    //     );
    // })
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
                {state.isLoading ? <RootLoader /> :  <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">{ADD_PRIVATE_TODO}</h5>
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
                                        <label for="recipient-name" class="col-form-label pt-2" style={{ width: '100px' }}>{MAINTASK_DESCRIPTION}</label>

                                        <textarea class="form-control" id="description" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid blackpx', borderLeft: '1px solid black', borderRight: '1px solid black', height: '65px', }}
                                            value={state.taskDescription.value}
                                            placeholder="As a [person],____ I [want to],____ [so that]____"
                                           onChange={(event) => dispatch(actions.taskDescription(event.target.value))} />
                                        <span style={{ color: "gray", fontSize: '12px' }}>{state.taskDescription.errorStatus ? state.taskDescription.errormessage : ""}</span>
                                    </div>
                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                    {/* {state.projects.length > 0 && <label for="epic" className="col-form-label pt-2" style={{ width: '100px' }}>{PROJECT} Name</label>}
                                        
                                       {state.projects.length > 0 && <Select
                                            className="form-control "
                                            placeholder={`Select ${PROJECT}`}
                                            value={epicsList.value}
                                            maxMenuHeight={130}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.epicSelected(selectedOption.value))
                                            }}
                                            options={epicsList}
                                        />} */}
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
                                        {/* drop down  for priorityLevel[S.S]  */}
                                        <label for="story" className="col-form-label pt-2" style={{ width: '100px' }}>{PRIORITY_LEVEL}</label>
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
                                        {/* <label for="user" className="col-form-label pt-2" style={{ width: '150px' }}>{SELECT_SQUAD_MEMBER}</label>
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
                                        /> */}
                                    </div>
                                    <div class="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                        <label for="acceptance" class="col-form-label pt-2" style={{ width: '250px' }}>{ACCEPTANCE_CRITERIA}/{DEFINITION_OF_DONE}</label>
                                        <textarea type="text" class="form-control" id="criteria" name="criteria" style={{ backgroundColor: 'transparent', border: '1px solid grey', height: '65px' }}
                                            value={state.acceptanceCriteria.value}
                                            onChange={(event) => dispatch(actions.acceptanceCriteria(event.target.value))} />
                                        <span style={{ color: "red", fontSize: '12px' }}>{state.acceptanceCriteria.errorStatus ? state.acceptanceCriteria.errormessage : ""}</span>




                                    </div>
                                    <div style={{ height: 20 }}></div>
                                    {/* <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label">Estimation Time</label>
                                                <input type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="recipient-name" name="taskStatus" style={{ borderColor: 'black' }} />
                                                <label for="recipient-name" class="col-form-label">Days</label>
                                                <input type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="recipient-name" name="taskStatus" style={{ borderColor: 'black' }} />
                                                <label for="recipient-name" class="col-form-label">Days</label>
                                            </div> */}
                                </div>
                                <div class="modal-footer">
                                    <div>
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} 
                                    onClick={(event) => { addPrivateToDo(state, dispatch, getUser.user,props.handleClose) }}>Add</button>&nbsp;&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </Fade>
            </Modal>
        </div >
    );
}