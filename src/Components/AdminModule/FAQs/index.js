import React, { useReducer, useEffect, useState } from 'react';
import SideBar from '../Utility/SideNav';
import Header from '../../Common/TopNav';
import { initialState, reducer } from './reducer';
import API from "../../Common/Network/API";
import { isLoading, isLoaded } from "./action";
import Alert from '../../Common/Alert';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
// import RootLoader from '../../Common/Loader/RootLoad';

// add faqs
export default function FAQs() {
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // getApp(dispatch)
  }, [])
  // get all faqs
  const [inputFields, setInputFields] = useState([
    {
      id: uuidv4(),
      ques1: '', ans1: ''
    }]);

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields(
      [...inputFields, {
        id: uuidv4(),
        ques1: '', ans1: ''
      }])
  }
  var dict = [];
  dict.push(

    inputFields.map(i => {
      return (
        [{ key: i.ques1, value: i.ans1 },
        ])
    }))
  // for adding faqs
  const submitData = async (dictt, dispatch) => {
    dispatch(isLoading());
    const result = [...new Set([].concat(...dictt[0]))]
    try {
      var response = await API.post("faqs.php", {
        data: result,
        action: 'add',
      }, {}, false);
      if (response.status === 'True') {
        Alert("success", "Added Successfully!");
        setInputFields([
          {
            id: uuidv4(),
            ques1: '', ans1: ''
          }])
      }
    } catch (error) {
      Alert("error", error.message);
      dispatch(isLoaded());
    }
    dispatch(isLoaded());
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
                    <h2 className="card-title" style={{ overflowWrap: "break-word", color: 'blue', backgroundColor: 'transparent' }}>FAQ's</h2>
                  </div>
                  <button type="button" data-dismiss="modal" class="btn btn-warning" style={{ borderRadius: '20px', marginLeft: '80%' }}
                  ><Link to={{ pathname: "/admin/details" }} style={{ color: 'white', textDecoration: 'none' }}>View Details</Link></button><br /><br />
                  <br />
                  {/* {state.isLoading ? <RootLoader /> :  */}
                  <form >
                    {inputFields.map((inputField, sr) => {
                      sr *= 1
                      return (
                        <div key={inputField.id}>

                          <div className="form-group row">
                            <label for="ques1" className="col-form-label pt-3 mr-2" >{sr + 1}.</label>
                            <label for="ques1" className="col-form-label pt-3" ><i class="fa fa-quora" aria-hidden="true"></i>Question:</label>
                            <input type="text" className="form-control col-10 ml-3 ques"
                              style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                              id="ques1" placeholder="Enter Question " name="ques1"
                              value={inputField.ques1}
                              onChange={event => handleChangeInput(inputField.id, event)} />
                          </div>
                          <div className="form-group row">
                            <label for="ans1" className="col-form-label pt-3 ml-4">Answer:</label>
                            <input type="text" className="form-control col-10 ml-4 ans"
                              style={{ backgroundColor: 'transparent', borderBottom: '1px solid black', borderTop: '0px', borderLeft: '0px', borderRight: '0px' }}
                              id="ans1" placeholder="Enter Answer" name="ans1"
                              value={inputField.ans1}
                              onChange={event => handleChangeInput(inputField.id, event)} />
                          </div><br />

                        </div>
                      )
                    })}
                  </form>
                  {/* } */}

                  <button
                    className="btn btn-success" style={{ marginLeft: '35%', width: "10%" }} type="button"
                    onClick={handleAddFields}
                  >Add More</button>

                  {/* {state.isLoading ? <RootLoader /> : */}
                  <button
                    className="btn btn-primary" style={{ marginLeft: '5%', width: "10%" }} type="button"
                    onClick={(event) => { submitData(dict, dispatch) }}
                  >Submit</button>
                  {/*   } */}
                  <br /><br /><br /><br />


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}