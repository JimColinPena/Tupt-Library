import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate , Link} from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';
import Pagination from 'react-js-pagination'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarUser from './../layout/SideNavbarUser'

import { newEvaluations, clearErrors } from '../../actions/evaluationActions'
import { NEW_EVALUATION_RESET } from '../../constants/evaluationConstants'

const StudentEvaluation = () => {

	const [ia, setia] = useState(false)
	const [dv, setdv] = useState(null)
	const [tr, settr] = useState('')
	const [yl, setyl] = useState('')
	const [course, setcourse] = useState('')
	const [gender, setgender] = useState('')
	const [sra, setsra] = useState('')
	const [lav, setlav] = useState('')
	const [clean, setclean] = useState('')
	const [ho, setho] = useState('')
	const [brb, setbrb] = useState('')
	const [opac, setopac] = useState('')
	const [bc, setbc] = useState('')
	const [pc, setpc] = useState('')
	const [tps, settps] = useState('')
	const [er, seter] = useState('')
	const [skaq, setskaq] = useState('')
	const [css, setcss] = useState('')

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { loading, error, success } = useSelector(state => state.newevaluation);

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (success) {
			navigate('/');
			alert.success('Evaluation finished');
			dispatch({ type: NEW_EVALUATION_RESET })
		}
	}, [dispatch, alert, error, success, navigate])

	const submitHandler = (e) => {
		e.preventDefault();
		const datevisit = new Date();

		datevisit.setDate(dv.getDate())

		const formData = new FormData(e.target);
		formData.set('dv',datevisit);
		dispatch(newEvaluations(formData));
	}

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber)
	}
	const navigateToFormStep = (stepNumber) => {

		document.querySelectorAll(".form-step").forEach((
			formStepElement) => {
			formStepElement.classList.add("d-none");
		});

		document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
		formStepHeader.classList.add("form-stepper-unfinished");
		formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
		});

		document.querySelector("#step-" + stepNumber).classList.remove("d-none");

	   const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');

	   formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
	   formStepCircle.classList.add("form-stepper-active");
	   for (let index = 0; index < stepNumber; index++) {

		   const formStepCircle = document.querySelector('li[step="' + index + '"]');

		   if (formStepCircle) {

			   formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
			   formStepCircle.classList.add("form-stepper-completed");
			}
		}
	};

	document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {

	   formNavigationBtn.addEventListener("click", () => {

		   const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));

		   navigateToFormStep(stepNumber);
		});
	});


	return (
		<Fragment>
			<MetaData title={'TUPT-T Online Library - Evaluation'} />
			<SideNavbarUser/>
			<div className = "management-content">
				<div className = "dashboard-page">
					<div id = "multi-step-form-container">
						<ul className="form-stepper form-stepper-horizontal text-center mx-auto pl-0">
							<li className="form-stepper-active text-center form-stepper-list" step="1">
								<a className="mx-2">
									<span className="form-stepper-circle">
										<span>1</span>
									</span>
									<div className="label ">
										Directions
									</div>
								</a>
							</li>
							<li className="form-stepper-unfinished text-center form-stepper-list" step="2">
								<a className="mx-2">
									<span className="form-stepper-circle text-muted">
										<span>2</span>
									</span>
									<div className="label text-muted">
										Information
									</div>
								</a>
							</li>
							<li className="form-stepper-unfinished text-center form-stepper-list" step="3">
								<a className="mx-2">
									<span className="form-stepper-circle text-muted">
										<span>3</span>
									</span>
									<div className="label text-muted">
										Library Facilities
									</div>
								</a>
							</li>
							<li className="form-stepper-unfinished text-center form-stepper-list" step="4">
								<a className="mx-2">
									<span className="form-stepper-circle text-muted">
										<span>4</span>
									</span>
									<div className="label text-muted">
										Library Services
									</div>
								</a>
							</li>
							<li className="form-stepper-unfinished text-center form-stepper-list" step="5">
								<a className="mx-2">
									<span className="form-stepper-circle text-muted">
										<span>5</span>
									</span>
									<div className="label text-muted">
										Library Collection 
									</div>
								</a>
							</li>
							<li className="form-stepper-unfinished text-center form-stepper-list" step="6">
								<a className="mx-2">
									<span className="form-stepper-circle text-muted">
										<span>6</span>
									</span>
									<div className="label text-muted">
										Library Staff
									</div>
								</a>
							</li>
						</ul>
					</div>
					<div className = "form-padding-top">
						<form id = "userAccountSetupForm" name = "userAccountSetupForm" onSubmit = {submitHandler} encType = "multipart/form-data">
							<section id = "step-1" className = "form-step">
								<h2 className = "font-normal text-center">
									Directions Area
								</h2>
								<div className = "mt-3">
									<div className = "form-group row">
										<div className = "mt-5">
											<h2 className = "font-normal text-center">
												Learning Resource Center
											</h2>
										</div>
										<h3 className = "evaluationtext font-normal text-center">
											Library User's Satisfaction Survey
										</h3>
										<h4 className = "evaluationtext font-normal text-center">
											Directions: This questionnaire is intended to improve library services provided by the Technological University of the Philippines-Taguig Campus, Learning Resource Center. Please answer the question truthfully. Rest assured that all data will be treated with outmost confidentiality.
										</h4>
										<h5 className = "evaluationtext font-normal text-center">
											<input type = "checkbox" 
											name = 'ia'
											value = 'true'
											onChange={(e) => setia(e.target.value)} />
											I Agree to the Terms and Conditions
										</h5>
									</div>
								</div>
								<div className = "mt-3">
									<Link to = "/" className = "">
										<button className = "button btn-danger">
											Cancel
										</button>
									</Link>
									<button className = "button btn-navigate-form-step float-right" type = "button" step_number = "2">
										Next
									</button>
								</div>
							</section>

							<section id = "step-2" className = "form-step d-none">
								<h2 className = "evaluationtext font-normal text-center">
									Information
								</h2>

								<div className = "mt-3">

									<div className = "form-group row">
										<label htmlFor = "date_of_vist" className = "evaluationtext col-sm-2 col-form-label">
											Date of Visit
										</label>
										{/*<div className = "col-sm-10">
											<input type = "text" 
											id = "date_of_vist"
											className = "form-control"
											name = 'dv'
											value = {dv}
											onChange={(e) => setdv(e.target.value)} />
										</div>*/}
										<DatePicker selected={dv} onChange={(e) => setdv(e)} />
									</div>

									<div className = "form-group row">
										<label htmlFor = "date_of_vist" className = "evaluationtext col-sm-2 col-form-label">
											Type of Respondent
										</label>
										<div className = "col-sm-10">
											<select 
											type = "tr" 
											id = "type_of_respondent" 
											className = "form-control"
											name = "tr"
											value = {tr}
											onChange = {(e) => settr(e.target.value)}
											placeholder = "Type of Respondent">
												<option value = "" disabled hidden> Type of Respondent</option>
												<option value = "Faculty">Faculty</option>
												<option value = "Student">Student</option>
											</select>
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "year_level" className = "evaluationtext col-sm-2 col-form-label">
											Year Level
										</label>
										<div className = "col-sm-10">
											<select
											type = "yl" 
											id = "year_level"
											className = "form-control"
											name = 'yl'
											value = {yl}
											onChange={(e) => setyl(e.target.value)}
											placeholder = "Year Level">
												<option value = "" disabled hidden> Year Level</option>
												<option value = "1st Year">1st Year</option>
												<option value = "2nd Year">2nd Year</option>
												<option value = "3rd Year">3rd Year</option>
												<option value = "4th Year">4th Year</option>
											</select>
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "course" className = "evaluationtext col-sm-2 col-form-label">
											Course
										</label>
										<div className = "col-sm-10">
											<input type = "text" 
											id = "course"
											className = "form-control"
											name = 'course'
											value = {course}
											onChange={(e) => setcourse(e.target.value)} />
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "gender" className = "evaluationtext col-sm-2 col-form-label">
											Gender
										</label>
										<div className = "col-sm-10">
											<select 
											type = "gender" 
											id = "gender" 
											className = "form-control"
											name = "gender"
											value = {gender}
											onChange = {(e) => setgender(e.target.value)}
											placeholder = "Select Gender">
												<option value = "" disabled hidden> Select Gender</option>
												<option value = "Male">Male</option>
												<option value = "Female">Female</option>
											</select>
										</div>
									</div>

								</div>
								<div className="mt-3">
									<button className="button btn-navigate-form-step" type="button" step_number="1">Prev</button>
									<button className="button btn-navigate-form-step float-right" type="button" step_number="3">Next</button>
								</div>
							</section>

							<section id="step-3" className="form-step d-none">
								<h2 className = "font-normal text-center">
									Library Facilities
								</h2>

								<div className = "mt-3">

									<div className = "form-group row">
										<label htmlFor = "Study_Reading_Area" className = "evaluationtext col-sm-2 col-form-label">
											Study/Reading Area
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "sra"
												value = "1"
												onChange = {e=>setsra(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "sra"
												value = "2"
												onChange = {e=>setsra(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "sra"
												value = "3"
												onChange = {e=>setsra(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "sra"
												value = "4"
												onChange = {e=>setsra(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "sra"
												value = "5"
												onChange = {e=>setsra(e.target.value)} /> 5
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "Lighting_Ventilation" className = "evaluationtext col-sm-2 col-form-label">
											Lighting & Ventilation
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "lav"
												value = "1"
												onChange = {e=>setlav(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "lav"
												value = "2"
												onChange = {e=>setlav(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "lav"
												value = "3"
												onChange = {e=>setlav(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "lav"
												value = "4"
												onChange = {e=>setlav(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "lav"
												value = "5"
												onChange = {e=>setlav(e.target.value)} /> 5
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "Clean" className = "evaluationtext col-sm-2 col-form-label">
											Cleanliness
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "clean"
												value = "1"
												onChange = {e=>setclean(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "clean"
												value = "2"
												onChange = {e=>setclean(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "clean"
												value = "3"
												onChange = {e=>setclean(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "clean"
												value = "4"
												onChange = {e=>setclean(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "clean"
												value = "5"
												onChange = {e=>setclean(e.target.value)} /> 5
										</div>
									</div>
								</div>
								<div className="mt-3">
									<button className="button btn-navigate-form-step" type="button" step_number="2">Prev</button>
									<button className="button btn-navigate-form-step float-right" type="button" step_number="4">Next</button>
								</div>
							</section>

							<section id = "step-4" className = "form-step d-none">
								<h2 className="font-normal text-center">
									Library Services
								</h2>

								<div className="mt-3">

									<div className = "evaluationtext form-group row">
										<label htmlFor = "Hours_Open" className = "col-sm-2 col-form-label">
											Hours Open
										</label>
										<div className = "col-sm-5">
											<input 
												type = "radio" 
												name = "ho"
												value = "1"
												onChange = {e=>setho(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "ho"
												value = "2"
												onChange = {e=>setho(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "ho"
												value = "3"
												onChange = {e=>setho(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "ho"
												value = "4"
												onChange = {e=>setho(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "ho"
												value = "5"
												onChange = {e=>setho(e.target.value)} /> 5
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "Borrowing_Returning_Books" className = "evaluationtext col-sm-2 col-form-label">
											Borrowing and Returning of Books
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "brb"
												value = "1"
												onChange = {e=>setbrb(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "brb"
												value = "2"
												onChange = {e=>setbrb(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "brb"
												value = "3"
												onChange = {e=>setbrb(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "brb"
												value = "4"
												onChange = {e=>setbrb(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "brb"
												value = "5"
												onChange = {e=>setbrb(e.target.value)} /> 5
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "OPAC" className = "evaluationtext col-sm-2 col-form-label">
											Online Public Access Catalog (OPAC)
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "opac"
												value = "1"
												onChange = {e=>setopac(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "opac"
												value = "2"
												onChange = {e=>setopac(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "opac"
												value = "3"
												onChange = {e=>setopac(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "opac"
												value = "4"
												onChange = {e=>setopac(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "opac"
												value = "5"
												onChange = {e=>setopac(e.target.value)} /> 5
										</div>
									</div>
								</div>
								<div className="mt-3">
									<button className="button btn-navigate-form-step" type="button" step_number="3">Prev</button>
									<button className="button btn-navigate-form-step float-right" type="button" step_number="5">Next</button>
								</div>
							</section>

							<section id="step-5" className="form-step d-none">
								<h2 className="font-normal text-center">
									Library Collection
								</h2>

								<div className="mt-3">

									<div className = "form-group row">
										<label htmlFor = "Book_Collection" className = "evaluationtext col-sm-2 col-form-label">
											Book Collection
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "bc"
												value = "1"
												onChange = {e=>setbc(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "bc"
												value = "2"
												onChange = {e=>setbc(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "bc"
												value = "3"
												onChange = {e=>setbc(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "bc"
												value = "4"
												onChange = {e=>setbc(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "bc"
												value = "5"
												onChange = {e=>setbc(e.target.value)} /> 5
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "Periodical_Collection" className = " evaluationtext col-sm-2 col-form-label">
											Periodical Collection
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "pc"
												value = "1"
												onChange = {e=>setpc(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "pc"
												value = "2"
												onChange = {e=>setpc(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "pc"
												value = "3"
												onChange = {e=>setpc(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "pc"
												value = "4"
												onChange = {e=>setpc(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "pc"
												value = "5"
												onChange = {e=>setpc(e.target.value)} /> 5
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "Thesis_Project_Study" className = "evaluationtext col-sm-2 col-form-label">
											Thesis/Project Study
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "tps"
												value = "1"
												onChange = {e=>settps(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "tps"
												value = "2"
												onChange = {e=>settps(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "tps"
												value = "3"
												onChange = {e=>settps(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "tps"
												value = "4"
												onChange = {e=>settps(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "tps"
												value = "5"
												onChange = {e=>settps(e.target.value)} /> 5
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "Electronic_Resources" className = "evaluationtext col-sm-2 col-form-label">
											Electronic Resources (E-Books)
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "er"
												value = "1"
												onChange = {e=>seter(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "er"
												value = "2"
												onChange = {e=>seter(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "er"
												value = "3"
												onChange = {e=>seter(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "er"
												value = "4"
												onChange = {e=>seter(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "er"
												value = "5"
												onChange = {e=>seter(e.target.value)} /> 5
										</div>
									</div>
								</div>
								<div className="mt-3">
									<button className="button btn-navigate-form-step" type="button" step_number="4">Prev</button>
									<button className="button btn-navigate-form-step float-right" type="button" step_number="6">Next</button>
								</div>
							</section>

							<section id="step-6" className="form-step d-none">
								<h2 className="font-normal text-center">
									Library Staff
								</h2>

								<div className="mt-3">

									<div className = "form-group row">
										<label htmlFor = "Staff_Knowledge_Answering_Queries" className = "evaluationtext col-sm-2 col-form-label">
											Staff Knowledge in Answering Queries
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "skaq"
												value = "1"
												onChange = {e=>setskaq(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "skaq"
												value = "2"
												onChange = {e=>setskaq(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "skaq"
												value = "3"
												onChange = {e=>setskaq(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "skaq"
												value = "4"
												onChange = {e=>setskaq(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "skaq"
												value = "5"
												onChange = {e=>setskaq(e.target.value)} /> 5
										</div>
									</div>

									<div className = "form-group row">
										<label htmlFor = "Customer_Service_Skills" className = "evaluationtext col-sm-2 col-form-label">
											Customer Service Skills
										</label>
										<div className = "evaluationtext col-sm-5">
											<input 
												type = "radio" 
												name = "css"
												value = "1"
												onChange = {e=>setcss(e.target.value)} /> 1
											<input 
												type = "radio" 
												name = "css"
												value = "2"
												onChange = {e=>setcss(e.target.value)} /> 2
											<input 
												type = "radio" 
												name = "css"
												value = "3"
												onChange = {e=>setcss(e.target.value)} /> 3
											<input 
												type = "radio" 
												name = "css"
												value = "4"
												onChange = {e=>setcss(e.target.value)} /> 4
											<input 
												type = "radio" 
												name = "css"
												value = "5"
												onChange = {e=>setcss(e.target.value)} /> 5
										</div>
									</div>
								</div>
								<div className="mt-3">
									<button className="button btn-navigate-form-step" type="button" step_number="5">Prev</button>
									<button className="button submit-btn float-right" type="submit">Save</button>
								</div>
							</section>

						</form>
					</div>
				</div>

			</div>
		</Fragment>


		)

}
export default StudentEvaluation