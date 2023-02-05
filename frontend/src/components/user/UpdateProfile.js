import React, { Fragment, useState, useEffect } from 'react'
import dateFormat from 'dateformat';
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarUser from '../layout/SideNavbarUser'

import { getStudentDetails, updateStudent, clearErrors } from '../../actions/studentActions'
import { UPDATE_STUDENT_RESET } from '../../constants/studentConstants'

const UpdateProfile = () => {

	const [id_number, setId_number] = useState('')
	const [name, setName] = useState('')
	const [birthday, setBirthday] = useState(new Date())
	const [gender, setGender] = useState('')
	const [contact, setContact] = useState('')
	const [address, setAddress] = useState('')
	const [course, setCourse] = useState('')
	const [section, setSection] = useState('')

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { error, isUpdated } = useSelector(state => state.changeStudentDetails);
	const { student, loading } = useSelector(state => state.singleStudentDetails)
	const { id } = useParams();

	useEffect(() => {

		if (student && student._id !== id) {
			dispatch(getStudentDetails(id))
		} else {
			console.log(student.birthday)

			if ((student.birthday) == null || undefined){
				setBirthday(student.birthday)
			}
			else {
				// console.log("logs")
				setBirthday(dateFormat(student.birthday.split('T')[0], "yyyy-mm-dd"))
			}

			// console.log(test_birthday)
			setId_number(student.id_number)
			setName(student.name)
			
			setGender(student.gender)
			setContact(student.contact)
			setAddress(student.address)
			setCourse(student.course)
			setSection(student.section)
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}
		if (isUpdated) {
			alert.success('Profile updated successfully')
			dispatch({type: UPDATE_STUDENT_RESET})
			navigate('/profile')
			
		}

	}, [dispatch, alert, error, navigate, isUpdated, id, student])

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		console.log(birthday)
		dispatch(updateStudent(student._id, formData));
	};

	return (
		<Fragment>
			<MetaData title={'TUP-T Online Library - Student'} />
            <SideNavbarUser />
			{loading || loading === undefined ? <Loader /> : (
				<Fragment>
					<div className="management-content">
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
												<label htmlFor="birthday_field" className="col-sm-2 col-form-label">Birthday</label>
												<div className="col-sm-10">
													<input
														type="Date"
														id="birthday_field"
														className="form-control"
														name='birthday'
														value={birthday}
														onChange={(e) => setBirthday(e.target.value)}
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
												<label htmlFor="course_field" className="col-sm-2 col-form-label">Course</label>
												<div className="col-sm-10">
													<input
														type="text"
														id="course_field"
														className="form-control"
														name='course'
														value={course}
														onChange={(e) => setCourse(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="section_field" className="col-sm-2 col-form-label">Section</label>
												<div className="col-sm-10">
													<input
														type="text"
														id="section_field"
														className="form-control"
														name='section'
														value={section}
														onChange={(e) => setSection(e.target.value)}
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
				</Fragment>
			)}
		</Fragment>
	)
}
export default UpdateProfile