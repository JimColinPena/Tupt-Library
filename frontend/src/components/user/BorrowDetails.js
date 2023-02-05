import React, { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarUser from '../layout/SideNavbarUser'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allStudentBorrowBook, clearErrors } from '../../actions/studentActions'
import { confirmBorrowBooks, cancelAllBorrowBooks } from '../../actions/borrowActions'
import { CONFIRM_BOOK_RESET } from '../../constants/borrowConstants'
import { CANCEL_ALL_BORROW_BOOK_RESET } from '../../constants/borrowConstants'


const BorrowDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    // let navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { loading, error, studentborrowbooks } = useSelector(state => state.allStudentBorrowBook);
    const { isConfirm } = useSelector(state => state.confirmBorrowBook);
    const { isCancelAll } = useSelector(state => state.cancelAllBorrowBook);

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(allStudentBorrowBook());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isConfirm) {
            setShow1(false);
            alert.success('Book borrowed confirm');
            dispatch({ type: CONFIRM_BOOK_RESET })
        }
        if (isCancelAll) {
            setShow2(false);
            alert.success('All Book borrowed canceled');
            dispatch({ type: CANCEL_ALL_BORROW_BOOK_RESET })
        }
    }, [dispatch, alert, error, isConfirm, isCancelAll])

    const [startDate, setStartDate] = useState();
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };



    const handleConfirm = (e) => {
        e.preventDefault();
        const dueDate = new Date();

        startDate.setDate(startDate.getDate() + 1)
        startDate.setMonth(startDate.getMonth())
        startDate.setFullYear(startDate.getFullYear())

        if ((startDate.getDay() === 6)) {
            dueDate.setDate(startDate.getDate() + 2)
            dueDate.setMonth(startDate.getMonth())
            dueDate.setFullYear(startDate.getFullYear())

        }
        else {
            dueDate.setDate(startDate.getDate())
            dueDate.setMonth(startDate.getMonth())
            dueDate.setFullYear(startDate.getFullYear())
        }

        const formData = new FormData();
        formData.set('userId', user._id);
        formData.set('appointmentDate', startDate);
        formData.set('dueDate', dueDate);

        dispatch(confirmBorrowBooks(formData));
    }

    const handleCancel = (e) => {
        // console.log('cancel')
        const formData = new FormData();
        formData.set('userId', user._id);
        dispatch(cancelAllBorrowBooks(formData));


    }
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    {studentborrowbooks ? (
                        <Fragment>
                            <MetaData title={'TUP-T Online Library - Student'} />
                            <SideNavbarUser />
                            <div className="management-content">
                                <h1>Books Requests</h1>
                                <hr />
                                {/* </div> */}
                                <div className="management-body">
                                    <div className='row'>
                                        {studentborrowbooks.bookId && studentborrowbooks.bookId.map(data => (
                                            <div className='col-md-4'>
                                                <div className='card-header'>
                                                    {/* {console.log(data.book_image.url)} */}
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
                                    {/* {studentborrowbooks.appointmentDate} */}

                                    <hr />
                                    <h2>Duedate: {(studentborrowbooks.dueDate == null || undefined) ? 'not set' : dateFormat(studentborrowbooks.dueDate, "mmmm dd, yyyy")}</h2>
                                    <h2>Status: {studentborrowbooks.status}</h2>
                                    {studentborrowbooks.status === "To Confirm" ? (
                                        <div>
                                            <button id="confirm_btn" className="btn btn-primary py-1 px-2 ml-2" onClick={handleShow1}>Borrow Schedule
                                            </button>
                                            <button id="confirm_btn" className="btn btn-danger py-1 px-2 ml-2" onClick={handleShow2}>Cancel Schedule
                                            </button>
                                        </div>
                                    ) : (
                                        <button id="confirm_btn" className="btn btn-danger py-1 px-2 ml-2" onClick={handleShow2}>Cancel Schedule
                                        </button>
                                    )
                                    }
                                </div>
                            </div>
                            <Modal className="Modal-Confirm" show={show1} onHide={handleClose1}>
                                <Modal.Header>
                                    <Modal.Title><h2>SET APPOINTMENT DATE</h2></Modal.Title>

                                    <Button onClick={handleClose1}><i className="fa fa-times-circle"></i></Button>
                                </Modal.Header>
                                <Modal.Body>
                                    <DatePicker minDate={new Date()} filterDate={isWeekday} value={dateFormat(startDate, "dd-mm-yyyy")} onChange={(date) => setStartDate(date)} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="warning" onClick={handleClose1}>CANCEL
                                    </Button>
                                    <Button variant="primary" onClick={handleConfirm}>CONFIRM
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal className="Modal-Cancel" show={show2} onHide={handleClose2}>
                                <Modal.Header>
                                    <Modal.Title><h2>Confirm Cancelation</h2></Modal.Title>
                                    <Button onClick={handleClose2}><i className="fa fa-times-circle"></i></Button>
                                </Modal.Header>
                                <Modal.Body>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="warning" onClick={handleClose2}>CANCEL
                                    </Button>
                                    <Button variant="primary" onClick={handleCancel}>CONFIRM
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <MetaData title={'TUP-T Online Library - Student'} />
                            <SideNavbarUser />
                            <div className="management-content">
                                {(user.course === undefined | null) ?
                                    (<Modal className="Modal-Prompt" show={show} centered>
                                        {console.log('pumunta')}
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
                                <h1>Books Requests</h1>
                                <hr />
                                <div className="management-body ">
                                    <h1>No Books Requests</h1>
                                </div>
                            </div>
                        </Fragment>

                    )}

                </Fragment>
            )}
        </Fragment>
    )
}
export default BorrowDetails