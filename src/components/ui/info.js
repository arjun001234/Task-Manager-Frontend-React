import React from 'react';
import {BsCheck} from 'react-icons/bs';
import {IoMdClose,IoIosArrowForward} from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { notificationActions } from '../../Redux/notificationReducer';
import { userUpdate } from '../../Redux/userReducer';

const Info = ({text,title,disable}) => {

    const dispatch = useDispatch();

    const [edit,setEdit] = React.useState(false);
    const [value,setValue] = React.useState(text);
    const inputRef = React.useRef(null);
    const classes = `info ${edit && 'info-border'}`

    const handleEnable = () => {
        inputRef.current.focus();
        setEdit(true);
    };

    const handleDisable = () => {
        setEdit(false);
        setValue(text)
    }

    const handleUpdate = () => {
        const testEmail = /^\S+@\S+\.\S+$/;
        const key = title.toLowerCase();
        if(key === 'name' && value.length < 3){
            return dispatch(notificationActions.error({message: 'Name too short'}))
        }else if(key === 'email' && !testEmail.test(value)){
            return dispatch(notificationActions.error({message: 'Invalid Email'}))
        }
        dispatch(userUpdate({
            [key]: value
        }));
        setEdit(false);
    }

    return (
        <div className={classes}>
            <label htmlFor={title}>{title}</label>
            <IoIosArrowForward style={{marginRight: '10px'}} />
            <input ref={inputRef} id={title} type="text" value={value} onChange={(e) => setValue(e.target.value)} disabled={!edit ? "disabled" : ""} />
            <section>
                {!edit && !disable && <button onClick={handleEnable}>Edit</button>}
                {edit && <div>
                    <BsCheck color="#4F8A10" transform="scale(1.5)" onClick={handleUpdate} />
                    <IoMdClose onClick={handleDisable} color="#D8000C" transform="scale(1.5)" />
                </div>}
            </section>
        </div>
    )
}

export default Info;
