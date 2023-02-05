import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { RETURN_BOOK_RESET } from '../../constants/personnelConstants'

import { allBorrowed, returnBook, allReturned, clearErrors } from '../../actions/personnelActions'

const BorrowedBooks = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const { loading, error, borrowedbooks } = useSelector(state => state.allBorrowed);
	const { returnedbooks } = useSelector(state => state.allReturnedState);
	const { isReturned } = useSelector(state => state.returnBook)

	useEffect(() => {
		dispatch(allBorrowed());
		dispatch(allReturned());

		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (isReturned) {
			alert.success('Book returned');
			navigate('/books/borrowed');
			dispatch({ type: RETURN_BOOK_RESET })
		}

	}, [dispatch, alert, error, navigate, isReturned])

	const returnedHandler = (id) => {
		dispatch(returnBook(id))
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
					label: 'Gender',
					field: 'borrowedbooks_gender',
					sort: 'asc'
				},
				{
					label: 'Email',
					field: 'borrowedbooks_email',
					sort: 'asc'
				},
				{
					label: 'Contact',
					field: 'borrowedbooks_contact',
					sort: 'asc'
				},
				{
					label: 'Book',
					field: 'borrowedbooks_book',
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
				borrowedbooks_gender: borrowedbook.userId.gender,
				borrowedbooks_email: borrowedbook.userId.email,
				borrowedbooks_contact: borrowedbook.userId.contact,
				borrowedbooks_book: borrowedbook.bookId.map((item, index) => (<p>{item.title}</p>)),
				borrowedbooks_due: borrowedbook.dueDate,
				actions:
					<Fragment>
						<button type="button" class="btn btn-success" onClick={() => returnedHandler(borrowedbook._id)}>
							Returned
						</button>

					</Fragment>
			})
		})
		return data;
	}

	const setReturnedBooks = () => {
		const data = {
			columns: [
				{
					label: 'TUPT-ID',
					field: 'returnedbooks_id',
					sort: 'asc'
				},
				{
					label: 'Name',
					field: 'returnedbooks_name',
					sort: 'asc'
				},
				{
					label: 'E-mail',
					field: 'returnedbooks_email',
					sort: 'asc'
				},
				{
					label: 'Contact',
					field: 'returnedbooks_contact',
					sort: 'asc'
				},
				{
					label: 'Book',
					field: 'returnedbooks_book',
					sort: 'asc'
				},
				{
					label: 'Due Date',
					field: 'returnedbooks_due',
					sort: 'asc'
				},
				{
					label: 'Returned to',
					field: 'returnedbooks_to',
					sort: 'asc'
				},
			],
			rows: []
		}

		returnedbooks.forEach(returnedBook => {
			data.rows.push({
				returnedbooks_id: returnedBook.userId.id_number,
				returnedbooks_name: returnedBook.userId.name,
				returnedbooks_email: returnedBook.userId.email,
				returnedbooks_contact: returnedBook.userId.contact,
				returnedbooks_book: returnedBook.bookId.map((item, index) => (<p>{item.title}</p>)),
				returnedbooks_due: returnedBook.returnedDate,
				returnedbooks_to: returnedBook.returnedTo.name,
			})
		})
		return data;
	}

	return (
		<Fragment>
			{loading ? <Loader /> : (
				<Fragment>
					<MetaData title={'TUP-T Online Library - Books Borrowed'} />
					<SideNavbarAdmin />

					<div className="management-content">
						<div className="management-body">
							<div className="row">
								<div className="col-md-12">
									<div className="previous-returned">
										<Link to="/books/borrowed">
											<span className='span2'>Borrowed Books</span>
											<span class="material-symbols-outlined borroweed_books">
												navigate_before
											</span>
										</Link>
									</div>
									<h1 className="text-center">Returned</h1>
									{loading ? <Loader /> : (
										<MDBDataTable
											data={setReturnedBooks()}
											className="px-3"
											bordered
											noBottomColumns
										/>
									)}
								</div>
							</div>
						</div>


					</div>
				</Fragment>
			)}
		</Fragment>
	)
}
export default BorrowedBooks