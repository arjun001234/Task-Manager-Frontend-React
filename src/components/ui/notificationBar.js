import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../../Redux/notificationReducer';

const NotificationBar = () => {

    const state = useSelector(state => state.notification);
    const dispatch = useDispatch();
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if(containerRef.current){
            const style = containerRef.current.getBoundingClientRect();
            containerRef.current.style.left = `${window.innerWidth/2 - style.width/2}px`
        }
    },[state.message])

    React.useEffect(() => {
        if(state.show && state.type !== 'request'){
            const timeout = setTimeout(() => {
                dispatch(notificationActions.noNotifications())
            },3000);
            return () => clearTimeout(timeout);
        }
    },[state])

    return (
        state.show &&
        <div ref={containerRef} className={`notification-model ${state.type === 'error' ? "error" : state.type === 'success' ? 'success' : 'request'} ${state.show ? 'notificationInAnim' : 'notificationOutAnim'} `}>
            <p>{state.message}</p>
        </div>
    )
}

export default NotificationBar;
