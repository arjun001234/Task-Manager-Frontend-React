import React from 'react';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../../Redux/modalsReducer';
import { logoutUser, userDelete } from '../../Redux/userReducer';
import { useHistory } from 'react-router-dom';

const ConfirmModel = ({state}) => {

    const history = useHistory();

    const dispatch = useDispatch();

    const handleRequest = () => {
        if(state.name === 'Delete User'){
            dispatch(userDelete(history));
        }else if(state.name === 'Logout User'){
            dispatch(logoutUser(history));
        }
    }

    const handleClose = () => {
        dispatch(modalsActions.hide());
    }

    return (
        ['Delete User','Logout User'].includes(state.name) &&
        <main className={`modal-container ${state.show ? 'modelInAnim' : 'modelOutAnim'}`}>
        <div className='cm-modal'>
            <p className="cm-text">Are You Sure ?</p>
            <div className='cm-buttons'>
                <button onClick={handleClose}>Discard</button>
                <button onClick={handleRequest}>{state.name.split(' ')[0]}</button>
            </div>
        </div>
        </main>);
}

export default ConfirmModel;
