import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dateFormat from 'dateformat';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarUser from '../layout/SideNavbarUser'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allStudentAppointmentBook, clearErrors } from '../../actions/studentActions'



const AppointmentDetails = () => {
    const [startDate, setStartDate] = useState(null);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, studentappointmentbook } = useSelector(state => state.allStudentAppointmentBook);
    const { user } = useSelector(state => state.auth)
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(allStudentAppointmentBook());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Student'} />
            <SideNavbarUser />
            {loading ? <Loader /> : (
                <Fragment>
                    {studentappointmentbook ? (
                        <Fragment>

                            <div className="management-content">
                                <h1>Borrowed Books</h1>
                                <hr />
                                <div className="management-body">
                                    <div className='row'>
                                        {studentappointmentbook.bookId && studentappointmentbook.bookId.map(data => (
                                            <div className='col-md-4'>
                                                <div className='card-header'>
                                                    {(data.book_image.url == null || undefined) ?
                                                        <img alt="" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png" />
                                                        :
                                                        <img alt="" src={data.book_image.url} />
                                                    }
                                                </div>
                                                <div className='card-body'>
                                                    <h3>{data.title}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                    <h2>Duedate: {(studentappointmentbook.dueDate == null || undefined) ? 'not set' : dateFormat(studentappointmentbook.dueDate, "mmmm dd, yyyy")}</h2>
                                    <h2>Status: {studentappointmentbook.status}</h2>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <MetaData title={'TUP-T Online Library - Student'} />
                            <SideNavbarUser />
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
                                <h1>Borrowed Books</h1>
                                <hr />
                                <div className="management-body">
                                    <h1>No Borrowed Books</h1>
                                </div>
                            </div>
                        </Fragment>

                    )}
                </Fragment>
            )}
        </Fragment>
    )
}
export default AppointmentDetails