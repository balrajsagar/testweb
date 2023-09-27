import React, { useReducer, useEffect, useState } from 'react';
import { initialState, reducer } from './reducer';
import { getDetails } from './network';
import SideBar from '../Utility/SideNav';
import Header from '../../Common/TopNav';
import { ACTION_ICON } from '../../Common/Headers';
import EditFaq from './editFaq';
import DeleteFaq from './deleteFaq';
import { Link } from 'react-router-dom';

// display all faqs
export default function Details() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [cardInfo, setCardInfo] = useState()
    const [open, setOpen] = useState({ status: false, index: 0 })
    useEffect(() => {
        getDetails(dispatch);
    }, [])
    var appDetails = state.appDetails.allApp;

    const handleOpen = (action, data) => {
        var info;
        setOpen({ status: true, action: action });
        if (action === "modify") {
            // var status = "backlog_addUser"
            info = { data: data }
        } else if (action === "delete") {
            // var status = "backlog_addUser"
            info = { data: data, action: action }
        }
        setCardInfo(info)
    }
    const handleClose = () => {
        setOpen({ status: false, index: 0 })
        getDetails(dispatch);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
        getDetails(dispatch);
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <h2 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent' }}>FAQ's</h2>
                                    </div>

                                    <div className="container" style={{ marginTop: '5%' }}>
                                        <button  type="button" data-dismiss="modal" class="btn btn-warning" style={{ borderRadius: '20px', marginLeft: '80%', width: "10%" }}
                                        ><Link to={{ pathname: "/admin/faqs" }} style={{ color: 'white', textDecoration: 'none' }}>Back</Link></button><br /><br />
                                    </div>
                                    <br /><br />
                                    {appDetails ?
                                        <div className="table-responsive">
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        <th style={{ textTransform: "capitalize", width: '160px' }} >Questions</th>
                                                        <th style={{ width: '20px', alignItems: "center" }}>Answers</th>
                                                        <th style={{ width: '5px', alignItems: "center" }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        appDetails.length !== 0 ? appDetails.map((faq, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ textTransform: "capitalize", paddingLeft: "2%" }}>{faq.question}</td>
                                                                    <td style={{ textTransform: "capitalize", paddingLeft: "2%" }}>{faq.answer}</td>
                                                                    <td style={{ textTransform: "capitalize", paddingLeft: "2%" }}>
                                                                        <div className="dropdown show" style={{ cursor: 'pointer', padding: '5px', marginTop: 5 }}>
                                                                            {/* eslint-disable-next-line */}
                                                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                                <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '15px', height: '15px', borderRadius: '0' }} />
                                                                            </a>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                                <div>
                                                                                    <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }}
                                                                                        onClick={(event) => handleOpen("modify", faq)}
                                                                                    >Edit</button>
                                                                                    <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "rgb(99, 4, 54)", color: 'white' }}
                                                                                        onClick={(event) => handleOpen("delete", faq)}
                                                                                    >Delete</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    open.action === "modify" ?
                        <EditFaq open={open.status}
                            handleClose={handleClose}
                            data={cardInfo}
                            handleModalClose={handleModalClose}
                        /> : null}
                {
                    open.action === "delete" || open.action === "exit" ?
                        <DeleteFaq open={open.status}
                            handleClose={handleClose}
                            data={cardInfo}
                            handleModalClose={handleModalClose}
                        /> : null}
            </div>
        </div>
    );
}
