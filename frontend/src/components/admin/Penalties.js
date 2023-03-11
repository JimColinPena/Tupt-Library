import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import SideNavbarAdmin from '../layout/SideNavbarAdmin';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import { allPenalties, paidPenalty, clearErrors } from '../../actions/personnelActions'
import { PAID_PENALTIES_RESET } from '../../constants/personnelConstants'

const Penalties = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, penalties } = useSelector(state => state.penaltiesall);
    const { isPaid } = useSelector(state => state.paidPenalties)

    useEffect(() => {
        dispatch(allPenalties());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isPaid) {
            alert.success('Penalty has been paid')
            navigate('/admin/penalty')
            dispatch({
                type: PAID_PENALTIES_RESET
            })
        }
    }, [dispatch, navigate, isPaid, alert, error])

    const paidPenaltyHandler = (id) => {
        dispatch(paidPenalty(id))
    }

    const setAllPenalties = () => {
        const data = {
            columns: [
                {
                    label: 'TUPT-ID',
                    field: 'tupt_id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Penalties',
                    field: 'penalty',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
        }

        penalties.penalties.forEach(penalty => {
            data.rows.push({
                tupt_id: penalty.userId.id_number,
                name: penalty.userId.name,
                penalty: penalty.penalty,
                status: penalty.status,
                actions:
                    <Fragment>
                        <div className="icon-buttons">
                            {(penalty.status == 'Unpaid') ?
                                (<button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#PaidPenalty" + penalty._id}>
                                    Unpaid
                                </button>)
                                :
                                (<button className="btn btn-success py-1 px-2 ml-2">
                                    Paid
                                </button>)
                            }
                        </div>
                        <div className="modal fade" data-backdrop="false" id={"PaidPenalty" + penalty._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="DeleteActiveModalLabel">Penalty Clearance</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        This will clear penalty for this user.
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" onClick={() => paidPenaltyHandler(penalty._id)} data-dismiss="modal">Proceed</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
            })
        })
        return data;
    }

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Penalties'} />
            <SideNavbarAdmin />
            {loading || loading === undefined ? <Loader /> : (
                <div className="dashboard-container">
                    <div className="table-container">
                            <div className="col-12">
                                <h1 className="text-left">Penalties</h1>

                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setAllPenalties()}
                                        className="px-5 "
                                        bordered
                                        noBottomColumns
                                    />
                                )}
                            </div>
                        </div>
                    </div>
            )}
        </Fragment>
    )
}
export default Penalties