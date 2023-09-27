import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ReOpenProject } from './network';
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
export default function Condition(props) {
    const dispatch = useDispatch();
    const getUser = useSelector(state => state.auth)
    const [reason ,setReason] = useState();
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
                                    <h5 class="modal-title p-2">Reopen the project</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <h5>Project : {props.data.title}</h5>
                                        {/* <p>ProjectName : {props.data.title} </p> */}
                                        <p>Description : {props.data.description} </p>
                                        <p>Completed Date : {props.data.completedDate} </p>
                                        <label for="recipient-name" class="col-form-label" style={{width:'80px'}}>Reason/Purpose:</label>
                                        <input type="text" class="form-control col-10" id="reason" name="reason" placeholder ="Reason/Purpose" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                           onChange={(event)=>setReason(event.target.value)}></input>
                                    </div>
                                </div>
                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    <button type="button" class="btn btn-outline-success" onClick={() => ReOpenProject(dispatch, getUser.user, props.data.id,reason, props.handleClose)} style={{ borderRadius: '20px' }}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}