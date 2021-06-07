import React from 'react';
import './style.css';
import { faPlusSquare, faUser} from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faCamera, faCheck, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { addAvatarRequest, getAavtarRequest, deleteAvatarRequest, deleteUserRequest,readUserRequest, updateUserRequest, userLogoutallRequest, userLogoutRequest } from './requests';
import { connect } from 'react-redux';
import { LOGOUT } from './Redux/actions';
import { getAavtar } from './urls';


const Profile = ({history,state,Logout}) => {

    const defaultImage = 'https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg';

    const[imageUrl,setImageUrl] = useState(defaultImage);

    const[loading,setLoading] = useState(true);
    const[changePassword,setChangePassword] = useState(false);
    const[userDetails,setUserDetails] = useState({});
    const[openModal,setOpenModal] = useState(false);
    const[isFetched,setIsFetched] = useState(false);
    const[inputvalues,setInputValues] = useState({
        name: state.user.name,
        email: state.user.email,
    })
    const[newPassword,setNewPassword] = useState('');
    const[addImage,setAddImage] = useState(null);
    const[showErrors,setShowErrors] = useState('');
    const[isImageExist,setIsImageExist] = useState(false);

    const token = localStorage.getItem("token");

    const handleLogout = async (e) => {
        e.preventDefault()
        await userLogoutRequest(token,(result,error) => {
            if(error){
                console.log(error)
            }
            if(result){
                console.log(result);
                Logout({result,error})
                return  history.push('/');
            }
        })
    }

    const handleLogoutAll = async (e) => {
        e.preventDefault();
        await userLogoutallRequest(token,(result,error) => {
            if(error){
                console.log(error)
            }
            if(result){
                console.log(result);
                Logout({result,error})
                return history.push('/');
            }})
    }

    const handleUpdate = (e) => {
        setOpenModal(true);
    }

    const handleUpdateForm = async (e) => {
        e.preventDefault();
        setOpenModal(false)
        await updateUserRequest(inputvalues,token,(result,error) => {
            if(error){
                console.log(error);
                setShowErrors('Invalid Email');
            } 
            if(result){
                console.log(result);
            }
        })
        getUser();
        setTimeout(() => {
            setShowErrors('');
        },3000)
    }

    const handleRemoveAvatar = async (e) => {
        e.preventDefault()
        await deleteAvatarRequest(token,(result,error) => {
            if(error){
                console.log(error)
            }
            if(result){
                console.log(result)
                getAavtarMethod();
                setIsImageExist(false)
            }
        })
    }

    const handleUserDelete = async (e) => {
        e.preventDefault()
        await deleteUserRequest(token,(result,error) => {
            if(error){
                console.log(error)
            }
            if(result){
                console.log(result)
                return history.push('/');
            }
        })
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        setChangePassword(true);
    }

    const handleNewPassword = async(e) => {
        e.preventDefault();
        if(newPassword){
            await updateUserRequest(newPassword,token,(result,error) => {
                if(error){
                    console.log(error);
                    setShowErrors('Invalid Password');
                } 
                if(result){
                    console.log(result);
                }
            })
        }
        setChangePassword(false)
        setTimeout(() => {
            setShowErrors('');
        },3000)
    }

    const handleImageUpload = async(e) => {
        e.preventDefault();
        setAddImage(e.target.files[0]);
        console.log(addImage)
    }

    const getUser = async() => {
        setIsFetched(false)
        await readUserRequest(token,(result,error) => {
            if(error){
                console.log(error);
            }
            if(result){
                console.log(result)
                setUserDetails(result.data)
            }
        });
        setIsFetched(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setChangePassword(false);
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

/**function fileToImageBase64Url(file) {
    const blob = new Blob([file], { type: 'image/png' });
    return URL.createObjectURL(blob);
    }*/

    React.useEffect(() => {
        getUser();
        getAavtarMethod();
        setTimeout(() => {
            setLoading(false);
        },250)
    },[])

    React.useEffect(() => {
        const loadImage = async() => {
            if(addImage){
                const formData = new FormData();
                formData.append('avatar',addImage);
                await addAvatarRequest(formData,token,(result,error) => {
                    if(error){
                        console.log(error);
                        setShowErrors('Invalid File Upload');
                    } 
                    if(result){
                        console.log(result);
                        getAavtar();
                        setIsImageExist(false)
                    }
                })
                setTimeout(() => {
                    setShowErrors('');
                },3000)
            }
        }
        loadImage();
    },[addImage])


    return (
        //Object.keys(userDetails).length === 0 ?  <Loader /> :
        <>
        {openModal &&
        <form className='modal'>
            <FontAwesomeIcon icon={faTimes} className='close-modal' onClick={handleCloseModal}/>
            <p className='modal-text'>Enter New Values </p>
                <input type='text' className='modal-input' placeholder='Enter New Name' value={inputvalues.name} onChange={(e) => setInputValues({...inputvalues,name: e.target.value})}></input>
                <input type='text' className='modal-input' placeholder='Enter New Email'value={inputvalues.email} onChange={(e) => setInputValues({...inputvalues,email: e.target.value})}></input>
                <button type='submit' className='modal-button' onClick={handleUpdateForm}>Update</button>
        </form>}
        {changePassword && <form className='modal'>
        <FontAwesomeIcon icon={faTimes} className='close-modal' onClick={handleCloseModal}/>
            <p className='modal-text'>Enter New password </p>
                <input type='text' className='modal-input' placeholder='Enter New password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                <button type='submit' className='modal-button' onClick={handleNewPassword}>Update</button>
        </form>}
        { showErrors && <div className='error-bar2' style={{transform: showErrors ? 'translateY(0px)' : 'translateY(200px)'}}>
                <FontAwesomeIcon icon={faExclamationCircle} style={{}} className='error-bar-icon' />
                <p className='error-bar-text'>{showErrors}</p>
            </div>}
        <div className='home-container' style={{filter: openModal || changePassword ? 'blur(5px)' : 'none'}}>
            <Link to='/home' style={{textDecoration: 'none',color: 'initial'}}><div className='arrow-button' style={{transform: loading ? 'translateY(-200px)' : 'translateY(0px)'}}>
            <FontAwesomeIcon icon={faArrowLeft} size='1x' style={{position: 'absolute',top: '0%',left: '0%',padding: '6px',transform: 'scale(1.3)',color: '#E58C8A',boxSizing: 'content-box'}}  className='arrow-button' />
            </div></Link>
            <main className='home-content' style={{alignItems: 'center',justifyContent: 'center'}}>
                <section className='profile-content'>
                    <img className='avatar' src={imageUrl}  style={{transform: loading ? 'scale(0)' : 'scale(1)'}}></img>
                    {isImageExist ? <button className='user-button' style={{width: '40%',margin: '20px 0px'}} onClick={handleRemoveAvatar}>Remove Pic</button> :
                    <div  className='avatar-upload' style={{transform: loading ? 'scale(0)' : 'scale(1)'}}>
                        <FontAwesomeIcon icon={faCamera} className='upload-icon' />
                        <label htmlFor='upload-file' className='avatar-button' >Upload</label>
                        <input id='upload-file' type='file' style={{display: 'none'}} onChange={handleImageUpload} />
                    </div>}
                    { isFetched &&
                    <>
                    <h1 className='user-name'style={{transform: loading ? 'translateX(-500px)' : 'translateX(0px)'}}>{userDetails.name}</h1>
                    <p className='user-age' style={{transform: loading ? 'translateX(-500px)' : 'translateX(0px)'}}>{userDetails.age} years old</p>
                    <p className='user-email' style={{transform: loading ? 'translateX(-500px)' : 'translateX(0px)'}}>{userDetails.email}</p>
                    </> }
                    {isFetched &&  Object.keys(userDetails).length === 0  && <h1 className='empty' style={{margin: '50px 0px'}}>No Info To Display</h1>}
                    {!isFetched &&  <h1 className='empty' style={{margin: '50px 0px'}}>Loading...</h1>}
                    <div className='user-controls' style={{transform: loading ? 'translateX(500px)' : 'translateX(0px)'}}>
                        <button className='user-button' type='button' title='Update Profile' onClick={handleUpdate}>Update</button>
                        <button className='user-button' onClick={handleLogout}>Logout</button>
                        <button className='user-button' title='Logout From All  Devices' onClick={handleLogoutAll} >Logout All</button>
                        <button className='user-button' title='Delete Your Account' onClick={handleUserDelete}>Delete</button>
                    </div>
                    <button className='user-button' style={{width: '50%',transform: loading ? 'translateX(-500px)' : 'translateX(0px)',transition: 'all 1s ease-in-out'}} onClick={handleChangePassword}>Change Password</button>
                </section>
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
        </>
    )
}

const mapsStateToProps = (state) =>{
    return {state}
}

const mapsDispatchToProps = dispatch =>{
    return {Logout: (data) => dispatch({type: LOGOUT,payload: data})}
}

export default connect(mapsStateToProps,mapsDispatchToProps)(Profile)
