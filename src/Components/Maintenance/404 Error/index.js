import React, { useEffect } from 'react';
import { clearToken } from '../../Common/LocalStorage';
import Error1 from '../images/Error1.png'

function Error() {

    useEffect(() => {
        setTimeout(() => {
            clearToken()
            window.location.href = "/"
        })
    }, [])

    return (
        <div className="rounded mx-auto d-block text-center">
            <img src={Error1} alt="404-Errorimg" style={{ padding: '50px' }} />
        </div>
    );

}

export default Error;