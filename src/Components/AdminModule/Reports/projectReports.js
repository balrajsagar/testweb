import React, { useEffect, useState } from 'react'
import ReportsAPI from '../../Common/AgileNetwork/ReportsAPI';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import $ from 'jquery';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import { Modal } from 'react-bootstrap';
import Moment from 'moment';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { SELECT_DATE_RANGE, PROJECT_NAME, TOTAL_USERS, ACTIVE_USERS, DATE, INACTIVE_USERS, WORKING_USERS, PROJECT_REPORTS, TOTAL_HOURS_SPENT, TOTAL_USER_STORIES, MODULES } from '../../Common/Headers';
import UserProjectInfo from './userProjectInfo';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";

export default function ProjectReports() {

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
    const getUser = useSelector(state => state.auth)

    const [, extension] = (getUser.user.userName).split('@')

    async function Network(api, state) {
        setResult([])
        try {
            const response = await ReportsAPI.post(`/${api}`, { filter }, {}, false)
            var projects = [];
            extension === 'agile24x7.com'
                ?
                response.map((x) => {
                    return (x.email ? projects.push(x) : null)
                })
                :
                response.map((x) => {
                    return (x.email.includes(extension) ? projects.push(x) : null)
                })
            state(projects)
        }
        catch (error) {
            setMessage(error.message)
            console.log('error', error.message)
        }
    }
    useEffect(() => {
        Network('projectReport', setResult)
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
                    "order": [[1, "desc"]]
                })
            })
        }
    }, [result])

    const handleOpen = (index, action) => {
        setOpen({ status: true, index: index, action: action });
        var info = {};
        if (action === "activeUsers") {
             info = {
                project_id: result[index].project_id,
                project_name: result[index].project_name,
                action: 'getProjectActiveStoryUsers',
                filter,
            }
        } else if (action === "hours") {
             info = {
                project_id: result[index].project_id,
                project_name: result[index].project_name,
                action: 'getProjectWorkingHours',
                filter
            }
        } else if (action === 'getIndividualUserstory') {
             info = {
                project_id: result[index].project_id,
                project_name: result[index].project_name,
                action: 'getIndividualUserstory',
                filter
            }
        } else {
            info = {
               project_id: result[index].project_id,
               project_name: result[index].project_name,
               action: 'userReports'
           }
       }
        setInfo(info);
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }
    const csvData = [
        [PROJECT_NAME, TOTAL_HOURS_SPENT, ACTIVE_USERS, INACTIVE_USERS, TOTAL_USERS],
        ...result.map(({ project_name, hours, Working_users_per_projects, user_stories_per_project, Total_users_per_project }) => [
            project_name, Math.round(hours), Working_users_per_projects, user_stories_per_project, Total_users_per_project
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
                                    <h4 className="card-title">{PROJECT_REPORTS}</h4>
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
                                        <CSVLink className="downloadbtn btn btn-primary " filename={`ProjectReports-${new Date().getFullYear()}.csv`} data={csvData}>Export to CSV</CSVLink>
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
                                                        <th>{PROJECT_NAME}</th>
                                                        <th>{TOTAL_HOURS_SPENT}</th>
                                                        <th>{ACTIVE_USERS}</th>
                                                        {/* <th>{ACTIVE_USERS}</th> */}
                                                        <th>No of Active {MODULES}</th>
                                                        <th>{TOTAL_USERS}</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        result.length !== 0 ? result.map((x, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{ height: 40, fontWeight: 'bold', color: 'green' }}>{x.project_name}</td>
                                                                    <td onClick={(event) => handleOpen(index, "hours")}><Link style={{ height: 40, fontWeight: 'bold', color: 'blue' }}>{Math.round(x.hours)}</Link></td>
                                                                    <td onClick={(event) => handleOpen(index, "activeUsers")}><Link style={{ height: 40, fontWeight: 'bold', color: 'blue' }}>{x.Working_users_per_projects}</Link></td>
                                                                    {/* <td>{x.active_users_per_project}</td> */}
                                                                    <td onClick={(event) => handleOpen(index, "getIndividualUserstory")}><Link style={{ height: 40, fontWeight: 'bold', color: 'blue' }}>{x.user_stories_per_project}</Link></td>
                                                                    <td onClick={(event) => handleOpen(index, "projects")}><Link style={{ height: 40, fontWeight: 'bold', color: 'blue' }}>{x.Total_users_per_project}</Link></td>
                                                                </tr>
                                                            )
                                                        }) : null}
                                                </tbody>
                                            </table>
                                        </div>
                                        : null}
                                    {
                                        (open.action === "projects" || open.action === "hours" || open.action === "activeUsers" || open.action === "getIndividualUserstory") ? <UserProjectInfo open={open.status} data={info} handleClose={handleClose} handleModalClose={handleModalClose}
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