import {configureStore} from '@reduxjs/toolkit';
import modalsReducer from './modalsReducer';
import notificationReducer from './notificationReducer';
import tasksReducer from './tasksReducer';
import userReducer from './userReducer';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        modals: modalsReducer,
        tasks: tasksReducer,
        user: userReducer
    }
})

export default store;