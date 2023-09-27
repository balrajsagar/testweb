import React, { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
// import { MDBTable } from 'mdbreact';
import $ from 'jquery';
import { empInfoReducer, initialState } from "./empInfoReducer"
import { getProjects } from "./network"
import RootLoader from "../Loader/RootLoader";
import ModifyProject from "../../UserModule/ManageProjects/modifyProject";
import CheckCondition from "../../UserModule/ManageProjects/CheckCondition";
import RO from '../RO';
import {  PROJECTNAME,   PROJECT_DESCRIPTION} from "../Headers";

export default function EmpProjects(props) {
    const getUser = useSelector(state => state.auth)
    const [state, dispatch] = useReducer(empInfoReducer, initialState)
    const [open, setOpen] = useState({ status: false, index: 0 })
    const [check, setCheck] = useState({ status: false, index: 0 })
    const [projectInfo] = useState()
    useEffect(() => {
        if (props.data !== undefined && props.data !== "") {
            getProjects(dispatch, getUser.user, props.data.id, props.data.role);
        }
        // eslint-disable-next-line
    }, [props.data])
    useEffect(() => {
        if (state.projects.length >= 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                })
            })
        }
        //  eslint-disable-next-line 
    }, [state.projects])
    const handleClose = () => {
        // setOpen(false);
        setOpen({ status: false, index: 0 });
        setCheck({ status: false, index: 0 });
        getProjects(props.data.dispatch, getUser.user, props.data.id, props.data.role)
    };
    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
        setCheck({ status: false, index: 0 });
    }
    // const handleCheck = (index, action) => {
    //     setCheck({ status: true, index: index, action: action });
    //     var info = { id: state.projects[index].idea_id, title: state.projects[index].idea_title, action: action }
    //     setProjectInfo(info)
    // };
    return <div className="table-responsive">
                    {state.isLoading ? <RootLoader /> :
        <table
            search="true"
            id="example" className="table table-striped table-bordered"
            data-pagination="true"
        >
            <thead style={{ backgroundColor: '#F4FAF7' }}>
                <tr>
                    {/* <th>S.NO</th> */}
                    {/* <th>Project ID</th> */}
                    <th>{PROJECTNAME}</th>
                    <th>{PROJECT_DESCRIPTION}</th>
                    <th>Created By</th>
                    {/* <th>{RELEASE_OWNER}</th> */}
                    {/* <th style={{width:'100px'}}>Status</th> */}
                    {/* <th>{ACTION}</th> */}
                </tr>
            </thead>
                <tbody>
                    {
                        state.projects !== [] ? state.projects.map((projects, index) => {
                            return (
                                <tr key={index}>
                                    {/* <td style={{ textAlign: 'end', width: '10px' }}>{index + 1}</td> */}
                                    {/* <td>{projects.idea_id}</td> */}
                                    <td  style={{textTransform:"capitalize"}}>{projects.idea_title}</td>
                                    <td  style={{textTransform:"capitalize"}}>{projects.idea_description}</td>
                                    <td  >{projects.userName}</td>
                                    {/* <td  style={{textTransform:"capitalize"}}>{projects.releaseOwner}</td> */}
                                    {/* <td style={{ textAlign: 'center' }}><span className="badge badge-pill badge-success " style={{width:'100px'}}>Approved</span></td> */}
                                    {/* <td style={{ textAlign:'center',width:'10px' }}> */}
                                        {/* <div className="dropdown show">
                                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                            <img src="images/common/actionmenu.png" alt="logo"  style={{ width: '20px', height: '20px',borderRadius:'0' }} />
                                            </a>

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{backgroundColor:'transparent',border:'0'}}>
                                                <div>
                                                    {getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#6ce6b2",color:'white' }} ><Link to={{ pathname: '/viewModules', state: { id: state.projects[index].idea_id, title: state.projects[index].idea_title } }} style={{ color: 'white' }}>{VIEWMODULES}</Link></button> :
                                                    <button className="dropdown-item badge badge-pill badge-primary text-center" style={{ backgroundColor: "#6ce6b2",color:'white' }} ><Link to={{ pathname: '/addModules', state: { id: state.projects[index].idea_id, title: state.projects[index].idea_title } }} style={{ color: 'white' }}>{VIEWMODULES}</Link></button> }                                              
                                                    <button className="dropdown-item badge badge-pill badge-dark text-center" style={{ backgroundColor: "grey",color:'white' }} onClick={(event) => handleCheck(index, "RO")}>{RELEASE_OWNER}</button>
                                                    <button className="dropdown-item badge badge-pill badge-success text-center" style={{ backgroundColor: "#6BC2D3",color:'white' }} onClick={(event) => handleCheck(index, "Verify")}>{VERIFY}</button>
                                                    {getUser.user.role === "admin" ? <button className="dropdown-item badge badge-pill text-white text-center" style={{ backgroundColor: '#ED7173',color:'white'}} onClick={(event) => handleCheck(index, "Delete")}>{DELETE}</button>:null}</div> 


                                           </div>
                                        </div> */}

                                    {/* </td> */}
                                </tr>
                            )
                        }) : null}
                </tbody>
        </table>}
        {
            open.status ? <ModifyProject open={open.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {
            (check.status && check.action !== "RO") ? <CheckCondition open={check.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
            /> : null
        }
        {
            (check.status && check.action === "RO") ? <RO open={check.status} handleClose={handleClose} data={projectInfo} handleModalClose={handleModalClose}
            /> : null
        }
    {/* </MDBTable> */}
    </div>
}