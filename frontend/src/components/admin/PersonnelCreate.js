import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate , Link} from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './../layout/SideNavbarAdmin'

import { newPersonnel, clearErrors } from '../../actions/personnelActions'
import { NEW_PERSONNEL_RESET } from '../../constants/personnelConstants'

const PersonnelCreate = () => {

	const [id_number, setId_number] = useState('')
	const [name, setName] = useState('')
	const [age, setAge] = useState('')
	const [gender, setGender] = useState('')
	const [contact, setContact] = useState('')
	const [address, setAddress] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { loading, error, success } = useSelector(state => state.newPersonnel);

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (success) {
			navigate('/admin/personnels');
			alert.success('Personnel created successfully');
			dispatch({ type: NEW_PERSONNEL_RESET })
		}

	}, [dispatch, alert, error, success, navigate])

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		dispatch(newPersonnel(formData));
	};

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber)
	}

   	return (
	 	<Fragment>
			<MetaData title={'TUP-T Online Library - Admin'} />
			<SideNavbarAdmin/>
			<div className="dashboard-content">
				<div className="dashboard-page">
					<div className="add-body">
						<div id="multi-step-form-container">

							<div className="form-padding-top form-step">
								<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data">
										<h2 className="font-normal text-center">Personnel Information Area</h2>
										<div className="mt-3">
											<div className="form-group row">
												<label htmlFor="idNumber_field" className="col-sm-2 col-form-label">Id Number</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="idNumber_field"
													className="form-control"
													name='id_number'
													value={id_number}
													onChange={(e) => setId_number(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group row">
												<label htmlFor="name_field" className="col-sm-2 col-form-label">Name</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="name_field"
													className="form-control"
													name='name'
													value={name}
													onChange={(e) => setName(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group row">
												<label htmlFor="age_field" className="col-sm-2 col-form-label">Age</label>
												<div className="col-sm-10">
													<input
													type="number"
													id="age_field"
													className="form-control"
													name='age'
													value={age}
													onChange={(e) => setAge(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="gender_field" className="col-sm-2 col-form-label">Gender</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="gender_field"
													className="form-control"
													name='gender'
													value={gender}
													onChange={(e) => setGender(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="contact_field" className="col-sm-2 col-form-label">Contact</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="contact_field"
													className="form-control"
													name='contact'
													value={contact}
													onChange={(e) => setContact(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="address_field" className="col-sm-2 col-form-label">Address</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="address_field"
													className="form-control"
													name='address'
													value={address}
													onChange={(e) => setAddress(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="email_field" className="col-sm-2 col-form-label">Email</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="email_field"
													className="form-control"
													name='email'
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="password_field" className="col-sm-2 col-form-label">Password</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="password_field"
													className="form-control"
													name='password'
													value={password}
													onChange={(e) => setPassword(e.target.value)}
													/>
												</div>
											</div>
										</div>
										<div className="mt-3">
											<button className="button submit-btn float-right" type="submit">Save</button>
										</div>

								</form>
							</div>
						</div>


					</div> 
				</div> 
			</div> 
		</Fragment>
	)
}
export default PersonnelCreate