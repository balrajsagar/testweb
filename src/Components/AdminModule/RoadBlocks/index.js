import React, { useReducer, useState } from 'react';
import Header from '../../Common/TopNav';
import AssignedRoadBlock from './assigned';
import ToBeAssignedRoadBlock from './toBeAssigned';
import RootLoader from '../../Common/Loader/RootLoader';
import { roadBlockReducer ,initialState} from './roadBlockReducer';
import { ROADBLOCKS, TO_BE_ASSIGN, ASSIGNED } from '../../Common/Headers';
import AdminSideBar from '../Utility/SideNav';

export default function AdminRoadBlocks() {
    const [check, setCheck] = useState("Critical")
    const [state,dispatch] = useReducer(roadBlockReducer, initialState)
    // var data = {
    //     dispatch:dispatch //For tabs 
    // }
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
            <AdminSideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                <h4 className="card-title">{ROADBLOCKS}</h4>
                                    <div className="row">
                                    <ul className="nav nav-tabs card-header-tabs card-title ml-1">
                                            <li className="">
                                                <button className={check === "Critical" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Critical")}><u>{TO_BE_ASSIGN}</u></button>
                                            </li>
                                            <li className="">
                                                <button className={check === "ToBeCritical" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("ToBeCritical")}><u>{ASSIGNED}</u></button>
                                            </li>
                                        </ul>
                                    </div>
                                    {
                                        state.isLoading ? <RootLoader /> :
                                        {
                                            'Critical': <ToBeAssignedRoadBlock dispatch={dispatch} />,
                                            'ToBeCritical': <AssignedRoadBlock dispatch={dispatch} />,
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