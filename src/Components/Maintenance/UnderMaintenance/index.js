import React, { useState, useReducer, useEffect } from 'react';
import UM from '../images/UM.png';
import { maintenanceReducer, serverInitialState } from './maintenanceReducer';
import { Redirect, Link } from 'react-router-dom';


function UnderMaintenance() {
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [state] = useReducer(maintenanceReducer, serverInitialState)
    useEffect(() => {
        setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    window.location.href = "/"
                    //   clearInterval(myInterval)
                } else {
                    setSeconds(59)
                    setMinutes(minutes - 1)
                }
            }
        }, 1000);
    });
    if (state.server.value === "not connected") {
        // console.log(JSON.stringify(state.server.value))
        setSeconds(seconds + 30)
    }
    if (state.server.value === "connected") {
        // console.log(JSON.stringify(state.server.value))
        return <Redirect to="/" />
    }
    return (
        <div>
            <div style={{ margin: 'auto', display: 'block', padding: '50px', marginLeft: '100' }}>
                <Link to='/' > Reload .....  in {minutes}:{seconds} </Link>
                {/* <p onClick={() => reload()} >Reload.....</p> <h6> in { minutes }:{ seconds }</h6> */}
            </div>
            <div className="rounded mx-auto d-block text-center">
                <img src={UM} alt="404-Errorimg" style={{ margin: 'auto', display: 'block', padding: '50px' }} />
            </div>
        </div>
    );

}

export default UnderMaintenance;