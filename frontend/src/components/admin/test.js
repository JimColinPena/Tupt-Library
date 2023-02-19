import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact'
import { Chip, FormControl, Input, } from "@material-ui/core";

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import {  getBookAccession, clearErrors } from '../../actions/bookActions'
import {  ADD_BOOK_ACCESSION_RESET } from '../../constants/bookConstants'

const BookAccession = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { id } = useParams();

    const { isAdded } = useSelector(state => state.addBookAccession)
    const { loading, error, book_accessions } = useSelector(state => state.accessionDetails)

    const [accessions, setAccessions] = useState([]);
    const [currValue, setCurrValue] = useState("");

    console.log(id)

    useEffect(() => {
        dispatch(getBookAccession(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isAdded) {
            alert.success('Book Accession added successfully');
            dispatch({ type: ADD_BOOK_ACCESSION_RESET })
        }

    }, [dispatch, alert, error, isAdded, id, navigate])

    

    // const deleteBookHandler = (id) => {
    //     dispatch(deleteBook(id))
    // }

    // const handleKeyUp = (e) => {
    //     console.log(e.keyCode);
    //     if (e.keyCode == 32) {
    //         setAccessions((oldState) => [...oldState, e.target.value]);
    //         setCurrValue("");
    //     }
    // };

    // const handleChange = (e) => {
    //     setCurrValue(e.target.value);
    // };

    // const handleDelete = (item, index) => {
    //     let arr = [...accessions]
    //     arr.splice(index, 1)
    //     setAccessions(arr)
    // }

    // const addAccessionHandler = (id) => {
    //     if (accessions.length === 0) {
    //         alert.error('Accession number is empty ');
    //     }
    //     else {
    //         const formData = new FormData();
    //         formData.set('bookId', id)
    //         console.log(accessions)
    //         console.log(id)
    //         accessions.forEach(accession =>
    //             formData.append('accession', accession)
    //         )
    //         dispatch(addBookAccession(formData))
    //         setAccessions([])
    //     }
    // }



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
                    maxWidth: 400,
                    minWidth: 140,
                    width: 200,
                },
            ],
            rows: []
        }

        book_accessions.forEach(book_accession => {
            data.rows.push({
                accession_number: book_accession.accession_number,
                on_shelf:  book_accession.on_shelf,
                out:  book_accession.out,
                actions: <Fragment>
                    <div className="icon-buttons">
                        <div>
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
                        </div>
                        <div> 
                            <button className="btn btn-info py-1 px-2 ml-2" data-toggle="modal" data-target={"#EditBookAccessionModal" + books._id}>
                                <i className="fa fa-pencil"></i>
                            </button>
                            <div className="modal fade" id={"EditBookAccessionModal" + books._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3 className="modal-title" id="DeleteActiveModalLabel">Edit Accession Number(s)</h3>
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
                        </div>

                        <button className="btn btn-dark py-1 px-2 ml-2" data-toggle="modal" data-target={"#ViewBookAccessionModal" + books._id}>
                            <i className="fa fa-eye"></i>
                        </button>
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
                                data={setBookAccessions()}
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
export default BookAccession