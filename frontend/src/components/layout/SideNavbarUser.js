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
                    <nav className="sidenav-container">
                        <header className="sidenav-header">
                            <Link to="/" className="sidenav-logo">
                                <img className="sidenav-logo" src="/images/TUPT-Logo.png" alt="tupt-logo"></img>
                            </Link>
                            <span className='sidenav__header'>Technological University of the Philippines - Taguig Campus</span>
                            <span className='sidenav__sub_header'>Learning Resource Center</span>
                        </header>
                        <div className="flex-container">
                            <ul className="sidenav-items">
                                <li>
                                    <Link to="/dashboard" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            dashboard
                                        </span>
                                        dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            mark_email_unread
                                        </span>
                                        Notifications
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/books" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            menu_book
                                        </span>
                                        books
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/borrow/request" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            checklist_rtl
                                        </span>
                                        book requests
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/borrow/books" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            edit_calendar
                                        </span>
                                        borrowed books
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            book
                                        </span>
                                        Returned Books
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            account_balance_wallet
                                        </span>
                                        Penalties
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="profile">
                            {user.avatar.url == null || undefined ? (
                                <img className="profile-img" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1670251835/TUPT_Library/Resources/profile_image_mvaoy5.png" alt=""></img>
                            ) : (
                                <img className="profile-img" src={user.avatar.url} alt=""></img>
                            )}


                            <div className="text-flex">
                                {/* <h4>Sample</h4> */}
                                <Link to="/profile" className="sidenav-links">
                                    {user.name}
                                </Link>
                                <span>{user.role}</span>
                            </div>

                            <Link className="" to="/" onClick={logoutHandler}>
                                <img className="logout" src="/images/logout_btn.png" alt=""></img>
                            </Link>
                        </div>
                    </nav>
                </Fragment>
            )}
        </Fragment>
    )
}
export default SideNavbarUser