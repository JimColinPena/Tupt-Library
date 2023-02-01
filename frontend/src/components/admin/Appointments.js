import React, { Fragment, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from 'mdbreact'
import dateFormat from 'dateformat';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { DECLINE_BORROW_RESET, ACCEPT_BORROW_RESET } from '../../constants/personnelConstants'

import { allBorrow, acceptBorrow, declineBorrow, clearErrors } from '../../actions/personnelActions'

const Appointments = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const { isDeclined } = useSelector(state => state.declineBorrower)
	const { isAccepted } = useSelector(state => state.acceptBorrower)

	const { loading, error, borrowers } = useSelector(state => state.allBorrow);

	useEffect(() => {
		dispatch(allBorrow());

		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}
		if (isDeclined) {
			alert.success('Appointment Declined');
			navigate('/appointments');
			dispatch({ type: DECLINE_BORROW_RESET })
		}
		if (isAccepted) {
			alert.success('Appointment Accepted');
			navigate('/appointments');
			dispatch({ type: ACCEPT_BORROW_RESET })
		}

	}, [dispatch, alert, error, navigate, isDeclined, isAccepted])

	const declinedHandler = (id) => {
		dispatch(declineBorrow(id))
	}

	const acceptedHandler = (id) => {
		dispatch(acceptBorrow(id))
	}

	const setBorrower = () => {
		const data = {
			columns: [
				{
					label: 'Name',
					field: 'borrower_name',
					sort: 'asc'

				},
				{
					label: 'Book',
					field: 'borrower_book',
					sort: 'asc'

				},
				{
					label: 'Appointment',
					field: 'borrower_appointment',
					sort: 'asc'

				},
				{
					label: 'Status',
					field: 'borrower_status',
					sort: 'asc'

				},
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: []
		}

		console.log(borrowers)

		borrowers.forEach(borrower => {
			data.rows.push({
				borrower_name: borrower.userId.name,
				borrower_book: borrower.bookId.map((item, index) => (<p>{item.title}</p>)),
				borrower_appointment: dateFormat(borrower.appointmentDate.split('T')[0], "mmmm dd, yyyy"),
				borrower_status: borrower.status,
				actions: <Fragment>
					<button className="btn btn-success py-1 px-2 ml-2 fa-regular fa-circle-check fa-2x" onClick={() => acceptedHandler(borrower._id)}>
					</button>

					<button className="btn btn-danger py-1 px-2 ml-2 fa-regular fa-circle-xmark fa-2x" onClick={() => declinedHandler(borrower._id)}>
					</button>
				</Fragment>
			})
		})
		return data;
	}

	return (
		<Fragment>
			{loading ? <Loader /> : (
				<Fragment>
					<MetaData title={'TUP-T Online Library - Appointment'} />
					<SideNavbarAdmin />

					<div className="management-content">
						{/* <div className="management-header"> */}
							<h1>Appointments <span></span>
							</h1>
							<hr/>
						{/* </div> */}
						<div className="management-body">

							<MDBDataTable
								data={setBorrower()}
								className="px-3"
								bordered
								striped
								hover
							/>

						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}
export default Appointments