import React, { useEffect, useState } from 'react'
import ReportsAPI from '../../Common/AgileNetwork/ReportsAPI';
import Select from 'react-select'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import $ from 'jquery';
import 'react-smart-data-table/dist/react-smart-data-table.css'
import Alert from '../../Common/Alert';
import { Modal } from 'react-bootstrap';
import Moment from 'moment';

export default function IndividualReports() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [usersData, setUsersData] = useState([])
    const [data, setData] = useState({
        selectedOption: ""
    })
    const [filter, setFilter] = useState([
        {
            startDate: addDays(new Date(), -7),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    const [result, setResult] = useState([])
    const [projectCount, setProjectCount] = useState()

    async function Network(api, state) {
        try {
            const response = await ReportsAPI.get(`/${api}`, {}, {}, false)
            state(response)
        }
        catch (error) {
            console.log('error', error.message)
        }
    }
    useEffect(() => {
        Network('getUsersData', setUsersData)
        // eslint-disable-next-line
    }, [])

    const [flag, setFlag] = useState(true)
    const [daterange, setDaterange] = useState(false)
    const [message, setMessage] = useState("")
    const [view, setView] = useState(false)


    const options = usersData && usersData.map(data => {
        return (
            { value: data.emp_id, label: data.fullname }
        )
    })

    const handleSelect = async (selectedOption) => {
        const data = { selectedOption: selectedOption }
        console.log(data)
        setData({ ...data, selectedOption: selectedOption })
        setResult([])
        setProjectCount()
        setView(false)
        if (data.selectedOption !== "") {
            await ReportsAPI.post('/getDataV1', { data, filter }, {}, false)
                .then(result => {
                    setResult(result.projectData)
                    setProjectCount(result.projectCount)
                    setMessage()
                    setFlag(true)
                    setDaterange(true)
                })
                .catch(err => {
                    setMessage(err.message)
                    setResult([])
                })
        } else {
            Alert("warning", "please select user")
        }

    }
    const handleSubmit = () => {
        setResult([])
        setProjectCount()
        setView(false)
        setData({
            selectedOption: ""
        })
        setDaterange(true);
    }
    useEffect(() => {
        if (result.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    search: false,
                    filter: false,
                    retrieve: true,
                    fixedHeader: true,
                    "order": [[1, "desc"]]
                })
            })
        }
    }, [result])

    return <div><div className="card-body">
        {/* <h4 className="card-title">Individual Velocity Reports</h4> */}
        <div className="d-flex justify-content-between row">
            <div className="d-flex" onClick={handleShow}>
                {
                    flag && (<button className="btn btn-success p-2 border" onClick={() => setView(!view)}>Select Date Range</button>)
                }
            </div>
            {

                <div style={{ marginTop: 10 }}>
                    {result.length !== 0 && (<text style={{ fontSize: 14, fontWeight: 'bold' }} className=' text-success'> Projects Involved : {projectCount} </text>)}
                    {daterange && (<text style={{ fontSize: 14, fontWeight: 'bold' }} className=' text-success'> From : {(Moment(filter[0].startDate).format("MM-DD-YYYY"))} To : {(Moment(filter[0].endDate).format("MM-DD-YYYY"))} </text>)}

                </div>
            }
            <div className="col-5" >

                <Select
                    className="form-control"
                    placeholder="select user"
                    value={data.selectedOption}
                    onChange={handleSelect}
                    options={options}
                />   </div>




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
                            <button className="btn btn-success" type="button" onClick={() => handleSubmit()}>Search</button>
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
        {/* <SmartDataTable
                                        className="table table-striped table-bordered "
                                        data={reports}
                                        filterValue={search}
                                        perPage={10}
                                        emptyTable={emptyTable}
                                    /> */}
        {result.length !== 0 ?
            <div className="table-responsive">
                <table
                    id="example" className="table table-striped table-bordered"
                    data-pagination="true"
                >
                    <thead style={{ backgroundColor: '#F4FAF7' }}>
                        <tr>
                            <th>Project Name</th>
                            <th>Sprint Name</th>
                            <th>Assigned Story Points</th>
                            <th>Pending</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result.length !== 0 ? result.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ height: 40 }}>{x.result.project_name}</td>
                                        <td>{x.result.sprint} - {x.result.sprint_desc}</td>
                                        {x.result.estimated !== null ? <td>{x.result.estimated}</td> : <td>0</td>}
                                        {x.result.pending !== null ? <td> {x.result.pending} </td> : <td>0</td>}
                                        {x.result.completed !== null ? <td>{x.result.completed} </td> : <td>0</td>}
                                    </tr>
                                )
                            }) : null}
                    </tbody>
                </table>
            </div>
            : null}
    </div>
    </div>
}