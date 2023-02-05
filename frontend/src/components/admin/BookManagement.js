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
                    {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteBookHandler(books._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeleteBookModal" + books._id}>
                        <i className="fa fa-trash"></i>
                    </button>

                    <div class="modal fade" data-backdrop="false" id={"DeleteBookModal" + books._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="modal-title" id="DeleteActiveModalLabel">Delete User</h3>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this book?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" onClick={() => deleteBookHandler(books._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
            <MetaData title={'TUP-T Online Library - Admin'} />
            {/*<div className="row">*/}
            <SideNavbarAdmin />
            {loading ? <Loader /> : (
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
            )}
        </Fragment>
    )
}
export default BookManagement