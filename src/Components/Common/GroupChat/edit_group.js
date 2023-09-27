/* 
FileName:index.js
purpose:Create Group Chat modal
Developers:Rohini

 */
import React, { useEffect, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { getEmployees, updateGroup, getGroupDetails } from './network';
import { reducer, initialState } from './reducer';
import RootLoader from '../Loader/RootLoader';
import * as actions from './action';
import { EDIT_GROUP } from '../Headers';


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
export default function AddGroupChat(props) {

    const classNames = useStyles();
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(reducer, initialState)
    const [mem, setMem] = useState({selectOptions: []});
    const [label, setLabel] = useState({selectOptions: []});
    // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);
//   console.log(props.data.data)
  // handle onChange event of the dropdown
  
    useEffect(()=>{
        getEmployees(dispatch, getUser.user)
        getGroupDetails(dispatch, getUser.user)
        const showMem = props.data.data.members_name.split(",");
        const showlabel = props.data.data.members_email.split(",");
        setSelectedValue(showlabel)
        setLabel(showlabel)
        setMem(showMem)
        dispatch(actions.setEditGroup(props.data.data.id,props.data.data.group_name))
        // eslint-disable-next-line
    },[])
    var empList = [];
    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
        setLabel(Array.isArray(e) ? e.map(x => x.value) : []);
        setMem(Array.isArray(e) ? e.map(x => x.label) : []);
      }
      state.employees.filter(empp =>empp.workingStatus === "Active").map((emp) => {
        return (
            emp.email !== getUser.user.userName ?
            empList.push({
                'value': emp.email, 'label': emp.name
            })
            : ""
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
                {state.isLoading ? <RootLoader /> : 
                 <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className="modal-content col-lg-6 p-2" style={{ borderRadius: '10px' }}>
                                <div className="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <h5 className="modal-title p-2">{EDIT_GROUP}</h5>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" className="d-flex align-items-right p-2" data-dismiss="modal" onClick={props.handleModalClose}><i className="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body overflow-auto" style={{ height: 250 }} >

                                    <div className="form-group" style={{ height: 'auto' }}>
                                        <label for="recipient-name" className="col-form-label pt-0" style={{ width: '150px' }}>Group Name<span style={{ color: "red" }} >*</span></label>
                                        <input type="text" className="form-control" id="title" name="title" style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px', marginTop: '-10px' }}
                                            value={state.title.value}
                                            onChange={(event) => dispatch(actions.title(event.target.value))} 
                                            />
                                        {/* // <span style={{ color: "red", fontSize: '12px' }}>{state.taskTitle.errorStatus ? state.taskTitle.errormessage : ""}</span> */}
                                    </div>
                                    
                                    <div className="form-group row pl-2" style={{ marginTop: "-20px" }}>
                                     <label for="epic" className="col-form-label pt-2" style={{ width: '100px' }}>Members </label>
                                    <Select
                                       className="dropdown form-control "
                                       placeholder="Select Option"
                                    //    value = {showMem}
                                       value={empList.filter(obj => selectedValue.includes(obj.value))} // set selected values
                                       options={empList} // set list of the data
                                       onChange={handleChange} // assign onChange function
                                       isMulti
                                       isClearable
                                    />
                                    
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {state.isLoading ? <RootLoader /> :
                                     <button type="button" className="btn btn-outline-success" style={{ borderRadius: '20px' }} 
                                     onClick={(event) => { updateGroup(state,getUser.user.fullName +","+ mem.toString(), getUser.user.userName +","+ label.toString(), dispatch, getUser.user,props.handleClose) }}
                                     >Update</button>
                                    } 
                                    {/* onClick={(event) => { addProject(state, dispatch, getUser.user, props.handleClose) }} */}
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