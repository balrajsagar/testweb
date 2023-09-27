import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {  verifyMainTask, updateUserStory } from './network';
import { useDispatch, useSelector } from 'react-redux';
import { VERIFY, MAINTASKID, MAINTASKNAME, MAINTASK } from '../Headers';
import { getSubStringId } from '../SubStringConvert';

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
export default function MainTaskVerify(props) {
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
                                    <h5 class="modal-title">Do you want to {props.data.action} this {MAINTASK} ?</h5>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <h5>{MAINTASKID}:{getSubStringId(props.data.mainTaskId, 5)}</h5>
                                        <p>{MAINTASKNAME}: {props.data.title} </p>
                                    </div>
                                </div>
                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    {props.data.action === "Verify" ?<button type="button" class="btn btn-outline-success" onClick={() => verifyMainTask(dispatch, getUser.user, props.data.mainTaskId, props.handleClose,props.handleModalClose)} style={{ borderRadius: '20px' }}>{VERIFY}</button>:null}
                                    {props.data.action === "Complete" ? <button type="button" class="btn btn-outline-success" onClick={() => updateUserStory(dispatch, getUser.user, props.data.mainTaskId, props.handleClose,props.handleModalClose)} style={{ borderRadius: '20px' }}>Yes</button> :null}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}