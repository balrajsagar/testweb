/* 
FileName:index.js
purpose:Group Chat
Developers:Rohini
 */
import React, { useEffect, useState, useReducer } from 'react';
import $ from 'jquery';
// eslint-disable-next-line
import SideBar from './sideNav';
import Header from '../Utility/TopNav/topnav';
// import RootLoader from '../../Common/Loader/RootLoader';
import { useSelector } from 'react-redux';
import { getAllMessages, getEmployees, getAllMessagesLast } from './network';
import { reducer, initialState } from './reducer';
import ChatBox from '../../Common/SquadChat';
import { CHAT, SQUAD_MEMBER_NAME } from '../../Common/Headers';
import convertPSTtoLocalTime from '../../Common/convertPSTtoLocalTime';

export default function GroupChat() {

    const getUser = useSelector(state => state.auth)
    const [chatOpen, setChatOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState()
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        getAllMessages(dispatch, getUser.user);
        getEmployees(dispatch, getUser.user)
        getAllMessagesLast(dispatch, getUser.user)
        // eslint-disable-next-line
    }, [])
    // console.log("employees",state.employees)

    const key = 'name';
    // const sortArrayEmp = state.employees.sort((a,b)=>a.sno - b.sno); 
    // console.log("sortArrayEmp",sortArrayEmp)
    // getting array of unique members according to message time
    const arrayUniqueByKey = [...new Map(state.employees.map(item =>
        [item[key], item])).values()].sort((a, b) => b.sno - a.sno);
    //   [item[key], item]).Number(sort((a,b)=>Number(a.sno) - Number(b.sno))).values()];

    // console.log(arrayUniqueByKey);


    // unread messages are if there then that user will be display on top of the list
    const sortedOne = (msg, emp) => {
        const sortedUserIds = msg
            .sort()
            .map(m => m.sendBy)
            .filter(m => m.sendBy !== null)

        const sortedUsers = [...new Set(sortedUserIds)].map(id => emp.find(u => u.id === id))

        const namesToDeleteSet = new Set(sortedUsers);

        const newArr = emp.filter((employee) => {
            return !namesToDeleteSet.has(employee);
        });
        //    const sortedEmployees = [...sortedUsers,...newArr]
        const sortedEmployees = sortedUsers.concat(newArr)
        return sortedEmployees;

    }
    const empSorted = sortedOne(state.allMessages, arrayUniqueByKey);
    // const empSorted = sortedOne(state.allMessages,state.employees);

    const handleOpenChat = (index, action, sno) => {
        console.log("index", index)
        console.log("name", empSorted[index].name)
        setChatOpen(true);
        var info = {
            id: empSorted[index].id,
            employeeId: empSorted[index].employeeId,
            name: empSorted[index].name, action: action,
            designation: empSorted[index].designation,
            email: empSorted[index].email,
            mobile: empSorted[index].mobileNumber,
            userType: empSorted[index].role,
            team: empSorted[index].team,
            reportingManager: empSorted[index].reportingManager,
            functionalManager: empSorted[index].functionalManager,
            userName: empSorted[index].userName,
            userStatus: empSorted[index].workingStatus,
            device_id: empSorted[index].device_id,
            player_id: empSorted[index].player_id,
            sno: sno
        }
        // setInfo(info)
        setCardInfo(info);
    };
    useEffect(() => {
        if (empSorted.length > 0) {
            $(document).ready(function () {
                window.$('#example').DataTable({
                    destroy: true,
                    retrieve: true,
                    fixedHeader: true,
                    "ordering": false
                })
            })
        }
    }, [empSorted])

    const handleChatClose = () => {
        setChatOpen(false);
        getAllMessages(dispatch, getUser.user);
        getEmployees(dispatch, getUser.user)
    };

    const getMessagesCount = (data, msg, emp) => {
        const msgCount = msg.filter(message => message.sendBy === emp.id).map((messages, i) => {
            // eslint-disable-next-line
            return i, messages
        })

        return (
            <i>
                {/* {msgCount.length > 0 ? msgCount.length : null} */}
                {
                    msgCount.length > 0 ?
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-10px" }}
                                onClick={(event) => handleOpenChat(data, "UserChat", msgCount)} />
                            <span style={{ color: 'red', fontWeight: "bold", marginLeft: "-2px" }}>{msgCount.length}</span>
                        </div>
                        :
                        <div className="row">
                            <img src="images/common/chat.svg" title={CHAT} alt="logo" style={{ width: '20px', height: '20px', marginLeft: "-10px" }}
                                onClick={(event) => handleOpenChat(data, "UserChat", msgCount)} />
                        </div>
                }
            </i>
        )
    }
    // console.log("users",getUser.user)
    // console.log("msg",state.allMessagesLast)

    // const getLastMsg = (message, emp) =>{
    //     const groupMsg =  message.filter(msg => msg.sendBy === emp.id || msg.receivedBy === emp.id).map((mg, i ) =>{
    //         return mg.message
    //     });
    //     return groupMsg[groupMsg.length-1]
    // }
    // const getLastMsgTime = (message, emp) =>{
    //   const groupMsg =  message.filter(msg => msg.sendBy === emp.id || msg.receivedBy === emp.id).map((mg, i ) =>{
    //       return  mg.messagedTime
    //   });
    //   return groupMsg[groupMsg.length-1]
    // }

    // console.log("sorted list",empSorted)
    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <SideBar />
                <div className="main-panel">
                    <div className="mt-2">
                        <div className="col-lg-12 grid-margin stretch-card" >
                            <div className="card">
                                <div className="card-body">

                                    <div>
                                        <h2 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent' }}>{CHAT}</h2>
                                    </div>
                                    <div>
                                        {state.employees.length !== 0 ?
                                            <div className="table-responsive">

                                                {/* <MDBTable> */}
                                                <table
                                                    search="true"
                                                    id="example" className="table table-striped table-bordered"
                                                    data-pagination="true"
                                                >
                                                    <thead style={{ backgroundColor: '#F4FAF7', display: "none" }}>
                                                        <tr>
                                                            <th style={{ textTransform: "capitalize", width: '160px' }} >{SQUAD_MEMBER_NAME}</th>
                                                            {/* <th style={{ alignItems:"center" }}>Last msg</th> */}
                                                            <th style={{ width: '20px', alignItems: "center" }}>{CHAT}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            empSorted !== 0 ? empSorted.map((employee, index) => {
                                                                const input = employee.name;
                                                                const [name] = input.split('@');
                                                                return (
                                                                    <tr key={index}>
                                                                        {/* {employee.email !== getUser.user.userName ? : ""} */}
                                                                        <td style={{ textTransform: "capitalize", paddingLeft: "2%", fontSize: "13px", height: "50px" }}>{name}<br /><br />
                                                                            {employee.messaged_time !== null ?
                                                                                <div >
                                                                                    <q style={{ color: 'gray', fontSize: "9px", padding: 2, textTransform: "lowercase" }}>{convertPSTtoLocalTime(employee.messaged_time)}</q>&nbsp;&nbsp;&nbsp;
                                                                                    <span style={{ fontSize: "11px", color: 'gray', padding: 2, display: "inline-block", width: "800px", whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{employee.message}</span>
                                                                                </div> : ""}
                                                                            {/* {getLastMsgTime(state.allMessagesLast, employee) !== undefined || getLastMsgTime(state.allMessagesLast, employee) !== ""? 
                                                                    <div >
                                                                        {getLastMsgTime(state.allMessagesLast, employee) !== undefined || getLastMsgTime(state.allMessagesLast, employee) !== "" || getLastMsgTime(state.allMessagesLast, employee) !== null? 
                                                                    <span style={{color:'gray',fontSize:"8px"}}>{getLastMsgTime(state.allMessagesLast, employee)}</span> : ""}&nbsp;&nbsp;&nbsp;
                                                                    <span style={{fontSize:"11px",color:'gray', display: "inline-block",width: "75%",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis" }}>{getLastMsg(state.allMessagesLast, employee)}</span>
                                                                    </div>: null} */}
                                                                        </td>
                                                                        {/* <td style={{ paddingLeft:"2%", float: "right",borderStyle: "none", paddingTop:"15px" }}>
                                                                        <span style={{color:'gray', display: "inline-block",width: "150px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis" }}>{employee.message}</span>&nbsp;&nbsp;&nbsp;
                                                                        
                                                                        <q style={{color:'gray',fontSize:"8px"}}>{employee.messaged_time}</q>
                                                                    </td> */}
                                                                        <td style={{ width: '8px', height: "35px", paddingLeft: "-10%" }}>
                                                                            <button type="button" style={{ paddingLeft: "-5%", backgroundColor: 'transparent', border: "0", width: '5px', padding: "0", marginLeft: "15px" }} >
                                                                                {getMessagesCount(index, state.allMessages, employee)}</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }) : null}
                                                    </tbody>
                                                </table>
                                                {/* </MDBTable> */}
                                            </div>
                                            : null}

                                        {chatOpen ? (
                                            <ChatBox
                                                open={chatOpen}
                                                handleClose={handleChatClose}
                                                data={cardInfo}
                                                handleModalClose={handleChatClose}
                                            />
                                        ) : null}
                                    </div>
                                    {/* // } */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}