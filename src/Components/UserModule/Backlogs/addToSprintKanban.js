import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { tasksReducer, initialState } from './tasksReducer';
import * as actions from './actions'

import { useSelector } from 'react-redux';
import { addKanban, getKanbans } from './network';
import Select from 'react-select';
import { KANBAN } from '../../Common/Headers';




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
export default function AddToSprintKanban(props) {
    const getUser = useSelector(state => state.auth)

    const [state, dispatch] = useReducer(tasksReducer, initialState);



    // console.log(state)
    const classNames = useStyles();
    useEffect(() => {
        getKanbans(dispatch, getUser.user);

        // eslint-disable-next-line
    }, [])
    var sprintDetails = [];
    state.sprints.map((sprints) => {

        return (
            sprintDetails.push({ 'value': sprints.moduleId, 'sprint_status': sprints.sprint_status, 'epicId': sprints.ideaId, 'label': sprints.moduleDesc, })
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
                                    <h5 class="modal-title p-2">Add To {KANBAN}</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <form >


                                            <div>
                                                <div class="form-group row p-2" style={{ flexDirection: "row" }}>
                                                    <label for="story" className="col-form-label">Select {KANBAN}</label>
                                                    <Select
                                                        className="form-control "
                                                        placeholder={`Select ${KANBAN}`}
                                                        value={sprintDetails.value}
                                                        onChange={(selectedOption) => {
                                                            dispatch(actions.sprintSelected(selectedOption.value))
                                                        }}
                                                        options={sprintDetails}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    {/* onClick={(event) => { addProject(state, dispatch, getUser.user, props.handleClose) }} */}
                                </div>
                                <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { addKanban(props.data.assignedTo, props.data.taskId, state, dispatch, getUser.user, props.handleClose, props.data.device_id, props.data.assign_to, props.data.sprintDesc, props.data.title, props.data.storyPoints) }}>Add To Kanban </button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
