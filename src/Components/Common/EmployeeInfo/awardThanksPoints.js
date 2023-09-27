import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as actions from './action'
import { useSelector } from 'react-redux';
import { empInfoReducer, initialState } from './empInfoReducer';
import Select from 'react-select';
import { THANKS_REASON, THANKS_DESCRIPTION, AWARDS } from '../Headers';
import { awardThanksPoints, getThanksPoints } from './network';


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
export default function AwardThanksPoints(props) {
    const [state, dispatch] = useReducer(empInfoReducer, initialState);
    const getUser = useSelector(state => state.auth)
    const classNames = useStyles();
    useEffect(() => {
        getThanksPoints(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [])
    var userDetails = [];
    state.thanksPoints.map((thanksPoints) => {
        var kudoAward=` [${thanksPoints.kudos_award}] `
        return (
            userDetails.push({ 'value': thanksPoints.k_id, 'label':kudoAward.concat(thanksPoints.kudo_description) })
        );
    })
    // console.log(state.thanksPoints)
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
                                    <h5 class="modal-title p-2">{AWARDS}</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div>

                                        <form >

                                            <div class="form-group row pl-2">
                                                <label for="user" className="col-form-label pt-4" style={{ width: '160px' }}>{THANKS_REASON}</label>
                                                <Select
                                                    className="form-control col-9 m-1"
                                                    placeholder={THANKS_REASON}
                                                    value={userDetails.value}
                                                    onChange={(selectedOption) => {
                                                        dispatch(actions.awardSelected(selectedOption.value))
                                                    }}
                                                    options={userDetails}
                                                />
                                                <label for="recipient-name" class="col-form-label pt-4" style={{ width: '160px' }}>{THANKS_DESCRIPTION}</label>
                                                <input type="text" class="form-control col-9 ml-2" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                                                    value={state.awardDescription.value}
                                                    onChange={(event) => dispatch(actions.awardDescription(event.target.value))} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" style={{ borderRadius: '20px' }} onClick={(event) => { awardThanksPoints(state, dispatch, getUser.user,props.data.id,props.handleClose) }}>Add</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}