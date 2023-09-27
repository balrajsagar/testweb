import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReportsAPI from '../../Common/AgileNetwork/ReportsAPI';
import { MAINTASKNAME, PROJECTS_INVOLVED } from '../../Common/Headers';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function UserProjectInfo(props) {
    const [result, setResult] = useState([])
    const [message, setMessage] = useState("")
    const classNames = useStyles();
    const title = props.data.action === PROJECTS_INVOLVED ? PROJECTS_INVOLVED.concat(" - ", props.data.email) : props.data.project_name;
    async function Network(api, data, state) {
        setResult([])
        try {
            const response = await ReportsAPI.post(`/${api}`, data, {}, false)
            state(response)
        }
        catch (error) {
            setMessage(error.message)
            console.log('error', error.message)
        }
    }
    useEffect(() => {
        if (props.data.action === 'userReports') {
            Network('projectUserReport', { project_id: props.data.project_id }, setResult)
        } else if (props.data.action === 'getProjectActiveStoryUsers') {
            Network('getProjectActiveStoryUsers', { project_id: props.data.project_id, filter: props.data.filter }, setResult)
        } else if (props.data.action === 'getProjectWorkingHours') {
            Network('getProjectWorkingHours', { project_id: props.data.project_id, filter: props.data.filter }, setResult)
        } else if (props.data.action === 'getIndividualUserstory') {
            Network('getIndividualUserstory', { project_id: props.data.project_id, filter: props.data.filter }, setResult)
        } else {
            Network('projectName', { email: props.data.email }, setResult)
        }
        // eslint-disable-next-line
    }, [])

    const modalBoox = props.data.action === 'getIndividualUserstory' ? "modal-content col-5 p-2" : "modal-content col-3 p-2"

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classNames.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                disableBackdropClick={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classNames.paper}>
                        <div className="user-modal-dialog d-flex justify-content-center">
                            <div className={modalBoox} style={{ borderRadius: '10px' }}>
                                <div class="modal-header" style={{ backgroundColor: '#D2ECDF' }}>
                                    <div className="column">
                                        <h6 class="modal-title p-1">{title}</h6>
                                    </div>
                                    <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={props.handleModalClose} className="d-flex align-items-right" data-dismiss="modal"><i class="mdi mdi-close text-black"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div className="overflow-auto" style={{ height: '150px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                                        {props.data.action === 'Projects Involved' && (result.length > 0 ?
                                            result.map(({ project_name }, index) => {
                                                return (
                                                    <p className="text-left" > <h6 className="pt-1" style={{ color: 'grey', textTransform: "capitalize" }}>{index + 1}. {project_name}</h6></p>
                                                )
                                            }) : <p>{message}</p>)}
                                        {props.data.action === 'userReports' && (result.length > 0 ?
                                            result.map(({ working_status, fullname }, index) => {
                                                return (
                                                    <p className="text-left" style={{ display: 'flex' }}>
                                                        <h6 className="pt-1" style={{ color: 'grey', textTransform: "capitalize" }}>
                                                            {index + 1}.&nbsp;{fullname}&nbsp;
                                                        </h6>
                                                        <h6 className="pt-1" style={{ color: working_status === 'Active' ? 'green' : 'red' }}>-&nbsp;{working_status}</h6>
                                                    </p>
                                                )
                                            }) : <p>{message}</p>)}
                                        {props.data.action === 'getProjectWorkingHours' && (result.length > 0 ?
                                            result.map(({ hours, fullname }, index) => {
                                                return (
                                                    <p className="text-left" style={{ display: 'flex' }}>
                                                        <h6 className="pt-1" style={{ color: 'grey', textTransform: "capitalize" }}>
                                                            {index + 1}.&nbsp;{fullname}&nbsp;
                                                        </h6>
                                                        <h6 className="pt-1" style={{ color: 'green' }}>-&nbsp;{Math.round(hours)}&nbsp;hours</h6>
                                                    </p>
                                                )
                                            }) : <p>{message}</p>)}
                                        {props.data.action === 'getIndividualUserstory' && (result.length > 0 ?
                                            result.map(({ story_title, fullname, working_hours }, index) => {
                                                return (
                                                    <>
                                                    <p className="text-left" style={{ display: 'flex' }}>
                                                        <h6 className="pt-1" style={{ color: 'grey', textTransform: "capitalize" }}>
                                                            {index + 1}.&nbsp;{fullname}&nbsp;
                                                        </h6>
                                                        <h6 className="pt-1" style={{ color: 'green' }}>-&nbsp;{Math.round(working_hours)}&nbsp;hours</h6>
                                                    </p>
                                                    <p><h6 className="pt-1" style={{ color: 'grey', textTransform: "capitalize" }}><b>{MAINTASKNAME}:</b>&nbsp;{story_title}</h6>
                                                    </p>
                                                    </>
                                                )
                                            }) : <p>{message}</p>)}
                                        {props.data.action === 'getProjectActiveStoryUsers' && (result.length > 0 ?
                                            result.map(({ working_users }, index) => {
                                                return (
                                                    <p className="text-left" style={{ display: 'flex' }}>
                                                        <h6 className="pt-1" style={{ color: 'grey', textTransform: "capitalize" }}>
                                                            {index + 1}.&nbsp;{working_users}
                                                        </h6>
                                                        {/* <h6 className="pt-1" style={{ color: working_status === 'Active' ? 'green' : 'red' }}>- {working_status}</h6> */}
                                                    </p>
                                                )
                                            }) : <p>{message}</p>)}
                                    </div>
                                </div>


                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" onClick={props.handleModalClose} style={{ borderRadius: '20px' }}>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}