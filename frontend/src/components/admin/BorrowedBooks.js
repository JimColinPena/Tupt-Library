import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import dateFormat from 'dateformat';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { RETURN_BOOK_RESET, DECLINE_BOOK_RESET, UPDATE_DUE_DATE_RESET, ACCESSION_BORROWED_RESET } from '../../constants/personnelConstants'
import { allBorrowed, returnBook, declineBook, updateDueDate, borrowedAcc, clearErrors } from '../../actions/personnelActions'

const BorrowedBooks = () => {

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { loading, error, borrowedbooks } = useSelector(state => state.allBorrowed);
	const { isReturned } = useSelector(state => state.returnBook)
	const { isDecline } = useSelector(state => state.declineBook)
	const { isChange } = useSelector(state => state.changeDueDate)
	const { borrowedAccession } = useSelector(state => state.borrowedBookAccession)

	const defaultMaterialTheme = createTheme({});

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

		if (borrowedAccession) {
			alert.success('Accession Updated');
			navigate('/books/borrowed');
			dispatch({ type: ACCESSION_BORROWED_RESET })
		}

	}, [dispatch, alert, error, navigate, isReturned, isDecline, isChange, borrowedAccession])

	const [dueDate, setDueDate] = useState(new Date());//setdate is not working
	const isWeekday = (date) => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	const [reason, setReason] = useState('')

	const returnedHandler = (id) => {
		dispatch(returnBook(id))
	}

	const declineHandler = (id) => {
		dispatch(declineBook(id))
	}

	const updateHandler = (id) => {
		dueDate.setDate(dueDate.getDate())
		const formData = new FormData();
		formData.set('borrowId', id);
		// formData.set('accession', accession);
		formData.set('dueDate', dueDate);
		formData.set('reason', reason);
		dispatch(updateDueDate(formData));
	}

	const giveAccessionHandler = (userId, accessionId) => {
		const formData = new FormData();
		formData.set('accessionId', accessionId);
		formData.set('userId', userId);
		formData.set('func', 'give');

		dispatch(borrowedAcc(formData));
	}
	const retrieveAccessionHandler = (userId, accessionId) => {
		const formData = new FormData();
		formData.set('accessionId', accessionId);
		formData.set('userId', userId);
		formData.set('func', 'retrieve');
		dispatch(borrowedAcc(formData));
	}

	// console.log(borrowedbooks)
	const col = [
		{
			title: 'TUPT-ID',
			field: 'userId.id_number',
			render: rowData => (
				<Fragment>
					<div><p>{rowData.userId.id_number}</p></div>
				</Fragment>
			),
			cellStyle: {
				textAlign: "left",
			},
		},
		{
			title: 'Name',
			field: 'userId.name',
			render: rowData => (
				<Fragment>
					<div><p><Link to={`/detail/student/${rowData.userId._id}`}>{rowData.userId.name} </Link></p></div>
				</Fragment>
			),
			cellStyle: {
				textAlign: "left",
			},
		},
		// {
		// 	title: 'E-mail',
		// 	field: 'userId.email',
		// 	searchable: false,
		// 	render: rowData => (
		// 		<Fragment>
		// 			<div><p>{rowData.userId.email}</p></div>
		// 		</Fragment>
		// 	),
		// 	cellStyle: {
		// 		textAlign: "left",
		// 	},
		// },
		// {
		// 	title: 'Contact',
		// 	field: 'userId.contact',
		// 	width: '10%',
		// 	searchable: false,
		// 	render: rowData => (
		// 		<Fragment>
		// 			<div><p>{rowData.userId.contact}</p></div>
		// 		</Fragment>
		// 	),
		// },
		{
			title: 'Book(s)',
			field: 'bookId.title',
			searchable: false,
			render: rowData => (
				rowData.bookId.map((item, index) => (
					<Fragment>
						<div><p><Link to={`/admin/single/book/${item._id}`}>{item.title} </Link></p></div>
					</Fragment>
				))
			),
			cellStyle: {
				textAlign: "left",
			},
		},
		{
			title: 'Appointment',
			field: 'borrower_appointment',
			// width: '20%',
			render: rowData => (
				<Fragment>
					<div><p>{dateFormat(rowData.appointmentDate.split('T')[0], "mmmm dd, yyyy")}</p></div>
				</Fragment>
			),
			cellStyle: {
				textAlign: "left"
			}
		},
		{
			title: 'Due Date',
			field: 'borrower_dueDate',
			// width: '20%',
			render: rowData => (
				<Fragment>
					<div><p>{dateFormat(rowData.dueDate.split('T')[0], "mmmm dd, yyyy")}</p></div>
				</Fragment>
			),
			cellStyle: {
				textAlign: "left"
			}
		},

		{
			title: 'Accessions',
			field: 'bookId.accession_numbers',
			render: rowData => (
				rowData.bookId.map((accession_item, index) => (
					<Fragment>
						<div>
							<button className="btn btn-primary py-1 px-2 ml-2" data-toggle="modal" data-target={"#AccessionBorrowModal" + accession_item._id}>
								<i className="fa fa-plus"></i>
							</button>
							<div className="modal fade" data-backdrop="false" id={"AccessionBorrowModal" + accession_item._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h3 className="modal-title" id="DeleteActiveModalLabel">Add Accession</h3>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div>
											{((accession_item.accession_numbers.length) > 0) ?
												(
													<div>
														<p>List of Accession number(s) available</p>
														{accession_item.accession_numbers.map((acc_number, index) => (
															<div>
																<h4>{acc_number.accession_number}

																	{(rowData.accessions.includes(acc_number._id)) ?
																		(
																			<button type="button" className="btn btn-danger" onClick={() => retrieveAccessionHandler(rowData.userId._id, acc_number._id)} data-dismiss="modal">
																				<i className="fa fa-arrow-right-to-bracket"></i>
																			</button>
																		) : (
																			<button type="button" className="btn btn-success" onClick={() => giveAccessionHandler(rowData.userId._id, acc_number._id)} data-dismiss="modal">
																				<i className="fa fa-arrow-right-from-bracket"></i>
																			</button>
																		)}
																</h4>
															</div>
														))}

													</div>
												)
												:
												(
													<div>
														No accession available! please! Please create 1 first {<Link to={`/accession/detail/${accession_item._id}`}>HERE</Link>}
													</div>
												)

											}
											{/* <hr /> */}
										</div>
										<div className="modal-footer">
											{/* <button type="button" className="btn btn-warning" onClick={() => accessionHandler(borrowedbook._id)} data-dismiss="modal">Set</button> */}
											<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div >
						</div >
					</Fragment>
				))
			),
			cellStyle: {
				textAlign: "left",
			},
		},
		{
			title: 'Actions',
			field: '_id',
			render: rowData => (
				<Fragment>
					<div className="icon-buttons">
						<Tooltip title="Return">
							<button type="button" className="btn btn-success" onClick={() => returnedHandler(rowData._id)}>
								Returned
							</button>
						</Tooltip>

						<Tooltip title="Edit">
							<button className="btn btn-warning py-1 px-2 ml-2" data-toggle="modal" data-target={"#EditBorrowModal" + rowData._id}>
								<i className="fa fa-pencil"></i>
							</button>
						</Tooltip>

						<Tooltip title="Decline">
							<button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeclineBookModal" + rowData._id}>
								<i className="fa fa-trash"></i>
							</button>
						</Tooltip>
					</div>

					<div className="modal fade" data-backdrop="false" id={"EditBorrowModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
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
												<DatePicker filterDate={isWeekday} minDate={new Date()} value={dateFormat(dueDate, "dd-mm-yyyy")} onChange={(date) => setDueDate(date)} />
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
									<button type="button" className="btn btn-warning" onClick={() => updateHandler(rowData._id)} data-dismiss="modal">Update</button>
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
								</div>
							</div>
						</div>
					</div >

					{/* <div className="modal fade" data-backdrop="false" id={"GiveAccessionModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
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
										<button type="button" className="btn btn-warning" onClick={() => updateHandler(rowData._id)} data-dismiss="modal">Update</button>
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
									</div>
								</div>
							</div>
						</div > */}

					<div className="modal fade" data-backdrop="false" id={"DeclineBookModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
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
									<button type="button" className="btn btn-danger" onClick={() => declineHandler(rowData._id)} data-dismiss="modal">Confirm</button>
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
								</div>
							</div>
						</div>
					</div >
				</Fragment>
			),
			searchable: false,
			cellStyle: {
				textAlign: "left",
			},
			headerStyle: {
				textAlign: 'center'
			}
		},
	]

	return (
		<Fragment>
			<MetaData title={'TUP-T Online Library - Admin'} />
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
									<ThemeProvider theme={defaultMaterialTheme}>
										<MaterialTable
											title='Borrowed Books List'
											data={borrowedbooks}
											columns={col}
											localization={
												{
													toolbar: {
														searchPlaceholder: 'ID, Name...'
													}
												}
											}
											options={{
												pageSize: 10,
												headerStyle: {
													fontSize: 16,
													fontWeight: 'bold',
													backgroundColor: '#BA0202',
													color: '#ffffff',
												},
												rowStyle: {
													fontSize: 15,
													backgroundColor: '#F9F5F5',
												},
												emptyRowsWhenPaging: false
											}}
										/>
									</ThemeProvider>
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