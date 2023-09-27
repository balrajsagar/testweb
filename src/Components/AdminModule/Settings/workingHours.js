import React, { useEffect, useReducer } from "react"
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import $ from 'jquery';
import { modifyTimeShift, addTimeShift, getShifts } from "./network";
import { setModifyTime, new_end_time, new_time_zone, new_start_time } from "./action";
import { settingsReducer, initialState } from "./settingsReducer";
// import { DESIGNATION_NAME } from '../../Common/Headers';
import Select from 'react-select';


export default function WorkingHours(props) {
    const [state, dispatch] = useReducer(settingsReducer, initialState)

    useEffect(() => {
        getShifts(dispatch)
        // eslint-disable-next-line
    }, [props.data])
    const options = [
        { value: "IST", label: "IST" },
        { value: "EST", label: "EST" },
        { value: "CST", label: "CST" },
        { value: "PST", label: "PST" },
        { value: "GMT", label: "GMT" },
        { value: "MST", label: "MST" },
        { value: "ARAB", label: "ARAB" }]

    useEffect(() => {
        if (state.shifts.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.shifts])
    const handleSelect = (selectedOption) => {
        dispatch(new_time_zone(selectedOption.value))
    }
 // function convertTime24to12(time24h) {
    //     var timex = time24h.split(':');

    //     if (timex[0] !== undefined && timex[1] !== undefined) {
    //         var hor = parseInt(timex[0]) > 12 ? (parseInt(timex[0]) - 12) : timex[0];
    //         var minu = timex[1];
    //         var merid = parseInt(timex[0]) < 12 ? 'AM' : 'PM';

    //         var res = hor + ':' + minu + ' ' + merid;
    //         return res.toString();
    //     }
    // }
    // convertTime24to12("18:00:00")
    return <div className="table-responsive">
        <label className="col-sm-3 col-form-label pt-0">Working Hours<span className="required text-danger">*</span></label>
        <div className="col-sm-9 around row">
            <TimePicker
                className="col-sm-2 form-control form-control-sm"
                placeholder={state.start_time.value === "" ? "start time" : state.start_time.value}
                onChange={(time, timeString) => {
                    dispatch(new_start_time(timeString));
                }} required />
            <TimePicker
                className="col-sm-2 form-control form-control-sm ml-2"
                placeholder={state.end_time.value === "" ? "end time" : state.end_time.value}
                onChange={(time, timeString) => {
                    dispatch(new_end_time(timeString));
                }} required />
            <Select
                className="col-sm-2 form-control form-control-sm w-hours"
                placeholder={state.zone.value === "" ? "time zone" : state.zone.value}
                // value={state.zone.value}
                onChange={handleSelect}
                options={options}
            />
            {state.ts_id.value === "" ? <button type="button" class="btn btn-success ml-2" onClick={() => addTimeShift(state, dispatch)}>Add</button> :
                <button type="button" class="btn btn-warning ml-2" onClick={() => modifyTimeShift(state, dispatch)}>Modify</button>}
        </div>
        <table
            search="true"
            id="example" className="table table-striped table-bordered"
            data-pagination="true"
        >
            <thead style={{ backgroundColor: '#F4FAF7' }}>
                <tr>
                    <th>S.No</th>
                    <th>start time</th>
                    <th>end time</th>
                    <th>time zone</th>
                    <th style={{ width: '10px' }}>Modify</th>
                    {/* <th style={{ width: '10px' }}>Delete</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    state.shifts.length > 0 ? state.shifts.map((shifts, index) => {
                        return (
                            <tr key={index}>
                                <td className="py-1" style={{ textAlign: 'end', width: '10px' }}>{index + 1}</td>
                                <td style={{ textTransform: "capitalize" }}>{shifts.start_time}</td>
                                <td style={{ textTransform: "capitalize" }}>{shifts.end_time}</td>
                                <td style={{ textTransform: "capitalize" }}>{shifts.time_zone}</td>
                                <td style={{ textAlign: 'start' }}><span onClick={() => dispatch(setModifyTime(shifts.ts_id, shifts.start_time, shifts.end_time, shifts.time_zone))}><img src="images/common/edit.svg" style={{ width: '18px', height: '18px' }} alt="" /></span></td>
                                {/* <td style={{ textAlign: 'start' }}><span onClick={() => deleteDesignation(shifts.ts_id, dispatch, getUser.user)}><img src="images/common/delete.svg" style={{ width: '18px', height: '18px' }} alt="" /></span></td> */}
                            </tr>
                        )
                    }) : null}
            </tbody>
        </table>
    </div>
}