import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'

import { updateRole, clearErrors } from '../../actions/userActions'
import { UPDATE_ROLE_RESET } from '../../constants/userConstants';

const UserDashboard = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { user, loading } = useSelector(state => state.auth);
    const { roleUpdated, error } = useSelector(state => state.updateUserRole)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (roleUpdated) {
            alert.success('Role updated');
            navigate('/dashboard');
            dispatch({ type: UPDATE_ROLE_RESET })
            
        }

    }, [dispatch, roleUpdated, alert, error, navigate])

    const roleStudent = () => {
        const formData = new FormData();
        formData.set('userId', user._id)
        formData.set('role', 'student')

        dispatch(updateRole(formData))
    }

    const roleFaculty = () => {
        const formData = new FormData();
        formData.set('userId', user._id)
        formData.set('role', 'faculty')

        dispatch(updateRole(formData))
    }

    return (
        <Fragment>
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <div className="management-content">
                        <div className='content-center'>
                            <h1>Good Day!</h1>
                            <h4>Please Select your role</h4>
                            <div clas="row button_row">
                                <button className='btn btn-student' onClick={() => roleStudent()}>
                                    <img className='student_icon' alt='student_icon' src='https://res.cloudinary.com/dxcrzvpbz/image/upload/v1678173852/TUPT_Library/Resources/student_icon_jd86nl.png' />
                                    STUDENT
                                </button>

                                <button className='btn btn-faculty' onClick={() => roleFaculty()}>
                                    <img className="faculty_icon" alt='faculty_icon' src=' https://res.cloudinary.com/dxcrzvpbz/image/upload/v1678175171/TUPT_Library/Resources/faculty_icon_l43sn5.png' />
                                    FACULTY
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default UserDashboard