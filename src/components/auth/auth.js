import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Auth = () => {

    const location = useLocation();

    return (
        <>
            <Link style={{ textDecoration: "none" }} to="/">
                <FontAwesomeIcon icon={faArrowLeft} className="previous-button" />
            </Link>
            <div className="welcome-container">
                {location.pathname.replace('/','') === 'login' ? <Login/> : <Register /> }
            </div>
            <p className="welcome-footer">
                {location.pathname.replace('/','') === 'login' ? "Don't have an account." : "Already have an Account?"}
                <strong style={{ color: "#E58C8A" }}>
                <Link
                    to={location.pathname.replace('/','') === 'login' ? '/register' : '/login'}
                    style={{ textDecoration: "none", color: "inherit",marginLeft: '5px'  }}
                >
                {location.pathname.replace('/','') === 'login' ? 'Register' : 'Login'}
                </Link>
                </strong>
            </p>
        </>
    )
}

export default Auth;
