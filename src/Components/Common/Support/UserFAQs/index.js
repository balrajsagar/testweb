import React, { useEffect, useReducer } from 'react';
import '../../../Authentication/LandingPage/style.scss';
// import { Link } from 'react-router-dom';
import Faq from "react-faq-component";
import { getDetails } from './network';
import { initialState, reducer } from './reducer';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import SideBar from '../../../UserModule/SquadChat/sideNav';
import Header from '../../../UserModule/Utility/TopNav/topnav';


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

export default function UserFAQs() {

    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        getDetails(dispatch)
    }, [])

    var rows = [];
    state.appDetails.map((faq) => {
        return rows.push({
            title: `Q) ${faq.question}`,
            content: faq.answer,
        });
    })
    var details = { rows };
    return (
        <>
            <div className="container-scroller">
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <SideBar />
                    <div className="main-panel">
                    <section id="section1">
                <div className="container">
                    <div className="release-note mt-3">
                        <div className="d-flex bd-highlight">
                            <div className="p-2 flex-grow-1 bd-highlight text-center"><h2 className="mb-2">Frequently Asked Questions (FAQ's)</h2></div></div>
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
                    </div>
                </div>
            </div>
    </>
   )
}
