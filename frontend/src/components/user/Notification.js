import React, { Fragment, useEffect } from "react"
import { useNavigate, Link , useParams} from "react-router-dom"
import { allNotification, deleteSingleNotification, deleteAllNotification, clearErrors } from "../../actions/userActions"
import { DELETE_NOTIFICATION_RESET, DELETE_ALL_NOTIFICATION_RESET } from "../../constants/userConstants"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader"
import SideNavbarUser from "../layout/SideNavbarUser"

// import addNotification from 'react-push-notification';

const Notification = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, notification  } = useSelector(state => state.notifications);
    const { notificationDeleted } = useSelector(state => state.singleDeleteNotification);
    const { notificationAllDeleted } = useSelector(state => state.allDeleteNotification);
    // const { user } = useSelector(state => state.auth);

    // const buttonClick = () => {
    //     addNotification({
    //         title: 'Warning',
    //         subtitle: 'This is a subtitle',
    //         message: 'This is a very long message',
    //         theme: 'darkblue',
    //         native: true // when using native, your OS will handle theming.
    //     });
    // };

    useEffect(() => {
        dispatch(allNotification(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (notificationDeleted) {
            alert.success('Notification cleared successfully');
            navigate('/notification/:id');
            dispatch({ type: DELETE_NOTIFICATION_RESET })
            window.location.reload(false)
        }

        if (notificationAllDeleted) {
            alert.success('All notification cleared successfully');
            navigate('/notification/:id');
            dispatch({ type: DELETE_ALL_NOTIFICATION_RESET })
            window.location.reload(false)
        }
        
    }, [dispatch, alert, error, navigate, notificationDeleted, notificationAllDeleted])
    
    const deleteNotificationHandler = (id) => {
        dispatch(deleteSingleNotification(id))
    }

    const deleteallNotificationHandler = (id) => {
        dispatch(deleteAllNotification(id))
    }

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - User'} />
            <SideNavbarUser />
            {loading ? <Loader /> : (
                <div className="management-content">
                    {/* <button onClick={buttonClick} className="button">
                        Hello world.
                    </button> */}
                    <button className="btn btn-danger" style={{ "borderStyle":"solid", "float":"right", "marginTop":"25px"}} onClick={() => deleteallNotificationHandler(notification._id)}>Clear All</button>
                    <h1 className='notification-log-header'>Notification</h1>
                    
                    {notification.map((n) => (
                        
                        <div style={{ "border-style": "solid", "margin-bottom": "5px", "padding":"10px" }}>
                            <button className="btn btn-outline-danger" onClick={() => deleteNotificationHandler(n._id)} style={{ "float":"right" }}>&#10006;</button>
                            <h5>{n.notificationText}</h5>
                            {/* <h6>{n.notificationType}</h6> */}
                            
                            <h6>{n.notificationType}</h6><h6 className="reason">{n.reasons}</h6>
                            <p>{n.notificationWebDate}</p>
                            {console.log(n.notificationWebDate)}
                        </div>
                        
                    ))}
                </div>
            )}
        </Fragment>
    )
}
export default Notification