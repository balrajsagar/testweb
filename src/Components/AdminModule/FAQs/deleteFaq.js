// eslint-disable-next-line
import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { deleteFaq } from './network';
import { reducer, initialState } from './reducer';
import { useSelector } from 'react-redux';

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

// for delete faq
export default function DeleteFaq(props) {

    // eslint-disable-next-line
    const getUser = useSelector(state => state.auth)
    // eslint-disable-next-line
    const [state, dispatch] = useReducer(reducer, initialState)
    const classNames = useStyles();
    // console.log(props.data.data)
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
                                <div className="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 className="modal-title p-2">
                                    {props.data.action === 'delete' ? 'Delete' : 'Exit Group'}
                                    </h5>
                                </div>
                                <div className="modal-body">
                                    {/* {props.data.action === 'delete' ?  */}
                                    <b>Do you want to delete ? </b> 
                                    {/* // : <b>Do you want to exit from Group ?</b>} */}
                                </div>


                                <div className="modal-footer justify-space-between">
                                    <button type="button" className="btn btn-outline-success" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                    {/*  {props.data.action === "delete" ?  */}
                                    <button type="button" className="btn btn-outline-danger" 
                                    onClick={(event) => {  deleteFaq(dispatch, props.data.data.id, props.handleClose) }} 
                                     style={{ borderRadius: '20px' }}>Delete</button>
                                      {/* : */}
                                    {/* // <button type="button" className="btn btn-outline-danger" style={{ borderRadius: '20px' }} */}
                                    {/* // onClick={(event) => {  exitGroup(state, dispatch, newMem, newLabel, getUser.user, props.data.data.id, props.handleClose) }}
                                    // >Exit</button>
                                    // } */}

                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}
