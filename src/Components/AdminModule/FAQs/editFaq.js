/* 
FileName:index.js
purpose:Create Group Chat modal
Developers:Rohini

 */
import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import { useSelector } from 'react-redux';
import { updateFaq } from './network';
import { reducer, initialState } from './reducer';
import RootLoader from '../../Common/Loader/RootLoader';
import * as actions from './action';
// import { EDIT_GROUP } from '../../Common/Headers';



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

//For Ediyt FAQs
export default function EditFaq(props) {

    const classNames = useStyles();
    // const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(reducer, initialState)
    //   console.log(props.data.data)
    // handle onChange event of the dropdown

    useEffect(() => {
        dispatch(actions.setEditFaq(props.data.data.id, props.data.data.question, props.data.data.answer))
        // eslint-disable-next-line
    }, [])
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
                    {state.isLoading ? <RootLoader /> :
                        <div className={classNames.paper}>
                            <div className="user-modal-dialog d-flex justify-content-center">
                                <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px' }}>
                                    <div className="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                        <h5 className="modal-title p-2">Modify</h5>
                                        <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i className="mdi mdi-close text-black"></i></button>
                                    </div>
                                    <div className="modal-body overflow-auto" >
                                        <div className="form-group" style={{ height: 'auto' }}>
                                            <label for="recipient-name" className="col-form-label pt-0" style={{ width: '150px' }}>Question<span style={{ color: "red" }} >*</span></label>
                                            <input type="text" className="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                                value={state.ques.value}
                                                onChange={(event) => dispatch(actions.ques(event.target.value))}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="recipient-name" className="col-form-label pt-0" style={{ width: '150px' }}>Answer<span style={{ color: "red" }} >*</span></label>
                                            <textarea rows={10} type="text"  className="form-control mt-1" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                                value={state.ans.value}
                                                onChange={(event) => dispatch(actions.ans(event.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        {state.isLoading ? <RootLoader /> :
                                            <button type="button" className="btn btn-outline-success" style={{ borderRadius: '20px' }}
                                                onClick={(event) => { updateFaq(state, dispatch, props.handleClose) }}
                                            >Update</button>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                </Fade>
            </Modal>
        </div >
    );
}