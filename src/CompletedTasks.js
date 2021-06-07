import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import './style.css';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import  { useState } from 'react';
import { faPlusSquare, faUser} from '@fortawesome/free-regular-svg-icons';
import {Link} from 'react-router-dom'
import { deleteTaskRequest, readTasksRequest2, updateTaskRequest } from './requests';

const CompletedTasks = () => {

    const[pageNo,setPageNo] = useState(1);
    const[loading,setLoading] = useState(true);
    const[isFetched,setIsFetched] = useState(false);
    const[taskList,setTaskList] = useState([]);

    const token = localStorage.getItem('token')

    const handleCompleted = async (id,completed) => {
        const change = completed ? 'false' : 'true';
        await updateTaskRequest({completed: change},token,id,(result,error) => {
            if(error){
                return console.log(error);
            }
            if(result){
                return console.log(result);
            }
            })
            getIncompletedTasks();
    }

    const getIncompletedTasks = async (no) => {
        setIsFetched(false);
        await readTasksRequest2('&completed=false&skip='+ (no || 0),token,(result,error) => {
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

    const handlePrev = () => {
        if(pageNo > 1){
            getIncompletedTasks((pageNo - 2 )*10)
            setPageNo(pageNo - 1)
        }
    }
    const handleNext = () => {
        getIncompletedTasks(pageNo*10)
        setPageNo(pageNo + 1)
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
        getIncompletedTasks();
    }

    React.useEffect(() => {
        getIncompletedTasks();
        setTimeout(()=> {
            setLoading(false)
        },250)
    },[]);

    return (

        <div className='home-container' >
            <div className='arrow-button' style={{transform: loading ? 'translateY(-200px)' : 'translateY(0px)'}}>
            <Link to='/home' style={{textDecoration: 'none',color: 'initial'}}><FontAwesomeIcon icon={faArrowLeft} size='1x' style={{position: 'absolute',top: '0%',left: '0%',padding: '6px',transform: 'scale(1.3)',color: '#E58C8A',boxSizing: 'content-box'}}  className='arrow-button' /></Link>
            </div>
            <main className='home-content'>
            <h2 className='completed-tasks-header' style={{transform: loading ? 'translateY(-500px)' : 'translateY(0px)'}}>Incomplete Tasks List</h2>
            {isFetched &&  
            taskList.map((task) => {
            return <div className='tasks' key={task._id} style={{transform: loading ?   'translateX(-500px)' : 'translateX(0px)',width: '100%'}}>
                    <div className='task-completion-box'>
                    <p className='task-heading'>{task.task}</p>
                    <section className='task-completion' onClick={() => handleCompleted(task._id,task.completed)}>
                        {task.completed === true && <FontAwesomeIcon icon={faCheck} className='completed-icon'  />}
                    </section>
                    </div>
                    <div className='task-buttons'>
                        <button type='button' className='task-remove'  onClick={() => handleDelete(task._id)}>Remove</button>
                    </div>
                </div>}) }
                {isFetched && taskList.length === 0 && <h1 className='empty'>No Tasks Yet</h1>}
                {!isFetched &&  <h1 className='empty'>Loading...</h1>}
                </main>
                {taskList.length >= 10 &&
                <div className='pagination' style={{transform: loading ? 'scale(0)' : 'scale(1)'}}>
                <button className='prev buttons' onClick={handlePrev}>Prev</button>
                <p className='page-no'>{pageNo}</p>
                <button className='next buttons' onClick={handleNext}>Next</button>
                </div>
                } 
                <footer style={{transform: loading ? 'translateY(100px)' : 'translateY(0px)'}} className='nav-bar'>
                <div className='nav-bar-element' >
                <Link to='/home/profile' style={{textDecoration: 'none',color: 'initial'}}><FontAwesomeIcon icon={faUser} className='user-icon'/></Link>
                </div>
                <div className='nav-bar-element' >
                <Link to='/home/addTasks' style={{textDecoration: 'none',color: 'initial'}}><FontAwesomeIcon icon={faPlusSquare} className='user-icon' /></Link>
                </div>
                <div className='nav-bar-element' >
                <Link to='/home/completedTasks' style={{textDecoration: 'none',color: 'initial'}}><FontAwesomeIcon icon={faTimes} className='user-icon' /></Link>
                </div>
            </footer>
        </div>
    )
}

export default CompletedTasks
