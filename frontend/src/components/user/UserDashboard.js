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
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="management-content">
                        {(user.course === undefined | null) ?
                            (
                                <DeactivatedUser />
                            ) : (
                                <div>
                                    <h1>Dashboard</h1>
                                </div>
                            )
                        }

                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default UserDashboard