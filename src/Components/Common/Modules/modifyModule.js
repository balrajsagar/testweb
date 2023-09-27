import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { moduleReducer, initialState } from './moduleReducer';
import { useSelector } from 'react-redux';
import * as actions from './actions'
import { modifyModule } from './network';
import { MODIFYMODULE, MODULENAME,START_DATE,END_DATE } from '../Headers';
// import TextField from "@material-ui/core/TextField";


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
export default function ModifyModule(props) {
    const [state, dispatch] = useReducer(moduleReducer, initialState);
    const getUser = useSelector(state => state.auth)
    console.log(props.data.startDate)
    useEffect(() => {
       dispatch(actions.setModifyModule(props.data.id,props.data.title,props.data.targetDate,props.data.startDate,props.data.sprint_status))
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
                                    <h5 class="modal-title p-2">{MODIFYMODULE}</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button"  className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        
                                        <form >
                                           
                                            <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label pt-4" style={{width:'110px'}}>{MODULENAME}<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2" id="recipient-name" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }} 
                                                value={state.moduleTitle.value}
                                                onChange={(event) => dispatch(actions.moduleTitle(event.target.value))}/>
                                                {/* <label for="recipient-name" class="col-form-label">Description</label>
                                                <input type="text" class="form-control col-10 m-1" id="recipient-name" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                value={state.projectDescription.value}
                                                onChange={(event) => dispatch(actions.projectDescription(event.target.value))} /> */}
                                         </div>
                                         <label for="start_date" >{START_DATE}</label>
                                            <input type="date" id="startDate" name="startDate" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginLeft: '10px' }}
                                                value={state.startDate.value}
                                                onChange={(event) => dispatch(actions.startDate(event.target.value))} />

                                            <label for="end_date" style={{marginLeft:'10px'}} >{END_DATE}</label>
                                            <input type="date" id="" name="" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginLeft: '10px' }}
                                                value={state.date.value}
                                                onChange={(event)=>dispatch(actions.targetDate(event.target.value))} />
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { modifyModule(state, dispatch, getUser.user, props.handleClose) }}>Save</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}