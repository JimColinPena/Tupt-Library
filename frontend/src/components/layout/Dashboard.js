import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './SideNavbarAdmin'
import SideNavbarUser from './SideNavbarUser'
import SideNavbarUnset from './SideNavbarUnset'
import AdminDashboard from '../admin/AdminDashboard'
import UserDashboard from '../user/UserDashboard'
import UnsetDashboard from './UnsetDashboard'

const Dashboard = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, loading, user } = useSelector(state => state.auth);

    useEffect(() => {
        if (error) {
            alert.error(error);
        }

    }, [dispatch, alert, error, navigate])

    return (
        <Fragment>
            <MetaData title={'Dashboard'} />
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    {
                        user.role === 'admin' ? (
                            <div>
                                <SideNavbarAdmin />
                                <AdminDashboard />
                            </div>
                        ) : (
                            user.role === 'student' ? (
                                < div >
                                    <SideNavbarUser />
                                    <UserDashboard />
                                </div>
                            ) : (
                                user.role === 'faculty' ? (
                                    < div >
                                    <SideNavbarUser />
                                    <UserDashboard />
                                </div>
                                ) : (
                                    <div>
                                        <SideNavbarUnset />
                                        <UnsetDashboard />
                                    </div>
                                )
                                
                            )


                        )
                    }
                </Fragment>
            )
            }
        </Fragment >
    )
}
export default Dashboard