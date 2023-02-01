import React, { Fragment, useEffect } from 'react'
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { profile } from '../../actions/userActions'

const Profile = () => {
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    return (
        <Fragment>
             {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />
                    {
                        user.role === "student" ? (
                            <SideNavbarUser />
                        ) : (
                            <SideNavbarAdmin />
                        )
                    }
                    <div className="management-content">
                        <div align="center">
                            <br />
                            <br />
                            <img alt="" src={user.avatar.url} className="rounded-circle" />
                            <h1>{user.name} {(user.gender === 'Male') ? <i id="editprofile"  className="fa fa-mars text-primary" /> : <i id="editprofile" className="fa fa-venus text-error"/>} <Link to={"/update/student/"+user._id}><i id="editprofile" className="fa fa-pencil text-warning"></i></Link></h1>
                            <div className="col-md-6">
                                <hr />
                                <h5>
                                    <i className="fa fa-phone"></i> (+63) {user.contact} |{' '}
                                    <i className="fa fa-envelope"></i> {user.email} |{' '}
                                    <i className="fa fa-home"></i> {user.address}
                                </h5>
                                <hr />
                                <div className="card">
                                    <p>Basic Information</p>
                                    <div className="row">
                                        <div className="box-item col-md-4">
                                            <h4>{(user.birthday === undefined | null) ? "not set" : dateFormat(user.birthday.split('T')[0], "dd-mm-yyyy")}</h4>
                                            <h5>Birthday</h5>
                                        </div>
                                        <div className="box-item  col-md-4">
                                            <h4>{(user.id_number === undefined | null) ? "not set" : user.id_number}</h4>
                                            <h5>TUPT ID</h5>
                                        </div>
                                        <div className="box-item  col-md-4">
                                            <h4>{(user.course === undefined | null) ? "not set" : user.course}</h4>
                                            <h5>Couse</h5>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/" id="changepass" className="btn btn-primary btn-block mt-3">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}
export default Profile