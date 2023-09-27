import React, {  useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import { addSubTask } from './network';
import { subtasksReducer, initialState } from './subtaskReducer';
import { SUBTASK,SUBTASK_DESCRIPTION,TARGET_DATE } from '../Headers';



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

//For Add New SubTask
export default function AddSubTask(props) {
    const [state, dispatch] = useReducer(subtasksReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    // useEffect(() => {
    //     getUsers(dispatch, getUser.user);
    //     getDependency(dispatch,getUser.user,props.data.ideaId);
    //     // eslint-disable-next-line
    // }, [])
    var userDetails = [];
    var dependencyDetails = [];
    state.users.map((users) => {
        return (
            userDetails.push({ 'value': users.id, 'label': users.name })
        );
    })
    state.dependencyUser.map((users) => {
        return (
            dependencyDetails.push({ 'value': users.id, 'label': users.name })
        );
    })
    console.log(props.data)
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
                                    <h5 class="modal-title p-2">{(getUser.user.corp).substring(0, 3).toUpperCase()}   {props.data.mainTaskId.substring(0, 5).toUpperCase()}{'-'}{props.data.title}</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button"  className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <form >
                                            <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label pt-2" style={{width:'100px'}}>{SUBTASK} Title</label>
                                                <input type="text" class="form-control col-10 ml-2" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.taskTitle.value}
                                                    onChange={(event) => dispatch(actions.taskTitle(event.target.value))} />
                                                <label for="recipient-name" class="col-form-label pt-2" style={{width:'100px',marginTop: '10px' }}>{SUBTASK_DESCRIPTION}</label>
                                                
                                                <textarea class="form-control col-10 ml-2" id="ddescription" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black', marginTop: '10px'}}
                                                    value={state.taskDescription.value}
                                                    onChange={(event) => dispatch(actions.taskDescription(event.target.value))} />
                                                     <label for="target_date" class="col-form-label pt-2" style={{ width: '100px' }}>{TARGET_DATE}<span style={{ color: "red" }} >*</span></label>
                                                    <input type="date" class="form-control col-10 ml-2" id="target_date" name="target_date" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px',marginTop:'-10px' }}
                                                    value={state.targetDate.value}
                                                    onChange={(event) => dispatch(actions.targetDate(event.target.value))} />
                                                {/* <div class="form-group row p-2">
                                                <label for="recipient-name" class="col-form-label pt-4">Estimation Time</label>
                                                <input type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="Days" name="Days" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }} 
                                                value={state.days.value}
                                                onChange={(event) => dispatch(actions.days(event.target.value))}/>
                                                <label for="recipient-name" class="col-form-label pt-4">Days</label>
                                                <input  type="number" keyboardType={"numeric"} class="form-control col-2 m-1 " id="Hours" name="Hours"  style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                value={state.hours.value}
                                                onChange={(event) => dispatch(actions.hours(event.target.value))}/>
                                                <label for="recipient-name" class="col-form-label pt-4">Hours</label>
                                                </div> */}
  
                                            </div>
                                            {/* <div class="form-group row p-2" style={{marginTop:'-40px'}}>
                                                <label for="user" className="col-form-label pt-4" style={{width:'80px'}}>Select User</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder="Select User"
                                                    value={userDetails.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.userSelected(selectedOption.value))
                                                    }}
                                                    options={userDetails}
                                                />
                                                </div> */}
                                            {/* <div class="form-group row p-2">
                                                 <label for="user" className="col-form-label pt-4" style={{width:'80px'}}>Dependency</label>
                                                <Select
                                                    className="form-control col-10 m-1"
                                                    placeholder="Select Dependency"
                                                    value={dependencyDetails.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.dependencySelected(selectedOption.value))
                                                    }}
                                                    options={dependencyDetails}
                                                />
                                                </div> */}
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { addSubTask(state, dispatch, getUser.user, props.data.mainTaskId,props.data.moduleId,props.data.assignedTo,props.data.targetDate, props.handleClose) }}>Add</button>
                                    {/* onClick={(event) => { addProject(state, dispatch, getUser.user, props.handleClose) }} */}
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}