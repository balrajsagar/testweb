import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import * as actions from './actions';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { initialState, userTaskReducer } from './userTaskReducer';
import { Checkbox } from '@thumbtack/thumbprint-react';
import { useSelector } from 'react-redux';
import { updateStatus } from './network';

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

//For Update the Task Status
export default function UpdateRoadblock(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(userTaskReducer,initialState)
    const [isChecked, setIsChecked] = React.useState(false);
    const classNames = useStyles();
    const Progress = ({ done }) => {
        const [style, setStyle] = React.useState({});

        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${done}%`
            }

            setStyle(newStyle);
        }, 200);

        return (
            <div className="progress">
                <div className="progress-done" style={style}>
                    <p style={{marginLeft:'20px'}}></p>{done}%
                </div>
            </div>
        )
    }
    React.useEffect(() => {
        if (isChecked) {
            dispatch(actions.roadblockStatus(100))
        } else {
            dispatch(actions.roadblockStatus(0))
        }
    }, [isChecked]);

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
                            <div className="modal-content col-6 p-2" style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 class="modal-title pl-1 pt-1">Update Roadblock</h5>
                                    <button style={{backgroundColor:'transparent',border:'0'}} type="button" onClick={props.handleModalClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <p>Enter Roadblock Status Percentage</p>
                                        <form >
                                            <div className="form-group row  d-flex align-items-center pl-2">
                                                <input type="number" keyboardType={"numeric"} class="form-control col-2 " id="recipient-name" name="roadblockStatus" value={isChecked ? 100 : state.roadblockStatus} style={{ borderColor: 'black' }} onChange={(event) => dispatch(actions.roadblockStatus(event.target.value))} />
                                               <p style={{marginLeft:'10px'}}></p>
                                                <Progress className="ml-2" done={isChecked ? 100 : state.roadblockStatus} />
                                            </div>
                                            <div class="form-group row">
                                                <label for="recipient-name" class="col-form-label pl-2 pt-3">Enter Status</label>
                                                <input type="text" class="form-control col-10 m-1" id="recipient-name" name="description" onChange={(event) => dispatch(actions.roadblockDescription(event.target.value))} style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }} />
                                            </div>
                                            <div className="radio ">
                                                <Checkbox isChecked={isChecked} onChange={setIsChecked}>
                                                {/* <label for="recipient-name" class="col-form-label">Task Complete Status</label> */}
                                                <label for="recipient-name" class="col-form-label">Enter Status</label>
                                                </Checkbox>
                                                {/* <label><input type="checkbox" name="checked" onChange={(e)=> updateTaskCount(e.target.value)}/><span> Task Complete Status</span></label> */}
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={() => updateStatus(state,dispatch,getUser,props.data.id, props.handleClose,isChecked)}>Ok</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}