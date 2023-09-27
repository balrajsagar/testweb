
import React, { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
import $ from 'jquery';
import { empInfoReducer, initialState } from "./empInfoReducer"
import RootLoader from "../Loader/RootLoader";
import { SUBTASK, THANKS_DESCRIPTION, THANKS_REASON, THANKS_POINTS, AWARD_BY, DATE_OF_AWARD, ADD_AWARDS } from "../Headers";
import { getUserThanksPoints } from "./network";
import AwardThanksPoints from "./awardThanksPoints";

export default function EmpAwards(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empInfoReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [awardInfo, setAwardInfo] = useState()
    useEffect(() => {
        if (props.data !== undefined && props.data !== "") {
            getUserThanksPoints(dispatch, getUser.user, props.data.id);
        }
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.awards.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.awards])
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getUserThanksPoints(props.data.dispatch, getUser.user, props.data.id);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    const handleOpen = (action) => {
        setOpen({ status: true, action: action });
        var info = {id: props.data.id }
        setAwardInfo(info)
    };
    return <div className="table-responsive">
        <button className="ml-0 badge badge-pill badge-success text-center" onClick={()=>handleOpen("userawards")}>{ADD_AWARDS}</button>
        { state.isLoading ? <RootLoader /> : state.awards.length!==0 ?
        <table
            search="true"
            id="example" className="table table-striped table-bordered"
            data-pagination="true"
        >
            <thead style={{ backgroundColor: '#F4FAF7' }}>
                <tr>
                    <th>{SUBTASK}</th>
                    <th>{THANKS_REASON}</th>
                    <th>{THANKS_DESCRIPTION}</th>
                    <th>{THANKS_POINTS}</th>
                    <th>{AWARD_BY}</th>
                    <th>{DATE_OF_AWARD}</th>
                </tr>
            </thead>
                <tbody>
                    {
                        state.awards.length !== 0 ? state.awards.map((awards, index) => {
                            return (
                                <tr key={index}>
                                    {(awards.story_title === "" || awards.story_title === null ) ? <td  style={{textTransform:"capitalize"}}>General Award</td> : <td  style={{textTransform:"capitalize"}}>{awards.story_title}</td>}
                                    <td  style={{textTransform:"capitalize"}}>{awards.kudo_description}</td>
                                    <td  style={{textTransform:"capitalize"}}>{awards.description}</td>
                                    <td  style={{textTransform:"capitalize"}}>{awards.kudos_award}</td>
                                    <td  style={{textTransform:"capitalize"}}>{awards.awardedby}</td>
                                    <td  style={{textTransform:"capitalize"}}>{awards.award_date}</td>
                                    {/* <td style={{width:'8px'}}>
                                        <div className="dropdown show">
                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                <img src="images/common/more.svg" alt="logo" style={{ width: '20px', height: '20px' }} />
                                            </a>

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{backgroundColor:'transparent',border:'0'}}>
                                                <div>
                                                    {getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "blue" }} ><Link to={{ pathname: '/viewModules', state: { id: state.projects[index].idea_id, title: state.projects[index].idea_title } }} style={{ color: 'white' }}>{VIEWMODULES}</Link></button> :
                                                    <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "blue" }} ><Link to={{ pathname: '/addModules', state: { id: state.projects[index].idea_id, title: state.projects[index].idea_title } }} style={{ color: 'white' }}>{VIEWMODULES}</Link></button> }                                              
                                                    <button className="dropdown-item badge badge-pill badge-dark text-center" onClick={(event) => handleCheck(index, "RO")}>{RELEASE_OWNER}</button>
                                                    <button className="dropdown-item badge badge-pill badge-success text-center" onClick={(event) => handleCheck(index, "Verify")}>{VERIFY}</button>
                                                    {getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill text-white text-center" style={{ backgroundColor: 'red' }} onClick={(event) => handleCheck(index, "Delete")}>{DELETE}</button>:null}</div> 
                                           </div>
                                        </div>

                                    </td> */}
                                </tr>
                            )
                        }) : null}
                </tbody>
        </table> : <div><h4 className="card-title mt-2 text-warning">No Kudos Point Summary</h4></div> }
        {
            open.status ? <AwardThanksPoints open={open.status} handleClose={handleClose} data={awardInfo} handleModalClose={handleModalClose}
            /> : null
        }
    </div>
}