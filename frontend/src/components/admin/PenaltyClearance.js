import React, { Fragment, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import dateFormat from 'dateformat';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

const PenaltyClearance = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {

    }, [])

    return (
        <Fragment>
            <MetaData title={'Book Requests'} />
            <SideNavbarAdmin />
            {loading ? <Loader /> : (
                <div className="management-content">
                    <h1>Penalty Clearance <span></span>
                    </h1>
                    <hr />
                    {/* </div> */}
                    <div className="management-body">
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default PenaltyClearance