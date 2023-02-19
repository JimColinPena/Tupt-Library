import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'


import { getBookAccession, addBookAccession, deleteBookAccession, clearErrors } from '../../actions/bookActions'
import { ADD_BOOK_ACCESSION_RESET, DELETE_BOOK_ACCESSION_RESET } from '../../constants/bookConstants'

const BookAccession = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let { id } = useParams();
    let navigate = useNavigate();

    const { bookAccessions, loading, error } = useSelector(state => state.accessionDetails)
    const { success } = useSelector(state => state.addBookAccession)
    const { accessionDeleted } = useSelector(state => state.accessionDelete)

    const [accession, setAccession] = useState('');
    const [accession_edit, setAccession_Edit] = useState('');
    const [on_shelf, setOn_shelf_Edit] = useState('');
    const [out, setOut_Edit] = useState();

    useEffect(() => {
        // if (bookAccessions && bookAccessions._id !== id) {
        dispatch(getBookAccession(id));


        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Book accession created successfully');
            navigate(`/accession/detail/${id}`);
            dispatch({ type: ADD_BOOK_ACCESSION_RESET })
        }

        if (accessionDeleted) {
            navigate(`/accession/detail/${id}`);
            alert.success('Book accession deleted successfully');
            dispatch({ type: DELETE_BOOK_ACCESSION_RESET })
        }

    }, [dispatch, alert, error, success, accessionDeleted, navigate,])

    const deleteAccessionHandler = (id) => {
        dispatch(deleteBookAccession(id))
    }

    const addAccessionHandler = () => {
        const formData = new FormData();
        formData.set('bookId', id)
        formData.set('accession', accession)
        dispatch(addBookAccession(formData))
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
                    label: 'On Shelf',
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
                },
            ],
            rows: []
        }

        bookAccessions.forEach(accession => {
            data.rows.push({
                accession_number: accession.accession_number,
                on_shelf: accession.on_shelf ? 1 : 0,
                out: accession.out ? 1 : 0,
                actions: <Fragment>
                    <div className="icon-buttons">
                        <button className="btn btn-warning py-1 px-2 ml-2" data-toggle="modal" data-target={"#EditAccessionModal" + accession._id}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeleteAccessionModal" + accession._id}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
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
                                                            onChange={(e) => setAccession_Edit(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <label htmlFor="on_shelf_field" className="col-sm-2 col-form-label">Accession Number</label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            id="on_shelf_field"
                                                            className="form-control"
                                                            name='on_shelf'
                                                            value={on_shelf}
                                                            onChange={(e) => setOn_shelf_Edit(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <label htmlFor="out_field" className="col-sm-2 col-form-label">Accession Number</label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            id="out_field"
                                                            className="form-control"
                                                            name='out'
                                                            value={out}
                                                            onChange={(e) => setOut_Edit(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => addAccessionHandler()} data-dismiss="modal">Update</button>
                                    <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
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
            <div className="management-content">
                <h1>Accession Number(s) <span></span>
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
    )
}
export default BookAccession