import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ideaReducer, initialState } from './ideaReducer';
import { useSelector } from 'react-redux';
import * as actions from './actions'
import { modifyProject } from './network';


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

//For Modify The Project
export default function ModifyProject(props) {
    const [state, dispatch] = useReducer(ideaReducer, initialState);
    const getUser = useSelector(state => state.auth)
    console.log(props.data)
    useEffect(() => {
       dispatch(actions.setModifyProject(props.data.id,props.data.title,props.data.description))
        // eslint-disable-next-line
    },[])
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
                                    <h5 class="modal-title p-2">Modify Project</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button"  className="d-flex align-items-right" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        
                                        <form >
                                           
                                            <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label p-4">Project Title</label>
                                                <input type="text" class="form-control col-10 m-1" id="recipient-name" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }} 
                                                value={state.projectTitle.value}
                                                onChange={(event) => dispatch(actions.projectTitle(event.target.value))}/>
                                                <label for="recipient-name" class="col-form-label p-4">Description</label>
                                                <input type="text" class="form-control col-10 m-1" id="recipient-name" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                value={state.projectDescription.value}
                                                onChange={(event) => dispatch(actions.projectDescription(event.target.value))} />
                                         </div>
                                         {/* <div class="form-group row p-2">
                                         <label for="recipient-name" class="col-form-label">Estimation Time</label>
                                         <input type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="recipient-name" name="taskStatus"  style={{ borderColor: 'black' }} />
                                         <label for="recipient-name" class="col-form-label">Days</label>
                                         <input type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="recipient-name" name="taskStatus"  style={{ borderColor: 'black' }} />
                                         <label for="recipient-name" class="col-form-label">Days</label>
                                         </div> */}
                                           

                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { modifyProject(state, dispatch, getUser.user, props.handleClose) }}>Save</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}