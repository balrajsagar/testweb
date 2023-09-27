import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { approveProjects, deleteProject, rejectProject, verifyProject } from './network';
import { useDispatch, useSelector } from 'react-redux';

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
export default function CheckCondition(props) {
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
                                    <h5 class="modal-title p-2">Do you want to {props.data.action} Project..!</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button"  className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>

                                </div>
                                <div className="modal-body">
                                    <div>
                                        <h5>Project Id:{props.data.id}</h5>
                                        <p>Project Name: {props.data.title} </p>
                                    </div>
                                </div>
                                <div class="modal-footer justify-space-between">
                                    {props.data.action === "Approve" ? <button type="button" class="btn btn-outline-success" onClick={() => approveProjects(dispatch, getUser.user, props.data.id, props.handleClose)} style={{ borderRadius: '20px' }}>Approve</button> :
                                        props.data.action === "Reject" ? <button type="button" class="btn btn-outline-danger" onClick={() => rejectProject(dispatch, getUser.user, props.data.id, props.handleClose)} style={{ borderRadius: '20px' }}>Reject</button> :
                                        props.data.action === "Verify" ? <button type="button" class="btn btn-outline-success" onClick={() => verifyProject(dispatch, getUser.user, props.data.id, props.handleClose,props.handleModalClose)} style={{ borderRadius: '20px' }}>Verify</button>:
                                        <button type="button" class="btn btn-outline-danger" onClick={() => deleteProject(dispatch, getUser.user, props.data.id, props.handleClose,props.handleModalClose)} style={{ borderRadius: '20px' }}>Delete</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}