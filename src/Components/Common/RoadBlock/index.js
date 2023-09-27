import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import * as actions from './actions';
import { initialState, roadblockReducer } from './roadblockReducer';
import API from '../Network/API';
import { isLoaded, isLoading } from '../Actions/loading';
import Alert from '../Alert';
import { getRoadBlock } from '../../UserModule/UserDashboard/network';
import Select from 'react-select';
import { priority } from '../Json/priority';
import { severity } from '../Json/severity';
import { addCommentUserStory } from '../../UserModule/Modules/network'; //Add Comments for UserStory  Where We Have and Who can Add comments for that By GNK--> 01 version 1.0.6

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
export default function RoadBlock(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(roadblockReducer, initialState)
    const classNames = useStyles();

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

    const addRoadBlock = async (handleClose) => {
        var message = props.data.message+ " with Description : " + state.roadblockTitle.value
        if (state.roadblockTitle !== ""&& !(state.roadblockTitle.errorStatus)) {
            dispatch(isLoading());
            try {
                var response = await API.post("manage_roadblocks.php", {
                    action: "insert",
                    crop: getUser.user.corp,
                    subTaskId: props.data.taskId,
                    roadBlockDescription: state.roadblockTitle.value,
                    empId: getUser.user.empId,
                    prioritySelected:state.prioritySelected.value === "" ? '0' : state.prioritySelected.value,
                    severitySelected:state.severitySelected.value === "" ? '0' : state.severitySelected.value,
                    projectId:getUser.user.projectId
                }, {}, false);
                if (response.status === "True") {
                    addCommentUserStory(dispatch, getUser.user,props.data.taskId,message,"4") //Add Comments for UserStory  Where We Have and Who can Add comments for that By GNK--> 01 Version 1.0.6
                    getRoadBlock(dispatch, getUser.user)
                    Alert("success", response.message)
                } else {

                }
            } catch (error) {
                console.log(error)
            }
            handleClose();
            dispatch(isLoaded());
        } else {
            Alert("warning", "please fill all fields");
        }
    }
    var userDetails = [];
    state.users.map((users) => {
        return (
            userDetails.push({ 'value': users.id, 'label': users.name })
        );
    })
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
                                    <h5 class="modal-title">Add RoadBlock </h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={props.handleModalClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div class="form-group row p-2" >
                                        <label for="recipient-name" class="col-form-label">RoadBlock Title<span style={{ color: "red" }} >*</span></label>
                                        <input type="text" class="form-control col-10 m-0" id="recipient-name" name="description" placeholder="Description" value={state.roadblockTitle.value}
                                            onChange={(event) => dispatch(actions.roadBlockTitle(event.target.value))}
                                            style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }} />
                                             <span class=" col-10 " style={{ color: "red", fontSize: '12px', marginLeft: "90px" }}>{state.roadblockTitle.errorStatus ? state.roadblockTitle.errormessage : ""}</span>
                                    </div>
                                    <div class="form-group row p-2"  style={{marginTop:'-40px'}}>
                                        <label for="user" className="col-form-label pt-4" style={{ width: '80px' }}>Severity</label>
                                        <Select
                                            className="form-control col-10 m-1"
                                            placeholder="Select Severity"
                                            value={severity.value}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.severitySelected(selectedOption.value))
                                            }}
                                            options={severity}
                                        />
                                    </div>
                                    <div class="form-group row p-2"  style={{marginTop:'-40px'}}>
                                        <label for="user" className="col-form-label pt-4" style={{ width: '80px' }}>Priority</label>
                                        <Select
                                            className="form-control col-10 m-1"
                                            placeholder="Select Priority"
                                            value={priority.value}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.prioritySelected(selectedOption.value))
                                            }}
                                            options={priority}
                                        />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={() => addRoadBlock(props.handleClose)} style={{ borderRadius: '20px' }}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}