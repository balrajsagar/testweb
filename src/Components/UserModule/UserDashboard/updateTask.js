import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import * as actions from './actions';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { initialState, tasksReducer } from './tasksReducer';
import { Checkbox } from '@thumbtack/thumbprint-react';
import { useSelector } from 'react-redux';
import { isLoaded, isLoading } from '../../Common/Actions/loading';
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';
import {MAINTASK } from '../../Common/Headers';

// import { getDone, getTasksCount, getToDo } from './network';
import { getModules, addCommentUserStory, getCurrentSprintUserStories } from '../Modules/network';

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

//For Update the Task Status
export default function UpdateTask(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const [isChecked, setIsChecked] = React.useState(false);
    const classNames = useStyles();
    const Progress = ({ done }) => {
        const [style, setStyle] = React.useState({});

        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${done}%`
            }

            setStyle(newStyle);
        }, 200);

        return (
            <div className="progress">
                <div className="progress-done" style={style}>
                    <p style={{marginLeft:'20px'}}></p>{done}%
                </div>
            </div>
        )
    }
    React.useEffect(() => {
        if (isChecked) {
            dispatch(actions.taskStatus(100))
        } else {
            dispatch(actions.taskStatus(0))
        }
    }, [isChecked]);
    //Check Dependency 
    // const userTaskUpdate = () => {
    //     if (props.data.dependencyId === "NA") {
    //         updateStatus();//Update the Task Status
    //     } else {
    //         props.handleClose()
    //         Alert('warning', "You can't update until your dependency task completed");
    //     }
    // }
    //Update the Task Status
    const updateStatus = async () => {
        // console.log(state.taskDescription + state.taskStatus + isChecked)
        dispatch(isLoading());
        const message =  state.taskStatus + `% of  ${MAINTASK} is completed with Description : ` + state.taskDescription;
        if (state.taskDescription !== "" && state.taskStatus !== "") {
            try {
                const response = await API.post("manage_userstories.php", {
                    action: "update",
                    task_id: props.data.id,
                    dependencyId: props.data.dependencyId,
                    crop: getUser.user.corp,
                    task_status: state.taskStatus,
                    task_status_desc: state.taskDescription,
                    task_complete_status: isChecked ? 1 : 0,
                    empId: getUser.user.empId,
                    mainTaskId: props.data.mainTaskId,
                }, {}, false);
                if (response.status === "True") {
                    getCurrentSprintUserStories(dispatch, getUser.user,props.data.sprintId) //just user stories updated in sprint cycle -->GNK --> Version1.0.6.03
                    getModules(dispatch, getUser.user);
                    addCommentUserStory(dispatch, getUser.user,props.data.id,message,"3")//Add Comments for UserStory  Where We Have and Who can Add comments for that By GNK--> 01 version 1.0.6
                    // getToDo(dispatch,getUser.user)//For ToDo and Doing Tasks
                    // getDone(dispatch,getUser.user)//For Done Tasks
                    // getTasksCount(dispatch,getUser.user)//For Update Count
                    Alert('success', `Your ${MAINTASK} is Updated Successfully`)
                    props.handleClose()
                } else {
                    Alert('warning', response.message)
                }
            }
            catch (error) {
                Alert('error', error.message)
                props.handleClose()
            }
        }
        else {
            Alert('warning', "please confirm all details before update the task")
        }
        dispatch(isLoaded());
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
                                    <h5 class="modal-title pl-1 pt-1">Update UserStory</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button" onClick={props.handleClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <p>Enter {MAINTASK} Status Percentage<span style={{ color: "red" }} >*</span></p>
                                        <form >
                                            <div className="form-group row  d-flex align-items-center pl-2">
                                                <input type="number" keyboardType={"numeric"} min="10" max="100" step="10" class="form-control col-2 " id="recipient-name" name="taskStatus" value={isChecked ? 100 : state.taskStatus} style={{ borderColor: 'black' }} onChange={(event) => dispatch(actions.taskStatus(event.target.value))} />
                                               <p style={{marginLeft:'10px'}}></p>
                                                <Progress className="ml-2" done={isChecked ? 100 : state.taskStatus} />
                                            </div>
                                            <div class="form-group row">
                                                <label for="recipient-name" class="col-form-label pl-2 pt-3">Enter Status<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 m-1" id="recipient-name" name="description" onChange={(event) => dispatch(actions.taskDescription(event.target.value))} style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }} />
                                            </div>
                                            <div className='form-group row ml-1'>
                                                <Checkbox isChecked={isChecked} onChange={setIsChecked} >
                                                {/* <label for="recipient-name" class="col-form-label">Task Complete Status</label> */}
                                                </Checkbox>
                                                <label for="recipient-name" className="p-3">Enter if {MAINTASK} completed<span style={{ color: "red" }} > *</span></label>
                                                {/* <label><input type="checkbox" name="checked" onChange={(e)=> updateTaskCount(e.target.value)}/><span> Task Complete Status</span></label> */}
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={() => updateStatus()}>Ok</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}