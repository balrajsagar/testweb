import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { tasksReducer, initialState } from './tasksReducer';
import { useSelector } from 'react-redux';
import { getActive,updateUserStory } from '../Modules/network';
import { setDoing,setDone } from './network';
import { CHANGE_STATUS } from '../../Common/Headers';





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
export default function ChangeStatus(props) {

// console.log(props.data.activeStatus)
// console.log(props.data.completeStatus)

    const getUser = useSelector(state => state.auth)

    const [state, dispatch] = useReducer(tasksReducer, initialState);
    console.log(state)
    const classNames = useStyles();
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
                                    <h5 class="modal-title p-2">{CHANGE_STATUS}</h5>
                                </div>
                                <div className="modal-body">
                                    {(props.data.completeStatus === 'pending' && props.data.activeStatus === '0')?
                                    <b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{'-'}{props.data.title} Will be moved to Doing</b>:<b>{(getUser.user.corp).substring(0, 3).toUpperCase()}{'-'}{props.data.title} Will be moved to Done</b>
                                }
                                   
                                    </div>



                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    {props.data.action === 'subtask_changeStatus'?<div>
                                    {(props.data.completeStatus === 'pending' && props.data.activeStatus === '0') ? <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { setDoing(dispatch, getUser.user,props.data.subTaskId, props.data.taskId, props.handleClose) }}  >Confirm</button> :
                                        <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { setDone(dispatch, getUser.user,props.data.subTaskId, props.data.taskId, props.handleClose) }}  >Confirm</button>
                                            }</div>:
                                    <div> {(props.data.completeStatus === 'pending' && props.data.activeStatus === '0') ? <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { getActive(dispatch, getUser.user, props.data.taskId, props.data.sprintId, props.handleClose) }}  >Confirm</button> : 
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { updateUserStory(dispatch, getUser.user, props.data.taskId, props.data.sprintId, props.handleClose) }}  >Confirm</button>}</div>}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}
