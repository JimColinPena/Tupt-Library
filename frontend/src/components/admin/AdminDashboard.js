import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { borrowedBooksLength, pendingBookRequests, pendingUserRequests, clearErrors } from '../../actions/borrowActions'
// import { allBorrowed, clearErrors } from '../../actions/personnelActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import ReturnedBooksCharts from './ReturnedBooksChart'
import SectionBorrowedCharts from './SectionBorrowedChart'
import BookLeaderboards from './BookLeaderboards'
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
            {/* <Loader /> */}
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="dashboard_header"><h1 className="overview">Dashboard</h1></div>
                    {/* <hr className='dashboard_hr'/> */}
                    <div className="dashboard_container">
                        <div className="dashboard_borrowedbook dash-item">
                            <div className="icon">
                                <p>{borrowedbooksLength}</p>
                                <span className="material-symbols-outlined">
                                    book
                                </span>
                            </div>
                            <Link to="/books/borrowed"><h3 href="/">Borrowed Books</h3></Link>
                        </div>
                        <div className="dashboard_pending-bookapproval dash-item">

                            <div className="icon">
                                <p>{pendingBooksRequests}</p>
                                <span className="material-symbols-outlined">
                                    library_books
                                </span>
                            </div>
                            <Link to="/appointments"><h3 href="/">pending book approval</h3></Link>
                        </div>
                        <div className="dashboard_pending-userapproval dash-item">

                            <div className="icon">
                                <p>{pendingUsersRequests}</p>
                                <span className="material-symbols-outlined">
                                    how_to_reg
                                </span>
                            </div>
                            <Link to="/admin/personnels"><h3 href="/">Penalties</h3></Link>
                        </div>


                    </div>
                    <hr />
                    <div className="management-content"><h1 className="overview">Analytics</h1>
                        <div className="row">
                            {/* <div className='col-md-4'>

                            </div> */}
                            <ReturnedBooksCharts />
                            <SectionBorrowedCharts />
                            <BookLeaderboards />
                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}
export default AdminDashboard