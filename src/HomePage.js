import React, { useRef } from 'react';
import { faPlusSquare, faUser as faUser} from '@fortawesome/free-regular-svg-icons';
import { faCheck, faEllipsisH, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {useState } from 'react';
import {Loader} from './Loader';
import './style.css';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteTaskRequest, findTaskRequest, getAavtarRequest, readTasksRequest, updateTaskRequest } from './requests';
import TextAnim from './text-anim';
import { getAavtar } from './urls';

const HomePage = ({state}) => { 

    const defaultImage = 'https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg';
    const[imageUrl,setImageUrl] = useState(defaultImage);
    console.log(imageUrl)

    const[pageNo,setPageNo] = useState(1);
    const[loading,setLoading] = useState(true);
    const[update,setUpdate] = useState('Search');
    const[itemId,setItemId] = useState(undefined);
    const[taskList,setTaskList] = useState([]);
    const[isFetched,setIsFetched] = useState(false);
    const[updatedValues,setUpdatedValues] = useState({
        task: '',
        completed: false,
    })
    const[searchValue,setSearchValue] = React.useState('');
    const[anim,setAnim] = React.useState(true);
    const[isImageExist,setIsImageExist] = useState(false);

    const token = localStorage.getItem('token');

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
            getTasks();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(update !== 'Search'){
            await updateTaskRequest(updatedValues,token,itemId,(result,error) => {
                if(error){
                    return console.log(error);
                }
                if(result){
                    return console.log(result);
                }
                })
                getTasks();
        }
        if(update === 'Search'){
            console.log(searchValue)
            if(!searchValue){
                getTasks();
            }
            await findTaskRequest(token,{task: searchValue},(result,error) => {
                if(error){
                    console.log(error);
                }
                if(result){
                    console.log(result);
                    setTaskList(result.data)
                }
            })
        }
        setUpdate('Search')
    }

    const handleUpdate = (id) => {
        console.log(id);
        setUpdate('Update')
        setItemId(id); 
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
        getTasks();
    }

    const handlePrev = () => {
        if(pageNo > 1){
            getTasks((pageNo - 2 )*10)
            setPageNo(pageNo - 1)
        }
    }
    const handleNext = () => {
        getTasks(pageNo*10)
        setPageNo(pageNo + 1)
    }

    const getTasks = async (no) => {
        setIsFetched(false)
        await readTasksRequest(`&skip=${no || 0}`,token,(result,error) => {
            if(error){
                console.log(error);
            }
            if(result){
                console.log(result.data);
                setTaskList(result.data);
                setIsFetched(true)
            }
            })
    }

    const getAavtarMethod = async() => {
        const verify = await getAavtarRequest(state.user._id);
        if(verify){
        setIsImageExist(true);    
        setImageUrl(`${getAavtar}${state.user._id}/avatar`);
        }else{
            setImageUrl(defaultImage)
        }
    }
    
    React.useEffect(() => {
        getTasks();
        getAavtarMethod();
        setTimeout(() => {
            setAnim(false)
        },4500);
        setTimeout(() => {
            setLoading(false);
        },5000)
    },[])


    return (
        anim && !state.isLoading ? <TextAnim /> :  
        <div className='home-container'>
            <header className='home-header' style={{transform: loading ? 'translateY(-100px)' : 'translateY(0px)'}}>
                <p className='header-text'>Dashboard</p>
                <img className='header-img' src={imageUrl} />
            </header>
            <main className='home-content'>
                <form className={update === 'Search' ? 'search' : 'update-container'} style={{transform: loading ? 'scale(0)' : 'scale(1)'}} onSubmit={handleSubmit}>
                    {update === 'Search' ? <div className='search-field'>
                        <FontAwesomeIcon icon={faSearch} className='search-icon'  /> 
                        <input type='text' className='search-input' placeholder='search' style={{marginLeft:  '15px'}} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}  /> 
                    </div> : <div className='update-form'>
                        <label className='update-label'>Description:</label>
                        <input type='text' className='update-input'  placeholder='Task' value={updatedValues.task} onChange={(e) => setUpdatedValues({...updatedValues,task: e.target.value})} /> 
                        <label className='update-label'>Completion Status:</label>
                        <select name='update' className='update-input' value={updatedValues.completed} onChange={(e) => setUpdatedValues({...updatedValues,completed: e.target.value})}>
                            <option value='false'>No</option>
                            <option value='true'>Yes</option>
                        </select>
                    </div> }
                    <button type='submit' className='search-button'  >{update}</button>
                </form>
                {isFetched && taskList.map((task) => {
                    return <div key={task._id} className='tasks' style={{transform: loading ?  'translateX(-500px)' : 'translateX(0px)'}}>
                    <div className='task-completion-box'>
                    <p className='task-heading'>{task.task}</p>
                    <section className='task-completion' onClick={() => handleCompleted(task._id,task.completed)}>
                        {task.completed === true && <FontAwesomeIcon icon={faCheck} className='completed-icon'  />}
                    </section>
                    </div>
                    <div className='task-buttons'>
                        <button type='button' className='task-update' onClick={() => handleUpdate(task._id)}>Update</button>
                        <button type='button' className='task-remove' onClick={() => handleDelete(task._id)} >Remove</button>
                    </div>
                    </div>
                })}
                {isFetched && taskList.length === 0 && <h1 className='empty'>No Tasks Yet</h1>}
                {!isFetched &&  <h1 className='empty'>Loading...</h1>}
            </main> 
            {taskList.length >= 10 && pageNo === 1 &&
            <div className='pagination' style={{transform: loading ? 'scale(0)' : 'scale(1)'}}>
                <button className='prev buttons' onClick={handlePrev}>Prev</button>
                <p className='page-no'>{pageNo}</p>
                <button className='next buttons' onClick={handleNext}>Next</button>
            </div>}
            <footer style={{transform: loading ? 'translateY(100px)' : 'translateY(0px)'}} className='nav-bar'>
            <Link to='/home/profile' style={{textDecoration: 'none',color: 'initial'}}><div className='nav-bar-element' >
                    <FontAwesomeIcon icon={faUser} className='user-icon'/>
                </div></Link>
                <Link to='/home/addTasks' style={{textDecoration: 'none',color: 'initial'}}>
                <div className='nav-bar-element' >
                    <FontAwesomeIcon icon={faPlusSquare} className='user-icon' />
                </div>
                </Link>
                <Link to='/home/completedTasks' style={{textDecoration: 'none',color: 'initial'}}>
                <div className='nav-bar-element'  >
                    <FontAwesomeIcon icon={faTimes} className='user-icon' /> 
                </div>
                </Link>
            </footer>
        </div>
    )
}

