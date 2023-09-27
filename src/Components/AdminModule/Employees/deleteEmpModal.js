import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { deleteEmployee } from './network';
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

// Delete Employee
export default function DeleteEmployee(props) {
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
                            <div className="modal-content modal-sm p-2" style={{borderRadius:'10px'}}>
                                <div className="modal-body">
                                <div>
                                    <h5>Emp Id {props.data.id} </h5>
                                    <p>Name : {props.data.name} </p>
                                    </div>
                                 </div>
                                <div class="modal-footer justify-space-between">
                                <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{borderRadius:'20px'}}>Cancel</button>
                                <button type="button" class="btn btn-outline-success" onClick={() => deleteEmployee(dispatch, getUser.user, props.data.id,props.handleClose)} style={{borderRadius:'20px'}}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}