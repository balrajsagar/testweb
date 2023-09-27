import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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


export default function Update(props) {
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
                            <div className="modal-content col-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title">Task-3401  PTMS Application Operations Center </h5>
                                    <button type="button" onClick={props.handleClose} className="btn btn-danger d-flex justify-content-right" data-dismiss="modal">Close</button>

                                </div>
                                <div className="modal-body">
                                    <div  className="overflow-auto" style={{height:'100px'}}>
                                        <p className="text-left">Hello</p>
                                        <p className="text-right p-3">Where are we with the project?</p>

                                        <p className="text-left">Still Processing</p>
                                        <p className="text-right p-3">We have demo today</p>

                                    </div>
                                </div>
                                <div class="modal-footer m-1">
                                    <input type="text" class="form-control col-10 " id="recipient-name" style={{ borderColor: 'grey', borderRadius: '20px' }} />
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }}>Send</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}