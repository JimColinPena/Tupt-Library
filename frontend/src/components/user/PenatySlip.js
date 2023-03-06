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

import { getPenaltySlip, clearErrors } from '../../actions/studentActions'

const PenaltySlip = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, penalty } = useSelector(state => state.penaltySlip);

    useEffect(() => {
        dispatch(getPenaltySlip());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error,])

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Student'} />
            <SideNavbarUser />
            {loading || loading === undefined  ? <Loader /> : (
                <Fragment>
                    <div className="management-content">
                        <h1>Penalty Slip</h1>
                        <hr />
                        <div className="management-body">
                            {/* {console.log(penalty.penalties)} */}
                            {(penalty.penalties == null || penalty.penalties == undefined) ?
                                (
                                    <h1>No Penalty</h1>
                                ) : (
                                    <div>
                                        <h1>Name: {penalty.penalties.userId.name}</h1>
                                        <h1>Course: {penalty.penalties.userId.course}</h1>
                                        <h1>Section: {penalty.penalties.userId.section}</h1>
                                        <h1>{penalty.penalties.penalty}</h1>
                                    </div>
                                )

                            }
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default PenaltySlip