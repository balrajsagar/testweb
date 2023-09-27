import React, { useEffect, useReducer, useState } from 'react';
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { roadBlockReducer, initialState } from './roadBlockReducer';
import { getRoadBlockList } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import Header from '../../Common/TopNav';
import { getToken, setToken } from '../../Common/LocalStorage';
import RoadBlock from '../../Common/RoadBlock';
import AdminSideBar from '../Utility/SideNav';

export default function RoadBlockList(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(roadBlockReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [cardInfo, setCardInfo] = useState()
    var data = {
        id: props.location.state.id,
        title:props.location.state.title
    }
    setToken('roadBlock_id', data.id)
    useEffect(() => {
        getRoadBlockList(dispatch, getUser.user, getToken('roadBlock_id'));
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (state.roadBlocks.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    fixedHeader: true,
                })
            })
        }
    }, [state.roadBlocks])
    const handleOpen = (action, index) => {
        var info
        setOpen({ status: true, index: index, action: action });
        info = { taskId: getToken('roadBlock_id') }
        setCardInfo(info)
    };
    const handleClose = () => {
        setOpen({ status: false, index: 0 });
        getRoadBlockList(dispatch, getUser.user, getToken('roadBlock_id'));
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
            <AdminSideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="justify-content-between row">
                                        <h4 className="card-title">Road Blocks</h4>
                                        <h4 className="card-title text-success">Task Title : {props.location.state.title}</h4>
                                        <div className="d-flex justify-content-end mb-0">
                                            <button  onClick={() => handleOpen("addRoadBlock")} style={{ backgroundColor: 'transparent', border: '0' }} type="button" > <img src="images/common/add.png" alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">Add RoadBlock</span></button>
                                            {
                                                open.action === "addRoadBlock" ? <RoadBlock open={open.status} handleClose={handleClose} data={cardInfo} handleModalClose={handleModalClose}
                                                /> : null
                                            }
                                        </div>

                                    </div>
                                    {state.isLoading ? <RootLoader /> :
                                    <div className="table-responsive">

                                        {/* <MDBTable> */}
                                            <table
                                                search="true"
                                                id="example" className="table table-striped table-bordered"
                                                data-pagination="true"
                                            >
                                                <thead style={{ backgroundColor: '#F4FAF7' }}>
                                                    <tr>
                                                        <th>RoadBlock ID</th>
                                                        {/* <th>Task ID</th> */}
                                                        <th>RoadBlock Description</th>
                                                        <th>Date</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                    <tbody>
                                                        {
                                                            state.roadBlocks !== [] ? state.roadBlocks.map((tasks, index) => {
                                                                return (
                                                                    <tr key={index}> 
                                                                        <td style={{ textAlign: 'end' ,width:'10px'}}>{tasks.sno}</td>
                                                                        {/* <td>{tasks.subTaskId}</td> */}
                                                                        <td style={{ width: '500px' }}>{tasks.roadBlockDescription}</td>
                                                                        <td style={{ width: '100px' }} >{tasks.roadBlockDate}</td>
                                                                        <td style={{ width: '80px' }}>{tasks.roadBlockStatus}</td>
                                                                    </tr>
                                                                )
                                                            }) : null}
                                                    </tbody>
                                            </table>
                                        {/* </MDBTable> */}
                                    </div>
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