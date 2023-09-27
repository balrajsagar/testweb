/* 
FileName:index.js
purpose:collabrative drawing board
Developers:Satya Sidda[SS]
*/
import React, { useState, useEffect, useReducer } from 'react';
// import SideBar from '../Utility/SideNav';
// import TopNav from '../Utility/TopNav'
import DrawingBoard from 'react-drawing-board';
import { tasksReducer, initialState } from './taskReducer';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { updateMuralBoard } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import SideBar from '../Utility/SideNav';
import TopNavWithOutProject from '../Utility/TopNav/topnav'
import { getToken, setToken } from '../../Common/LocalStorage';



function WhiteBoard(props) {

  // var data = {
  //   muralName: props.location.state.name,
  //   drawingData: props.location.state.drawingData,
  //   id: props.location.state.id
  // }

  // setToken('muralName', data.muralName)
  // setToken('drawingData', data.drawingData)
  // setToken('id', data.id)


  const getUser = useSelector(state => state.auth)
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [operations, setOperations] = useState(JSON.parse(getToken('drawingData')));

  const socket = io("http://71.40.116.146:31155/", { query: { token: getUser.user.corp.concat(getToken('id')) } });

  const [socketId, setSocketId] = useState()
  
  var myJSONString = JSON.stringify(operations);
  // to escape escape stings in json of drawing data
  var myEscapedJSONString = myJSONString.replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");


  

//socket code for colloborative boards
  useEffect(() => {
    socket.on(getUser.user.corp.concat(getToken('id')), data => {
      setOperations(data)
    })

    // eslint-disable-next-line
  }, [socketId])

  useEffect(() => {
    socket.on('connection-success', success => {
      setSocketId(success.success)
      socket.emit('socked-id', success.success)
    })
    // eslint-disable-next-line
  }, [])

  // console.log(socketId)
  function Drawing() {

    return (
      <DrawingBoard
        operations={operations}
        //on changing in drawing board data will collobrate and will change in drawing board
        onChange={(newOperation, afterOperation) => {
          setOperations(afterOperation);
          setTimeout(function () {
            socket.emit(getUser.user.corp.concat(getToken('id')), afterOperation);

          }, 1000)
        }}
        //for saving the drawing board when clicking on save button
        onSave={() => {
          updateMuralBoard(state, dispatch, getUser.user, getToken('id'), myEscapedJSONString)
          setToken('drawingData', myEscapedJSONString)
        }}
      />

    )
  }

  return (
    <div className="container-scroller">
      <TopNavWithOutProject />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel">
          <div className="mt-2">
            <div className="col-lg-12 grid-margin stretch-card">
              {/* <div style={{ flexDirection: 'column' }}>
      <h2 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent', marginTop: '20px', textTransform: 'capitalize' }}>{data.muralName}-MuralBoard</h2> */}
              {state.isLoading ? <RootLoader /> : <Drawing />}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhiteBoard;