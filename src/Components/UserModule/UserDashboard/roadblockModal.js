import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { getUserRoadblocks } from './network';
import { tasksReducer, initialState } from './tasksReducer';
import { useSelector } from 'react-redux';
import { ROADBLOCK_DESCRIPTION, REQUESTED_BY, ASSIGNED_DATE, ASSIGNED_TO, ASSIGNED_BY, SUBTASKTITLE, SUBTASKID, SUBTASK_DESCRIPTION, ROADBLOCK_LIST } from '../../Common/Headers';
import { getSubStringId } from '../../Common/SubStringConvert';

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

// user document model and immigration admin model also
export default function RoadBlockModal(props) {
    const classNames = useStyles();
    const [state, dispatch] = useReducer(tasksReducer, initialState)
    const getUser = useSelector(state => state.auth)
    // console.log(props.data)
    useEffect(() => {
        getUserRoadblocks(dispatch, getUser.user, props.data.id);
        // eslint-disable-next-line
    }, [])
    // console.log(state.userRoadblock)
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
                        <div className="user-modal-dialog d-flex justify-content-center" style={{height:'500px'}}>
                            <div className="modal-content col-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <div className="column">
                                        <h5 class="modal-title p-1">{ROADBLOCK_LIST}</h5>
                                    </div>
                                </div>
                                <div className="modal-body overflow-auto">
                                    <h6 className="text-dark mb-0">{SUBTASKID} : {getSubStringId(props.data.id,5)}</h6>
                                    <p className="text-dark mb-0">{SUBTASKTITLE} : {props.data.title} </p>
                                    <p className="text-dark mb-1">{SUBTASK_DESCRIPTION} : {props.data.description || props.data.taskDesc} </p>

                                    {state.userRoadblock !== [] ? state.userRoadblock.map((roadblock, index) => {
                                        return (
                                            
                                            <div className="overflow-auto mb-1" key={index} style={{padding: '10px',  overflow: 'auto', border: '0.2px solid grey', borderRadius: '10px' }}>
                                                <p className="text-success">{ROADBLOCK_DESCRIPTION} : {roadblock.roadblock_description} </p>
                                                <p style={{fontSize:'12px'}}>{REQUESTED_BY} : {roadblock.requestedby} </p>
                                                <p style={{fontSize:'12px'}}>{ASSIGNED_DATE} : {roadblock.roadblock_date}</p>
                                                <p style={{fontSize:'12px'}}>{ASSIGNED_BY} : {roadblock.assignedby} </p>
                                                <p style={{fontSize:'12px'}}>{ASSIGNED_TO} : {roadblock.assignedto} </p>
                                                {/* <h5>Task {props.data.id}</h5> */}
                                            </div>)
                                    }) : null}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={props.handleClose} style={{ borderRadius: '20px' }}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}