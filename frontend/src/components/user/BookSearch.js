import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarUser from '../layout/SideNavbarUser'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allStudentBooks, clearErrors } from '../../actions/studentActions'

const BookSearch = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, studentbooks } = useSelector(state => state.allStudentBooks);

    useEffect(() => {
        dispatch(allStudentBooks());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, navigate])

    const setBooks = () => {
        const data = {
            columns: [
                {
                    label: 'Book ID',
                    field: 'call_number',
                    sort: 'asc'
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Author',
                    field: 'main_author',
                    sort: 'asc'
                },
                {
                    label: 'Date Published',
                    field: 'yearPub',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        studentbooks.forEach(books => {
            data.rows.push({
                call_number: books.call_number,
                title: <Fragment>
                    <Link to={`/student/book/${books._id}`} className="">
                        {books.title}
                    </Link>
                </Fragment>,
                main_author: books.main_author,
                yearPub: books.yearPub,
            })
        })

        return data;
    }

    return (
        <Fragment>
            {/* {loading ? <Loader /> : (
                <Fragment>
                    {console.log(studentbooks)}
                </Fragment>
            )} */}
            <MetaData title={'TUP-T Online Library - Student'} />
            <SideNavbarUser />
            <div className="management-content">
                {/* <div className="management-header"> */}
                    <h1>Books <span></span>
                    </h1>
                    <hr/>
                {/* </div> */}
                <div className="management-body">
                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setBooks()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    )}
                </div>
            </div>
        </Fragment>
    )
}
export default BookSearch