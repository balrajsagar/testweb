/* 
FileName:index.js
purpose:existing drawing board data
Developers:Satya Sidda[SS]
*/
import React, { useState, useEffect, useReducer } from 'react';
import SideBar from '../Utility/SideNav';
import TopNav from '../Utility/TopNav'
import { tasksReducer, initialState } from './taskReducer';
import { useSelector } from 'react-redux';
import AddNewMural from './addMuralBoard';
import { muralBoards } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
import { Link } from 'react-router-dom';
import { setToken} from '../../Common/LocalStorage';
import { MURAL_BOARD } from '../../Common/Headers';



function Mural() {
  const getUser = useSelector(state => state.auth)
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [open, setOpen] = useState({ status: false, index: 0 })
  const handleOpen = () => {
    setOpen({ status: true });
  };
  const handleClose = () => {
    setOpen({ status: false, index: 0 })
    muralBoards(dispatch, getUser.user)


  };

  const handleModalClose = () => {
    setOpen({ status: false, index: 0 });

  }
  useEffect(() => {
    //to bring data for existing drawing boards
    muralBoards(dispatch, getUser.user)
    // eslint-disable-next-line
  }, [])


function getvalues(muralName,data,id){
 
  setToken('muralName', muralName)
  setToken('drawingData', data)
  setToken('id',id)
}
//displaying existing drawing board data
  return (
    <div className="container-scroller">
      <TopNav />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel">
          <div className="mt-2">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-end mb-2 " >
                    <div style={{ flexDirection: 'column' }}>
                      <div style={{ marginLeft: 380 }}>

                        <button style={{ backgroundColor: 'transparent', border: '0' }} type="button" onClick={() => handleOpen()}> <img src="images/common/add.png" title={"Add New "+MURAL_BOARD} alt="logo" style={{ width: '20px', height: '20px' }} /><span className="m-1">New {MURAL_BOARD}</span></button>
                        {
                          <AddNewMural open={open.status} handleClose={handleClose} handleModalClose={handleModalClose}
                          />
                        }

                      </div>



                    </div>


                  </div>
                </div>
                {state.isLoading ? <RootLoader /> : <div class="row" >
                  {state.muralboards.length > 0 ? state.muralboards.map((boards, index) => {
                    return (

                      <div className="col-1" style={{ margin: 10, flexDirection: 'row', flex: 1 }} key={boards.id}>
                        <div  className="card text-center" style={{ height: 80, width: 80, paddingTop: 30,backgroundColor:'teal' }}>
                          
                          <Link onClick={()=>{getvalues(boards.muralName,boards.data,boards.id)}} to={{ pathname: '/whiteboard' }}><b style={{color:'white'}}>{boards.muralName}</b></Link>

                        </div>

                      </div>

                    )

                  }) : null}
                </div>}
              </div>


            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Mural;