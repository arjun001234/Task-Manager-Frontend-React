import React from 'react';
import {createUserRequest,userLoginRequest,readUserRequest,updateTaskRequest, readTasksRequest, deleteTaskRequest, findTaskRequest, createTaskRequest} from './requests';


const TaskContext = React.createContext();

const TaskContextProvider = ({children}) => {

    const[authErrors,setAuthErrors] = React.useState(null);
    const[user,setUser] = React.useState({user: '',token: localStorage.getItem('token')});
    const[isLoading,setIsLoading] = React.useState(true);
    const[homePageLoading,setHomePageLoading] = React.useState(true);
    const[homePageErrors,setHomePageErrors] = React.useState('');
    const[tasks,setTasks] = React.useState({});
    const[userLoading,setUserLoading] = React.useState(true);

    const userAuthentication = async(data) => {
          await userLoginRequest(data,(result,error) => {
             if(error){
                return setAuthErrors(error.error)
             }
             if(result){
                return setUser({...user,user: result.data,token: localStorage.setItem('token',result.data.user.token)})
             }
         })
         setIsLoading(false)
         setTimeout(() => setAuthErrors(''),3000)
    }

    const userRegistration = async(data) => {
        await createUserRequest(data,(result,error) => {
            if(error){
                if(error.email){
                    return setAuthErrors('Invalid Email');
                }
                if(error.password){
                    return setAuthErrors('Invalid Password');
                }
                return setAuthErrors('This email already exist.')
            } 
            if(result){
                return setUser({...user,user: result.data,token: localStorage.setItem('token',result.data.token)})
            }
        })
        setIsLoading(false) 
        setTimeout(() => setAuthErrors(''),3000)
    }

    const userInfo = async (token) => {
        await readUserRequest(token,(result,error) => {
            if(error){
                console.log(error);
                return setHomePageErrors(error);
            }
            if(result){
                setUserLoading(false)
                return setUser(result.data);
            }
        });
    }
    const taskFetch = async (token) => {
        await readTasksRequest(token,(result,error) => {
            if(error){
                console.log(error);
                return setHomePageErrors(error);
            }
            if(result){
                return setTasks(result.data)
            }
            })
            setHomePageLoading(false);
        }

    const updateTaskFetch =  async (data,token,id) => {
        await updateTaskRequest(data,token,id,(result,error) => {
            if(error){
                setHomePageErrors(error);
                return console.log(error);
            }
            if(result){
                return console.log(result);
            }
            })
        }

    const deleteTaskFetch = async (token,id) =>{
        await deleteTaskRequest(token,id,(result,error) => {
            if(error){
                setHomePageErrors(error);
                return console.log(error);
            }
            if(result){
                return console.log(result);
            }
        })
    }

    const findTaskFetch = async (token,id) => {
        await findTaskRequest(token,id,(result,error) => {
            if(error){
                setHomePageErrors(error);
                return console.log(error);
            }
            if(result){
                return console.log(result);
            }
        })
    }

    const createTaskFetch = async (data,token) => {
        await createTaskRequest(data,token,(result,error) => {
            if(error){
                setHomePageErrors(error);
                return console.log(error);
            }
            if(result){
                return console.log(result);
            }
        })
    }


    return <TaskContext.Provider  value={{authErrors,userAuthentication,user,isLoading,userRegistration,taskFetch,homePageErrors,tasks,homePageLoading,userInfo,userLoading,updateTaskFetch,deleteTaskFetch,setHomePageLoading}}>{children}</TaskContext.Provider>
}

export {TaskContext,TaskContextProvider};
