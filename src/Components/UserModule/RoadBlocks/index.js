import React, { useReducer, useState } from 'react';
import Header from '../../Common/TopNav';
import ToBeAssignedRoadBlock from './toBeAssigned';
import AssignedRoadBlock from './assigned';
import RootLoader from '../../Common/Loader/RootLoader';
import { roadBlockReducer ,initialState} from './roadBlockReducer';
import SideBar from '../Utility/SideNav';
import { ROADBLOCKS, ASSIGNED, TO_BE_ASSIGN} from '../../Common/Headers';

export default function EmployeesRoadBlocks() {
    const [check, setCheck] = useState("ToBeCritical")
    const [state,dispatch] = useReducer(roadBlockReducer, initialState)
   
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
            <SideBar />
                <div className="main-panel">
                    <div className="m-1">
                    <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card" style={{border:'0px'}}>
                                <div className="card-body">
                                <h4 className="card-title">{ROADBLOCKS} </h4>
                                    <div className="row">
                                        <ul className="nav nav-tabs card-header-tabs card-title ml-1">
                                        
                                            <li className="">
                                                <button className={check === "ToBeCritical" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("ToBeCritical")}><u>{ASSIGNED}</u></button>
                                            </li>
                                            <li className="">
                                                <button className={check === "Critical" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Critical")}><u>{TO_BE_ASSIGN}</u></button>
                                            </li>
                                        </ul>
                                    </div>
                                    {
                                        state.isLoading ? <RootLoader /> :
                                        {
                                            'ToBeCritical': <AssignedRoadBlock />,

                                            'Critical': <ToBeAssignedRoadBlock dispatch={dispatch} />,
                                        }[check]                                 
                                    }
                                    {/* <AssignedRoadBlock/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}