import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact'
import { Chip, FormControl, Input, } from "@material-ui/core";

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allBooks, deleteBook, addBookAccession, clearErrors } from '../../actions/bookActions'
import { DELETE_BOOK_RESET, ADD_BOOK_ACCESSION_RESET } from '../../constants/bookConstants'
import { acceptBorrowReducer } from '../../reducers/personnelReducers';

const BookManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, books } = useSelector(state => state.allBooks);
    const { isDeleted } = useSelector(state => state.book)
    const { isAdded } = useSelector(state => state.addBookAccession)

    const [accessions, setAccessions] = useState([]);
    const [currValue, setCurrValue] = useState("");

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

        if (isAdded) {
            alert.success('Book Accession added successfully');
            dispatch({ type: ADD_BOOK_ACCESSION_RESET })
        }

    }, [dispatch, alert, error, isDeleted, isAdded, navigate])

    const deleteBookHandler = (id) => {
        dispatch(deleteBook(id))
    }

    const handleKeyUp = (e) => {
        console.log(e.keyCode);
        if (e.keyCode == 32) {
            setAccessions((oldState) => [...oldState, e.target.value]);
            setCurrValue("");
        }
    };

    const handleChange = (e) => {
        setCurrValue(e.target.value);
    };

    const handleDelete = (item, index) => {
        let arr = [...accessions]
        arr.splice(index, 1)
        setAccessions(arr)
    }

    const addAccessionHandler = (id) => {

        if (accessions.length === 0 ) {
            alert.error('Accession number is empty ');
        }
        else {
            const formData = new FormData();
            formData.set('bookId', id)
            console.log(accessions)
            console.log(id)
            accessions.forEach(accession =>
                formData.append('accession', accession)
            )
            dispatch(addBookAccession(formData))
            setAccessions([])
        }

    }





    const setBooks = () => {
        const data = {
            columns: [
                {
                    label: 'Call Number',
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
                    label: 'Accession Number(s)',
                    field: 'accession',
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
            let prefix = ""
            if (books.Fil == true) {
                prefix = "FIL"
            } else if (books.Ref == true) {
                prefix = "REF"
            }
            else if (books.Bio == true) {
                prefix = "BIO"
            } else if (books.Res == true) {
                prefix = "RES"
            } else {
                prefix = "N/A"
            }
            data.rows.push({
                call_number: prefix + " " + books.call_number,
                title: books.title,
                main_author: books.main_author,
                copy: books.copy,
                on_shelf: books.on_shelf,
                out: books.out,
                yearPub: books.yearPub,
                accession: <Fragment>
                    <div className="icon-buttons">
                        <button className="btn btn-primary py-1 px-2 ml-2" data-toggle="modal" data-target={"#AddBookAccessionModal" + books._id}>
                            <i class="fa fa-book-medical"></i>
                        </button>
                        <div className="modal fade" id={"AddBookAccessionModal" + books._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="DeleteActiveModalLabel">Add Accession Number(s)</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <h6 className="">Book Tilte:{books.title}</h6>
                                        <FormControl className="formControlRoot">
                                            <div className="container">
                                                {accessions.map((item, index) => (
                                                    <Chip size="small" onDelete={() => handleDelete(item, index)} label={item} />
                                                ))}
                                            </div>
                                            <Input
                                                id="accessions"
                                                value={currValue}
                                                onChange={handleChange}
                                                onKeyDown={handleKeyUp}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={() => addAccessionHandler(books._id)} data-dismiss="modal">Submit</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-info py-1 px-2 ml-2" data-toggle="modal" data-target={"#EditBookAccessionModal" + books._id}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-dark py-1 px-2 ml-2" data-toggle="modal" data-target={"#ViewBookAccessionModal" + books._id}>
                            <i className="fa fa-eye"></i>
                        </button>
                    </div>
                </Fragment>,
                actions: <Fragment>
                    <div className="icon-buttons">
                        <Link to={`/admin/book/${books._id}`} className="btn btn-warning py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeleteBookModal" + books._id}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>

                    <div className="modal fade" data-backdrop="false" id={"DeleteBookModal" + books._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeleteActiveModalLabel">Delete User</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this book?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => deleteBookHandler(books._id)} data-dismiss="modal">Delete</button>
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