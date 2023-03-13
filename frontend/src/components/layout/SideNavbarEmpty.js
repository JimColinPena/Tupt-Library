import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from './Loader'
const SideNavbarAdmin = () => {
    // const alert = useAlert();
    // const dispatch = useDispatch();
    // const { user, loading } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.auth)

    // const logoutHandler = () => {
    //     dispatch(logout());
    //     alert.success('Logged out successfully.')
    // }

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
                    </nav>
                </Fragment>
            )}
        </Fragment>
    )
}
export default SideNavbarAdmin