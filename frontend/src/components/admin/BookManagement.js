import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allBooks, deleteBook, clearErrors } from '../../actions/bookActions'
import { DELETE_BOOK_RESET } from '../../constants/bookConstants'

const BookManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, books } = useSelector(state => state.allBooks);
    const { isDeleted } = useSelector(state => state.book)

    useEffect(() => {
        dispatch(allBooks());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Book deleted successfully');
            navigate('/admin/books');
            dispatch({ type: DELETE_BOOK_RESET })
        }

    }, [dispatch, alert, error, isDeleted, navigate])

    const deleteBookHandler = (id) => {
        dispatch(deleteBook(id))
    }

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
                {
                    label: 'Stock',
                    field: 'copy',
                    sort: 'asc'
                },
                {
                    label: 'On-Shelf',
                    field: 'on_shelf',
                    sort: 'asc'
                },
                {
                    label: 'Out',
                    field: 'out',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    maxWidth: 400,
                    minWidth: 140,
                    width: 200,
                },
            ],
            rows: []
        }

        books.forEach(books => {
            data.rows.push({
                call_number: books.call_number,
                title: books.title,
                main_author: books.main_author,
                copy: books.copy,
                on_shelf: books.on_shelf,
                out: books.out,
                yearPub: books.yearPub,
                actions: <Fragment>
                    <Link to={`/admin/book/${books._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteBookHandler(books._id)}>
                        <i className="fa fa-trash"></i>
                    </button>

                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'TUP-T Online Library - Admin'} />
                    {/*<div className="row">*/}
                    <SideNavbarAdmin />

                    <div className="management-content">
                        {/* <div className="management-header"> */}
                            <h1>Books <span></span>
                                <Link to={"/book/new"}>
                                    <i className="fa-solid fa-circle-plus"></i>
                                </Link>
                            </h1>
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
            )}
        </Fragment>
    )
}
export default BookManagement