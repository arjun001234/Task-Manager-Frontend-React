import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UpdateForm from '../forms/updateForm';
import {IoMdClose} from 'react-icons/io';
import { modalsActions } from '../../Redux/modalsReducer';
import ChangePassword from './changePassword';
import ConfirmModel from './confirmModal';

const Modals = () => {

    const dispatch = useDispatch();

    const modalState = useSelector((state) => state.modals);

    const handleClose = () => {
        dispatch(modalsActions.hide());
    }

    return (
        modalState.show &&
        <div id="modals-container" className={`${modalState.show ? 'fadeInAnim' : 'fadeOutAnim'}`}>
            <UpdateForm state={modalState} />
            <ChangePassword state={modalState} />
            <ConfirmModel state={modalState} />
            {!['Delete User','Logout User'].includes(modalState.name) &&
            <div className="close-modals" onClick={handleClose}>
                <IoMdClose color="#fff"  transform="scale(1.5)" />
            </div>}
        </div>
    )
}

export default Modals
