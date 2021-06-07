import axios from 'axios';
import { connect } from 'react-redux';
const {createUser,userLogin,userLogout,userLogoutall,deleteUser,updateUser,viewUser,addAvatar,removeAvatar,createTask,updateTask,findTask,readTasks,deleteTask, getAavtar,}  = require('./urls');

//POST Done
const createUserRequest = async (data,callback) => {
    try {
        const response = await axios.post(createUser,data);
        return callback(response,undefined);
    } catch(e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }    
}
//POST Done
const userLoginRequest = async (data,callback) => {
    try {
        const response = await axios.post(userLogin,data);
        return callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}
//GET Done
const readUserRequest = async (token,callback) => {
    try {
        const response = await axios.get(viewUser,{
            headers: {
                Authorization: 'Bearer ' + token  
            }
        });
        return callback(response,undefined);
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}

const userLogoutRequest = async (token,callback) => {
    try {
        const response = await axios.post(userLogout,undefined,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //localStorage.removeItem("token");
        return callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}

const userLogoutallRequest = async (token,callback) => {
    try {
        const response = await axios.post(userLogoutall,undefined,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}

const deleteUserRequest = async (token,callback) => {
    try {
        const response = await axios.delete(deleteUser,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}
// Done
const updateUserRequest = async (data,token,callback) => {
    try {
        const response = await axios.patch(updateUser,data,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}

// add formdata e.target.files[0] command to get uploaded file 
const addAvatarRequest = async (data,token,callback) => {
    try {
        const response = await axios.post(addAvatar,data,{
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'   
            }
        })
        callback(response,undefined);
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response)
    }
}

const deleteAvatarRequest = async (token,callback) => {
    try {
        const response = await axios.delete(removeAvatar,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return callback(response,undefined);
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e)
    }
}

const createTaskRequest = async (data,token,callback) => {
    try {
        const response = await axios.post(createTask,data,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return callback(response,undefined);
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}
//done
const updateTaskRequest = async (data,token,id,callback) => {
    try {
        const response = await axios.patch(`${updateTask}${id}`,data,{
            headers: {
                Authorization: 'Bearer ' + token   
            }
        })
        callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}
//done
const findTaskRequest = async (token,data,callback) => {
    try {
        const response = await axios.post(`${findTask}`,data,{
            headers: {
                Authorization: 'Bearer ' + token  
            }
        })
        callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}
//done
const deleteTaskRequest = async (token,id,callback) => {
    try {
        const response = await axios.delete(`${deleteTask}${id}`,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response.data)
    }
}
// add params //done
const readTasksRequest = async (params,token,callback) => {
    try {
        const response = await axios.get(readTasks + params,{
            headers: {
                Authorization: 'Bearer ' + token   
            },
        })
        return callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response)
    }
}

const readTasksRequest2 = async (params,token,callback) => {
    try {
        const response = await axios.get(`${readTasks}${params}`,{
            headers: {
                Authorization: 'Bearer ' + token   
            },
        })
        return callback(response,undefined)
    } catch (e) {
        if(e.response.data.errors){
            return callback(undefined,e.response.data.errors);
        }
        return callback(undefined,e.response)
    }
}

const getAavtarRequest = async(id) => {
    try {
        await axios.get(`${getAavtar}${id}/avatar`)
        return true
    } catch (error) {
        return false
    }
}


export  {
    createUserRequest,
    userLoginRequest,
    readUserRequest,
    userLogoutRequest,
    userLogoutallRequest,
    deleteUserRequest,
    updateUserRequest,
    addAvatarRequest,
    deleteAvatarRequest,
    createTaskRequest,
    updateTaskRequest,
    findTaskRequest,
    deleteTaskRequest,
    readTasksRequest,
    readTasksRequest2,
    getAavtarRequest
}
