import './style.css';
import React, { useRef, useState } from 'react';
import {faArrowLeft, faExclamationCircle, faExclamationTriangle, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'
import { userLoginRequest } from './requests';
import {connect} from 'react-redux';
import { LOGIN } from './Redux/actions';

const Login = ({history,state,Login}) => {

    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const[requiredErrors,setRequiredErrors] = useState('');
    const[showPassword,setShowPassword] = useState(true);
    const[inputvalues,setInputValues] = useState({
        email: '',
        password: ''
    })
    const[loading,setLoading] = useState(false);

    const[showErrors,setShowErrors] = React.useState(false)

    const handleShowPassword = ()  => {
       
        setShowPassword(!showPassword)
            passwordInput.current.type = showPassword ? 'text' : 'password'
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        emailInput.current.style.borderColor = 'white';
        passwordInput.current.style.borderColor = 'white';
        if(!inputvalues.email){
            emailInput.current.style.borderColor = 'red';
            return setRequiredErrors('Email Required')
        } 
        if(!inputvalues.password){
            passwordInput.current.style.borderColor = 'red';
            return setRequiredErrors('Password Required')
        } 
        if(inputvalues.email && inputvalues.password){
            setLoading(true);
            await userLoginRequest(inputvalues,(result,error) => {
                setLoading(false);
                Login({result,error})
                if(error){
                    setShowErrors(true)
                   return console.log(error)
                }
                if(result){
                    history.push('/home')
                    return console.log(result);
                }
            })
        }
}

    React.useEffect(() => {
        setTimeout(() => {
            setShowErrors(false)
        },3000)
    },[state])

    React.useEffect(() => {
        setTimeout(() => {
            setRequiredErrors('');
        }, 3000);
    },[requiredErrors])


    return (
        <>
            {state.errors && <div className='error-bar' style={{transform: showErrors ? 'translateY(0px)' : 'translateY(-200px)'}}>
                <FontAwesomeIcon icon={faExclamationCircle} className='error-bar-icon' />
                <p className='error-bar-text'>{state.errors.error}</p>
            </div>}
            <div className='error-bar' style={{transform: requiredErrors ? 'translateX(0px)' : 'translateX(-800px)'}}>
                <FontAwesomeIcon icon={faExclamationTriangle} className='error-bar-icon'  />
                <p className='error-bar-text'>{requiredErrors}</p>
            </div>
            <Link style={{textDecoration: 'none'}} to='/'><FontAwesomeIcon icon={faArrowLeft}  className='previous-button'  /></Link>
            <div className='welcome-container'>
                <form className='login content' onSubmit={handleSubmit}>
                <h1 className='login header'>Hello There!</h1>
                <input type='text' className='login input' placeholder='| Email' ref={emailInput} value={inputvalues.email} onChange={(e) => setInputValues({...inputvalues,email: e.target.value})}  ></input>
                <div className='password' >
                    <input type='password' className='login input' placeholder='| Password' ref={passwordInput} style={{marginBottom: '10px'}}  value={inputvalues.password} onChange={(e) => setInputValues({...inputvalues,password: e.target.value})}></input>
                    {!showPassword ? <FontAwesomeIcon icon={faEye} className='password-icon' onClick={handleShowPassword}/> : <FontAwesomeIcon icon={faEyeSlash} className='password-icon' onClick={handleShowPassword}/>}
                </div>
                <button className='welcome-button' type="submit" >{loading ? 'Loading...' : 'Login'}</button>
                </form>
            </div>
            <p className='welcome-footer'>Don't have an account?<strong style={{color: '#E58C8A'}}><Link to='/register' style={{textDecoration: 'none',color: 'inherit'}}> Register</Link></strong></p>
        </>
    )
}

const mapsStateToProps = (state) => {
    return {state}
} 

const mapsDispatchToProps = dispatch =>{
    return {Login: (data) => dispatch({type: LOGIN,payload: data})}
}

export default connect(mapsStateToProps,mapsDispatchToProps)(Login);

