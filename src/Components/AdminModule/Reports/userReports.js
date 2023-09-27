import React, {  useState } from 'react'
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import IndividualReports from './individualReports';
import AllReports from './allReports';

export default function AdminReports() {
    const [show, setShow] = useState(true);
    return (
        <div className="container-scroller">
            <AdminTopNav />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                            <div className="row ml-2 p-2">
                                        <ul className="nav nav-tabs card-header-tabs card-title ">
                                            <li className="">
                                                <button className={show ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setShow(!show)}><u>All Employee Reports</u></button>
                                            </li>
                                            <li className="">
                                                <button className={!show ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setShow(!show)}><u>Individual Employee Reports</u></button>
                                            </li>
                                        </ul>
                                    </div>
                                   { show ? <AllReports /> : <IndividualReports /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}