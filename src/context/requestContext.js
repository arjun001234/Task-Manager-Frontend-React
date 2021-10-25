import axios from "axios";
import React from 'react';
import { createUser, deleteTask, findTask, getAavtar, readTasks, updateTask, userLogin, viewUser } from "../Requests/urls";

export const RequestsContext = React.createContext();

const RequestsProvider = ({children}) => {

    const token = localStorage.getItem("tm-token");
    const [tasks,setTasks] = React.useState([]);
    const [skip,setSkip] = React.useState(0);

    const getTasks = async ({limit = 10,sortBy = 'asc',skip = 0},callback) => {
        try {
            const url = readTasks + `?limit=${limit}&sortBy=${sortBy}&skip=${skip}` 
            const response = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            return callback(response.data,null);
        } catch (error) {
            return callback(null,error);
        }
    }

    const updateTaskRequest = async (id,data,callback) => {
        try {
            const response = await axios.patch(`${updateTask}${id}`, data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            callback(response.data, undefined);
        } catch (error) {
            callback(null,error) 
        }
    }

    const deleteTaskRequest = async (id, callback) => {
        try {
            const response = await axios.delete(`${deleteTask}${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            callback(response.data, undefined);
        } catch (error) {
            callback(null,error) 
        }
    };

    const getProfilePic = async (id) => {
        try {
            const response = await axios.get(`${getAavtar}${id}/avatar`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const searchTasks = async (text,callback) => {
        try {
            const response = await axios.post(findTask, {task: text}, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            return callback(response.data,null);
        } catch (error) {
            return callback(null,error);
        }
    }

    const createNewUser = async (data) => {
        try {
            const response = await axios.post(createUser, data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const loginUser = async (data) => {
        try {
            const response = await axios.post(userLogin, data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get(viewUser, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        // const run = async () => {
        //     await getTasks();
        // }  
        // run();
    },[])

    const data = {
        tasks,
        searchTasks,
        getTasks,
        updateTaskRequest,
        deleteTaskRequest
    }

    return <RequestsContext.Provider value={data}>
        {children}
    </RequestsContext.Provider>
}

export default RequestsProvider
