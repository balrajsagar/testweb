import React from 'react'

export default function RootLoader() {
    return (
        // <div className="loader">
        //     <div className="h-100 d-flex justify-content-center">
        //         <div className="align-self-center">
        //             <img src="assets/img/loader/loader.svg" alt="loader" />
        //         </div>
        //     </div>
        // </div>

        // <div className="preloader">
        //     <div className="lds-ripple">
        //         <div className="lds-pos"></div>
        //         <div className="lds-pos"></div>
        //     </div>
        // </div>
        // <div class="container-scroller">
        //     <div class="container-fluid page-body-wrapper full-page-wrapper " >
        // container d-flex justify-content-center 
        <span className="container d-flex justify-content-center text-center pt-3">
            <span className="spinner-grow text-primary" role="status" style={{marginTop:'-10px'}}>
                <span className="sr-only">Loading...</span>
            </span>
        </span>
        // </div>
        // </div>
    )
}