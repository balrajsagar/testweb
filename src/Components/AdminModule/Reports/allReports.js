import React, { useEffect, useState } from 'react'
import ReportsAPI from '../../Common/AgileNetwork/ReportsAPI';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import $ from 'jquery';
import 'react-smart-data-table/dist/react-smart-data-table.css'
import { Modal } from 'react-bootstrap';
import Moment from 'moment';

export default function AllReports() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [filter, setFilter] = useState([
        {
            startDate: addDays(new Date(), -7),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    
    const [result, setResult] = useState([])

    async function Network(api, state) {
        setResult([])
        try {
            const response = await ReportsAPI.post(`/${api}`, {filter}, {}, false)
            state(response)
            // console.log(response)
        }
        catch (error) {
            setMessage(error.message)
            console.log('error', error.message)
        }
    }
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
                    "order": [[1, "desc"]]
                })
            })
        }
    }, [result])


    return <div><div className="card-body">
        {/* <h4 className="card-title">employee utilization</h4> */}
        <div className="d-flex justify-content-between row">
            <div className="d-flex" onClick={handleShow}>
                {
                    <button className="btn btn-success p-2 border" onClick={() => setView(!view)}>Select Date Range</button>
                }
            </div>
            {

                <div style={{ marginTop: 10 }}>
                    {<text style={{ fontSize: 14, fontWeight: 'bold' }} className=' text-success'> From : {(Moment(filter[0].startDate).format("MM-DD-YYYY"))} To : {(Moment(filter[0].endDate).format("MM-DD-YYYY"))} </text>}

                </div>
            }
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
                            <button className="btn btn-success" type="button" onClick={()=>handleClose()}>Search</button>
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
                            <th>Employee Name</th>
                            <th>No of Projects Involved</th>
                            <th>Assigned Story Points</th>
                            <th>Pending</th>
                            <th>Completed</th>
                            <th>Working Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result.length !== 0 ? result.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ height: 40 }}>{x.name}</td>
                                        <td>{x.data[0].projects_involved}</td>
                                        {x.data[0].estimated !== null ? <td>{x.data[0].estimated}</td> : <td>0</td>}
                                        {x.data[0].pending !== null ? <td> {x.data[0].pending} </td> : <td>0</td>}
                                        {x.data[0].completed !== null ? <td>{x.data[0].completed} </td> : <td>0</td>}
                                        {x.data[0].working_hours !== null ? <td>{x.data[0].working_hours} </td> : <td>0</td>}
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