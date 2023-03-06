import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'


import { getBookAccession, addBookAccession, changeBookAccession, editBookAccession, deleteBookAccession, clearErrors } from '../../actions/bookActions'
import { ADD_BOOK_ACCESSION_RESET, ACCESSION_BOOK_RESET, DELETE_BOOK_ACCESSION_RESET, EDIT_BOOK_ACCESSION_RESET } from '../../constants/bookConstants'

const BookAccession = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let { id } = useParams();
    let navigate = useNavigate();

    const { bookAccessions, loading } = useSelector(state => state.accessionDetails)
    const { success } = useSelector(state => state.addBookAccession)
    const { accessionDeleted, accessionEdited, accession_error } = useSelector(state => state.accessionReducer)
    const { bookAccession, accession_book_error } = useSelector(state => state.bookAccession)

    useEffect(() => {
        dispatch(getBookAccession(id));
        if (accession_book_error) {
            alert.error(accession_book_error);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Book accession created successfully');
            navigate(`/accession/detail/${id}`);
            dispatch({ type: ADD_BOOK_ACCESSION_RESET })
        }

        if (bookAccession) {
            alert.success('Book accession updated successfully');
            navigate(`/accession/detail/${id}`);
            dispatch({ type: ACCESSION_BOOK_RESET })
        }

        if (accessionDeleted) {
            alert.success('Book accession deleted successfully');
            navigate(`/accession/detail/${id}`);
            dispatch({ type: DELETE_BOOK_ACCESSION_RESET })
        }
        if (accessionEdited) {
            alert.success('Book accession edited successfully');
            navigate(`/accession/detail/${id}`);
            dispatch({ type: EDIT_BOOK_ACCESSION_RESET })
        }

    }, [dispatch, alert, accession_book_error, success, bookAccession, accessionDeleted, accessionEdited, navigate,])

    const [accession, setAccession] = useState('');
    const [accession_edit, setAccession_Edit] = useState('');
    const [tuptId, setTuptId] = useState('');

    const deleteAccessionHandler = (accessionId) => {
        const formData = new FormData();
        console.log(id)
        console.log(accessionId)
        formData.set('bookId', id)
        dispatch(deleteBookAccession(accessionId, formData))
    }

    const addAccessionHandler = () => {
        const formData = new FormData();
        formData.set('bookId', id)
        formData.set('accession', accession)
        dispatch(addBookAccession(formData))
    }

    const giveAccessionHandler = (accessionId) => {
        const formData = new FormData();
        formData.set('accession', accessionId)
        formData.set('tuptId', tuptId)
        formData.set('func', 'give');
        dispatch(changeBookAccession(formData))
    }
    const retrieveAccessionHandler = (accessionId) => {
        const formData = new FormData();
        formData.set('accession', accessionId)
        formData.set('func', 'retrieve');
        dispatch(changeBookAccession(formData))
    }

    const editAccessionHandler = (accessionId) => {
        const formData = new FormData();
        formData.set('bookId', id)
        formData.set('accession', accession_edit)
        dispatch(editBookAccession(accessionId, formData))
    }

    const setBookAccessions = () => {
        const data = {
            columns: [
                {
                    label: 'Accession Number',
                    field: 'accession_number',
                    sort: 'asc'
                },
                {
                    label: 'Inventory Status',
                    field: 'inventory',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        bookAccessions.bookAccessions.forEach(accession => {
            data.rows.push({
                accession_number: accession.accession_number,
                inventory: <Fragment>
                    <div className="icon-buttons">
                        {(accession.on_shelf == true) ?
                            <div>
                                <button className="btn btn-success py-1 px-2 ml-2" data-toggle="modal" data-target={"#onshelfAccessionModal" + accession._id}>
                                    <i className="fa fa-box"></i>
                                </button> This book is on shelf
                                <div className="modal fade" id={"onshelfAccessionModal" + accession._id} tabindex="-1" role="dialog" aria-labelledby="onshelfAccessionModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title" id="DeleteAccessionModalLabel">Give Assession to User(Admin Debug Tool)</h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div>
                                                <form>
                                                    <div className="modal-body">
                                                        <div className='row'>
                                                            <div className='col-md-12'>
                                                                <label htmlFor="tuptId_field" className="col-sm-2 col-form-label">TUP-T ID</label>
                                                                <div className="col-sm-8">
                                                                    <input
                                                                        type="text"
                                                                        id="tuptId_field"
                                                                        className="form-control"
                                                                        name='tuptId'
                                                                        value={tuptId}
                                                                        onChange={(e) => setTuptId(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() => giveAccessionHandler(accession._id)} data-dismiss="modal">Update</button>
                                                <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#outAccessionModal" + accession._id}>
                                    <i className="fa fa-box"></i>
                                </button> This book is out
                                <div className="modal fade" id={"outAccessionModal" + accession._id} tabindex="-1" role="dialog" aria-labelledby="outAccessionModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title" id="DeleteAccessionModalLabel">Retrieve Assession to User(Admin Debug Tool)</h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div>
                                                <h1>This will retrieve book accession manually. Are you sure you want to continue?</h1>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-warning" onClick={() => retrieveAccessionHandler(accession._id)} data-dismiss="modal">Continue</button>
                                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </Fragment>,
                actions: <Fragment>
                    <div className="icon-buttons">
                        <button className="btn btn-warning py-1 px-2 ml-2" data-toggle="modal" data-target={"#EditAccessionModal" + accession._id}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <div className="modal fade" id={"EditAccessionModal" + accession._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="DeleteAccessionModalLabel">Edit Accession Number</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div>
                                        <form>
                                            <div className="modal-body">
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <label htmlFor="accession_field" className="col-sm-2 col-form-label">Accession Number</label>
                                                        <div className="col-sm-8">
                                                            <input
                                                                type="text"
                                                                id="accession_field"
                                                                className="form-control"
                                                                name='accession_edit'
                                                                value={accession_edit}
                                                                placeholder={accession.accession_number}
                                                                onChange={(e) => setAccession_Edit(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={() => editAccessionHandler(accession._id)} data-dismiss="modal">Update</button>
                                        <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeleteAccessionModal" + accession._id}>
                            <i className="fa fa-trash"></i>
                        </button>
                        <div className="modal fade" data-backdrop="false" id={"DeleteAccessionModal" + accession._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="DeleteAccessionModalLabel">Delete Accession Number</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to delete this book?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={() => deleteAccessionHandler(accession._id)} data-dismiss="modal">Delete</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
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
            <SideNavbarAdmin />
            {loading || loading === undefined ? <Loader /> :
                <Fragment>
                    <div className="management-content">
                        <h1>Book: "{bookAccessions.bookDetails.title}"</h1>
                        <h1>Add Accession(s)<span></span>
                            <button className="btn btn-primary" data-toggle="modal" data-target={"#AddBookAccessionModal"}>
                                <i className="fa-solid fa-circle-plus"></i>
                            </button>
                            <div className="modal fade" id={"AddBookAccessionModal"} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3 className="modal-title" id="DeleteAccessionModalLabel">Add Accession Number</h3>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div>
                                            <form>
                                                <div className="modal-body">
                                                    <label htmlFor="accession_field" className="col-sm-2 col-form-label">Accession Number</label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            id="accession_field"
                                                            className="form-control"
                                                            name='accession'
                                                            value={accession}
                                                            onChange={(e) => setAccession(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={() => addAccessionHandler()} data-dismiss="modal">Add</button>
                                            <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </h1>
                        <div className="management-body">
                            {loading || loading === undefined ? <Loader /> : (
                                <MDBDataTable
                                    data={setBookAccessions()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            )}
                        </div>
                    </div>
                </Fragment>
            }

        </Fragment>
    )
}
export default BookAccession