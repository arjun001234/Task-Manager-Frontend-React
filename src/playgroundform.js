/**const passwordInput = React.useRef(null);
    const nameInput = React.useRef(null);
    const emailInput = React.useRef(null);
    const[toggle,setToggle] = React.useState(false);
    const[authErrors,setAuthErrors] = React.useState(null);
    /**  React.useState({
        name: '',
        email: '',
        password: '',
    });
    const[buttonText,setButtonText] = React.useState(false);
    const[showPassword,setShowPassword] = React.useState(true);
    const[inputvalues,setInputValues] = React.useState({
        name: '',
        email: '',
        password: '',
        age: ''
    });
    const[errors,setErrors] = React.useState({
        name: {
            required: ''
        },
        email: {
            required: ''
        },
        password: {
            required: ''
        }
    })

    const handleShowPassword = (e) => {
        passwordInput.current.type = showPassword ? 'text' : 'password';
        setShowPassword(!showPassword);
        if(!errors.password.required){
            
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setButtonText(true);
        setTimeout(() => {
            setButtonText(false)
            if(!inputvalues.name){
                setErrors({...errors,name: {...errors.name,required: 'Name cannot Be Empty'}})
                setTimeout(() => { 
                    setErrors({...errors,name: {...errors.name,required: ''}})
                    nameInput.current.style.borderColor = !toggle ? 'blue': 'cyan';
                }, 2000);
                    nameInput.current.style.borderColor = 'red';
            } else if(!inputvalues.email){
                setErrors({...errors,email: {...errors.email,required: 'Email cannot Be Empty'}})
                setTimeout(() => {
                    setErrors({...errors,email: {...errors.email,required: ''}})
                    emailInput.current.style.borderColor = !toggle ? 'blue': 'cyan';
                }, 2000);
                    emailInput.current.style.borderColor = 'red';
            } else if(!inputvalues.password){
                setErrors({...errors,password: {...errors.password,required: 'Password Cannot Be Empty'}})
                setTimeout(() => {  
                    setErrors({...errors,password: {...errors.password,required: ''}})
                    passwordInput.current.style.borderColor = !toggle ? 'blue': 'cyan';
                }, 2000);
                passwordInput.current.style.borderColor = 'red';
            }
        },1000)
        if(inputvalues.name && inputvalues.email && inputvalues.password){
            await createUserRequest(inputvalues,(result,error) => {
                console.log(result,error);
                if(error){
                    if(error.email){
                        return setAuthErrors('Email is not Valid or It\'s already exist')
                    } 
                    if(error.password){
                        return setAuthErrors('Password is Invalid Plz refer to the Hint')
                    }
                    return  setAuthErrors('This Email already exist');
                }
            });
        }
    }

    React.useEffect(() => {
        setTimeout(() => {
            setAuthErrors('');
        }, 3000);
    },[handleSubmit])


    return (
        <>
        <div className="bg"></div>
        <div className='container'>
        <div className='auth-errors' style={{backgroundColor: !toggle ? 'rgba(124, 10, 2, 1)' : 'white',transform: authErrors ? 'translateY(0px)' : 'translateY(-200px)'}}>
            <FontAwesomeIcon icon={faExclamationCircle} size='1x' style={{color: '#ff0800',marginRight: '20px'}} />
            <p style={{color: !toggle ? 'white' : '#ff0800' ,fontFamily: 'arial'}} >{authErrors || 'This is an error'}</p>
        </div>
        <form className='form' style={{backgroundColor: toggle && '#404040'}} onSubmit={handleSubmit} autoComplete='off'>
            <div className='toggle-dark' style={{backgroundColor: !toggle ? 'blue': 'cyan'}} title="Switch Theme" onClick={() => setToggle(!toggle)}>
            <h1 className='form-heading'>Create an Account</h1>
                </div>
            <main className='form-main'>
                <p className='form-details' style={{color: toggle && 'white'}}>Manage your Daily <strong style={{color: !toggle ? 'blue': 'cyan'}}>Tasks</strong> with us</p>
            <div className='form-container'>
                <section className='form-section'>
                <input style={{borderColor: !toggle ? 'blue' : 'cyan',color: toggle && 'white'}} type="text" id="name" className="form-control" placeholder="Name" value={inputvalues.name} onChange={(e) => setInputValues({...inputvalues,name: e.target.value})} ref={nameInput} />
                <label style={{color: toggle && 'white'}} className="form-label" htmlFor="name" >Name</label>
                <div className='form-error'>
                {errors.name.required && <FontAwesomeIcon icon={faExclamationTriangle} style={{paddingRight: '5px'}} />}
                <p>{errors.name.required}</p>
                </div>
                </section>
                <section className='form-section'>
                <input style={{borderColor: !toggle ? 'blue' : 'cyan',color: toggle && 'white'}} type="text" id="email" className="form-control" placeholder="email" value={inputvalues.email} onChange={(e) => setInputValues({...inputvalues,email: e.target.value})} ref={emailInput} />
                <label style={{color: toggle && 'white'}} className="form-label" htmlFor="email" >Email</label>
                <div className='form-error'>
                {errors.email.required && <FontAwesomeIcon icon={faExclamationTriangle} style={{paddingRight: '5px'}} />}
                <p>{errors.email.required}</p>
                </div>
                </section>
                <section className='form-section'>
                    <input style={{borderColor: !toggle ? 'blue' : 'cyan',color: toggle && 'white'}} type="password" id="password" className="form-control" placeholder="Password" ref={passwordInput} value={inputvalues.password} onChange={(e) => setInputValues({...inputvalues,password: e.target.value})}/>
                <label style={{color: toggle && 'white'}} className="form-label" htmlFor="password" >Password</label>
                {!showPassword ? <FontAwesomeIcon className='form-icon' icon={faEye} onClick={handleShowPassword} style={{color: toggle && 'white'}} />  :
                    <FontAwesomeIcon  icon={faEyeSlash} className='form-icon' style={{color: toggle && 'white'}}  onClick={handleShowPassword} />}
                <div className='form-error' style={{bottom: '33px'}}>
                {errors.password.required && <FontAwesomeIcon icon={faExclamationTriangle} style={{paddingRight: '5px'}} />}
                {!errors.password.required ? <p style={{color: !toggle ?'blue': 'white'}}>Password should be minimum of 6 characters and should contain letters and numbers</p> : <p>{errors.password.required}</p>}
                </div>
                </section>
                <section className='form-section age' >
                <input style={{borderColor: !toggle ? 'blue' : 'cyan',color: toggle && 'white'}} type="number" min='0' max='100' id="age" className="form-control" placeholder="Age" value={inputvalues.age} onChange={(e) => setInputValues({...inputvalues,age: e.target.value})}/>
                <label style={{color: toggle && 'white'}} className="form-label" htmlFor="age" >Age</label>
                </section>
                <button style={{backgroundColor: !toggle ? 'blue': 'cyan'}} type="submit" className='form-button'>{!buttonText ? <p>Create Account</p> :<div>Loading...</div>}</button>
            </div>
            <p className='form-loginoption' style={{color: toggle && 'white'}}>Already have an account? <Link to='/login' className='loginlink' style={{color: !toggle ? 'blue': 'cyan',textDecoration: 'none'}}>Login</Link></p>
            </main>
            <h2 className='form-footer' style={{backgroundColor: !toggle ? 'blue': 'cyan'}} >Your Task Managing Solution</h2>
        </form>
        </div>
        </>
    )*/

    /**
     *
*{
    margin: 0;
    padding: 0;
}
.container{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /**background-image: linear-gradient(to bottom right,#a1c4fd,#c2e9fb);
    background-color: white;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTupIsFaENFSntaFzFEco9NCWfzAM5F9YHOJg&usqp=CAU');
    background-color: green;
    background-blend-mode: lighten;
    background-size: cover;
    clip-path: polygon(0 0, 99% 0, 100% 29%, 28% 100%, 0 99%, 0% 50%);
}
.form{
    transition: all .3s ease-in-out;
    height: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /**background: rgba( 238, 238, 238, 0.20 );
    box-shadow: 0 8px 10px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    background-color: white;
    border-radius: 10px; 
    padding: 0px 0px 0px 0px;
    z-index: 1;
    box-shadow: 0 8px 10px 0 rgba( 31, 38, 135, 0.37 );
}
.form-label{
    display: block;
    transform: translateY(-20px);
    font-size: 16px;
    transition: all .3s ease-in-out;
    transform-origin: 0 0;
    font-family: Arial, Helvetica, sans-serif;
}
.form-control{
    border: 2px solid ;
    border-style: none none solid none; 
    padding: 4px;
    background: rgba( 255, 255, 255, 0 );
    width: 100%;
}
.form-control:focus{
    outline: none;
}
.form-control:focus + .form-label,
.form-control:not(:placeholder-shown) + .form-label{
    transform: translateY(-40px) scale(0.8);
}
.form-control::placeholder{
    color: transparent;
}
.form-button{
    height: 30px;
    width: 150px;
    color: white;
    border: none;
    outline: none;
    letter-spacing: 1px;
    margin-top: 25px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
}
.form-container{
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    margin: 0px 50px 0px 50px;
}
.form-section{
    width: 100%;
    height: 60px;
}
.bg{
    background-image: url('./images/pexels-tirachard-kumtanom-733852.jpg');
    /**clip-path: polygon(0 0, 100% 0, 100% 51%, 28% 100%, 0 99%, 0% 50%);
    background-image: linear-gradient(to bottom right,#a1c4fd,#c2e9fb);
    background-color: #8899a6;
    width: 100%;
    height: 100%;
    position:  absolute;
    background-size: cover;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.form-error{
    color: #ff0033;
    margin: 0%;
    position: relative;
    bottom: 12px;
    font-size: 12px;
    display: flex;
    align-items: center;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 50000s ease-in-out 0s;
}
.form-icon{
    font-size: 100%;
    position: relative;
    left: 95%;
    bottom: 68%
}
.form-heading{
    text-align: center;
    font-family: 'Roboto';
    color: white;
}

.age{
    position: relative;
    top: 20px;
}
.form-footer{
    text-align: center;
    font-family: 'Roboto';
    padding: 10px;
    color: white;
}
.form-main{
    flex-grow: 1;
}
.form-details{
    width: 100%;
    text-align: center;
    padding-top: 30px;
    font-weight: bold;
    font-family: 'Roboto';
}
.form-loginoption{
    width: 100%;
    text-align: center;
    padding-top: 20px;
    font-family: 'Roboto';
}
.loginlink{
    text-decoration: none;
    cursor: pointer;
}
.toggle-dark{
    font-family: 'Roboto';
    padding: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.toggle-slider:focus{
    border: none;
    outline: none;
}
.auth-errors{
    width: 80%;
    height: 50px;
    position: absolute;
    z-index: 2;
    left: 5%;
    top: 9%;
    display: flex;
    padding: 0px 20px;
    align-items: center;
    transition: all 0.5s ease-in-out;
}
 screen and (min-width: 850px) {
    .form{
        width: 40%;
        height: 78%;
    }
    .form-container{
        height: 75%;
    }
    .form-heading{
        padding: 10px;
    }
    .form:focus-within{
        transform: scale(1.1);
    }
    .age{
        position: relative;
        top: 10px;
    }
    .form-footer{
    display: none;
    }
    .form{
        display: block;
    }
    .auth-errors{
        width: 30%;
        left: 33%;
    }
}
     */