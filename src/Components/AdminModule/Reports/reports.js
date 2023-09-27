import React, { useEffect, useState } from 'react'
import ReportsAPI from '../../Common/AgileNetwork/ReportsAPI';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import $ from 'jquery';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import { Modal } from 'react-bootstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";
// import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'
// import {getProps} from '../../Authentication/LandingPage/network'
// import { landingReducer, initialState } from '../../Authentication/LandingPage/landingReducer';

import { SELECT_DATE_RANGE, ASSIGNED_STORY_POINTS, COMPLETED, PENDING, NO_OF_PROJECTS_INVOLVED, DATE, EMPLOYEE_NAME, ALL_EMPLOYEE_REPORTS, TOTAL_HOURS, TOTAL_USER_STORIES, USER_EFFICIENCY } from '../../Common/Headers';
import { useSelector } from 'react-redux';

export default function AdminReports() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [state1, dispatch1] = useReducer(landingReducer, initialState)
    const properties = useSelector(state => state.landingReducer.properties)

    const [filter, setFilter] = useState([
        {
            startDate: addDays(new Date(), -7),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    // const exportPDF = () => {
    //     const doc = new jsPDF()
    //     doc.autoTable({ html: '#adminReports' })
    //     doc.save('table.pdf')
    // }
    const [result, setResult] = useState([])
    const getUser = useSelector(state => state.auth)

    const [, extension] = (getUser.user.userName).split('@')
    async function Network(api, state) {
        setResult([])
        try {
            const response = await ReportsAPI.post(`/${api}`, { filter }, {}, false)
            var employee = [];
            extension === 'agile24x7.com'
                ?
                response.map((x) => {
                    return ((x.email && (x.emp_id !== getUser.user.empId)) ? employee.push(x) : null);
                })
                :
                response.map((x) => {
                    return ((x.email.includes(extension) && (x.emp_id !== getUser.user.empId)) ? employee.push(x) : null);
                })


            state(employee)
            // console.log(response)
        }
        catch (error) {
            setMessage(error.message)
            console.log('error', error.message)
        }
    }
    // useEffect(()=>{
    //     getProps(state1,dispatch1);
    //     // eslint-disable-next-line
    // },[])
    useEffect(() => {
        Network('getAllCount', setResult)
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
        [properties?.EMPLOYEE_NAME || EMPLOYEE_NAME, 
        properties?.NO_OF_PROJECTS_INVOLVED || NO_OF_PROJECTS_INVOLVED, 
        properties?.TOTAL_HOURS || TOTAL_HOURS, 
        properties?.USER_EFFICIENCY || USER_EFFICIENCY, 
        properties?.TOTAL_USER_STORIES || TOTAL_USER_STORIES, 
        properties?.ASSIGNED_STORY_POINTS || ASSIGNED_STORY_POINTS, 
        properties?.PENDING || PENDING, 
        properties?.COMPLETED || COMPLETED],
        ...result.map(({ name, data, status }) => [
            name,
            data[0].projects_involved, data[0].working_hours !== null ? Math.round(data[0].working_hours) : 0, 
            data[0].percentage !== null ? Math.round(data[0].percentage * 100) : 0, 
            data[0].user_story_count !== null ? data[0].user_story_count : 0, 
            data[0].estimated !== null ? data[0].estimated : 0, 
            data[0].pending !== null ?  data[0].pending  : 0, 
            data[0].completed !== null ? data[0].completed : 0
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
                                    <h4 className="card-title">{ALL_EMPLOYEE_REPORTS}</h4>
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
                                        <CSVLink className="downloadbtn btn btn-primary " filename={`AllReports-${new Date().getFullYear()}.csv`} data={csvData}>Export to CSV</CSVLink>
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
                                {/* <div style={{ textAlign: 'end', padding: '20px' }} onClick={() => exportPDF()}>Export</div> */}

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
                                                        <th className="text-capitalize">{properties?.EMPLOYEE_NAME || EMPLOYEE_NAME}</th>
                                                        <th>{properties?.NO_OF_PROJECTS_INVOLVED || NO_OF_PROJECTS_INVOLVED}</th>
                                                        <th>{properties?.TOTAL_HOURS || TOTAL_HOURS}</th>
                                                        <th>{properties?.USER_EFFICIENCY || USER_EFFICIENCY}</th>
                                                        <th>{properties?.TOTAL_USER_STORIES || TOTAL_USER_STORIES}</th>
                                                        <th>{properties?.ASSIGNED_STORY_POINTS || ASSIGNED_STORY_POINTS}</th>
                                                        <th>{properties?.PENDING || PENDING}</th>
                                                        <th>{properties?.COMPLETED || COMPLETED}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        result.length !== 0 ? result.map((x, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ height: 40, fontWeight: 'bold', color: 'green' }}><Link style={{ color: 'green' }} to={{ pathname: '/admin/indReports', state: { emp_id: x.emp_id, name: x.name, filter: filter, projects_involved: x.data[0].projects_involved } }} >{x.name} </Link></td>
                                                                    <td>{x.data[0].projects_involved}</td>
                                                                    {x.data[0].working_hours !== null ? <td>{Math.round(x.data[0].working_hours)} </td> : <td>0</td>}
                                                                    {x.data[0].percentage !== null ? <td>{Math.round(x.data[0].percentage)}</td> : <td>0</td>}
                                                                    {x.data[0].user_story_count !== null ? <td>{x.data[0].user_story_count}</td> : <td>0</td>}
                                                                    {x.data[0].estimated !== null ? <td>{x.data[0].estimated}</td> : <td>0</td>}
                                                                    {x.data[0].pending !== null ? <td> {x.data[0].pending} </td> : <td>0</td>}
                                                                    {x.data[0].completed !== null ? <td>{x.data[0].completed} </td> : <td>0</td>}
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
            </div>
        </div>
    )
}