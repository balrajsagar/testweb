import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ideaReducer, initialState } from './ideaReducer';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import { addProject } from './network';
import {PROJECT,PROJECT_DESCRIPTION, TARGET_DATE} from '../../Common/Headers';



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
export default function AddProject(props) {
    const [state, dispatch] = useReducer(ideaReducer, initialState);
    const getUser = useSelector(state => state.auth)
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
                            <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">Add {PROJECT}</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button"  className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>

                                        <form >

                                            <div class="form-group row p-2">
                                                {/* <div> */}
                                                <label for="recipient-name" class="col-form-label pt-4">{PROJECT} Title<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-name" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                value={state.projectTitle.value}
                                                onChange={(event) => dispatch(actions.projectTitle(event.target.value))} />
                                                <span style={{ color: "red", fontSize: '12px', marginLeft: '13%' }}>{state.projectTitle.errorStatus ? state.projectTitle.errormessage : ""}</span>
                                                </div>
                                                <div class="form-group row p-2" style={{marginTop: '-40px'}}>
                                                <label for="recipient-name" class="col-form-label pt-4">{PROJECT_DESCRIPTION}<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2 " id="recipient-name" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                value={state.projectDescription.value} 
                                                onChange={(event) => dispatch(actions.projectDescription(event.target.value))} />
                                                <span style={{ color: "red", fontSize: '12px', marginLeft: '13%' }}>{state.projectDescription.errorStatus ? state.projectDescription.errormessage : ""}</span>
                                            </div>
                                            <div class="form-group row p-2" style={{marginTop: '-40px'}}>
                                                <label for="target_date" class="col-form-label pt-4">{TARGET_DATE}<span style={{ color: "red" }} >*</span></label>
                                                <input type="date" class="form-control col-4 ml-2 " id="targetDate" name="targetDate" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                value={state.targetDate.value}
                                                onChange={(event) => dispatch(actions.targetDate(event.target.value))} />
                                            </div>
                                            {/* <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label">Estimation Time</label>
                                                <input type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="recipient-name" name="taskStatus" style={{ borderColor: 'black' }} />
                                                <label for="recipient-name" class="col-form-label">Days</label>
                                                <input type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="recipient-name" name="taskStatus" style={{ borderColor: 'black' }} />
                                                <label for="recipient-name" class="col-form-label">Days</label>
                                            </div> */}


                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }}  onClick={(event) => { addProject(state, dispatch, getUser.user, props.handleClose) }}>Add</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}