const mapsStateToProps = (state) => {
    return {state}
  } 

export default connect(mapsStateToProps)(HomePage)
 //{transform: loading ? (index%2 === 1 ? 'translateX(500px)' : 'translateX(-500px)') : 'translateX(0px)'}
 /**
  * <Link to='/home/profile' style={{textDecoration: 'none',color: 'initial'}}><div className='nav-bar-element' >
                    <FontAwesomeIcon icon={faUser} className='user-icon'/>
                </div></Link>
                <Link to='/home/addTasks' style={{textDecoration: 'none',color: 'initial'}}>
                <div className='nav-bar-element' >
                    <FontAwesomeIcon icon={faPlusSquare} className='user-icon' />
                </div>
                </Link>
                <Link to='/home/completedTasks' style={{textDecoration: 'none',color: 'initial'}}>
                <div className='nav-bar-element'  >
                    <FontAwesomeIcon icon={faTimes} className='user-icon' /> 
                </div>
                </Link>
  */
 /**
  * {  update === 'Search' ?  <FontAwesomeIcon icon={faSearch} className='search-icon'  /> :
                        <select name='update' id='update' onChange={(e) => setOptions(e.target.value) } className='search-input' style={{marginLeft: '0px',width: '50px'}}>
                            <option value='Desciption'>Desc</option>
                            <option value='Completed'>Completed</option>
                        </select>
                        }
                        {
                            options !== 'Completed' ? <input type='text' className='search-input' placeholder='search' style={{marginLeft:  '15px'}} value={inputValue} onChange={(e) => setInputValues(e.target.value)}  /> : <select name='completed'  className='search-input' style={{marginLeft:  '15px',marginRight: '10px'}}>
                                <option value='false'>No</option>
                                <option value='true'>Yes</option>
                            </select>
                        }
  */