import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { borrowedBooksLength, pendingBookRequests, pendingUserRequests, clearErrors } from '../../actions/borrowActions'
// import { allBorrowed, clearErrors } from '../../actions/personnelActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import ReturnedBooksCharts from './ReturnedBooksChart'
import SectionBorrowedCharts from './SectionBorrowedChart'
import BookLeaderboards from './BookLeaderboards'
import BorrowerLeaderboards from './BorrowerLeaderboards'
import Loader from '../layout/Loader'

const AdminDashboard = () => {

    // const myArray = [1]
    // const myArrayLength = myArray.length
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, borrowedbooksLength } = useSelector(state => state.borrowedBooksLength);
    const { pendingBooksRequests } = useSelector(state => state.pendingBookRequests);
    const { pendingUsersRequests } = useSelector(state => state.pendingUserRequests);

    useEffect(() => {
        dispatch(borrowedBooksLength());
        dispatch(pendingBookRequests());
        dispatch(pendingUserRequests());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className='dashboard-container'>
                        <div className="dashboard-overview">
                            <div className="dashboard-header">
                                <h1 className='pt-2 pb-4'>Dashboard Overview</h1>
                            </div>
                            <div className="overview-cards">
                                <Link to='/'>
                                    <div className="card card1">
                                        <div className="card-content">
                                            <i className="fa-solid fa-book-open" id="fa-book-open"></i>
                                            <span>{borrowedbooksLength}</span>
                                            <h1>Borrowed Books</h1>
                                        </div>
                                    </div>
                                </Link>
                                <Link to='/'>
                                    <div className="card card2">
                                        <div className="card-content">
                                            <i className="fa-solid fa-book-open-reader" id="fa-book-open-reader"></i>
                                            <span>{pendingBooksRequests}</span>
                                            <h1>Pending Book Approval</h1>
                                        </div>
                                    </div>
                                </Link>
                                <Link to='/'>
                                    <div className="card card3">
                                        <div className="card-content">
                                            <i className="fa-solid fa-user" id="fa-user"></i>
                                            <span>{pendingUsersRequests}</span>
                                            <h1>Pending Users Request</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="analytics">
                                <h1 className="overview py-5 pl-1">Analytics</h1>
                                {/* <BorrowerLeaderboards /> */}
                                {/* <BookLeaderboards /> */}
                                {/* <ReturnedBooksCharts /> */}
                                {/* <SectionBorrowedCharts /> */}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default AdminDashboard