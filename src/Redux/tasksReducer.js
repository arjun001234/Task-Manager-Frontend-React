import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createTask, deleteTask, findTask, readTasks, updateTask } from "../Requests/urls";
import { modalsActions } from "./modalsReducer";
import { notificationActions } from "./notificationReducer";

const tasksInitialState = {
    tasks: [],
    searchResult: [],
    loading: false,
    isMore: false
}

const tasksReducer = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {
        setLoading(state,{payload}){
            state.loading = payload.status;
        },
        addTask(state,{payload}){
            state.tasks.push(payload.task);
        },
        updateTask(state,{payload}){
            const index = state.tasks.findIndex((task) => task._id === payload.task._id);
            if(index !== -1){
                state.tasks[index] = payload.task;
            }
        },
        deleteTask(state,{payload}){
            console.log(payload);
            state.tasks = state.tasks.filter((task) => task._id !== payload.task._id);
        },
        setTasks(state,{payload}){
            if(payload.tasks.length === 10){
                state.isMore = true;
            }else{
                state.isMore = false;
            }
            state.tasks = [...state.tasks,...payload.tasks]
        },
        setSearchedTasks(state,{payload}){
            state.searchResult =  payload.tasks
        }
    }
});

export const fetchTasks = ({limit = 10,sortBy = 'asc',skip = 0}) => async (dispatch) => {
    dispatch(tasksActions.setLoading({status: true}));
    try {
        const url = readTasks + `?limit=${limit}&sortBy=${sortBy}&skip=${skip}` 
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
            },
        });
        console.log(response.data);
        dispatch(tasksActions.setTasks({tasks: response.data}));
    } catch (error) {
        dispatch(notificationActions.error({message: error.message}));
    }
    dispatch(tasksActions.setLoading({status: false}));
}

export const searchTasks = (text) => async (dispatch) => {
    dispatch(tasksActions.setLoading({status: true}));
    try {
        const response = await axios.post(findTask, {task: text}, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
            },
        });
        dispatch(tasksActions.setSearchedTasks({tasks: response.data}));
    } catch (error) {
        dispatch(notificationActions.error({message: error.message}));
    }
    dispatch(tasksActions.setLoading({status: false}));
}

export const taskUpdate = (task,data) => async (dispatch) => {
    dispatch(modalsActions.hide());
    dispatch(tasksActions.setLoading({status: true}));
    try {
        const response = await axios.patch(`${updateTask}${task._id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("tm-token"),
            },
        });
        dispatch(tasksActions.updateTask({task : response.data}));
        dispatch(notificationActions.success({message: 'Task Updated'}));
    } catch (error) {
        dispatch(notificationActions.error({message: error.message}));
    }
    dispatch(tasksActions.setLoading({status: false}));
}

export const taskCreate = (data) => async (dispatch) => {
    dispatch(modalsActions.hide());
    dispatch(tasksActions.setLoading({status: true}));
    try {
        const response = await axios.post(createTask, data, {
            headers: {
                Authorization: "Bearer " +  localStorage.getItem("tm-token"),
            },
        });
        dispatch(tasksActions.addTask({task : response.data}));
        dispatch(notificationActions.success({message: 'Task Created'}));
    } catch (error) {
        dispatch(notificationActions.error({message: error.message}));
    }
    dispatch(tasksActions.setLoading({status: false}));
}

export const taskDelete = (task) => async (dispatch) => {
    dispatch(tasksActions.setLoading({status: true}));
    try {
        const response = await axios.delete(`${deleteTask}${task._id}`, {
            headers: {
                Authorization: "Bearer " +  localStorage.getItem("tm-token"),
            },
        });
        dispatch(tasksActions.deleteTask({task : response.data}));
        dispatch(notificationActions.success({message: 'Task Deleted'}));
    } catch (error) {
        dispatch(notificationActions.error({message: error.message}));
    }
    dispatch(tasksActions.setLoading({status: false}));
}

export const tasksActions = tasksReducer.actions;

export default tasksReducer.reducer;