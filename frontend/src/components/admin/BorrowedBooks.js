import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';
import "react-datepicker/dist/react-datepicker.css";
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { RETURN_BOOK_RESET, DECLINE_BOOK_RESET, UPDATE_DUE_DATE_RESET } from '../../constants/personnelConstants'

// import { allBorrowed, returnBook, allReturned, updateDueDate, clearErrors } from '../../actions/personnelActions'
import { allBorrowed, returnBook, declineBook, updateDueDate, clearErrors } from '../../actions/personnelActions'

const BorrowedBooks = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();


	const [dueDate, setDueDate] = useState(new Date());//setdate is not working
	const isWeekday = (date) => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	const [reason, setReason] = useState('')
	const [accession, setAccession] = useState('')

	const { loading, error, borrowedbooks } = useSelector(state => state.allBorrowed);
	// const { returnedbooks } = useSelector(state => state.allReturnedState);
	const { isReturned } = useSelector(state => state.returnBook)
	const { isDecline } = useSelector(state => state.declineBook)
	const { isChange } = useSelector(state => state.changeDueDate)



	useEffect(() => {
		dispatch(allBorrowed());
		// dispatch(allReturned());

		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (isReturned) {
			alert.success('Book returned');
			navigate('/books/borrowed');
			dispatch({ type: RETURN_BOOK_RESET })
		}

		if (isDecline) {
			alert.success('Book declined');
			navigate('/books/borrowed');
			dispatch({ type: DECLINE_BOOK_RESET })
		}

		if (isChange) {
			alert.success('Borrow details changed');
			navigate('/books/borrowed');
			dispatch({ type: UPDATE_DUE_DATE_RESET })
		}

	}, [dispatch, alert, error, navigate, isReturned, isDecline, isChange])


	const returnedHandler = (id) => {
		dispatch(returnBook(id))
	}

	const declineHandler = (id) => {
		dispatch(declineBook(id))
	}

	const updateHandler = (id) => {

		dueDate.setDate(dueDate.getDate() + 1)

		const formData = new FormData();
		formData.set('borrowId', id);
		formData.set('accession', accession);
		formData.set('dueDate', dueDate);
		formData.set('reason', reason);

		dispatch(updateDueDate(formData));

	}

	const setBorrowedBooks = () => {
		const data = {
			columns: [
				{
					label: 'TUPT-ID',
					field: 'borrowedbooks_id',
					sort: 'asc'
				},
				{
					label: 'Name',
					field: 'borrowedbooks_name',
					sort: 'asc'
				},
				{
					label: 'Book(s)',
					field: 'borrowedbooks_book',
					sort: 'asc'
				},
				{
					label: 'Accession',
					field: 'borrowedbooks_accession',
					sort: 'asc'
				},
				{
					label: 'Schedule',
					field: 'borrowedbooks_appointment',
					sort: 'asc'
				},
				{
					label: 'Due Date',
					field: 'borrowedbooks_due',
					sort: 'asc'
				},
				{
					label: 'Actions',
					field: 'actions'
				}

			],
			rows: []
		}

		borrowedbooks.forEach(borrowedbook => {
			data.rows.push({
				borrowedbooks_id: borrowedbook.userId.id_number,
				borrowedbooks_name: borrowedbook.userId.name,
				borrowedbooks_book: borrowedbook.bookId.map((item, index) => (<p>{item.title}</p>)),
				borrowedbooks_accession: borrowedbook.bookId.map((item, index) => (<p>{item.title}</p>)),
				borrowedbooks_due: dateFormat(borrowedbook.dueDate.split('T')[0], "mmmm dd, yyyy"),
				borrowedbooks_appointment: dateFormat(borrowedbook.appointmentDate.split('T')[0], "mmmm dd, yyyy"),
				actions:
					<Fragment>
						<button type="button" className="btn btn-success" onClick={() => returnedHandler(borrowedbook._id)}>
							<i className="fa fa-box"></i>
						</button>
						<button className="btn btn-warning py-1 px-2 ml-2" data-toggle="modal" data-target={"#EditBorrowModal" + borrowedbook._id}>
							<i className="fa fa-pencil"></i>
						</button>
						<button className="btn btn-primary py-1 px-2 ml-2" data-toggle="modal" data-target={"#GiveAccessionModal" + borrowedbook._id}>
							<i className="fa fa-plus"></i>
						</button>
						<button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeclineBookModal" + borrowedbook._id}>
							<i className="fa fa-trash"></i>
						</button>

						<div className="modal fade" data-backdrop="false" id={"EditBorrowModal" + borrowedbook._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h3 className="modal-title" id="DeleteActiveModalLabel">Edit Borrow Information</h3>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div>
										<form>
											<div >
												<label htmlFor="dueDate_field" className="col-sm-6 col-form-label">Enter new due date:
													<DatePicker filterDate={isWeekday} minDate={new Date()} value={dateFormat(dueDate, "dd-mm-yyyy")} onChange={setDueDate} />
												</label>
											</div>
											<div>
												<label htmlFor="idNumber_field" className="col-sm-6 col-form-label">Reason</label>
												<div className="col-sm-6">
													<input
														type="text"
														id="idNumber_field"
														className="form-control"
														name='reason'
														value={reason}
														onChange={(e) => setReason(e.target.value)}
													/>
												</div>
											</div>
										</form>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-warning" onClick={() => updateHandler(borrowedbook._id)} data-dismiss="modal">Update</button>
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
									</div>
								</div>
							</div>
						</div >
						<div className="modal fade" data-backdrop="false" id={"GiveAccessionModal" + borrowedbook._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h3 className="modal-title" id="DeleteActiveModalLabel">Enter Accession Number(s)</h3>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div>
										<form>
											<div>
												<label htmlFor="idNumber_field" className="col-sm-6 col-form-label">Accession Number(s)</label>
												<div className="col-sm-10">
													<textarea
														// type="textarea"
														id="idNumber_field"
														className="form-control"
														name='reason'
														value={accession}
														onChange={(e) => setAccession(e.target.value)}
													/>
												</div>
											</div>
										</form>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-warning" onClick={() => updateHandler(borrowedbook._id)} data-dismiss="modal">Update</button>
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
									</div>
								</div>
							</div>
						</div >
						<div className="modal fade" data-backdrop="false" id={"DeclineBookModal" + borrowedbook._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h3 className="modal-title" id="DeleteActiveModalLabel">You are about to decline an appointment</h3>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className='modal-body'>
										<h1>Do you really want to decline this appointment?</h1>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-danger" onClick={() => declineHandler(borrowedbook._id)} data-dismiss="modal">Confirm</button>
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
									</div>
								</div>
							</div>
						</div >
					</Fragment >
			})
		})
		return data;
	}

	return (
		<Fragment>
			<MetaData title={'TUP-T Online Library - Books Borrowed'} />
			<SideNavbarAdmin />
			{loading ? <Loader /> : (
				<div className="management-content">
					<div className="management-body">
						<div className="row">
							<div className="col-md-12">
								<div className="next">
									<Link to="/returned/books">
										<span className='span1'>Returned Books</span>
										<span className="material-symbols-outlined returned_books">
											navigate_next
										</span>
									</Link>
								</div>
								<h1 className="text-center">Borrowed</h1>

								{loading ? <Loader /> : (
									<MDBDataTable
										data={setBorrowedBooks()}
										className="px-3"
										bordered
										noBottomColumns
									/>
								)}

							</div>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}
export default BorrowedBooks