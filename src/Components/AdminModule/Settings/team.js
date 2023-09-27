import React, { useEffect, useReducer } from "react"
import { useSelector } from "react-redux"
import $ from 'jquery';
import { getTeams, addTeam, deleteTeam, modifyTeam } from "./network";
import { newTeam, setModifyTeam } from "./action";
import { settingsReducer, initialState } from "./settingsReducer";
import { TEAM_NAME } from '../../Common/Headers';

export default function Team(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(settingsReducer, initialState)
    useEffect(() => {
        getTeams(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.team.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.team])
    return <div className="table-responsive">
        <label className="col-sm-3 col-form-label pt-0">{TEAM_NAME}<span className="required text-danger">*</span></label>
        <div className="col-sm-9 around row">
            <input type="text"
                className="col-sm-6 form-control form-control-sm"
                style={{ borderWidth: '0.1px' }}
                // eslint-disable-next-line
                id="team"
                placeholder="Enter Department Name"
                value={state.teamName.value}
                onChange={(event) => {
                    dispatch(newTeam(event.target.value));
                }}
                required
            />
        { state.teamId.value === "" ? <button type="button" class="btn btn-success ml-2" onClick={()=>addTeam(state, dispatch, getUser.user)}>Add</button>:
        <button type="button" class="btn btn-warning ml-2" onClick={()=>modifyTeam(state, dispatch, getUser.user)}>Modify</button>}
        </div>
        <table
            search="true"
            id="example" className="table table-striped table-bordered"
            data-pagination="true"
        >
            <thead style={{ backgroundColor: '#F4FAF7' }}>
                <tr>
                    <th>S.No</th>
                    <th>{TEAM_NAME}</th>
                    <th style={{width:'10px'}}>Modify</th>
                    <th style={{width:'10px'}}>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.team !== [] ? state.team.map((team, index) => {
                        return (
                            <tr key={index}>
                                <td className="py-1" style={{ textAlign: 'end', width: '10px' }}>{index + 1}</td>
                                <td style={{ textTransform: "capitalize" }}>{team.value}</td>
                                <td style={{textAlign:'start'}}><span  onClick={()=> dispatch(setModifyTeam(team.teamid,team.value))}><img src="images/common/edit.svg"  style={{ width: '18px', height: '18px' }} alt=""/></span></td>
                                <td style={{textAlign:'start'}}><span  onClick={()=>deleteTeam(team.teamid,dispatch,getUser.user)}><img src="images/common/delete.svg"  style={{ width: '18px', height: '18px' }} alt=""/></span></td>
                            </tr>
                        )
                    }) : null}
            </tbody>
        </table>
    </div>
}