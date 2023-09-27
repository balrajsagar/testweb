import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { moduleReducer, initialState } from './moduleReducer';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import { addModule, getProjects } from './network';
import { MODULE, MODULENAME,START_DATE,END_DATE } from '../Headers';
// import Select from 'react-select';
//import TextField from "@material-ui/core/TextField";


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
export default function AddModule(props) {
    const [state, dispatch] = useReducer(moduleReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    // const [epicId ] = useState(props.data.id)
    useEffect(() => {
        getProjects(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    var epicsList = []
    state.projects.map((epics) => {
        return (
            epicsList.push({
                'value': epics.idea_id, 'label': epics.idea_title
            })
        );
    })
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
                                    <h5 class="modal-title p-2">Add {MODULE}</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>

                                        <form >
                                           {/* {props.data.action === "addSprint" ? <div class="form-group row p-2" style={{flexDirection:"row"}}>
                                                <label className="col-form-label" for="story" >Select Epic</label>
                                                <Select
                                                    className="form-control col-10 ml-2"
                                                    style={{ width: 10, boarderRadius: 2 }}
                                                    placeholder="Select Epic"
                                                    // value={sprints.value}
                                                    onChange={(selectedOption) =>
                                                        updateEpicId(selectedOption.value)
                                                    }
                                                    options={epicsList}
                                                />
                                            </div> : null } */}
                                            <div class="form-group row p-2 " style={{marginTop:-30}}>
                                                <label for="recipient-name" class="col-form-label pt-4 ">{MODULENAME}<span style={{ color: "red" }} >*</span></label>
                                                <input type="text" class="form-control col-10 ml-2" id="recipient-name" name="description" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', }}
                                                    value={state.moduleTitle.value}
                                                    onChange={(event) => dispatch(actions.moduleTitle(event.target.value))} />
                                                    <span style={{ color: "red", fontSize: '12px', marginLeft: '0px' }}>{state.moduleTitle.errorStatus ? state.moduleTitle.errormessage : ""}</span>
                                            </div>

                                            <label for="start_date" >{START_DATE}<span style={{ color: "red" }} >*</span></label>
                                            <input type="date" id="startDate" name="startDate" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginLeft: '10px' }}
                                                value={state.startDate.value}
                                                onChange={(event) => dispatch(actions.startDate(event.target.value))} />

                                            <label for="end_date" style={{ marginLeft: '10px' }} >{END_DATE}<span style={{ color: "red" }} >*</span></label>
                                            <input type="date" id="" name="" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginLeft: '10px' }}
                                                value={state.date.value}
                                                onChange={(event) => dispatch(actions.targetDate(event.target.value))} />



                                            {/* 
                                            <TextField
                                                id="datetime-start"
                                                label="Start Date"
                                                type="datetime-local"
                                                className={classNames.textField}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                // onChange={(event)=>alert(event.target.value)}
                                                onChange={(event)=>dispatch(actions.startDate(event.target.value))}
                                            />

                                            <TextField
                                            style={{marginLeft:'100px'}}
                                                id="datetime-end"
                                                label="End Date"
                                                type="datetime-local"
                                                className={classNames.textField}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                // onChange={(event)=>alert(event.target.value)}
                                                onChange={(event)=>dispatch(actions.targetDate(event.target.value))}
                                            /> */}
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { addModule(state, dispatch, getUser.user,props.handleClose) }}>Add</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}