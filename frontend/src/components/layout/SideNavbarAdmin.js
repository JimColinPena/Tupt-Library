import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { logout } from '../../actions/userActions'

import Loader from '../layout/Loader'
const SideNavbarAdmin = () => {
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
                                    <Link to="/admin/personnels" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            manage_accounts
                                        </span>
                                        user management
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/appointments" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            edit_calendar
                                        </span>
                                        book requests
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/books/borrowed" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            checklist_rtl
                                        </span>
                                        borrowed books
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/books" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            menu_book
                                        </span>
                                        books management
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/historyLog" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            restore
                                        </span>
                                        History Logs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="sidenav-links">
                                        <span className="material-symbols-rounded">
                                            payment
                                        </span>
                                        Penalty clearance
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="profile">
                            {user.avatar.url == null | undefined ? (
                                <img className="profile-img" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1670251835/TUPT_Library/Resources/profile_image_mvaoy5.png" alt=""></img>
                            ) : (
                                <img className="profile-img" src={user.avatar.url} alt=""></img>
                            )}
                            <div className="text-flex">
                                {/* <h4>Sample</h4> */}
                                <Link to="/profile" className="sidenav-links">
                                    Profile
                                </Link>
                                <span>{user.name}</span>
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
export default SideNavbarAdmin