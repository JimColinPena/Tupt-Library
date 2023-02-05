import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarUser from '../layout/SideNavbarUser'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { getStudentBookDetails, clearErrors } from '../../actions/studentActions'
import { borrowBooks, checkBorrowBooks, cancelBorrowBooks } from '../../actions/borrowActions'
import { BORROW_BOOK_RESET, CANCELBORROW_BOOK_RESET } from '../../constants/borrowConstants'

const StudentBookDetails = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [bookCheck, setBookCheck] = useState(false);

    const alert = useAlert();
    const dispatch = useDispatch();
    let { id } = useParams();
    let navigate = useNavigate();

    const { loading, error, studentbook } = useSelector(state => state.studentBookDetails);
    const { user } = useSelector(state => state.auth);
    const { success } = useSelector(state => state.borrowBook);
    const { checkbook } = useSelector(state => state.checkBorrowBook);
    const { isCancel } = useSelector(state => state.cancelBorrowBook);

    useEffect(() => {

        dispatch(checkBorrowBooks(user._id, id));

        dispatch(getStudentBookDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            setShow(false);
            alert.success('Added to Pending borrowed book');
            dispatch({ type: BORROW_BOOK_RESET })
        }

        if (isCancel) {
            // setShow(false);
            alert.success('Book borrowed canceled');
            dispatch({ type: CANCELBORROW_BOOK_RESET })
        }

    }, [dispatch, alert, error, navigate, success, isCancel])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBorrow = (e) => {
        e.preventDefault();
        // const dueDate = new Date();
        // dueDate.setDate(startDate.getDate() + 2)

        const formData = new FormData();
        formData.set('userId', user._id);
        formData.set('bookId', studentbook._id);
        
        dispatch(borrowBooks(formData));
    };

    const cancelBookHandler = () => {
        console.log('test')
        dispatch(cancelBorrowBooks(user._id, id))
    }

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Student'} />
            <SideNavbarUser />
            <div className="book-details">
                <div className="book-body">
                    <div className="row">
                        <div className="col-md-2" id=""><h2><strong>{studentbook.call_number}</strong></h2></div>

                        <div className="col-md-10" id=""><h2>
                            {studentbook.title}{" / "}{studentbook.main_author}{" "}{studentbook.publisher}{" "}{studentbook.yearPub}</h2></div>
                    </div>
                    <div align="center">
                    {
                        checkbook.approve === true ? 
                        (
                            checkbook.check === true ? 
                            (// check if book is in the user's borrow
                                <Link to={`/studentbook/appointment`} id="cancel_btn" className="btn btn-warning py-1 px-2 ml-2">Check Due Date
                                </Link>
                            ) : (
                                <button disabled='true' id="unavailable_btn" className="btn btn-primary py-1 px-2 ml-2">Unavailables
                                </button>
                            )
                        ):(
                            checkbook.check === true ? 
                            (     
                                <button id="cancel_btn" className="btn btn-danger py-1 px-2 ml-2" onClick={() => cancelBookHandler()}>Cancel
                                </button>
                            ) : (
                                checkbook.pendinglimit === true ? 
                                (//status pending
                                    <button disabled='true' id="unavailable_btn" className="btn btn-primary py-1 px-2 ml-2">Unavailables
                                    </button>
                                ) : (
                                    studentbook.on_shelf <= 0 || studentbook.on_shelf == null ?
                                        (//no available copies
                                            <button disabled='true' id="unavailable_btn" className="btn btn-primary py-1 px-2 ml-2">Unavailable
                                            </button>
                                        ) : ( 
                                            <button id="request_btn" className="btn btn-primary py-1 px-2 ml-2" onClick={handleShow}>Borrow Schedule
                                            </button>
                                        )
                                )
                            )
                        )
                    }
                    </div>
                </div>

                <Modal className="Modal-Confirm" show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title><h2>Borrow Confirmation</h2></Modal.Title>
                        
                        <Button onClick={handleClose}><i className="fa fa-times-circle"></i></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>Do you want to Borrow this Book?</h1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleClose}>NO
                        </Button>
                        <Button variant="primary" onClick={handleBorrow}>YES
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </Fragment>
    )
}
export default StudentBookDetails