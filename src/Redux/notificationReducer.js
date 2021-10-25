import {createSlice} from '@reduxjs/toolkit';

const notificationInitialState = { show: false, message: '', type: '' }

const notificationReducer = createSlice({
    name: 'notifications',
    initialState: notificationInitialState,
    reducers: {
        error(state,{payload}){
            state.show = true;
            state.message = payload.message;
            state.type = 'error';
        },
        success(state,{payload}){
            state.show = true;
            state.message = payload.message;
            state.type = 'success';
        },
        request(state,{payload}){
            state.show = true;
            state.message = payload.message;
            state.type = 'request';
        },
        noNotifications(state){
            state.show = false;
            state.message = '';
            state.type = '';
        }
    }
})

export const notificationActions = notificationReducer.actions;

export default notificationReducer.reducer;