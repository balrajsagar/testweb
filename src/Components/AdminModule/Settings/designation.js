import React, { useEffect, useReducer } from "react"
import { useSelector } from "react-redux"
import $ from 'jquery';
import { getDesignations, addDesignation, modifyDesignation, deleteDesignation } from "./network";
import { newDesignation, setModifyDesignation } from "./action";
import { settingsReducer, initialState } from "./settingsReducer";
import { DESIGNATION_NAME } from '../../Common/Headers';

export default function Designation(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(settingsReducer, initialState)
    useEffect(() => {
        getDesignations(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.designation.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.designation])
    return <div className="table-responsive">
        <label className="col-sm-3 col-form-label pt-0">{DESIGNATION_NAME}<span className="required text-danger">*</span></label>
        <div className="col-sm-9 around row">
            <input type="text"
                className="col-sm-6 form-control form-control-sm"
                style={{ borderWidth: '0.1px' }}
                // eslint-disable-next-line
                id="designation"
                placeholder="Enter Title Name"
                value={state.designationName.value}
                onChange={(event) => {
                    dispatch(newDesignation(event.target.value));
                }}
                required
            />
        { state.designationId.value === "" ? <button type="button" class="btn btn-success ml-2" onClick={()=>addDesignation(state, dispatch, getUser.user)}>Add</button>:
        <button type="button" class="btn btn-warning ml-2" onClick={()=>modifyDesignation(state, dispatch, getUser.user)}>Modify</button>}
        </div>
        <table
            search="true"
            id="example" className="table table-striped table-bordered"
            data-pagination="true"
        >
            <thead style={{ backgroundColor: '#F4FAF7' }}>
                <tr>
                    <th>S.No</th>
                    <th>{DESIGNATION_NAME}</th>
                    <th style={{width:'10px'}}>Modify</th>
                    <th style={{width:'10px'}}>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.designation !== [] ? state.designation.map((designation, index) => {
                        return (
                            <tr key={index}>
                                <td className="py-1" style={{ textAlign: 'end', width: '10px' }}>{index + 1}</td>
                                <td style={{ textTransform: "capitalize" }}>{designation.value}</td>
                                <td style={{textAlign:'start'}}><span  onClick={()=> dispatch(setModifyDesignation(designation.designationid,designation.value))}><img src="images/common/edit.svg"  style={{ width: '18px', height: '18px' }} alt=""/></span></td>
                                <td style={{textAlign:'start'}}><span  onClick={()=>deleteDesignation(designation.designationid,dispatch,getUser.user)}><img src="images/common/delete.svg"  style={{ width: '18px', height: '18px' }} alt=""/></span></td>
                            </tr>
                        )
                    }) : null}
            </tbody>
        </table>
    </div>
}