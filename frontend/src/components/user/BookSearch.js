import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
    const { user } = useSelector(state => state.auth)
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Link to={`/book/${books._id}`} className="">
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
            <MetaData title={'Books'} />
            <SideNavbarUser />
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="management-content">
                        {(user.course === undefined | null) ?
                            (<Modal show={show} centered>
                                <Modal.Header>
                                    <Modal.Title>One Step Closer</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Before proceeding on using the application.
                                    We encourage you to edit your profile first and fill up your
                                    Course and Section in order to avoid uneccesarry errors.
                                    Thank you for your pantience TUPTians!
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleClose} href="/profile">
                                        EDIT PROFILE NOW
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            ) : (<div></div>)
                        }
                        <h1>Books <span></span>
                        </h1>
                        <hr />
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
export default BookSearch