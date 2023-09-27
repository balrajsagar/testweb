import React, { useReducer, useState } from 'react';
import Header from '../../Common/TopNav';
import AdminSideBar from '../Utility/SideNav';
import { settingsReducer, initialState } from './settingsReducer';
import RootLoader from '../../Common/Loader/RootLoader';
// import Team from './team';
// import Designation from './designation';
// import { TEAM } from '../../Common/Headers';
import { getRoleCount } from '../../Common/LocalStorage';
import WorkingHours from './workingHours';

export default function AdminSettings() {
    const [check, setCheck] = useState("team")
    const [state,dispatch] = useReducer(settingsReducer, initialState)
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
            {/* eslint-disable-next-line */}
            {getRoleCount('roleCount')>=1 ? <AdminSideBar />:<h1 className="col-1"></h1>}
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                <h4 className="card-title">Settings</h4>
                                    <div className="row">
                                    <ul className="nav nav-tabs card-header-tabs card-title ml-1">
                                            <li className="">
                                                <button className={check === "team" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("team")}><u>Working Hours</u></button>
                                            </li>
                                            {/* <li className="">
                                                <button className={check === "designation" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("designation")}><u>{DESIGNATION}</u></button>
                                            </li> */}
                                        </ul>
                                    </div>
                                    {
                                        state.isLoading ? <RootLoader /> :
                                        {
                                            'team': <WorkingHours dispatch={dispatch} />,
                                            // 'designation': <Designation dispatch={dispatch} />,
                                        }[check]                                  
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}