import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import * as actions from './action'
import { addReleaseOwner, getUsers } from './network';
import { roReducer, initialState } from './reducer';
import Select from 'react-select';

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

//Release Owner Adding
export default function RO(props) {
    const [state, dispatch] = useReducer(roReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    useEffect(() => {
        getUsers(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
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
                            <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">Select RO(Release Owner)</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button"  className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>

                                </div>
                                <div className="modal-body">
                                    <div>
                                        <form>
                                     
                                        <label for="user" className="col-form-label">Select User</label>
                                            <Select
                                            className="form-control col-12 m-1"
                                            placeholder="Select User"
                                            value={userDetails.value}
                                            onChange={(selectedOption) => {
                                                dispatch(actions.userSelected(selectedOption.value))
                                            }}
                                            options={userDetails}
                                        />
                                      
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-success" onClick={() => addReleaseOwner(state,dispatch, getUser.user, props.data.id, props.handleClose)} style={{ borderRadius: '20px' }}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}