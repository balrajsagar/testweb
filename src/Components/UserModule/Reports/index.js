import React, { useEffect, useState, useReducer } from 'react'
import ReportsAPI from '../../Common/AgileNetwork/ReportsAPI';
import { useSelector } from 'react-redux';
import Header from '../../Common/TopNav';
import SideNavigation from '../../Common/SideNav';
import { getEmployees } from '../Team/network';
import { empReducer, initialState } from '../Team/empReducer';
import ReportsBar from './ReportsBar';
import ReportsLine from './ReportsLine';
import { Modal } from 'react-bootstrap';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import Moment from 'moment';
import { LIMITED_ACCESS_CONTRIBUTOR, INDIVIDUAL_WORKLOAD, EPIC_VELOCITY, INDIVIDUAL_VELOCITY, BURN_UP_REPORT, BURN_DOWN_REPORT, SPRINT_VELOCITY, PROJECT, MODULE, SELECT_SQUAD_MEMBER, TASK_VELOCITY } from '../../Common/Headers';
import moment from 'moment';

export default function Reports() {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empReducer, initialState)
    const [sprintVelocity, setSprintVelocity] = useState([])
    const [kanbanVelocity, setKanbanVelocity] = useState([])
    // const [individual, setIndividual] = useState([])
    const [sprint, setSprint] = useState([])
    const [epic, setEpic] = useState([])
    // const [selectedSprint, setSelectedSprint] = useState([])
    const [indVelocity, setIndVelocity] = useState([])
    const [burnUpChart, setBurnUpChart] = useState([])//burn up chart version 1.0.11
    const [epicChart, setEpicChart] = useState([])//burn up chart version 2.0.1
    const [indWorkload, setIndWorkload] = useState([])

    const [show, setShow] = useState(false);//open the date range modal initial false
    const handleClose = () => setShow(false);//handling close the date range modal
    const handleShow = () => setShow(true);// open the date range modal
    const [view, setView] = useState(false); //view the modal state initial false
    const [filter, setFilter] = useState([ //Date filter for start and end date based on selection date range
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 11),
            key: 'selection'
        }
    ])
    const [date_range, set_date_range] = useState(false) //Start and End Date (b/w show the sprints)
    const handleSubmitWithDateRange = () => { //After Selection of Date Filter 
        setView(false)
        Network('sprintVelocity', { filter, project_id: getUser.user.projectId }, setSprintVelocity)
        Network('taskCompletionVelocity', { filter, project_id: getUser.user.projectId }, setKanbanVelocity)
        set_date_range(true)
    }

    async function Network(api, data, state) {
        try {
            const response = await ReportsAPI.post(`/${api}`, data, {}, false)
            state(response)
            // console.log(response)
        }
        catch (error) {
            console.log('error', error.message)
        }
    }
    useEffect(() => {
        getEmployees(dispatch, getUser.user); //Get Squad List
        // Network('sprintVelocity', { project_id: getUser.user.projectId }, setSprintVelocity)// without date filter
        Network('sprints', { project_id: getUser.user.projectId }, setSprint)
        Network('getEpics', { project_id: getUser.user.projectId }, setEpic)
        getUser.user.role === LIMITED_ACCESS_CONTRIBUTOR && Network(`individualWorkload`, { assigned_to: getUser.user.empId, project_id: getUser.user.projectId, filter }, setIndWorkload)

        // eslint-disable-next-line
    }, [])

    //Get SquadList
    var squadsList = []
    state.employees.map((squads) => {
        return (
            squadsList.push({
                'value': squads.id, 'label': squads.name
            })
        );
    })
    //Get Sprints List
    var sprintsList = []
    sprint.map((x) => {
        if (x.status !== 'deleted') {
            return (
                sprintsList.push({
                    'value': x.sprint_id, 'label': x.sprint
                })
            );
        } else {
            return [];
        }
    })
    //Get Epics List
    var episList = []
    epic.map((x) => {
        return (
            episList.push({
                'value': x.epic_id, 'label': x.epic_name
            })
        );
    })
    const sprintData = {
        labels: sprintVelocity.map(x => x.sprint),
        datasets: [
            {
                label: "Committed",
                // maxBarThickness: 20,
                fill: false,
                borderColor: "rgba(108, 122, 137, 1)",
                data: sprintVelocity.map(x => x.estimated)
            },

            {
                label: "Completed",
                fill: false,
                // maxBarThickness: 20,
                borderColor: "rgba(30, 130, 76, 1)",
                data: sprintVelocity.map(x => x.completed)
            }
        ]

    };
    //Task/User stories Velocity
    const kanbanData = {
        labels: kanbanVelocity.map(x => moment(x.date).format('MM-DD-YYYY')),
        datasets: [
            {
                label: "Committed",
                fill: false,
                borderColor: "rgba(108, 122, 137, 1)",
                data: kanbanVelocity.map(x => x.estimated)
            },

            {
                label: "Completed",
                fill: false,
                borderColor: "rgba(30, 130, 76, 1)",
                data: kanbanVelocity.map(x => x.completed)
            }
        ]
    };
    //Individual Velocity Selection start by Naveen in version 1.0.9 start
    const individualVelocity = {
        labels: indVelocity.map(x => x.fullname),
        datasets: [
            {
                label: "Committed",
                maxBarThickness: 20,
                backgroundColor: "rgba(108, 122, 137, 1)",
                data: indVelocity.map(x => x.estimated)
            },

            {
                label: "Completed",
                maxBarThickness: 20,
                backgroundColor: "rgba(30, 130, 76, 1)",
                data: indVelocity.map(x => x.completed)
            }
        ]

    };
    //Individual Workload Selection start by Naveen in version 1.0.9 start
    const individualWorkload = {
        labels: indWorkload.map(x => x.sprintName),
        datasets: [
            {
                label: "Committed",
                maxBarThickness: 20,
                backgroundColor: "rgba(108, 122, 137, 1)",
                data: indWorkload.map(x => x.estimated)
            },

            {
                label: "Completed",
                maxBarThickness: 20,
                backgroundColor: "rgba(30, 130, 76, 1)",
                data: indWorkload.map(x => x.completed)
            }
        ]

    };
    //BurnUP Chart Workload Selection start by Naveen in version 1.0.11 start
    // eslint-disable-next-line 
    const sprintBurnUpChart = {
        labels: burnUpChart.map(x => x.load_date),
        datasets: [
            {
                label: "Estimated",
                data: burnUpChart.map(x => x.estimated),
                fill: false,
                borderColor: "rgba(108, 122, 137, 1)"
            },
            {
                label: "Completed",
                data: burnUpChart.map(x => x.completed),
                fill: false,
                borderColor: "rgba(30, 130, 76, 1)",
            }
        ]
    };
    //BurnUP Chart Workload Selection start by Naveen in version 1.0.11 end
    //BurnDown Chart Workload Selection start by Naveen in version 2.0.5 start
    var burnDownChart = [];
    var xValues = burnUpChart.map(function (o) { return o.estimated; });
    xValues = Array.from(burnUpChart, o => o.estimated);
    var xMax = Math.max.apply(null, xValues);
    xMax = Math.max(...xValues);
    //    burnUpChart.sort( function ( a, b ) { return b.pending - a.pending; } );
    burnUpChart.map((x, i) => {
        return (
            burnDownChart.push({
                project_id: x.project_id,
                completed: x.completed,
                estimated: x.estimated,
                load_date: x.load_date,
                pending: x.pending,
                sprint_id: x.sprint_id,
                ideal_points: ((xMax / (burnUpChart.length - 1)) * ((burnUpChart.length - 1) - i))
            })
        );
    })
    const sprintBurnDownChart = {
        labels: burnUpChart.map(x => x.load_date),
        datasets: [
            {
                label: "Estimated",
                data: burnDownChart.map(x => x.ideal_points),
                fill: false,
                borderColor: "rgba(108, 122, 137, 1)"
            },
            {
                label: "Pending",
                data: burnUpChart.map(x => x.pending),
                fill: false,
                borderColor: "rgba(240, 52, 52, 1)",
            },
        ]
    };
    //BurnDown Chart Workload Selection start by Naveen in version 2.0.5 end
    //BurnUP Chart Workload Selection start by Naveen in version 1.0.11 start
    const epicBurnUpChart = {
        labels: epicChart.map(x => x.sprint),
        datasets: [
            {
                label: "Estimated",
                data: epicChart.map(x => x.estimated),
                fill: false,
                borderColor: "rgba(108, 122, 137, 1)"
            },
            {
                label: "Completed",
                data: epicChart.map(x => x.completed),
                fill: false,
                borderColor: "rgba(30, 130, 76, 1)",
            }
        ]
    };
    //BurnUP Chart Workload Selection start by Naveen in version 1.0.11 end


    function handleSelectChangeIndWorkload(event) {
        Network(`individualWorkload`, { assigned_to: getUser.user.empId, project_id: getUser.user.projectId, filter }, setIndWorkload)
    }
    function handleSelectChangeIndEpicLoad(event) {
        Network(`getEpicsData`, { epic_id: event, filter }, setEpicChart)
    }
    //Individual Workload Selection start by Naveen in version 1.0.9 end
    function handleSelectChangeInd(event) {
        Network(`individualSprintVelocity`, { sprint_id: event }, setIndVelocity)
        Network(`burnUp`, { sprint_id: event, project_id: getUser.user.projectId }, setBurnUpChart)//Sprint burnUpChart
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideNavigation />
                <div className="main-panel">
                    <div>
                        {/* Date Range Modal Start */}
                        <div className="col-12 " >
                            <div className="d-flex justify-content-between p-1">
                                {
                                    date_range && (
                                        <div>
                                            <h5 style={{ fontWeight: 'bold' }} className='d-flex justify-content-start text-primary'> From : {(Moment(filter[0].startDate).format('LL'))} {"-"} To : {(Moment(filter[0].endDate).format('LL'))} </h5>
                                        </div>)
                                }
                                <div className="d-flex justify-content-end mr-4" onClick={handleShow}>
                                    <button className="btn btn-success border" onClick={() => setView(!view)}>Select Date Range</button>
                                </div>
                            </div>
                            {view &&
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
                                                <button className="btn btn-success" type="button" onClick={() => handleSubmitWithDateRange()}>Search</button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>)}
                        </div>
                        {/* Date Range Modal End */}
                        {/* Sprint Velocity */}
                        {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR && <ReportsLine data={sprintData} name={SPRINT_VELOCITY} placeholder='' />}
                        {/* Task Velocity */}
                        {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR && <ReportsLine data={kanbanData} name={TASK_VELOCITY} placeholder='' />}
                        {/* Individual Velocity */}
                        {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR && <ReportsBar data={individualVelocity} list={sprintsList} onSelect={handleSelectChangeInd} placeholder="Select "{...MODULE} name={INDIVIDUAL_VELOCITY} />}
                        {/* BurnUpChart start by Naveen in version 1.0.11 start*/}
                        {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR && <ReportsLine data={sprintBurnUpChart} name={BURN_UP_REPORT} placeholder='' />}
                        {/* BurnDownChart start by Naveen in version 2.0.4 start*/}
                        {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR && <ReportsLine data={sprintBurnDownChart} name={BURN_DOWN_REPORT} placeholder='' />}
                        {/* Epic Report */}
                        {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR && <ReportsLine data={epicBurnUpChart} list={episList} onSelect={handleSelectChangeIndEpicLoad} placeholder="Select "{...PROJECT} name={EPIC_VELOCITY} />}
                        {/* Individual Workload Selection start by Naveen in version 1.0.9 start */}
                        {/* Individual Workload */}
                        {getUser.user.role !== LIMITED_ACCESS_CONTRIBUTOR ? <ReportsBar data={individualWorkload} list={squadsList} onSelect={handleSelectChangeIndWorkload} placeholder={SELECT_SQUAD_MEMBER} name={INDIVIDUAL_WORKLOAD} /> :
                            <ReportsBar data={individualWorkload} placeholder='' name={INDIVIDUAL_WORKLOAD} />}
                        {/* Individual Workload Selection start by Naveen in version 1.0.9 end*/}
                    </div>
                </div></div></div>
    )
}
