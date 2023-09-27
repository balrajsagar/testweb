import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {  verifySubTask } from './network';
import { useDispatch, useSelector } from 'react-redux';
import { SUBTASK, SUBTASKID, SUBTASKTITLE } from '../Headers';

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

// user document model and immigration admin model also
export default function SubTaskVerify(props) {
    const dispatch = useDispatch();
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
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
                            <div className="modal-content modal-sm p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title">Do you want to {props.data.action} {SUBTASK}..!</h5>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <h5>{SUBTASKID}:{props.data.subTaskId}</h5>
                                        <p>{SUBTASKTITLE}: {props.data.taskTitle} </p>
                                    </div>
                                </div>
                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    <button type="button" class="btn btn-outline-success" onClick={() => verifySubTask(dispatch, getUser.user,props.data.subTaskId, props.data.mainTaskId, props.handleClose,props.handleModalClose)} style={{ borderRadius: '20px' }}>Verify</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}