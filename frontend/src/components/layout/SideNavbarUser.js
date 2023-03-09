import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { logout } from '../../actions/userActions'

import Loader from '../layout/Loader'
const SideNavbarUser = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth)
    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }
    return (
        <Fragment>
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <nav className="sidenav">
                        <div className="header-nav">
                            <img src="../images/TUPT-Logo.png" alt="logo" />
                            <h1>Technological University of the Philippines - Taguig Campus</h1>
                            <p>Learning Resource Center</p>
                        </div>
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    <i className="fa-solid fa-gauge"></i>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i class="fa-solid fa-bell"></i>
                                    Notifications
                                    <span className="badge">1</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/books">
                                    <i className="fa-solid fa-book-open-reader"></i>
                                    Books
                                </Link>
                            </li>
                            <li>
                                <Link to="/borrow/request">
                                    <i className="fa-solid fa-book-open"></i>
                                    Books Requests
                                </Link>
                            </li>
                            <li>
                                <Link to="/borrow/books">
                                    <i className="fa-solid fa-list-check"></i>
                                    Borrowed Books
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/">
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                    Returned Books
                                </Link>
                            </li> */}
                            <li>
                                <Link to="/">
                                    <i className="fa-solid fa-coins"></i>
                                    Penalties
                                </Link>
                            </li>
                        </ul>   
                        <div className="profile">
                            {
                                user.avatar.url == null | undefined ?
                                    (
                                        <img className="profile-img" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1670251835/TUPT_Library/Resources/profile_image_mvaoy5.png" alt="">
                                        </img>
                                    ) :
                                    (
                                        <img className="profile-img" src={user.avatar.url} alt=""></img>
                                    )
                            }
                            <div className="click-profile">
                                <Link to="/profile" className='view-profile-button'>View Profile</Link>
                                <span>{user.role}</span>
                            </div>
                            <Link to="/" class="logout-button" onClick={logoutHandler}>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            </Link>
                        </div>
                    </nav>
                </Fragment>
            )}
        </Fragment>
    )
}
export default SideNavbarUser