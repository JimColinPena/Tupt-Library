import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader'

import DeactivatedUser from './DeactivatedUser'
const UserDashboard = () => {
    const [show, setShow] = useState(true);
    const { user, loading } = useSelector(state => state.auth)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <div className="dashboard-container">
                        <div className='table-container'>
                            {(user.course === undefined | null) ?
                                (
                                    <DeactivatedUser />
                                ) : (
                                    <div>
                                        <h1>Dashboard</h1>
                                        <div className='dashboard-container'>
                                            <div className="dashboard-overview">
                                                <div className="dashboard-header">
                                                    <h1 className='pt-2 pb-4'>Dashboard Overview</h1>
                                                </div>
                                                {/* <div className="overview-cards">
                                                    <Link to="/borrow/request">
                                                        <div className="card card1">
                                                            <div className="card-content">
                                                                <i className="fa-solid fa-book-open" id="fa-book-open"></i>
                                                                <h1>Book Request</h1>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link to='/'>
                                                        <div className="card card2">
                                                            <div className="card-content">
                                                                <i className="fa-solid fa-book-open-reader" id="fa-book-open-reader"></i>
                                                                <h1>Book Appointment</h1>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link to='/profile'>
                                                        <div className="card card3">
                                                            <div className="card-content">
                                                                <i className="fa-solid fa-user" id="fa-user"></i>
                                                                <h1>Returned Books</h1>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default UserDashboard