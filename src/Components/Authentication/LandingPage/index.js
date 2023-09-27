import React, { useState, useEffect, useReducer } from 'react';
import './style.scss';
import { Redirect, Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ChatBot from '../../Common/chatbot';
import { APP_NAME, CONTENT1, FOOTER_CONTENT1, FOOTER_SUB_CONTENT1, IMAGE_CONTENT1, IMAGE_CONTENT2, IMAGE_CONTENT3, IMAGE_CONTENT4, IMAGE_SUB_CONTENT1, IMAGE_SUB_CONTENT2, IMAGE_SUB_CONTENT3, IMAGE_SUB_CONTENT4, IMG_SRC, SUB_CONTENT1 } from '../../Common/Headers';
import { landingReducer, initialState } from './landingReducer';
import { getProps, getWebProps } from './network'

import OneSignal from 'react-onesignal';
import { setToken } from '../../Common/LocalStorage';
import { useSelector } from 'react-redux';


export default function LandingPage() {
  //   var properties={
  //     "MODULES" : "Sprint",
  //     "MAINTASKS" : "User Story",
  //     "SUBTASKS" : "Task",
  //     "PROJECT" : "Epic",
  //     "BACKLOG" : "Backlog",
  //     "WHITEBOARD" : "WhiteBoard",
  //     "AGILE":"Agile",
  //     "USER_STORIES":"User Stories",
  //     "ROADBLOCKS":"Roadblock",
  //     "ARCHIVE":"Archive",
  //     "STORY_POINTS":"Story Points",
  //     "SPRINT_CYCLE":"Sprint Cycle",
  //     "ACCEPTANCE_CRITERIA":"Acceptance Criteria",
  //     "SQUAD":"Squad",
  //     "PRIORITY_LEVEL":"Priority Level",
  //     "SPRINT_VELOCITY" :"Sprint Velocity",
  //     "BURN_UP_REPORT" :"Burn Up Report",
  //     "BURN_DOWN_REPORT" :"Burn Down Report",
  //     "INDIVIDUAL_VELOCITY" :"Individual Velocity",
  //     "EPIC_VELOCITY": "Epic Velocity",
  //     "INDIVIDUAL_WORKLOAD" :"Individual Workload",
  //     "AGILE_PROJECT_NAME":"Agile Project Name"
  // }
  // setToken('properties', JSON.stringify(properties))
  const [state, dispatch] = useReducer(landingReducer, initialState)
  const webProperties = useSelector(state => state.landingReducer.webProperties)
  const properties = useSelector(state => state.landingReducer.properties)
  //eslint-disable-next-line
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState({})
  useEffect(() => {

    getProps(state, dispatch);
    getWebProps(state, dispatch)
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    const body = document.querySelector('#root');
    body.scrollIntoView({
      // behavior: 'smooth'
    }, 500)

  }, []);
  useEffect(() => {
    OneSignal.init({
      // appId: "abea56d5-c615-4e38-b9f3-c5f2da474622"//local
      // appId:"6323dec8-20d5-433e-a75c-00734e5f583f"
      appId: "96acfefa-5ee1-4f3c-a6f9-64610c360c56",//Production
    });
  }, []);

  OneSignal.isPushNotificationsEnabled();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  OneSignal.getUserId().then(function (userId) {
    // console.log("OneSignal User ID:", userId);
    setToken('player_id', userId) //store the token information  with exp
  });


  if (redirect) {
    return <Redirect to="/" />
  }

  const arrowStylesleft: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    // cursor: 'pointer',
    marginLeft: '-20px',
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  };
  const arrowStylesright: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    marginRight: '-17px',
    // cursor: 'pointer',
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  };

  return (
    <div>

      <ChatBot />
      <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{ backgroundColor: "white" }}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* eslint-disable-next-line */}
          <a className="navbar-brand"><Link to={{ pathname: "/" }}>
            {state.isLoading ? <div></div> : <img src={properties?.IMG_SRC || IMG_SRC} width="170" alt="" />}</Link>
          </a>
          <form className="form-inline my-2 my-lg-0 ml-auto" style={{ paddingTop: "16px" }}>
            {/* <!-- <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> --> */}
            {/* eslint-disable-next-line */}
            <a className="btn my-2 my-sm-0 mr-1" id="loginbtn" type="submit"><Link style={{ color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }} to={{ pathname: "/login" }}>Login</Link></a>
            {/* support page button */}
            <div class="dropdown ml-2">
              <button class="btn btn-success my-sm-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b', height: 35 }}>
                Support
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ backgroundColor: 'white' }}>
                <Link class="dropdown-item" style={{ color: 'black' }} to={{ pathname: "/release" }}>Release Notes</Link>
                <Link class="dropdown-item" style={{ color: 'black' }} to={{ pathname: "/contact" }}>Contact us</Link>
                <Link class="dropdown-item" style={{ color: 'black' }} to={{ pathname: "/reportBug" }}>Report Bug</Link>
                <Link class="dropdown-item" style={{ color: 'black' }} to={{ pathname: "/faqs" }}>FAQ</Link>
                <Link class="dropdown-item" style={{ color: 'black' }} to={{ pathname: "/privacyPolicy" }}>Privacy Policy</Link>
                {/* <Link class="dropdown-item" style={{ color: 'black' }} to={{ pathname: "/homeProperties" }}>Properties</Link> */}

              </div>
            </div>

            {/* eslint-disable-next-line */}
            <a className="btn my-2 my-sm-0" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b', height: 35 }} id="signupbtn" type="submit"><Link style={{ color: 'white' }} to={{ pathname: "/register" }}>Get Started {">"} </Link></a>

          </form>
        </div>
      </nav>

      <section id="sec1" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
        {/* <!-- 2 col main data --> */}
        <div className="container">
          <div className="row pt-3">
            <div className="col-sm-6">
              <h1 id="head1" style={{color: webProperties?.CONTENT1_COLOR}}>{webProperties?.CONTENT1 || CONTENT1}</h1>

            </div>
            <div className="col-sm-6">
              <center><img src={webProperties?.CONTENT1_IMAGE !== "CONTENT1_IMAGE" ? webProperties?.CONTENT1_IMAGE : "images/common/AGILEBG4.png"} width="500" height="333" alt="Task" /></center>
              <p id="con1" style={{color: webProperties?.SUB_CONTENT1_COLOR}}>{webProperties?.SUB_CONTENT1 || SUB_CONTENT1}</p>
            </div>
          </div>

          <form method="get" className="form-inline pt-3 pb-3" style={{ marginLeft: "25%" }}>
            <div className="input-group mb-2 mr-sm-1 inwid">

              <input type="text" className="form-control" name="email" id="inlineFormInputGroupUsername" placeholder="Email" onChange={e => handleChange(e)} />
            </div>

            <button type="submit" className="btn mb-2" id="btn1"><Link style={{ color: 'white' }} to={{ pathname: "/register", data: data.email }}>Get Started - It's Free</Link></button>
          </form>
        </div>
      </section>

      <section id="sec2">
        <div className="container">
          <div className="row pt-4">
            <div className="col-sm" id="imgtop">
              <img className="w-100" src={webProperties?.IMAGE1 !== "IMAGE1" ? webProperties?.IMAGE1 : "images/common/ActiveSprintv2.0.7.png"} alt="Task" />
            </div>

            <div className="col-sm ml-4">
              <h2 id="head3" style={{color: webProperties?.IMAGE_CONTENT1_COLOR}}>{webProperties?.IMAGE_CONTENT1 || IMAGE_CONTENT1}</h2>

              <p id="con3" style={{color: webProperties?.IMAGE_SUB_CONTENT1_COLOR}}>{webProperties?.IMAGE_SUB_CONTENT1 || IMAGE_SUB_CONTENT1}</p>
              {/* eslint-disable-next-line */}
              <a style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }} className="btn my-2 my-sm-0" id="strtdngbtn" type="submit"><Link style={{ color: 'white', fontSize: '15px' }} to={{ pathname: "/register" }}>Start Doing</Link></a>
            </div>

          </div>
        </div>
      </section>

      <section id="sec3">
        <div className="container">
          <div className="row pt-3">
            <div className="col-sm">
              <h2 id="head2" style={{color: webProperties?.IMAGE_CONTENT2_COLOR}}>{webProperties?.IMAGE_CONTENT2 || IMAGE_CONTENT2}</h2>
              <p id="con2" style={{color: webProperties?.IMAGE_SUB_CONTENT2_COLOR}} >{webProperties?.IMAGE_SUB_CONTENT2 || IMAGE_SUB_CONTENT2}</p>
            </div>
            <div className="col-sm ml-4" id="imgtop" >
              <img className="w-100" src={webProperties?.IMAGE2 !== "IMAGE2" ? webProperties?.IMAGE2 : "images/common/backlogv2.0.7.png"} width="500" alt="task" />
            </div>

          </div>
        </div>
      </section>

      <section id="sec4">
        <div className="container">
          <div className="row pt-3">
            <div className="col-sm" id="img3">
              <img src={webProperties?.IMAGE3 !== "IMAGE3" ? webProperties?.IMAGE3 : "images/common/sidenavv2.0.7.png"} width="180" style={{ marginLeft: '150px' }} alt="task" />
            </div>
            <div className="col-sm ml-4">
              <h2 id="head2" style={{color: webProperties?.IMAGE_CONTENT3_COLOR}}>{webProperties?.IMAGE_CONTENT3 || IMAGE_CONTENT3}</h2>
              <p id="con2" style={{color: webProperties?.IMAGE_SUB_CONTENT3_COLOR}}>{webProperties?.IMAGE_SUB_CONTENT3 || IMAGE_SUB_CONTENT3}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sec4">
        <div className="container">
          <div className="row pt-3">

            <div className="col-sm">
              <h2 id="head2" style={{color: webProperties?.IMAGE_CONTENT4_COLOR}}>{webProperties?.IMAGE_CONTENT4 || IMAGE_CONTENT4}</h2>
              <p id="con2" style={{color: webProperties?.IMAGE_SUB_CONTENT4_COLOR}}>{webProperties?.IMAGE_SUB_CONTENT4 || IMAGE_SUB_CONTENT4}</p>
            </div>
            <div className="col-sm ml-4" id="imgtop">
              <img style={{ width: '100%' }} src={webProperties?.IMAGE4 !== "IMAGE4" ? webProperties?.IMAGE4 : "images/common/backlogv2.0.7.png"} alt="task" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ marginTop: "3%" }}>
          <h2 className="carousel-heading">How It Works</h2>
          {
            webProperties?.IMAGE_SLIDER !== "IMAGE_SLIDER" &&
            <Carousel autoFocus={true} showThumbs={false} showStatus={false} showArrows={true} useKeyboardArrows className="presentation-mode"
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStylesleft, left: 15, fontSize: '35px', fontWeight: 'bolder', color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
                    {"<"}
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button onClick={onClickHandler} title={label} style={{ ...arrowStylesright, right: 15, fontSize: '35px', fontWeight: 'bolder', color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
                    {">"}
                  </button>
                )
              }
            >
              {
                webProperties?.IMAGE_SLIDER?.map((x, i) => {
                  return <>
                    <div key={`content-${i}`} className="my-slide primary">
                      <img id="imgcarousel" src={x?.base64} alt={webProperties.APP_NAME} />
                    </div>
                  </>
                })
              }
            </Carousel>

          }
          {
            webProperties?.IMAGE_SLIDER === "IMAGE_SLIDER" &&
            (<Carousel autoFocus={true} showThumbs={false} showStatus={false} showArrows={true} useKeyboardArrows className="presentation-mode"
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStylesleft, left: 15, fontSize: '35px', fontWeight: 'bolder', color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
                    {"<"}
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button onClick={onClickHandler} title={label} style={{ ...arrowStylesright, right: 15, fontSize: '35px', fontWeight: 'bolder', color: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
                    {">"}
                  </button>
                )
              }
            >
              <div key="content-0" className="my-slide primary">
                <img id="imgcarousel" src="images/common/agc-1.png" alt=" not found" />
              </div>
              <div key="content-1" className="my-slide secondary">
                <img id="imgcarousel" src="images/common/agc-2.png" alt=" not found" />
              </div>
              <div key="content-2" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-3.png" alt=" not found" />
              </div>
              <div key="content-3" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-4.png" alt=" not found" />
              </div>
              <div key="content-4" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-5.png" alt=" not found" />
              </div>
              <div key="content-5" className="my-slide secondary complex">
                <img id="imgcarousel" src="images/common/agc-6.png" alt=" not found" />
              </div>
              <div key="content-6" className="my-slide secondary">
                <img id="imgcarousel" src="images/common/agc-7.png" alt="not found" />
              </div>
              <div key="content-7" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-8.png" alt=" not found" />
              </div>
              <div key="content-8" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-9.png" alt=" not found" />
              </div>
              <div key="content-9" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-10.png" alt="not found" />
              </div>
              <div key="content-10" className="my-slide secondary complex">
                <img id="imgcarousel" src="images/common/agc-11.png" alt="not found" />
              </div>
              <div key="content-11" className="my-slide secondary">
                <img id="imgcarousel" src="images/common/agc-12.png" alt="not found" />
              </div>
              <div key="content-12" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-13.png" alt="not found" />
              </div>
              <div key="content-13" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-14.png" alt="not found" />
              </div>
              <div key="content-14" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-15.png" alt="not found" />
              </div>
              <div key="content-15" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-16.png" alt="not found" />
              </div>
              <div key="content-16" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-17.png" alt="not found" />
              </div>
              <div key="content-17" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-18.png" alt="not found" />
              </div>
              <div key="content-18" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-19.png" alt="not found" />
              </div>
              <div key="content-19" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-20.png" alt="not found" />
              </div>
              <div key="content-20" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-21.png" alt="not found" />
              </div>
              <div key="content-21" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-22.png" alt="not found" />
              </div>
              <div key="content-22" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-23.png" alt="not found" />
              </div>
              <div key="content-23" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-24.png" alt="not found" />
              </div>
              <div key="content-24" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-25.png" alt="not found" />
              </div>
              <div key="content-25" className="my-slide content">
                <img id="imgcarousel" src="images/common/agc-26.png" alt="not found" />
              </div>
            </Carousel>
            )
          }
          {/* <div className="video-box align-self-baseline" data-aos="fade-up" data-aos-delay="100">
        <img src="images/common/landing-new.png" className="img-fluid" alt="certificate"/>
        <a href="https://www.youtube.com/watch?v=EfkTcFhMLiw" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true">.</a>
    </div> */}

        </div>
      </section >

      <section id="sec5" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
        <div className="container" >
          <h1 style={{ color: webProperties?.FOOTER_CONTENT1_COLOR }}>{webProperties?.FOOTER_CONTENT1 || FOOTER_CONTENT1}</h1>
          <p style={{ color: webProperties?.FOOTER_SUB_CONTENT1_COLOR }}>{webProperties?.FOOTER_SUB_CONTENT1 || FOOTER_SUB_CONTENT1}</p>
          {/*  eslint-disable-next-line */}
        </div>

      </section>

      <footer id="footer" >
        <div>
          {webProperties?.APP_NAME || APP_NAME} © Copyright {new Date().getFullYear()}. All Rights Reserved.
        </div>

      </footer>
    </div >

  )
}