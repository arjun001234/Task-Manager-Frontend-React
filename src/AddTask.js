import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './style.css';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import  { useState } from 'react';
import { faPlusSquare, faUser} from '@fortawesome/free-regular-svg-icons';
import {Link} from 'react-router-dom'
import { createTaskRequest, deleteTaskRequest, readTasksRequest2 } from './requests';

const AddTask = () => {

    const[loading,setLoading] = useState(true);
    const[inputvalues,setInputValues] = useState({
        task: '',
        completed: false,
    })
    const[isFetched,setIsFetched] = useState(false);
    const[taskList,setTaskList] = useState([]);

    const token = localStorage.getItem('token')

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(inputvalues)
        await createTaskRequest(inputvalues,token,(result,error) => {
            if(error){
                console.log(error);
            }
            if(result){
                console.log(result);
            }
        })
        getLatestTasks();
    }

    const handleDelete = async (id) => {
        console.log(id);
        await deleteTaskRequest(token,id,(result,error) => {
            if(error){
                console.log(error)
            }
            if(result){
                console.log(result);
            }
        })
        getLatestTasks();
    }

    const getLatestTasks = async () => {
        setIsFetched(false);
        await readTasksRequest2('?sortBy=createdAt:desc',token,(result,error) => {
            if(error){
                console.log(error)
            } 
            if(result){
                console.log(result);
                setTaskList(result.data);
                setIsFetched(true);
            }
        })
    }

    React.useEffect(() => {
        getLatestTasks();
        setTimeout(()=> {
            setLoading(false)
        },250)
    },[]);

    return (
        <div className='home-container'>
            <div className='arrow-button' style={{transform: loading ? 'translateY(-200px)' : 'translateY(0px)'}}>
            <Link to='/home' style={{textDecoration: 'none',color: 'initial'}}><FontAwesomeIcon icon={faArrowLeft} size='1x' style={{position: 'absolute',top: '0%',left: '0%',padding: '6px',transform: 'scale(1.3)',color: '#E58C8A',boxSizing: 'content-box'}}  className='arrow-button' /></Link>
            </div>
            <main className='home-content'>
                <h2 className='completed-tasks-header'  style={{transform: loading ? 'translateX(-500px)' : 'translateX(0px)',margin: '20px 0px 20px 0px'}}>Create a Task</h2>
            <form style={{marginBottom: '15px',transform: loading ? 'scale(0)' : 'scale(1)',transition: 'all 0.5s ease-in-out',width: '100%'}} onSubmit={handleSubmit}>
                <div className='add-task-container'>
                    <p className='add-task-desc'>Description</p>
                    <input className='add-task-input' type='text' value={inputvalues.task} onChange={(e) => setInputValues({...inputvalues,task: e.target.value})}></input>
                </div>
                <div className='add-task-container'>
                    <p className='add-task-desc'>Completed</p>
                    <select className='add-task-input' id='completed' name='task-status'  value={inputvalues.completed} onChange={(e) => setInputValues({...inputvalues,completed: e.target.value})}>
                        <option value='false'>No</option>
                        <option value='true'>Yes</option>
                    </select>
                </div>
                <button type='submit' style={{width: '100%'}} className='user-button'>Create</button>
            </form>
            {isFetched && taskList.slice(0,5).map((task) => {
                return <div className='tasks' key={task._id} style={{transform: loading ?   'translateX(-500px)' : 'translateX(0px)',width: '100%'}}>
                <div className='task-completion-box'>
                <p className='task-heading'>{task.task}</p>
                </div>
                <div className='task-buttons'>
                    <button type='button' className='task-remove' onClick={() => handleDelete(task._id)}>Remove</button>
                </div>
            </div>
            })}
            {isFetched && taskList.length === 0 && <h1 className='empty'>No Tasks Yet</h1>}
                {!isFetched &&  <h1 className='empty'>Loading...</h1>}
            </main>
            <footer style={{transform: loading ? 'translateY(100px)' : 'translateY(0px)'}} className='nav-bar'>
            <Link to='/home/profile' style={{textDecoration: 'none',color: 'initial'}}><div className='nav-bar-element' >
                    <FontAwesomeIcon icon={faUser} className='user-icon'/>
                </div></Link>
                <Link to='/home/addTasks' style={{textDecoration: 'none',color: 'initial'}}><div className='nav-bar-element' >
                    <FontAwesomeIcon icon={faPlusSquare} className='user-icon' />
                </div></Link>
                <Link to='/home/completedTasks' style={{textDecoration: 'none',color: 'initial'}}><div className='nav-bar-element' >
                    <FontAwesomeIcon icon={faTimes} className='user-icon' /> 
                </div></Link>
            </footer>
        </div>
    )
}

export default AddTask
