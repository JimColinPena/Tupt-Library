import React, { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './SideNavbarAdmin'
import SideNavbarUser from './SideNavbarUser'
import AdminDashboard from '../admin/AdminDashboard'
import UserDashboard from '../user/UserDashboard'

const Dashboard = () => {

    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'TUP-T Online Library - Admin'} />

                    {user.role === 'admin' ? (
                        <div>
                            <SideNavbarAdmin />
                            <AdminDashboard />
                        </div>
                    ) : <div>
                        <SideNavbarUser />
                        <UserDashboard />
                    </div>
                    }
                </Fragment>
            )}
        </Fragment>
    )
}
export default Dashboard