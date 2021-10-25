import React from 'react';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorModal = (message,showErrors) => {
    return (
        <div className='error-bar' style={{right: showErrors ? '20px' : '-100%'}}>
            <FontAwesomeIcon icon={faExclamationCircle} className='error-bar-icon' />
            <p className='error-bar-text'>{message}</p>
        </div>
    )
}

export default ErrorModal;
