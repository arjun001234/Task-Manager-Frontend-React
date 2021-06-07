import './style.css';
import {faExclamationCircle, faEye, faEyeSlash,faArrowLeft, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useRef,useState} from 'react';
import {createUserRequest} from './requests';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { REGISTER } from './Redux/actions';

const Register = ({history,state,Register}) => {

    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const[showPassword,setShowPassword] = useState(true);
    const[requiredErrors,setRequiredErrors] = useState('');
    const[inputvalues,setInputValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const[loading,setLoading] = useState(false);

    const[showErrors,setShowErrors] = React.useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
            passwordInput.current.type = showPassword ? 'text' : 'password'
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        emailInput.current.style.borderColor = 'initial';
        passwordInput.current.style.borderColor = 'initial';
        nameInput.current.style.borderColor = 'initial';
        e.preventDefault();
        if(!inputvalues.name){
            nameInput.current.style.borderColor = 'red';
            return setRequiredErrors('Name Required')
        }
        if(!inputvalues.email){
            emailInput.current.style.borderColor = 'red';
            return setRequiredErrors('Email Required')
        } 
        if(!inputvalues.password){
            passwordInput.current.style.borderColor = 'red';
            return setRequiredErrors('Password Required')
        }
        if(inputvalues.name && inputvalues.email && inputvalues.password){
            setLoading(true)
            await createUserRequest(inputvalues,(result,error) => {
                setLoading(false)
                Register({result,error})
                if(error){
                    setShowErrors(true)
                    return console.log(error)
                } 
                if(result){
                    history.push('/home')
                    return console.log(error)
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
     {state.errors !== '' && <div className='error-bar' style={{transform: showErrors ? 'translateY(0px)' : 'translateY(-200px)',top: '10%'}}>
                <FontAwesomeIcon icon={faExclamationCircle} className='error-bar-icon' style={{paddingRight: '20px'}} />
                <p className='error-bar-text'>{state.errors}</p>
            </div>}
            <div className='error-bar' style={{transform: requiredErrors ? 'translateX(0px)' : 'translateX(-800px)'}}>
                <FontAwesomeIcon icon={faExclamationTriangle} className='error-bar-icon' style={{paddingRight: '20px'}} />
                <p className='error-bar-text'>{requiredErrors}</p>
            </div>
    <Link style={{textDecoration: 'none'}} to='/'><FontAwesomeIcon icon={faArrowLeft}  className='previous-button' /></Link>
    <div className='welcome-container'>
        <form className='login content' style={{height: '60%'}} onSubmit={handleSubmit}>
        <h1 className='login header' style={{marginBottom: '0px'}}>Hello There!</h1>
        <p className='greeting'>Your Task Managing Solution</p>
        <input className='login input' type='text' placeholder='| Name' ref={nameInput} value={inputvalues.name} onChange={(e) => setInputValues({...inputvalues,name: e.target.value})} ></input>
        <input className='login input' type='text' placeholder='| Email' ref={emailInput} value={inputvalues.email} onChange={(e) => setInputValues({...inputvalues,email: e.target.value})}></input>
        <div className='password'>
        <input className='login input' type='password' placeholder='| Password' ref={passwordInput} value={inputvalues.password} onChange={(e) => setInputValues({...inputvalues,password: e.target.value})}></input>
        {!showPassword ? <FontAwesomeIcon icon={faEye} className='password-icon' onClick={handleShowPassword}/> : <FontAwesomeIcon icon={faEyeSlash} className='password-icon' onClick={handleShowPassword}/>}
        </div>
        <input className='login input' type='number' placeholder='| Age'></input>
        <button className='welcome-button' type='submit'>{loading ? 'Loading...' : 'Register'}</button>
        </form>
    </div>
    <p className='welcome-footer'>Already have an Account?<strong style={{color: '#E58C8A'}}><Link to='/login' style={{textDecoration: 'none',color: 'inherit'}}> Login</Link></strong></p>
    </>
    )
}

const mapsStateToProps = (state) => {
    return {state}
} 

const mapsDispatchToProps = dispatch =>{
    return {Register: (data) => dispatch({type: REGISTER,payload: data})}
}

export default connect(mapsStateToProps,mapsDispatchToProps)(Register);
