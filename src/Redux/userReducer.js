import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addAvatar, deleteUser, getAavtar, removeAvatar, updateUser, userLogout, viewUser } from "../Requests/urls";
import { modalsActions } from "./modalsReducer";
import { notificationActions } from "./notificationReducer";

const userInitialState = {
    user: null,
    avatar: null,
    loading: false,
    isLoggedIn: !!localStorage.getItem("tm-token"),
}

const userReducer = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setLoading(state,{payload}){
            state.loading = payload.status;
        },
        setUser(state,{payload}){
            state.user = payload.user;
            state.avatar = `${getAavtar}${payload.user._id}/avatar`;
        },
        setAvatar(state){
            state.avatar = `${getAavtar}${state.user._id}/avatar`;
        },
        removeUser(state){
            state.user = null;
            state.isLoggedIn = false;
            state.avatar = null;
        },
        setLoggedInStatus(state){
            state.isLoggedIn = true;
        }
    }
});

export const fetchUser = () => async (dispatch) => {
    dispatch(userActions.setLoading({status: true}));
    try {
        const response = await axios.get(viewUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
            },
        });
        dispatch(userActions.setUser({user: response.data}));
    } catch (error) {
        dispatch(notificationActions.error({message: error.message}));
    }
    dispatch(userActions.setLoading({status: false}));
}

export const userUpdate = (data) => async (dispatch) => {
    dispatch(notificationActions.request({message: 'Updating User'}));
    try {
        const response = await axios.patch(updateUser, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
            },
        });
        dispatch(userActions.setUser({user: response.data}));
        dispatch(notificationActions.success({message: 'User Updated'}));
    } catch (error) {
        dispatch(notificationActions.error({message: error.message}));
    }
    dispatch(modalsActions.hide());
}


export const addAvatarRequest = (data) => async (dispatch) => {
    dispatch(notificationActions.request({message: 'Uploading Image'}));
    try {
        await axios.post(addAvatar, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
                'Content-Type': false
            },
        });

        dispatch(userActions.setAvatar());
        dispatch(notificationActions.success({message: 'Image Uploaded'}));
    } catch (error) {
        dispatch(notificationActions.error({message: error.message}));
    }
}

export const deleteAvatar = () => async (dispatch) => {
    dispatch(notificationActions.request({message: 'Deleting Image'}));
    try {
        await axios.get(removeAvatar, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
            },
        });
        dispatch(notificationActions.success({message: 'Image Deleted'}));
    } catch (error) {
        dispatch(notificationActions.error({message: 'Deletion Failed'}));
    }
}

export const logoutUser = (history) => async (dispatch) => {
    dispatch(modalsActions.hide());
    dispatch(notificationActions.request({message: 'Logging Out'}));
    try {
        await axios.post(userLogout, undefined, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
            },
        });
        dispatch(userActions.removeUser());
        localStorage.removeItem("tm-token");
        localStorage.removeItem("exp-time");
        dispatch(notificationActions.success({message: 'Logged Out'}));
        history.push('/');
    } catch (error) {
        dispatch(notificationActions.error({message: "Request Failed"}));
    }
};

export const userDelete = (history) => async (dispatch) => {
    dispatch(modalsActions.hide());
    dispatch(notificationActions.request({message: 'Deleting Account'}));
    try {
        await axios.delete(deleteUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
            },
        });
        dispatch(userActions.removeUser());
        localStorage.removeItem("tm-token");
        localStorage.removeItem("exp-time");
        dispatch(notificationActions.success({message: 'Account Deleted'}));
        history.push('/');
    } catch (error) {
        dispatch(notificationActions.error({message: "Request Failed"}));
    }
}

export const userActions = userReducer.actions;

export default userReducer.reducer;