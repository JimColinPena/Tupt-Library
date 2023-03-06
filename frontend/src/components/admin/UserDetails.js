import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { getUserDetail, clearErrors } from '../../actions/personnelActions'

const UserDetails = () => {

    const dispatch = useDispatch();
    let { id } = useParams();

    const { userdetail, loading } = useSelector(state => state.userDetail)

    useEffect(() => {
        dispatch(getUserDetail(id))
    }, [dispatch])

    // { console.log(loading) }
    return (
        <Fragment>
            {/* {loading == true ? <Loader /> :( */}
            {loading || loading == undefined ? <Fragment /> : (
                <Fragment>
                    <MetaData title={'User Details'} />
                    <SideNavbarAdmin />
                    <div className="management-content">
                        {/* {console.log(userdetail)} */}
                        <h1>Name:{userdetail.userinfo.name}</h1>
                        {userdetail.returnedBooks && userdetail.returnedBooks.map(data => (
                            // console.log(data)
                            <Fragment>
                                <h1>Date Returned: {data.returnedDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h1>
                                <div>
                                    {data.bookId.map(datanew => (
                                        <h3>{datanew.title}</h3>

                                    ))}
                                </div>

                            </Fragment>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>

    )

}

export default UserDetails