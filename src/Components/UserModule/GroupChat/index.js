/* 
FileName:index.js
purpose:Group Chat
Developers:Rohini
 */
import React, { useEffect, useState, useReducer } from 'react';
import SideBar from '../Utility/SideNav';
import Header from '../../Common/TopNav';
import AddGroupChat from '../../Common/GroupChat';
import RootLoader from '../../Common/Loader/RootLoader';
import { useSelector } from 'react-redux';
import { getGroupDetails, getAllGroupMessages, getAdminGroup, getAdminGroupNew, getEmployees, createDefaultGroup } from './network';
import { reducer, initialState } from './reducer';
import ChatBox from '../../Common/GroupChat/chat';
import EditGroup from '../../Common/GroupChat/edit_group';
import DeleteGroup from '../../Common/GroupChat/delete_group';
import { CHAT_ROOM, CREATE_GROUP, EDIT_GROUP, CHAT, ACTION_ICON } from '../../Common/Headers';
import convertPSTtoLocalTime from '../../Common/convertPSTtoLocalTime';

export default function GroupChat() {

    const [open, setOpen] = useState({ status: false, index: 0 })
    const getUser = useSelector(state => state.auth)
    const [chatOpen, setChatOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState()
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        getGroupDetails(dispatch, getUser.user)
        getAllGroupMessages(dispatch, getUser.user);
        getAdminGroup(dispatch, getUser.user);
        getAdminGroupNew(dispatch, getUser.user);
        getEmployees(dispatch, getUser.user)
        // eslint-disable-next-line
    }, [])
    // adding default group 
    const [empList, setEmpList] = useState([]);
        // eslint-disable-next-line
    const [productOwner, setProductOwner] = useState([])
    useEffect(() => {
        if (state.employees.length > 0) {
            setProductOwner(state.employees.filter(empp => empp.workingStatus === "Active" && (empp.role === 'Product Owner' || "Scrum Master")).map((emp) => {
                return emp
            }))
            setEmpList(state.employees.filter(empp => empp.workingStatus === "Active").map((emp) => {
                return { 'value': emp.email, 'label': emp.name, 'data': emp }
            }))
        }
    }, [state.employees])


    useEffect(() => {
        if (empList.length > 0) {
            if (state.details.filter(x => {
                return x.group_name === getUser.user.corp
            }).length !== 1) {
                createDefaultGroup(state, empList.map(x => { return x.label }).toString(), empList.map(x => { return x.value }).toString(), dispatch, getUser.user, handleClose)
            }
        }
        // eslint-disable-next-line
    }, [empList])

    // console.log("admin",state.adminGroupsMsg)
    // getting list of group name (i.e. unique) with last message and time
    const key = 'id';
    const arrayUniqueByKey = [...new Map(state.adminGroupsMsg.map(item =>
        [item[key], item])).values()].sort((a, b) => b.sno - a.sno);
    // const events = [...state.adminGroups, ...state.details ]
    // console.log("arrayUniqueByKey",arrayUniqueByKey)

    // display groups who have unread messages on top  
    const sortedOne = (msg, emp, empId) => {
        const sortedUserIds = msg
            .sort()
            .filter(m => m.groupId !== null && m.readBy.split(",").indexOf(empId) === -1 && m.messagedBy !== empId)
            .map(m => m.groupId)

        const sortedUsers = [...new Set(sortedUserIds)].map(id => emp.find(u => u.id === id))
        const sorted = sortedUsers.filter(id => id !== undefined)

        const namesToDeleteSet = new Set(sorted);

        const newArr = emp.filter((employee) => {
            return !namesToDeleteSet.has(employee);
        });
        const sortedEmployees = sorted.concat(newArr)
        return sortedEmployees;

    }
    // const empSorted = sortedOne(state.allMessages,events,getUser.user.empId);
    const empSorted = sortedOne(state.allMessages, arrayUniqueByKey, getUser.user.empId);
    // console.log("empsorted",empSorted)

    const handleOpen = (action, data) => {
        var info;
        setOpen({ status: true, action: action });
        if (action === "modify") {
            // var status = "backlog_addUser"
            info = { data: data }
        } else if (action === "delete") {
            // var status = "backlog_addUser"
            info = { data: data, action: action }
        } else if (action === "exit") {
            // var status = "backlog_addUser"
            info = { data: data, action: action }
        }
        setCardInfo(info)
    }

    const handleClose = () => {
        setOpen({ status: false, index: 0 })
        getGroupDetails(dispatch, getUser.user)
        getAdminGroup(dispatch, getUser.user);
        getAdminGroupNew(dispatch, getUser.user);
    };

    const handleModalClose = () => {
        setOpen({ status: false, index: 0 });
        getGroupDetails(dispatch, getUser.user)
        getAdminGroup(dispatch, getUser.user);
        getAdminGroupNew(dispatch, getUser.user);
    }

    const handleOpenChat = (id, sno) => {
        setChatOpen(true);
        // updateChat(sno,dispatch,getUser.user)
        var info = { id: id, sno: sno };
        setCardInfo(info);
    };

    const handleChatClose = () => {
        setChatOpen(false);
        getGroupDetails(dispatch, getUser.user)
        getAdminGroup(dispatch, getUser.user);
        getAllGroupMessages(dispatch, getUser.user);
        getAdminGroupNew(dispatch, getUser.user);
    };

    //   const getLastMsg = (message, id) =>{
    //       const groupMsg =  message.filter(msg => msg.groupId === id).map((mg, i ) =>{
    //           return mg.message
    //       });
    //       return groupMsg[groupMsg.length-1]
    //   }
    //   const getLastMsgTime = (message, id) =>{
    //     const groupMsg =  message.filter(msg => msg.groupId === id).map((mg, i ) =>{
    //         return  mg.messaged_time
    //     });
    //     return groupMsg[groupMsg.length-1]
    // }
    // const getLastMsgSendBy = (message, id) =>{
    //     const groupMsg =  message.filter(msg => msg.groupId === id).map((mg, i ) =>{
    //         return mg.fullname
    //     });
    //     return groupMsg[groupMsg.length-1]
    // }
    //   console.log("msg",getLastMsg(state.allMessages,'76'))
    //   console.log("msg",state.allMessages)

    // for getting message unread message count
    const getMessagesCount = (id, msg, empId) => {
        const msgCount = msg.filter(message => message.readBy.split(",").indexOf(empId) === -1 && message.messagedBy !== empId && message.groupId === id).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })
        return (
            <i>
                {
                    msgCount.length > 0 ?
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }}
                                onClick={(event) => handleOpenChat(id, msgCount)} />
                            <span style={{ color: 'red', fontWeight: "bold" }}>{msgCount.length}</span>
                        </div>
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-5px" }}
                                onClick={(event) => handleOpenChat(id, msgCount)} />
                        </div>
                }
            </i>
        )
    }
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <h2 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent' }}>{CHAT_ROOM}</h2>
                                    </div>

                                    <div className="d-flex justify-content-end mb-2 " >
                                        <div style={{ flexDirection: 'column' }}>
                                            <div style={{ marginLeft: 380 }}>

                                                <button style={{ backgroundColor: 'transparent', border: '0' }} type="button"
                                                    onClick={() => handleOpen("add")}
                                                > <img src="images/common/add.png" alt="logo" title={CREATE_GROUP} style={{ width: '20px', height: '20px' }} /><span className="m-1">{CREATE_GROUP}</span></button>
                                                {
                                                    open.action === "add" ? <AddGroupChat open={open.status} handleClose={handleClose}
                                                        // data={cardInfo}
                                                        handleModalClose={handleModalClose}
                                                    /> : null
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    {/* start  */}
                                    {state.isLoading ? <RootLoader /> :
                                        <div>
                                            {empSorted.length > 0 ? empSorted.map((group, index) => {
                                                return (
                                                    <div className="col-12" key={group.id}>
                                                        <div className="card col-12">
                                                            <div className="container-fluid col-12 row" >
                                                                <div className="d-flex col-12" style={{ padding: 0 }}>
                                                                    <div className="mr-auto p-2">
                                                                        <b style={{ cursor: 'pointer', paddingTop: 10, fontSize: '12px' }}
                                                                            // onClick={(event) => handleOpen("unassigned_taskInfo", index)}
                                                                            data-toggle="tooltip" data-placement="right" title={group.members_name}
                                                                        >{group.group_name}</b>
                                                                        {group.messaged_time !== undefined ?
                                                                            <div  >
                                                                                <span style={{ color: "green", fontSize: "11px" }}> {group.fullname}:</span>&nbsp;&nbsp;
                                                                                <q style={{ color: 'grey', fontSize: "8px" }}>
                                                                                    {convertPSTtoLocalTime(group.messaged_time)}</q>&nbsp;&nbsp;
                                                                                <span style={{ color: 'gray', fontSize: "12px", display: "table-caption", width: "850px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                                                                >{group.message}
                                                                                </span>
                                                                            </div> : ""}

                                                                        {/* {getLastMsgTime(state.allMessages,group.id) !== undefined ?
                                                                        <div  >
                                                                        <span style={{color:"green", fontSize:"11px"}}> {getLastMsgSendBy(state.allMessages,group.id) }:</span>&nbsp;&nbsp;                                                                      
                                                                        <q style={{color:'grey',fontSize:"8px"}}>
                                                                            {getLastMsgTime(state.allMessages,group.id)}</q>&nbsp;&nbsp;
                                                                        <span  style={{color:'gray', fontSize:"12px", display: "table-caption",width: "850px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}} 
                                                                           >{getLastMsg(state.allMessages,group.id)}
                                                                           </span>
                                                                        </div> :""} */}
                                                                    </div>


                                                                    {/* {getLastMsgTime(state.allMessages,group.id) !== undefined ?
                                                                        <div className="pt-2" style={{float:"right",width:"300px"}}>
                                                                        <span className="pt-2" style={{color:"green",fontSize:"12px",marginLeft:"50%"}}> {getLastMsgSendBy(state.allMessages,group.id) }:</span>
                                                                        <span  style={{color:'gray',float:"right",display: "inline-block",width: "180px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}} 
                                                                           >{getLastMsg(state.allMessages,group.id)}
                                                                           <q className="pt-2" style={{color:'grey',fontSize:"8px"}}>
                                                                            {getLastMsgTime(state.allMessages,group.id)}</q>
                                                                           </span>
                                                                        </div> :""} */}

                                                                    {/* <div style={{marginRight: "2%", marginTop: "5px"}}>
                                                                        {getLastMsgTime(state.allMessages,group.id) !== undefined ?
                                                                        <span><q className="pt-2" style={{color:'grey',fontSize:"8px"}}>
                                                                            {getLastMsgTime(state.allMessages,group.id)}</q></span>: ""}
                                                                        </div> */}


                                                                    <button type="button" style={{ backgroundColor: 'transparent', border: "0", marginLeft: 10, width: '10px', padding: "0" }} >
                                                                        {
                                                                            getMessagesCount(group.id, state.allMessages, getUser.user.empId)
                                                                        }
                                                                    </button>
                                                                    <div className="dropdown show" style={{ cursor: 'pointer', marginLeft: 15, marginRight: 15, padding: '5px', marginTop: 22 }}>
                                                                        {/* eslint-disable-next-line */}
                                                                        <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                                                            <img src="images/common/actionmenu.png" title={ACTION_ICON} alt="logo" style={{ width: '15px', height: '15px', borderRadius: '0' }} />
                                                                        </a>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ backgroundColor: 'transparent', border: '0' }}>
                                                                            <div>
                                                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#76C54E", color: 'white' }}
                                                                                    onClick={(event) => handleOpen("modify", group)}
                                                                                >{EDIT_GROUP}</button>
                                                                                <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "#203B5A", color: 'white' }}
                                                                                    onClick={(event) => handleOpen("exit", group)}
                                                                                >Exit</button>
                                                                                {group.created_by === getUser.user.userName && group.group_name !== getUser.user.corp ?
                                                                                    <button className="dropdown-item badge badge-pill badge-warning text-center" style={{ backgroundColor: "rgb(99, 4, 54)", color: 'white' }}
                                                                                        onClick={(event) => handleOpen("delete", group)}
                                                                                    >Delete</button>
                                                                                    : ""}
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }) : null}

                                            {chatOpen ? (
                                                <ChatBox
                                                    open={chatOpen}
                                                    handleClose={handleChatClose}
                                                    data={cardInfo}
                                                    handleModalClose={handleChatClose}
                                                />
                                            ) : null}
                                            {
                                                open.action === "modify" ?
                                                    <EditGroup open={open.status}
                                                        handleClose={handleClose}
                                                        data={cardInfo}
                                                        handleModalClose={handleModalClose}
                                                    /> : null}
                                            {
                                                open.action === "delete" || open.action === "exit" ?
                                                    <DeleteGroup open={open.status}
                                                        handleClose={handleClose}
                                                        data={cardInfo}
                                                        handleModalClose={handleModalClose}
                                                    /> : null}
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