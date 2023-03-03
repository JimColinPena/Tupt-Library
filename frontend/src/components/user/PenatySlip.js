import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dateFormat from 'dateformat';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarUser from '../layout/SideNavbarUser'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { clearErrors } from '../../actions/studentActions'

const PenaltySlip = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(allStudentAppointmentBook());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [alert, error])

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Student'} />
            <SideNavbarUser />
            {loading ? <Loader /> : (
                <Fragment>
                </Fragment>
            )}
        </Fragment>
    )
}
export default PenaltySlip