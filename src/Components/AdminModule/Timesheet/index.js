import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import { timeReducer, initialState1 } from './timeReducer';
import { getTimesheet } from './network';
import moment from 'moment';
import Select from 'react-select'
import { getSquadList } from '../../UserModule/Team/network';
import { empReducer, initialState } from '../../UserModule/Team/empReducer';
// import * as actions from '../../UserModule/Team/actions';
// import { getEmployees } from '../../UserModule/Team/network';
import $ from 'jquery';
import RootLoader from '../../Common/Loader/RootLoader';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Modal } from 'react-bootstrap';
import { addDays } from 'date-fns';
import { MAINTASK, TIMESHEET, SELECT_SQUAD_MEMBER, SELECT_DATE_RANGE, DATE } from '../../Common/Headers';

// import Condition from './condition';

export default function Timesheet() {


    const [select, setSelect] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);

    }
    const [view, setView] = useState(false)
    const [filter, setFilter] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ])
    const [selectedDays, setSelectedDays] = useState([])
    const [selectedWeeks, setSelectedWeeks] = useState([])

    useEffect(() => {
        setSelectedDays(getDates(filter[0].startDate, filter[0].endDate))
        setSelectedWeeks(getWeeks(filter[0].startDate, filter[0].endDate))
    }, [filter])



    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('MM-DD-YYYY'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    function getWeeks(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('dddd'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empReducer, initialState)
    const [state1, dispatch1] = useReducer(timeReducer, initialState1)
    const [, extension] = (getUser.user.userName).split('@')

    const dates = ['2021-09-01', '2021-09-02', '2021-09-03']
    // useEffect(() => {
    //     for (var day =filter[0].startDate; day <=filter[0].endDate;day.setDate(day.getDate() + 1)) {
    //         dates.push(Moment(day).format('YYYY-MM-DD'))

    //          }
    //     // eslint-disable-next-line
    // },[filter])



    useEffect(() => {
        getTimesheet(dispatch1, getUser.user, moment(filter[0].startDate).format('YYYY-MM-DD'), moment(filter[0].endDate).format('YYYY-MM-DD'), select);

        getSquadList(dispatch, getUser.user);
        // eslint-disable-next-line
    }, [filter, select])
    //Get SquadList
    var employee = [];
    state.squadList.map((employees) => {
        return (
            extension === 'agile24x7.com' ? ((employees.userName !== getUser.user.userName) ? employee.push({ 'value': employees.id, 'label': employees.name, 'userName': employees.userName, 'mobileNumber': employees.mobileNumber }) : null) :
                ((employees.userName !== getUser.user.userName && employees.userName.includes(extension)) ? employee.push({ 'value': employees.id, 'label': employees.name, 'userName': employees.userName, 'mobileNumber': employees.mobileNumber }) : null)
        );
    })

    useEffect(() => {
        if (state1.timesheet.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                    search: false,
                    filter: false,

                })
            })
        }
    }, [state1.timesheet])

    const getIndivdualHours = (hours) => {
        let working_hours = 0;
        const rowTotals = hours

        if (rowTotals.length > 0) {
            working_hours = rowTotals.reduce((acc, val1) =>
                parseFloat(acc) + parseFloat(val1)
            );
        }
        return Math.round(working_hours)
    }

    const getTotalHours = () => {

        let working_hours = 0;
        // eslint-disable-next-line
        const rowTotals = state1.timesheet.map(
            row => (row.total_working_hours) || 0
        )
        if (rowTotals.length > 0) {
            working_hours = rowTotals.reduce((acc, val1) =>
                parseFloat(acc) + parseFloat(val1)
            );
        }
        //rounding value 
        return Math.round(working_hours);
    }


    const getDatesData = (array1, array2) => {

        let array21 = array2.map(x => {
            return {
                "story_id": x.story_id,
                "story_title": x.story_title,
                "updated_date": moment(x.updated_date).format('MM-DD-YYYY'),
                "project_id": x.project_id,
                "working_hours": x.working_hours
            }
        })

        const matchingObjectsByDate = {};

        // Convert array1 dates to a set for efficient lookup
        const array1Set = new Set(array1);

        // Group array2 objects by date
        array21.forEach(item => {
            const itemDate = item.updated_date;
            if (array1Set.has(itemDate)) {
                if (!matchingObjectsByDate[itemDate]) {
                    matchingObjectsByDate[itemDate] = [];
                }
                matchingObjectsByDate[itemDate].push(item);
            }
        });

        const matchingArray = [];
        array1.forEach(date => {
            const objects = matchingObjectsByDate[date] || [];

            if (objects.length > 1) {
                matchingArray.push({
                    matched_date: date,
                    matched_objects: objects
                });
            } else if (objects.length === 1) {
                matchingArray.push(objects[0]);
            } else {
                matchingArray.push({
                    matched_date: date,
                    matched_objects: 0
                });
            }
        });



        return matchingArray.map((x, index) => {

            if (x?.matched_objects && x.matched_objects.length > 0) {
                return (<td title={x.matched_objects.map(y => {
                    return `User Story: ${y.story_title}, Date: ${moment(y.updated_date).format('MM-DD-YYYY')}, Working hours: ${Math.round(y.working_hours)}`
                })
                }> <label key={index} style={{ minWidth: 100, cursor: 'pointer' }} >{Math.round(x?.matched_objects.reduce((accumulator, currentValue) => accumulator + currentValue.working_hours, 0))}</label></td >)
            } else if (x?.matched_objects === 0) {
                return <td key={index} ><div style={{ width: 100, cursor: 'pointer' }}>0</div></td>
            }
            else {
                return <td key={index} title={"User Story   :" + `${x.story_title} + ${moment(x.updated_date).format('MM-DD-YYYY')} `} ><div style={{ width: 100, cursor: 'pointer' }}>{Math.round(x.working_hours)}</div></td>

            }
        })
    }

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
                                    <h4 className="card-title">{TIMESHEET}</h4>

                                    <div className="row d-flex justify-content-between">
                                        <div className="d-flex"
                                            onClick={handleShow}>
                                            {
                                                (<button className="btn btn-success p-2 border" onClick={() => setView(!view)}>{SELECT_DATE_RANGE}</button>)
                                            }
                                        </div>
                                        <div style={{ marginTop: 10 }}>
                                            {state1.timesheet.length > 0 &&
                                                <text style={{ fontSize: 14, fontWeight: 'bold' }} className=' text-success pl-4 '>{DATE}: {(moment(filter[0].startDate).format('ll'))} - {(moment(filter[0].endDate).format('ll'))}</text>
                                            }
                                        </div>
                                        <div className="col-5" style={{ zIndex: 100 }}>
                                            <Select
                                                className="form-control"
                                                placeholder={`${SELECT_SQUAD_MEMBER} `}
                                                value={employee.value}
                                                onChange={(selectedOption) => {
                                                    setSelect(selectedOption.value)


                                                }}
                                                options={employee}
                                            />
                                        </div>



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
                                                    <Modal.Footer closeButton>
                                                        <button className="btn btn-success" type="button" onClick={() => handleClose()}>Search</button>
                                                    </Modal.Footer>

                                                </Modal>

                                            </div>
                                        )

                                    }
                                    {state1.isLoading ? <RootLoader /> :
                                        <>
                                            {/* <table className="table table-bordered mt-5">
                                                <thead className="thead-light">

                                                    <tr>
                                                        <th>Project Name</th>
                                                        <th>User Story</th>
                                                        <th>Full Name</th>
                                                        <th>Working Hours</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    {
                                                        // eslint-disable-next-line
                                                        state1.timesheet.length > 0 ? state1.timesheet.filter((val) => {


                                                            if (select === '' && (Date.parse(val.updated_date) >= Date.parse(moment(filter[0].startDate).format('YYYY-MM-DD')) && Date.parse(val.updated_date) <= Date.parse(moment(filter[0].endDate).format('YYYY-MM-DD')))) {
                                                                return val
                                                            }

                                                            else if (val.assigned_to.includes(select) && (Date.parse(val.updated_date) >= Date.parse(moment(filter[0].startDate).format('YYYY-MM-DD')) && Date.parse(val.updated_date) <= Date.parse(moment(filter[0].endDate).format('YYYY-MM-DD')))) {
                                                                return val
                                                            }
                                                        })
                                                            .map((projects, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td style={{ textTransform: "capitalize", height: 40 }}>{projects.project_name}</td>
                                                                        <td style={{ textTransform: "capitalize" }}>{projects.story_title}</td>
                                                                        <td style={{ textTransform: "capitalize" }}>{projects.fullname}</td>
                                                                        <td style={{ textTransform: "capitalize" }}>{projects.working_hours}</td>
                                                                        <td style={{ textAlign: 'start' }}>{moment(projects.updated_date).format('MM/DD/YYYY')}</td>
                                                                    </tr>
                                                                )
                                                            }) : null}
                                                </tbody>
                                            </table> */}
                                            <div className="tableFixHead" style={{ marginLeft: -10, marginTop: 10 }}>
                                                <table className="table table-bordered" style={{ marginLeft: -10 }}>
                                                    <thead>

                                                        <tr>
                                                            <th style={{ padding: 50, border: 0, backgroundColor: '#333f50' }}><div style={{ width: 150, }}><text style={{ color: 'white' }}>{MAINTASK}</text></div></th>
                                                            <th style={{ backgroundColor: '#333f50', }}><text style={{ color: 'white', width: 150, }}>TOTAL HOURS</text></th>
                                                            <th style={{ backgroundColor: '#333f50', zIndex: 3 }}>

                                                                <tr >
                                                                    {
                                                                        selectedWeeks.map(x => {
                                                                            return (
                                                                                <th ><div style={{ width: 100 }}><text style={{ color: 'white' }}>{x.toUpperCase()}</text></div></th>
                                                                            )
                                                                        })
                                                                    }
                                                                </tr>
                                                                <tr>
                                                                    {
                                                                        selectedDays.map(x => {
                                                                            return (
                                                                                <th><div style={{ width: 100 }}><text style={{ color: 'white' }}>{x}</text></div></th>
                                                                            )
                                                                        })
                                                                    }

                                                                </tr>

                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ fontWeight: 'bold', backgroundColor: '#d5dce5' }}><text style={{ color: 'black', paddingLeft: 10 }}>TOTAL HOURS</text></td>
                                                            <td style={{ fontWeight: 'bold', backgroundColor: '#d5dce5', justifyContent: 'center', textAlign: 'center', width: 100 }}>{getTotalHours()}</td>
                                                            <td style={{ fontWeight: 'bold', backgroundColor: '#d5dce5' }}></td>
                                                        </tr>
                                                        {
                                                            // eslint-disable-next-line
                                                            state1.timesheet.length > 0 ? state1.timesheet
                                                                .map((projects, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            {/* <td className="py-1" style={{ textAlign: 'end' }}>{index + 1}</td> */}
                                                                            {/* <td>{projects.idea_id}</td> */}
                                                                            <td style={{ textTransform: "capitalize", height: 40, width: 350, backgroundColor: '#eaedf3', marginLeft: 10 }}>

                                                                                {/* {`${ projects.story_title } `}
                                                                                <br />
                                                                                <br /> */}
                                                                                {projects.project_name}
                                                                            </td>
                                                                            <td style={{ justifyContent: 'center', textAlign: 'center' }}>{Math.round(projects.total_working_hours)}</td>
                                                                            <td>
                                                                                {
                                                                                    getDatesData(selectedDays.map(x => {
                                                                                        return x
                                                                                    }), projects.result)
                                                                                }
                                                                            </td>



                                                                        </tr>
                                                                    )
                                                                }) : null}





                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
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