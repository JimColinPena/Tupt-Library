import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarUser from '../layout/SideNavbarUser'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allStudentAppointmentBook, clearErrors } from '../../actions/studentActions'



const AppointmentDetails = () => {
    const [startDate, setStartDate] = useState(null);

    const alert = useAlert();
    const dispatch = useDispatch();
    // let navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { loading, error, studentappointmentbook } = useSelector(state => state.allStudentAppointmentBook);

    useEffect(() => {
        dispatch(allStudentAppointmentBook());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    {studentappointmentbook ? (
                        <Fragment>
                            <MetaData title={'TUP-T Online Library - Student'} />
                            <SideNavbarUser />
                            <div className="management-content">
                                <div className="management-header">
                                    <h1>Book Appointment</h1>
                                </div>
                                <div className="management-body">
                                    {studentappointmentbook.bookId && studentappointmentbook.bookId.map(data => (
                                        <h1>{data.title}</h1>
                                    ))}
                                    <hr />
                                    <h2>Status: {studentappointmentbook.status}</h2>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <MetaData title={'TUP-T Online Library - Student'} />
                            <SideNavbarUser />
                            <div className="management-content">
                                    <h1>List of Borrowed Books</h1>
                                    <hr/>
                                <div className="management-body">
                                    <h1>No Borrowed Books</h1>
                                </div>
                            </div>
                        </Fragment>

                    )}
                </Fragment>
            )}
        </Fragment>
    )
}
export default AppointmentDetails