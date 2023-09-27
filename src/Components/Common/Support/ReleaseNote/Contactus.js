import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../Authentication/LandingPage/style.scss';
import { Link } from 'react-router-dom';
import './contact.scss'
import API from '../../Network/API';
import Alert from '../../Alert';
import { isLoaded, isLoading } from '../../Actions/loading';
import RootLoader from '../../Loader/RootLoad'
import { Redirect } from 'react-router-dom';
import { APP_NAME, IMG_SRC, SUPPORT_EMAIL } from '../../Headers';
// import RootLoader from '../../Loader/RootLoad';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function ReleaseNote() {

   const dispatch = useDispatch();
   const [data, setData] = useState({})
   const loaderStatus = useSelector(state => state.loading.status)
   const webProperties = useSelector(state => state.landingReducer.webProperties)
   const properties = useSelector(state => state.landingReducer.properties)

   // eslint-disable-next-line
   const [redirect, setRedirect] = useState(false)
   const handleChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value
      })
   }
   // console.log(data)
   const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log(data)
      dispatch(isLoading());
      if (data.name !== "" && data.emails !== "") {
         try {
            var response = await API.post("contact.php", {
               name: data.name,
               orgname: data.orgname,
               email: data.email,
               phone: data.phone,
               message: data.message,
               action: "contact",
               appName: APP_NAME,
               supportMail: webProperties?.SUPPORT_EMAIL || SUPPORT_EMAIL,
            }, {}, false);
            if (response.status === "True") {
               Alert('success', "Your message was sent successfully.")
               setRedirect(true)
            } else {
               Alert('warning', response.message)
            }
         } catch (err) {
            Alert("error", err.message);
         }
      } else {
         Alert("warning", "Fill All Fields")
      }

      dispatch(isLoaded());
   }
   if (redirect) {
      return <Redirect to="/" />
   }
   return (
      <div >
         <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
               aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
               {/* eslint-disable-next-line */}
               <a className="navbar-brand"><Link to={{ pathname: "/" }}>
                  {/* <img src="images/common/agile2.png" width="170" alt="" /></Link> */}
                  <img className="agile-supportlogo" src={properties?.IMG_SRC || IMG_SRC} width="170" alt="" /></Link>

               </a>
               <form className="form-inline my-2 my-lg-0 ml-auto" style={{ paddingTop: "16px" }}>
                  {/* <!-- <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> --> */}
                  {/* eslint-disable-next-line */}
                  <a className="btn my-2 my-sm-0 ml-auto" id="loginbtn" type="submit"><Link style={{ color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }} to={{ pathname: "/login" }}>Login</Link></a>
                  {/* eslint-disable-next-line */}
                  <a style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }} className="btn my-2 my-sm-0" id="signupbtn-support" type="submit"><Link style={{ color: 'white' }} to={{ pathname: "/" }}>Home </Link></a>
                  {/* support page button */}
               </form>
            </div>
         </nav>


         <section id="contact">
            <div class="container wow fadeInUp">
               <div class="row">
                  <div class="col-md-12 text-center">
                  </div>
                  <p class="section-description"></p>
                  <div class="col-md-12 ">
                     <div class="row">
                        <div class="col-md-5"  >
                           <div style={{ padding: "10px 20px" }}>
                              <div class="contact-head text-uppercase" style={{color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}}>Contact Us</div>
                              <div>Send us a message and we will get back to you.</div><br />
                              <div >
                                 {/* <div class="contact-ourcontact"><i  class="mdi mdi-phone form-content-icon"></i> <b  class="contact-subhead" style={{marginLeft:"-7px"}} >Phone</b>				
					</div>
					<div style={{paddingLeft:"45px"}}><b>US</b>: 845-765-0250</div>
				    <div style={{paddingLeft:"45px"}}><b>International</b>: +1-833-668-4796</div><br/> */}
                                 <div class="contact-ourcontact" ><i style={{color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} class="mdi mdi-email form-icon form-content-icon"></i><b style={{color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} class="contact-subhead" >Email</b>
                                 </div>
                                 <div style={{ paddingLeft: "45px" }}>
                                    <a href={`mailto: ${webProperties?.SUPPORT_EMAIL || SUPPORT_EMAIL}`} rel="noopener noreferrer" target="_blank"><h5 style={{ color: 'black' }}>{webProperties?.SUPPORT_EMAIL || SUPPORT_EMAIL}</h5></a>
                                 </div><br /><br /></div></div>
                        </div>
                        <div class="col-md-7" >
                           <div style={{ padding: "30px 20px 10px" }}>
                              <form id="main-contact-form" class="php-email-form contact__form" >

                                 <div class="mb-3">
                                    {/* {isLoading ?  */}
                                    <div class="alert alert-success contact__msg" style={{ display: "none", color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }} role="alert">
                                       Your message was sent successfully.
                                    </div>
                                    {/* : "" } */}
                                 </div>

                                 <div class="input-group form-group">
                                    <span class="input_group_addon" style={{ padding: "8px", marginRight: "-3px" }}><i style={{color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} class="mdi mdi-account form-icon"></i></span>
                                    <input type="text" class="form-control"
                                       style={{ color: "#555", border: "1px solid #ccc", fontSize: "14px", padding: "6px 12px", borderRadius: "2px", lineHeight: "1.42857143" }} name="name" placeholder="Name" onkeypress="return isNameKey(event)"
                                       onChange={e => handleChange(e)} required />
                                 </div>
                                 <div class="input-group form-group">
                                    <span class="input_group_addon" style={{ padding: "8px", marginRight: "-3px" }}><i style={{color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} class="mdi mdi-office form-icon"></i></span>
                                    <input type="text" class="form-control" name="orgname" style={{ color: "#555", border: "1px solid #ccc", fontSize: "14px", padding: "6px 12px", borderRadius: "2px", lineHeight: "1.42857143" }} placeholder="Organization Name" onkeypress="return isNameKey(event)"
                                       onChange={e => handleChange(e)} required />
                                 </div>
                                 <div class="input-group form-group">
                                    <span class="input_group_addon" style={{ padding: "8px", marginRight: "-3px" }}><i style={{color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} class="mdi mdi-email form-icon"></i></span>
                                    <input id="email" type="email" class="form-control" style={{ color: "#555", border: "1px solid #ccc", fontSize: "14px", padding: "6px 12px", borderRadius: "2px", lineHeight: "1.42857143" }} name="email" placeholder="Email"
                                       onChange={e => handleChange(e)} required />
                                 </div>
                                 <div class="input-group form-group">
                                    <span class="input_group_addon" style={{ padding: "8px", marginRight: "-3px" }}><i style={{color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} class="mdi mdi-phone form-icon"></i></span>
                                    <input type="text" class="form-control" style={{ color: "#555", border: "1px solid #ccc", fontSize: "14px", padding: "6px 12px", borderRadius: "2px", lineHeight: "1.42857143" }} name="phone" maxlength="10" placeholder="Phone"
                                       onChange={e => handleChange(e)} required />
                                 </div>
                                 <div class="input-group form-group">
                                    <span class="input_group_addon" style={{ padding: "8px", marginRight: "-3px", paddingTop: "40px" }}><i style={{color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} class="mdi mdi-message form-icon" ></i></span>
                                    <textarea class="form-control" style={{ height: "95px", color: "#555", border: "1px solid #ccc", fontSize: "14px", padding: "6px 12px", borderRadius: "2px", lineHeight: "1.42857143" }} name="message" id="comment" placeholder="Your Comments"
                                       onChange={e => handleChange(e)} required ></textarea>
                                 </div>


                                 <center>
                                    {(loaderStatus) ? <RootLoader /> :
                                       <input type="submit" onClick={(e) => handleSubmit(e)} value="Submit" name="submit" class="btn apply-button" style={{ fontWeight: "400", fontSize: "15px", height: "36px", backgroundColor : webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b'}} />
                                    }
                                 </center>


                              </form>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* <div>
       <h2 class="about-title" style={{color: "#3e7f82", marginLeft: "9px", fontWeight:"Bold", paddingTop:"40px"}}>Our Locations</h2> 
       </div> */}

                  {/* <div className="col-md-12" style={{paddingTop:"10px"}}>
            <div className="row">
			    
                
                  <div class="col-md-3" style={{textAlign: "left"}}>
                     <div class="info">
                        <h4 style={{fontSize:"20px"}}><b>USA</b></h4>
                        <a href="https://www.google.com/maps/place/Novisync+Solutions,+Inc./@41.5252332,-73.8973484,
                           17z/data=!3m1!4b1!4m5!3m4!1s0x89dd36fc2b8de56d:0x2555a71885c29ebb!8m2!3d41.5252292!4d-73.8951597">
                        <i class="mdi mdi-map-marker" style={{marginLeft:"-10px"}}></i>
                        </a>
                        <div class="address-info" style={{ fontSize:"14px"}}> Novisync Inc<br/>
                          300 Westage Business Center Drive<br/>
                            Suite 400 <br/>
                          Fishkill, New York 12524<br/>
                        </div>
                     </div>
                  </div>

                  <div class="col-md-3" style={{textAlign: "left"}}>
                     <div class="info">
                        <h4 style={{ fontSize:"20px"}}><b>Canada</b></h4>
                        <a href="https://www.google.com/maps/place/Novisync+Canada+Inc./@51.0427268,-114.0661294,17z/
                           data=!3m1!4b1!4m5!3m4!1s0x537170028d449e37:0x4f7ebad05e423b83!8m2!3d51.0427234!4d-114.0639407">
                        <i class="mdi mdi-map-marker" style={{marginLeft:"-10px"}}></i>
                        </a>
                        <div class="address-info" style={{ fontSize:"14px"}}>Novisync Canada Inc<br/>
                           165 Simcoe CI SW<br/> 
                           Calgary, Alberta – T3J 5H2<br/> 
                        </div>
                     </div>
                  </div>

                  <div class="col-md-3" style={{textAlign: "left"}}>
                     <div class="info">
                        <h4 style={{fontSize:"20px"}}><b>India</b></h4>
                        <a href="https://www.google.com/maps/place/Novisync/@17.4426822,78.3534867,17z/
                           data=!3m1!4b1!4m5!3m4!1s0x3bcb93960b2b11cf:0xb8f7f20043316f04!8m2!3d17.4426771!4d78.3556754"> 
                        <i class="mdi mdi-map-marker" style={{marginLeft:"-10px"}}></i>
                        </a>
                       <div class="address-info" style={{ fontSize:"14px"}}>Novisync Solutions India Pvt. Ltd.<br/>
                           2-37/141, 2nd Floor<br/>
                           Gachibowli Central<br/>
                           Vinayak Nagar, Gachibowli<br/>
                           Hyderabad – 500032<br/>
                        </div>
                     </div>
                  </div>

                  <div class="col-md-3" style={{ textAlign:"left"}}>
                     <div class="info">
                        <h4 style={{ fontSize:"20px"}}><b>South Africa</b></h4>
                        <a href="https://www.google.com/maps/search/Novisync+Solutions+SA+Birchwood+Court,+43+Montrose+St,
                           +Vorna+Valley,Johannesburg,+Gauteng,+South+Africa+%E2%80%93+1686./@-26.0075952,28.1160513,17z/
                           data=!3m1!4b1">
                        <i class="mdi mdi-map-marker" style={{marginLeft:"-10px"}}></i>
                        </a>
                      <div class="address-info" style={{ fontSize:"14px"}}> Novisync Solutions SA<br/>
                       Birchwood Court<br/>
                       43 Montrose St, Vorna Valley Johannesburg<br/>
                      Gauteng, South Africa – 1686<br/>
                        </div>
                     </div>
                  </div>

                  </div>
               </div> */}


               </div>
            </div>
         </section>



         {/* <div className="release-note" >
                <div className="d-flex bd-highlight">
                    <div className="p-2 bd-highlight mt-5 row ml-3">
                    {/* eslint-disable-next-line */}
         {/* <h4>Contact Support : </h4><a href="mailto: support@Task 24X7.com" target="_blank"><h4 style={{color:'blue'}}>support@Task 24X7.com</h4></a>
                    </div>
                </div> 
                </div> */}




         <footer id="footer-releasenote" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
            <div style={{color:'white'}}>
               {webProperties?.APP_NAME || APP_NAME} © Copyright {new Date().getFullYear()}. All Rights Reserved.
            </div>
         </footer>
      </div>
   )
}
