import React, { useEffect, useState } from 'react'
import ReportsAPI from '../../Common/AgileNetwork/ReportsAPI';
import $ from 'jquery';
import AdminTopNav from '../Utility/TopNav';
import AdminSideBar from '../Utility/SideNav';
import Moment from 'moment';
import { PROJECT_NAME, ASSIGNED_STORY_POINTS, PENDING, COMPLETED, SPRINT_NAME, INDIVIDUAL_EMPLOYEE_REPORTS, PROJECTS_INVOLVED, EMPLOYEE_NAME ,DATE} from '../../Common/Headers';

export default function IndividualReports(props) {
    const [result, setResult] = useState([])
    // const [projectCount, setProjectCount] = useState()
    const [message, setMessage] = useState("")
    var filter =props.location.state.filter
    async function Network(api, state) {
        var data = { selectedOption: {label: props.location.state.name,value: props.location.state.emp_id} }
        filter =props.location.state.filter
        try {
            const response = await ReportsAPI.post(`/${api}`, { data, filter }, {}, false)
            state(response.projectData)
            // setProjectCount(response.projectCount)
        }
        catch (error) {
            setMessage("No Records Found")
            // setProjectCount(0)
            console.log('error', error.message)
        }
    }
    useEffect(() => {
        Network('getDataV1',setResult)
        // eslint-disable-next-line
    }, [props])

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
                                    <div className="row">
                                    {/* <Link   to={{ pathname: '/admin/reports'}} ><h4 className="card-title" style={{color:'green'}} > Back </h4></Link> */}
                                    <h4 className="card-title">{INDIVIDUAL_EMPLOYEE_REPORTS}</h4>
                                    </div>
                                    <div className="d-flex justify-content-between row">
                                        {
                                        <div style={{marginTop:10}}>
                                            <text style={{ fontSize: 14, fontWeight: 'bold',marginLeft:5 }} className=' text-success'> {EMPLOYEE_NAME}: {props.location.state.name}</text>
                                            <text style={{ fontSize: 14, fontWeight: 'bold',marginLeft:30 }} className=' text-success'> {PROJECTS_INVOLVED}: {props.location.state.projects_involved} </text>
                                            <text style={{ fontSize: 14, fontWeight: 'bold',marginLeft:30 }} className=' text-success'> {DATE}: {(Moment(filter[0].startDate).format('ll'))} - {(Moment(filter[0].endDate).format('ll'))} </text>

                                        </div> 
                                        }
                                    </div>
                                </div>
                                {
                                    message && (<><br /><br /><span style={{ color: 'red', marginLeft: '10%' }}>{message}</span></>)
                                }
                                <div className='p-2'>
                                    <div className='pt-2'/>
                                    {result.length !== 0 ?
                                        <div className="table-responsive">
                                            <table
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        <th>{PROJECT_NAME}</th>
                                                        <th>{SPRINT_NAME}</th>
                                                        <th>{ASSIGNED_STORY_POINTS}</th>
                                                        <th>{PENDING}</th>
                                                        <th>{COMPLETED}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        result.length !== 0 ? result.map((x,index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td style={{height:40}}>{x.result.project_name}</td>
                                                                    <td>{x.result.sprint} - {x.result.sprint_desc}</td>
                                                                    {x.result.estimated !== null ? <td>{x.result.estimated}</td> : <td>0</td>}
                                                                    {x.result.pending !== null ? <td> {x.result.pending} </td>: <td>0</td> }
                                                                    {x.result.completed !== null ?  <td>{x.result.completed} </td>: <td>0</td>}
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