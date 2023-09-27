import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Utility/SideNav';
import TopNav from '../Utility/TopNav';
import { getProfile, updateAccountType, getUserThanksPoints } from './network';
import { reducer, initialState } from './reducer'
import RootLoader from '../../Common/Loader/RootLoader';
import { Modal } from 'react-bootstrap';
import { SUBTASK, THANKS_REASON, DATE_OF_AWARD, AWARD_BY, THANKS_DESCRIPTION, THANKS_POINTS_SUMMARY, LIMITED_ACCESS_CONTRIBUTOR, THANKS_POINTS, CONTRIBUTOR, SQUAD_MEMBER_ID, USERNAME, FULLNAME, EMAIL, MOBILE, WORKING_HOURS, ROLE, PROFILE, ACCOUNT_STATUS, VERIFIED_ACCOUNT, VERIFY } from '../../Common/Headers';
import API from '../../Common/Network/API';
import Alert from '../../Common/Alert';
import $ from 'jquery';
import { Client_URL } from '../../Common/config';
// import jwt_decode from "jwt-decode";
// import { isLoaded, isLoading } from '../../Common/Actions/loading';
// import { setCurrentUser } from '../../Common/Actions';
// import { setStatus, setToken, setRoleCount } from '../../Common/LocalStorage';
// import store from '../../Common/Store';
// import { Redirect } from 'react-router';

