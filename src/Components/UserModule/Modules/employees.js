import React, { useEffect, useReducer,} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector } from 'react-redux';
import { moduleReducer, initialState } from './moduleReducer';
import { getInvolvedEmployees} from './network';
import {STORY_POINTS} from '../../Common/Headers'



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
export default function EmployeesInvolved(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(moduleReducer, initialState)
    console.log(state)


    const classNames = useStyles();
    useEffect(() => {
        getInvolvedEmployees(dispatch,getUser.user, props.data.moduleId);
        // eslint-disable-next-line
    }, [])

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
                            <div className="modal-content modal-sm p-2" style={{ borderRadius: '10px', overflowWrap: "break-word" }}>
                                <div className="modal-body">
                                <table className="table table-striped table-bordered" >
                               <tr style={{ backgroundColor: '#F4FAF7' }}>
                                   <th>Squad Members</th>
                                   <th>{STORY_POINTS}</th>
                                   </tr>

                                   {state.involvedEmployees !== [] ? state.involvedEmployees.map((involved, index) => {
                                        const input=involved.assignedTo;
                                        const[name]=input.split('@');
                                       return(
                                           <tr key={index}>

                                       
                                       <td style={{ textTransform: "capitalize",fontWeight:'bold' }}>{name}</td>
                                       <td style={{ textTransform: "capitalize",fontWeight:'bold' }}>{involved.points}</td>
                                               </tr>
                                       )

                                    }) : null}
 
                                </table> 

                                    
                                   
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}