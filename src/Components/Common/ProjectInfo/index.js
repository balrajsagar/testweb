import React, { useReducer, useState } from 'react';
// import Header from '../TopNav';
import SideNavigation from '../SideNav';
import TopNavWithOutProject from '../../UserModule/Utility/TopNav/topnav';
import ProjectModules from './projectModules';
import ProjectMainTasks from './projectMaintasks';
import { projectReducer, initialState } from './projectReducer';
import RootLoader from '../Loader/RootLoader';
import ProjectSubTasks from './projectSubtasks';
import { MAINTASKS, ROADBLOCKS ,SUBTASKS,PROJECTNAME,PROJECT,PROJECT_DESCRIPTION,ASSIGNED_DATE, TARGET_DATE} from '../Headers';
import ProjectRoadblocks from './projectRoadblocks';
import Moment from 'moment';
import { Redirect } from 'react-router';


export default function ProjectInfo(props) {
    // eslint-disable-next-line
    const [state, dispatch] = useReducer(projectReducer, initialState)
    const [check, setCheck] = useState("ManageTasks")
    if(!props.location.state){
        return <Redirect to='/user/manageProjects' />
    }
    var data = {
        id: props.location.state.id,
        e_id: props.location.state.e_id,
        name: props.location.state.idea_title,
        ro:props.location.state.ro,
        requestedBy:props.location.state.requestedBy,
        description:props.location.state.idea_description,
        acceptedBy:props.location.state.acceptedBy,
        created_on:props.location.state.created_on,
        targetDate:props.location.state.targetDate,
        dispatch:dispatch //For tabs 
    }
    return (
        <div className="container-scroller">
            <TopNavWithOutProject />
            <div className="container-fluid page-body-wrapper">
                <SideNavigation />
                <div className="main-panel">
                    <div className="m-1">
                        <div className="card">
                            <div className="card-header">
                                {PROJECT} Information : <span className="text-success text-bold" style={{fontSize:15}}>{data.name}</span>
                            </div>
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                <div className="row">
                                    <span style={{width:'110px'}}>{PROJECT} No</span><span > : {data.e_id}</span>
                                </div>
                                <div className="row">
                                    <span style={{width:'110px'}}>{PROJECTNAME}</span><span > : {data.name}</span>
                                </div>
                                <div className="row">
                                    <span style={{width:'110px'}}>{PROJECT_DESCRIPTION}</span><span > : {data.description}</span>
                                </div>
                                {/* <div className="row">
                                    <span style={{width:'110px'}}>Requested By</span><span > : {data.requestedBy}</span>
                                </div> */}
                                </div>
                                <div>
                                {/* <div className="row">
                                    <span style={{width:'110px'}}>Approved By</span><span > : {data.acceptedBy}</span>
                                </div> */}
                                {/* <div className="row">
                                    <span style={{width:'110px'}}>Release Owner</span><span > : {data.ro}</span>
                                </div> */}
                                <div className="row">
                                    <span style={{width:'110px'}}>{ASSIGNED_DATE}</span><span > : {Moment(data.created_on).format('MM.DD.YYYY')}</span>
                                </div>
                                {data.targetDate != null && (<div className="row">
                                    <span style={{width:'110px'}}>{TARGET_DATE}</span><span > : {Moment(data.targetDate).format('MM.DD.YYYY')}</span>
                                </div>)}
                                {/* <div className="row">
                                    <span >Members  : </span><span>Naveen</span>
                                </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card" style={{border:'0px'}}>
                                <div className="card-body">
                                    <div className="row">
                                        <ul className="nav nav-tabs card-header-tabs card-title ">
                                            {/* <li className="">
                                                <button className={check === "Modules" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Modules")}><u>{MODULES}</u></button>
                                            </li> */}
                                            <li className="">
                                                <button className={check === "ManageTasks" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("ManageTasks")}><u>{MAINTASKS}</u></button>
                                            </li>
                                            <li className="">
                                                <button className={check === "SubTasks" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("SubTasks")}><u>{SUBTASKS}</u></button>
                                            </li>
                                            <li className="">
                                                <button className={check === "Roadblocks" ? "nav-link font-weight-bold text-success active" : "nav-link font-weight-bold text-dark"} onClick={() => setCheck("Roadblocks")}><u>{ROADBLOCKS}</u></button>
                                            </li>
                                        </ul>
                                    </div>
                                    {
                                        state.isLoading ? <RootLoader /> :
                                            {
                                                'Modules': <ProjectModules data={data} />,
                                                'ManageTasks': <ProjectMainTasks data={data} />,
                                                'SubTasks': <ProjectSubTasks data={data} />,
                                                'Roadblocks': <ProjectRoadblocks data={data} />
                                            }[check]
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