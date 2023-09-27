import React, { useEffect, useState } from 'react'
import ReportsAPI from '../../Common/AgileNetwork/ReportsAPI';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import $ from 'jquery';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import { Modal } from 'react-bootstrap';
import Moment from 'moment';
import {SELECT_DATE_RANGE,DATE, EMPLOYEE_NAME, ACTIVE_PROJECTS, LOGIN_TIME, USAGE_REPORTS, TOTAL_PROJECTS, REGISTERED_DATE, USER_STATUS, PROJECTS_INVOLVED } from '../../Common/Headers';
import UserProjectInfo from './userProjectInfo';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";

export default function AgileUsageReports() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [info, setInfo] = useState();

    const [filter, setFilter] = useState([
        {
            startDate: addDays(new Date(), -7),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    const [result, setResult] = useState([])

    const handleOpen = (index, action) => {
        if (action === "add") {
            setOpen({ status: true, index: index, action: action });
        }  else {
            setOpen({ status: true, index: index, action: action });
            // eslint-disable-next-line
            var info = {
                email: result[index].name,
                action: PROJECTS_INVOLVED
            }
            setInfo(info)
        }
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    async function Network(ActiveUsersApi,InActiveUsersApi, state) {
        setResult([])
        try {
            var employee = [];
            const response = await ReportsAPI.post(`/${ActiveUsersApi}`, { filter }, {}, false)
            const response1 = await ReportsAPI.post(`/${InActiveUsersApi}`, { filter }, {}, false)
            response.concat(response1).map((x) => {
                return (x.name !== "admin@novisync.com" ? employee.push(x):null);
            })
            state(employee)
        }
        catch (error) {
            setMessage(error.message)
            console.log('error', error.message)
        }
    }
    useEffect(() => {
        Network('userActiveProjects','nonLoginUsers',setResult)
        // eslint-disable-next-line
    }, [filter])
    const [message, setMessage] = useState("")
    const [view, setView] = useState(false)

    useEffect(() => {
        if (result.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                    "order": [[3, "desc"]]
                })
            })
        }
    }, [result])

    const csvData = [
        [EMPLOYEE_NAME, TOTAL_PROJECTS, ACTIVE_PROJECTS, LOGIN_TIME, REGISTERED_DATE, USER_STATUS],
        ...result.map(({ name, data, status }) => [
            name,
            data[0].total_projects,
            data[0].active_projects !== null ? data[0].active_projects: 0 ,
            data[0].last_login_time !== null ? data[0].last_login_time : 0,
            data[0].created_date !== null && data[0].created_date !== "00-00-0000" ? data[0].created_date : 'Not Applicable',
            status
        ]),
    ];

    return (
        <div className="container-scroller">
            <AdminTopNav />
            <div className="container-fluid page-body-wrapper">
                <AdminSideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">{USAGE_REPORTS}</h4>
                                    <div className="d-flex justify-content-between row">
                                        <div className="d-flex" onClick={handleShow}>
                                            {
                                                <button className="btn btn-success p-2 border" style={{ marginLeft: 10 }} onClick={() => setView(!view)}>{SELECT_DATE_RANGE}</button>
                                            }
                                            {
                                                <div style={{ marginTop: 5 }}>
                                                    {<text style={{ fontSize: 14, fontWeight: 'bold', paddingLeft: 10 }} className=' text-success'> {DATE}: {(Moment(filter[0].startDate).format('ll'))} - {(Moment(filter[0].endDate).format('ll'))} </text>}

                                                </div>
                                            }
                                        </div>
                                        <CSVLink className="downloadbtn btn btn-primary " filename={`AgileUsageReports-${new Date().getFullYear()}.csv`} data={csvData}>Export to CSV</CSVLink>
                                    </div>
                                    {
                                        view &&
                                        (
                                            <div className="col-12 " >
                                                <Modal style={{ textAlign: 'center' }} size="xl" show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <DateRangePicker
                                                            onChange={item => setFilter([item.selection])}
                                                            showSelectionPreview={true}
                                                            moveRangeOnFirstSelection={false}
                                                            months={2}
                                                            ranges={filter}
                                                            direction="horizontal"
                                                        />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <button className="btn btn-success" type="button" onClick={() => handleClose()}>Search</button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </div>
                                        )
                                    }
                                </div>
                                {
                                    message && (<><br /><br /><span style={{ color: 'red', marginLeft: '10%' }}>{message}</span></>)
                                }
                                <div className='p-2'>
                                    <div className='pt-2' />
                                    {result.length !== 0 ?
                                        <div className="table-responsive">
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        <th>{EMPLOYEE_NAME}</th>
                                                        <th>{TOTAL_PROJECTS}</th>
                                                        <th>{ACTIVE_PROJECTS}</th>
                                                        <th>{LOGIN_TIME}</th>
                                                        <th>{REGISTERED_DATE}</th>
                                                        <th>{USER_STATUS}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        result.length !== 0 ? result.map((x, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ height: 40, fontWeight: 'bold', color: 'green' }}  onClick={(event) => handleOpen(index, "projects")}><Link style={{ height: 40, fontWeight: 'bold', color: 'green' }}>{x.name}</Link> </td>
                                                                    <td>{x.data[0].total_projects}</td>
                                                                    {x.data[0].active_projects !== null ? <td>{Math.round(x.data[0].active_projects)} </td> : <td>0</td>}
                                                                    {x.data[0].last_login_time !== null ? <td>{x.data[0].last_login_time}</td> : <td>0</td>}
                                                                    {(x.data[0].created_date !== null && x.data[0].created_date !== "00-00-0000") ? <td>{ x.data[0].created_date }</td> : <td>Not Applicable</td>}
                                                                    {x.status === "active" ? <td className="text-capitalize" style={{ height: 40, fontWeight: 'bold', color: 'blue' }} >{ x.status }</td> : <td className="text-capitalize" style={{ height: 40, fontWeight: 'bold', color:'red' }} >{x.status}</td>}
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                        : null}
                                        {
                                            open.action === "projects" ? <UserProjectInfo open={open.status} data={info} handleClose={handleClose} handleModalClose={handleModalClose}
                                            /> : null
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