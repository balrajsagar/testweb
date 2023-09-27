import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as actions from './actions'
import { useSelector } from 'react-redux';
import {tasksReducer,initialState} from './taskReducer'
import { saveMuralBoard } from './network';
import { MURAL_BOARD } from '../../Common/Headers';




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

//For Add New drawing board
export default function AddNewMural(props) {
 const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(tasksReducer, initialState);


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
                            <div className="modal-content col-5 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title p-2">Add {MURAL_BOARD}</h5>
                                </div>
                                <div className="modal-body">
                                <div  class="form-group" style={{height:'auto'}}>
                                                <input type="text" class="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black',marginTop:'-10px' }}
                                                    value={state.muralTitle.value}
                                                    onChange={(event) => dispatch(actions.muralTitle(event.target.value))} 
                                                    
                                                    />
                                                     </div>

                                </div>
                              

                                <div class="modal-footer justify-space-between">
                                    <button type="button" class="btn btn-outline-danger"  onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Cancel</button>
                                  
                                    
                                   {state.muralTitle.value !== ""?  <button type="button" class="btn btn-outline-success"  onClick={(event)=>{saveMuralBoard(state,dispatch,getUser.user,state.muralTitle.value,props.handleClose)}} style={{ borderRadius: '20px' }}>Add</button>:null}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}