export default function UserProfile() {
    const [state, dispatch1] = useReducer(reducer, initialState);
    const getUser = useSelector(state => state.auth)

    // const [shifts, updateShifts] = useState([]);
    const [show, setShow] = useState(false);
    const [license_key, setLicense] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        getProfile(dispatch1, getUser.user);
        getUserThanksPoints(dispatch1, getUser.user);

        // getShifts()
        // eslint-disable-next-line
    }, [])

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
        setShow(false)
        getProfile(dispatch1, getUser.user)
    };
    const handleShow = () => setShow(true);//for upgrade
    const handleModalClose = () => setShow(false);
    // const getShifts = async () => {
    //     try {
    //         const response = await API.post("get_user_shifts.php", { action: "get_shifts" }, {}, false);
    //         var shift_times = [];
    //         if (response.status === 'True') {
    //             response.data.map((shift) => {
    //                 return shift_times.push({ value: shift.ts_id, label: shift.start_time + " - " + shift.end_time + " " + shift.time_zone })
    //             })
    //             updateShifts(shift_times)
    //         }
    //     } catch (error) {
    //     }
    // }
    const accountVerify = async () => {
        try {
            const response = await API.post("get_user.php",
                {
                    action: "account_verify",
                    url: Client_URL,
                    username: getUser.user.userName
                }, {}, false);
            if (response.status === 'True') {
                Alert('success', response.message);
            }
        } catch (error) {
            Alert('error', error.message);
        }
    }
    //project is archived start.
    // const handleArchiveOpen = () => setOpen(true);

    // const handleArchiveClose = () => setOpen(false);

    // const archiveProject = async () => {
    //     const project_id = getUser.user.projectId;
    //     try {
    //         var response = await API.post("squads.php", {
    //             action: "archive_project",
    //             project_id: project_id,
    //             is_active: 0,
    //         }, {}, false);
    //         if (response.status === 'True') {
    //             switchProject();
    //         } else {
    //             //switchProject();
    //         }
    //     } catch (error) {
    //         // Alert('error',error.message)
    //         setOpen(false);
    //     }
    // }

    //Switch to another project after project is archived.
    // const switchProject = async () => {
    //     store.dispatch(isLoading());
    //     try {
    //         const response = await API.post("sso_authentication.php", {
    //             username: getUser.user.userName,
    //             name: getUser.user.fullName,
    //             action: 'sso_sign_in'
    //         }, {
    //         });
    //         if (response.status === "TRUE") {
    //             setToken('auth', response.jwt) //store the token information  with exp
    //             const tokenDetails = jwt_decode(response.jwt);
    //             setRoleCount('roleCount', tokenDetails.data.roleCount)
    //             dispatch(setCurrentUser(tokenDetails.data)); //store the user information
    //             setStatus('status', tokenDetails.data.empStatus)
    //             setRedirect(true)
    //             store.dispatch(isLoaded());
    //         } else if (response.status === "False") {
    //             setRoleCount('roleCount', response.roleCount)
    //             setToken('empId', response.empId) //store the token information  with exp
    //             setToken('user', response.username) //store the token information  with exp
    //             setRedirect(true)
    //             store.dispatch(isLoaded());
    //         }
    //         else {
    //             store.dispatch(isLoaded());
    //             Alert('warning', response.message)
    //         }
    //     }
    //     catch (error) {
    //         Alert('error', error.message)
    //         store.dispatch(isLoaded());
    //     }
    // }

    // if (redirect) {
    //     return <Redirect to="/" />
    // }
    //project is archived end.

    return (
        <div className="container-scroller">

            <TopNav />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <h4 className="card-title mb-2">{PROFILE}</h4>
                                        {/* <div className=" col-md-12 d-flex justify-content-end" style={{ marginTop: '-40px' }}>
                                            {state.isLoading ? <RootLoader /> :
                                                <button type="submit" className="btn btn
                                            
                                            -success border mr-2"
                                                    onClick={(event) => { updateData(state, dispatch, getUser.user) }} style={{ borderRadius: '30px' }}>SAVE</button>}
                                        </div> */}
                                    </div>
                                    <hr></hr>
                                    {state.isLoading ? <RootLoader /> : <form className="forms-sample">
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">{SQUAD_MEMBER_ID}</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.empId.value}</label>
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">{USERNAME}</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.username.value}</label>
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">{FULLNAME}</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.fullName.value}</label>
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">{EMAIL}</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.email.value}</label>
                                            </div>
                                        </div>
                                        {/* <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">Designation</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.designation.value}</label>
                                            </div>
                                        </div> */}
                                        {/* <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">Team</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.team.value}</label>
                                            </div>
                                        </div> */}
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">{MOBILE}</label>
                                            <div className="col-sm-9">
                                                {/* <input type="text"
                                         className={ state.mobile.errorStatus ? "col-sm-3 col-form-label errorstyle" : "col-sm-3 col-form-label" }
                                         style={{borderRadius:'30px',borderBlockColor:'grey',borderWidth:'0.2px'}}
                                         placeholder="Enter Mobile number"
                                         value={state.mobile.value}
                                         onChange={(event) => dispatch(actions.updateMobileNumber(event.target.value))}
                                         required
                                         data-toggle="tooltip" data-placement="right" title="Enter a Valid Mobile Number For Communication"/>
                                        <small style={{ color: "red", fontSize: '12px' }}>{state.mobile.errorStatus ? state.mobile.errorMessage : ""}</small> */}
                                                <label className="col-sm-6 col-form-label">{state.mobile.value}</label>
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">{ROLE}</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.role.value === LIMITED_ACCESS_CONTRIBUTOR ? CONTRIBUTOR.concat('(LA)') : state.role.value}</label>
                                            </div>
                                        </div>

                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label" >{WORKING_HOURS}</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.shift_hours.value}</label>
                                            </div>
                                            {/* <Select
                                                className="col-sm-3 col-form-label"
                                                style={{ width: 10, boarderRadius: 2 }}
                                                maxMenuHeight={150}
                                                placeholder={state.shift_hours.value}
                                                onChange={(selectedOption) =>
                                                    selectSprint(selectedOption)
                                                }
                                                options={shifts}
                                            /> */}
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">{ACCOUNT_STATUS}</label>
                                            <div className="col-sm-9">
                                                {state.email_status.value === '1' ? <label className="col-sm-6 col-form-label text-success">{VERIFIED_ACCOUNT}</label> : <button className="btn-success" title="Verify your email for account verification" onClick={() => accountVerify()}>{VERIFY}</button>}
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">Account Type</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{(state.license_validity.value === 'NA' || state.license_validity.value === 'FREE') ? 'FREE' : 'PAID'}</label>
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">Remaining Projects</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.remaining_projects.value}</label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <button className='btn-success' onClick={handleShow}> UPGRADE</button>
                                        </div>

                                        {/* <div className="form-group row" >
                                            <label className="col-sm-3 col-form-label">Functional Manager</label>
                                            <div className="col-sm-9">
                                                <label className="col-sm-6 col-form-label">{state.functionalManager.value}</label>
                                            </div>
                                        </div> */}
                                        {/* <div className="form-group row" >
                                            <label  className="col-sm-3 col-form-label">Status</label>
                                            <div className="col-sm-9">
                                                <label  className="col-sm-6 col-form-label">{state.status.value}</label>
                                            </div>
                                        </div> */}

                                    </form>}
                                    {/* Project Archive Individually
                                    {(getUser.user.role === SCRUM_MASTER || getUser.user.role === PRODUCT_OWNER) && (
                                        <>
                                        <label className="col-sm-3 col-form-label" style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0rem -1.5rem' }}>{ARCHIVE_PROJECT} :</label><div style={{ display: 'flex', fontWeight: 'bold', flexDirection: 'column', margin: '1rem -1rem', border: '1px solid lightgray', padding: '1rem 0rem' }}>
                                            <div>
                                                <label className="col-sm-6 col-form-label">{AGILE_PROJECT_NAME} : {getUser.user.corp}</label>
                                                <button title="Once the project is archived you will no longer have access. Only admin can reopen the Archived Projects." data-toggle="modal" data-target="#exampleModal" className='btn-success' onClick={() => handleArchiveOpen()}>{ARCHIVE_PROJECT}</button>
                                            </div>
                                            <p style={{ padding: '0.6rem', color: 'red' }}>Note : Once the project is archived you will no longer have access. Only admin can reopen the Archived Projects.</p>
                                        </div>
                                        </>)} */}
                                    {state.awards.length !== 0 ?
                                        <div className="table-responsive">
                                            <h4 className="card-title mb-2 text-success">{THANKS_POINTS_SUMMARY}</h4>
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
                                                        state.awards !== [] ? state.awards.map((awards, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    {(awards.story_title === "" || awards.story_title === null) ? <td style={{ textTransform: "capitalize" }}>General Award</td> : <td style={{ textTransform: "capitalize" }}>{awards.story_title}</td>}
                                                                    <td style={{ textTransform: "capitalize" }}>{awards.kudo_description}</td>
                                                                    <td style={{ textTransform: "capitalize" }}>{awards.description}</td>
                                                                    <td style={{ textTransform: "capitalize" }}>{awards.kudos_award}</td>
                                                                    <td style={{ textTransform: "capitalize" }}>{awards.awardedby}</td>
                                                                    <td style={{ textTransform: "capitalize" }}>{awards.award_date}</td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div> : <div><h4 className="card-title mb-2 text-warning">No Kudos Point Summary</h4></div>}
                                </div>
                            </div>

                            <div className="col-12 " >
                                <Modal style={{ textAlign: 'center' }} size="lg" show={show} onHide={handleModalClose}>
                                    <Modal.Header style={{ backgroundColor: '#D2ECDF', margin: 0 }} >
                                        <Modal.Title> <h6 class="modal-title" style={{ paddingTop: 8, paddingLeft: 5 }}>Upgrade Account</h6></Modal.Title>
                                        <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={handleClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                    </Modal.Header>
                                    <Modal.Body style={{ height: 120, width: 400 }}>
                                        <input type='text' placeholder='license key' className='form-control mt-3' value={license_key} onChange={(e) => { setLicense(e.target.value) }} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className="btn-outline-success text-left" style={{ borderRadius: '20px' }} onClick={() => { updateAccountType(state, dispatch, getUser.user, license_key, handleClose) }}>
                                            upgrade
                                        </button>
                                        {/* {state.free_licenses.value ==='0'? <p >Your account has free license,<b style={{color:'blue',cursor:'pointer'}} onClick={()=>{generateLicense(state, dispatch, getUser.user,handleClose,handleModalClose)}}>Click here</b> to generate license key</p>:<p>Buy license key to upgrade your account</p>} */}
                                    </Modal.Footer>
                                </Modal>
                            </div>

                            {/* Project Archive Individually
                              <div className="col-12 " >
                                <Modal style={{ textAlign: 'center' }} size="lg" show={open} onHide={() => handleArchiveClose()}>
                                    <Modal.Header style={{ backgroundColor: '#D2ECDF', margin: 0 }} >
                                        <Modal.Title> <h6 class="modal-title" style={{ paddingTop: 8, paddingLeft: 2, fontWeight: '600' }}>Are you sure you want to {ARCHIVE_PROJECT} ?</h6></Modal.Title>
                                        <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleArchiveClose()} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                    </Modal.Header>
                                    <Modal.Body style={{ height: 90, width: 320 }}>
                                        <label className='mt-3' style={{ display: 'flex', justifyContent: 'flex-start' }}>{AGILE_PROJECT_NAME}: {getUser.user.corp} </label>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className="btn-outline-success text-right" style={{ borderRadius: '20px' }} onClick={() => archiveProject()}>
                                            {ARCHIVE_PROJECT}
                                        </button>
                                        <button className="btn-outline-fail text-left" style={{ borderRadius: '20px' }} onClick={() => handleArchiveClose()}>
                                            Close
                                        </button>
                                    </Modal.Footer>
                                </Modal>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}