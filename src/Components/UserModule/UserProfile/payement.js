/* 
FileName:addToSprint.js
purpose:Paypal Payment
Developers:Satya Sidda[SS]

 */
import React, { useReducer, useEffect, useState } from 'react'
import ReactDOM from "react-dom"
import { useSelector } from 'react-redux';
import { reducer, initialState } from './reducer'
import { getProfile, payement, paidGenerateLicense } from './network';
import RootLoader from '../../Common/Loader/RootLoader';
// import { Redirect } from 'react-router-dom';
import TopNav from '../Utility/TopNav'
import SideBar from '../Utility/SideNav';
import AdminTopNav from '../../AdminModule/Utility/TopNav';
import AdminSideBar from '../../AdminModule/Utility/SideNav';




//intializing paypal button
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Payement() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getUser = useSelector(state => state.auth)
  // const [redirect, setRedirect] = useState(false);
  const [payementtype, setPayementtype] = useState({ 'type': 'NA', 'amount': '0','valid':'NA' });

  useEffect(() => {
    getProfile(dispatch, getUser.user);
    // eslint-disable-next-line
  }, [])
  const handleClose=()=>{
    getProfile(dispatch, getUser.user);
  }
  // if (redirect) {
  //   return <Redirect to="/sprints" />
  // }
//taking the payment details
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: 'License for new projects',
          amount: {

            value: payementtype.amount,
          },
        },
      ],
    });
  };
//after payment is done by the user,the below method will approve is it is failed for success
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      if (details.status === "COMPLETED") {

        payement(state, dispatch, getUser.user, details.purchase_units[0].payments.captures[0].id, details.id,payementtype.valid,handleClose)
        // setRedirect(true)
      }
      else {
        alert('Transaction Failed')
      }
    })


  };
  return (
    <div>
    {(getUser.user.role === 'Admin' || getUser.user.role === 'admin')?<AdminTopNav/>:<TopNav />}
    <div className="container-fluid page-body-wrapper">

    {(getUser.user.role === 'Admin' || getUser.user.role === 'admin')?<AdminSideBar/>:<SideBar/>}
      {state.isLoading ? <RootLoader /> : <div style={{ marginLeft: '30px' }}>
      
        {state.free_licenses.value === '0' ? <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" value='FREE' id="FREE"
            onChange={(e) => setPayementtype({ 'type': e.target.value,'valid':'FREE' })}
          />
          <label className="form-check-label" for="FREE">
          <b> FREE UPGRADE</b>
          </label>
        </div> : null}
        <div className="form-check mt-1">
          <input className="form-check-input" type="radio" name="flexRadioDefault" value='PAID' id="MONTHLY"
            onChange={(e) => setPayementtype({ 'type': e.target.value, 'amount': '9.99','valid':'MONTHLY'})}
          />
          <label className="form-check-label" for="MONTHLY">
            <b>$9.99/Month(Monthly)</b>
          </label>
        </div>
        <div className="form-check mt-1">
          <input className="form-check-input" type="radio" name="flexRadioDefault" value='PAID' id="ANNUAL"
            onChange={(e) => setPayementtype({ 'type': e.target.value, 'amount': '99.99','valid':'ANNUAL'})}

          />
          <label className="form-check-label" for="ANNUAL">
          <b> $99.9/Year(Annual)</b>
          </label>
        </div>
        {
          payementtype.type === 'FREE' && state.free_licenses.value === '0' ?
            <button className='btn btn-primary' style={{ marginTop: '30px' }} onClick={() => { paidGenerateLicense(state, dispatch, getUser.user,'NA',payementtype.valid,handleClose) }}>submit</button> :
            payementtype.type === 'PAID' ?
              <div style={{ marginTop: '30px' }}>
                {/* <b>Username:sb-e96ea10608658@personal.example.com              </b>
                <b>Password:ZJ2x5hs-</b> */}
                <PayPalButton 
                  createOrder={(data, actions) => createOrder(data, actions)}
                  onApprove={(data, actions) => onApprove(data, actions)} />
              </div> : null
        }
      </div>}
      </div>
    </div>
  );
}
