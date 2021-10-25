import React from 'react';
import {RiLockPasswordLine,RiDeleteBin5Line,RiLogoutBoxLine} from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { modalsActions } from '../../Redux/modalsReducer';

const Settings = () => {

    const dispatch = useDispatch();

    const handlePasswordChange = () => {
        dispatch(modalsActions.show({name: 'Change Password'}));
    }

    const handleDelete = () => {
        dispatch(modalsActions.show({name: 'Delete User'}));
    }

    const handleLogout = () => {
        dispatch(modalsActions.show({name: 'Logout User'}));
    }

    return (
        <div className="settings">
            <section onClick={handlePasswordChange}>
                <RiLockPasswordLine color="#fff" transform="scale(1.5)" />
                <p>Change Password</p>
            </section>
            <section onClick={handleDelete}>
                <RiDeleteBin5Line color="#fff" transform="scale(1.5)" />
                <p>Delete Account</p>
            </section>
            <section onClick={handleLogout}>
                <RiLogoutBoxLine color="#fff" transform="scale(1.5)" />
                <p>Logout</p>
            </section>
        </div>
    )
}

export default Settings;
