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
                    <nav className="sidenav">
                        <div className="header-nav">
                            <img src="/images/TUPT-Logo.png" alt="logo" />
                            <h1>Technological University of the Philippines - Taguig Campus</h1>
                            <p>Learning Resource Center</p>
                        </div>
                        <ul>
                            <li>
                                <Link to="/dashboard" className="sidenav-links">
                                    <i class="fa-solid fa-gauge"></i>
                                    dashboard
                                </Link>
                            </li>
                            <li>
                                <div class="dropdown">
                                    <Link to='/' className='btn disabled'>
                                        <i class="fa-solid fa-user-gear"></i>
                                        User Management
                                        <i class="fa-solid fa-angle-right"></i>
                                    </Link>
                                    <div class="dropdown-content">
                                        <Link to="/admin/personnels">Personnels</Link>
                                        <Link to="/active/student">Registered Users</Link>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/admin/books" className="sidenav-links">
                                    <i class="fa-solid fa-book-open-reader"></i>
                                    books management
                                </Link>
                            </li>
                            <li>
                                <Link to="/appointments" className="sidenav-links">
                                    <i class="fa-solid fa-book-open"></i>
                                    book requests
                                </Link>
                            </li>
                            <li>
                                <div class="dropdown">
                                    <Link to='/' className='btn disabled'>
                                        <i class="fa-solid fa-book"></i>
                                        Borrowed Books
                                        <i class="fa-solid fa-angle-right"></i>
                                    </Link>
                                    <div class="dropdown-content">
                                        <Link to="/books/borrowed">
                                            Borrowed Books
                                        </Link>
                                        <Link to="/returned/books" href="#">Returned Books
                                        </Link>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/historyLog" className="sidenav-links">
                                    <i class="fa-solid fa-clock-rotate-left"></i>
                                    history logs
                                </Link>
                            </li>
                            <li>
                                <div class="dropdown">
                                    <Link to='/' className='btn disabled'>
                                        <i class="fa-solid fa-user-gear"></i>
                                        Reports
                                        <i class="fa-solid fa-angle-right"></i>
                                    </Link>
                                    <div class="dropdown-content">
                                        <Link to="/admin/accessionReport">Book Accession List</Link>
                                        <Link to="/admin/accreditationReport">Accreditation List</Link>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link to="/admin/penalty" className="sidenav-links">
                                    <i class="fa-solid fa-coins"></i>
                                    penalty clearance
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/evaluation" className="sidenav-links">
                                    <i class="fa-solid fa-coins"></i>
                                    evaluation
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
                                <span>Administrator</span>
                            </div>
                            <Link to="/" class="logout-button" onClick={logoutHandler}>
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </Link>
                        </div>
                    </nav>
                </Fragment>
            )}
        </Fragment>
    )

}

export default SideNavbarAdmin