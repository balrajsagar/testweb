import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import * as actions from './actions';
import { initialState, roadblockReducer } from './roadblockReducer';
import { getUsers, modifyRoadBlock } from './network';
import Select from 'react-select'; 
import { MODIFY_ROADBLOCK, SUBTASKTITLE, ROADBLOCK_DESCRIPTION, ESTIMATEDTIME, DAYS, HOURS, EDIT } from '../Headers';
import { severity } from '../Json/severity';
import { priority } from '../Json/priority';

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

//To add the roadblock from subtask
export default function ModifyRoadBlock(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(roadblockReducer, initialState)
    const classNames = useStyles();
    let time = props.data.estimatedHours;
    let days1 = (Number(time / 24)).toString().split(".");
    var days = days1[0];
    var hours = Number(time % 24);
    useEffect(() => {
        getUsers(dispatch, getUser.user);
        dispatch(actions.setModifyRoadBlock(props.data.taskName,props.data.roadBlockDescription,days,hours,props.data.assignedTo,props.data.severitySelected,props.data.prioritySelected))
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
                            <div className="modal-content col-6 p-2" style={{borderRadius:'10px'}}>
                            <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title">{MODIFY_ROADBLOCK}</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button" onClick={props.handleModalClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                {/* <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label">RoadBlock Title</label>
                                                <input type="text" class="form-control col-10 m-0" id="recipient-name" name="description" placeholder="Description" value={state.roadblockTitle}
                                                 onChange={(event) => dispatch(actions.roadBlockTitle(event.target.value))}
                                                  style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }} />
                                </div> */}
                                 {/* </div> */}

                                 <div>
                                        <form >
                                            <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label pt-4" style={{width:'80px'}}>{SUBTASKTITLE}</label>
                                                <input type="text" class="form-control col-10 ml-2" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value = {state.taskTitle.value}
                                                    // onChange={(event) => dispatch(actions.taskTitle(event.target.value))}
                                                     />
                                                {/* <label for="recipient-name" class="col-form-label pt-4" style={{width:'80px'}}>Description</label>
                                                <input type="text" class="form-control col-10 ml-2" id="ddescription" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.taskDescription.value}
                                                    onChange={(event) => dispatch(actions.taskDescription(event.target.value))} 
                                                    /> */}

                                                <label for="recipient-name" class="col-form-label pt-4" style={{width:'80px'}}>{ROADBLOCK_DESCRIPTION}</label>
                                                <input type="text" class="form-control col-10 ml-2" id="ddescription" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.roadblockTitle.value}
                                                    onChange={(event) => dispatch(actions.roadBlockTitle(event.target.value))}
                                                    />

                                                <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label pt-4">{ESTIMATEDTIME}</label>
                                                <input type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="Days" name="Days" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }} 
                                                value={state.days.value}
                                                onChange={(event) => dispatch(actions.days(event.target.value))}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4">{DAYS}</label>
                                                <input  type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="Hours" name="Hours"  style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                value={state.hours.value}
                                                onChange={(event) => dispatch(actions.hours(event.target.value))}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4">{HOURS}</label>
                                                </div>
  
                                            </div>
                                            <div class="form-group row p-2" style={{marginTop:'-40px'}} >
                                                <label for="user" className="col-form-label pt-4" style={{width:'80px'}}>Select User</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder={props.data.assignedto}
                                                    value={userDetails.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.userSelected(selectedOption.value))
                                                    }}
                                                    options={userDetails}
                                                />
                                                </div>
                                                <div class="form-group row p-2" style={{marginTop:'-40px'}}>
                                                 <label for="user" className="col-form-label pt-4" style={{width:'80px'}}>Severity</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder={state.severitySelected.value}
                                                    value={severity.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.severitySelected(selectedOption.value))
                                                    }}
                                                    options={severity}
                                                />
                                                </div>
                                                <div class="form-group row p-2" style={{marginTop:'-40px'}}>
                                                 <label for="user" className="col-form-label pt-4" style={{width:'80px'}}>Priority</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder={state.prioritySelected.value}
                                                    value={priority.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.prioritySelected(selectedOption.value))
                                                    }}
                                                    options={priority}
                                                />
                                                </div>
                                        </form>
                                    </div>
                                    </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={() => modifyRoadBlock(state,dispatch,getUser,props.data.taskId,props.data.roadblockId,props.handleClose)} style={{borderRadius:'20px'}}>{EDIT}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}