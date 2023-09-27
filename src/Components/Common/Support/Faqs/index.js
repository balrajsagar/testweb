import React, { useState,useEffect, useReducer } from 'react';
import '../../../Authentication/LandingPage/style.scss';
import { Link } from 'react-router-dom';
import Faq from "react-faq-component";
import { getDetails } from './network';
import { initialState, reducer } from './reducer';
import { APP_NAME, IMG_SRC } from '../../Headers';
import { useSelector } from 'react-redux';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader



const styles = {
    // bgColor: 'white',
    titleTextColor: "blue",
    rowTitleColor: "blue",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function FAQs() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const webProperties = useSelector(state => state.landingReducer.webProperties)
    const properties = useSelector(state => state.landingReducer.properties)
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        getDetails(dispatch)
    }, [])

    var rows = state.appDetails
        .filter((faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase())|| faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((faq) => ({
            title: `Q) ${faq.question}`,
            content: faq.answer,
        }));
    var details = { rows };
    //   console.log("in",details)


    // const data = {
    //     rows: [
    //         {
    //             title: " Q) How Can I invite people to join my Group? ",
    //             content: `You can go to add agile squad member and add a resource to your project.
    //             If you would like the squad member to be added to multiple projects, you can do it by selecting all the different projects you want to add them to.`,
    //         },
    //         {
    //             title: " Q) Why Agile2x7?",
    //             content:"It is very simple to use <br/>Task level collaboration for any size Team <br/> Prioritize what you and your team want to wok on and get the updates on a daily basis <br/> Follows Agile and Scrum project management <br/>Boards to show you the progress of the task <br/> Chat collaboration on user story level and more <br/> Whiteboards for collocated or offshore teams to work together from the inception of the project <br/> Share Documents, messages, architectures and ideas in one place <br/>Can be used by non IT prfessionals as well",
    //         },
    //         {
    //             title: "Q) Is there a discounted offer?",
    //             content: `Please contact our sales team, we will see how we can help. `,
    //         },
    //         {
    //             title: "Q) How can I change my plan?",
    //             content:"Go to your profile and click payment, you will see all the available options, and you can choose what you want.",
    //         },
    //         {
    //             title: "Q) How can I request features?",
    //             content:"Please go to support and place your request, or talk to our Sales team.",
    //         },
    //     ],
    // };

    return (
        <div>
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

            <section id="section1">
                <div className="container">
                    <div className="release-note mt-3">
                        <div className="d-flex bd-highlight">
                            <div className="p-2 flex-grow-1 bd-highlight text-center"><h2 className="mb-3">Frequently Asked Questions (FAQ's)</h2>
                           <div className='d-flex justify-content-end'> <input className='form-control 'type="search" placeholder="Search FAQs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{width:"30%"}} /></div>
                            </div></div>
                    </div>
                </div>
            </section>
            <div className="container mt-3">
                <div className="accordion p-2" id="accordionExample">
                    <Faq
                        data={details}
                        styles={styles}
                        config={config}
                    />
                </div>
            </div>
            <div style={{ marginTop: '200px' }}></div>
            <footer id="footer-releasenote" style={{ backgroundColor: webProperties?.PRIMARY_COLOR !== "#47974b" ? webProperties?.PRIMARY_COLOR : '#47974b' }}>
                <div style={{color:'white'}}>
                    {webProperties?.APP_NAME || APP_NAME} © Copyright {new Date().getFullYear()}. All Rights Reserved.
                </div>
            </footer>
        </div>
    )
}
