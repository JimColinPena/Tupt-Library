import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker';

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import SideNavbarEmpty from '../../layout/SideNavbarEmpty';

import { studentEvaluations, clearErrors } from '../../../actions/evaluationActions'
import { STUDENT_EVALUATION_RESET } from '../../../constants/evaluationConstants'

const StudentEvaluation = () => {

	const [ia, setia] = useState(false)
	// const [dv, setdv] = useState(null)
	const [tr, settr] = useState('')
	const [yl, setyl] = useState('')
	const [course, setcourse] = useState('')
	const [tuptId, setTuptId] = useState('')
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
	const { loading, error, success } = useSelector(state => state.studentEvaluation);

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (success) {
			navigate('/student/evaluation');
			alert.success('Evaluation finished');
			dispatch({ type: STUDENT_EVALUATION_RESET })
		}
	}, [dispatch, alert, error, success, navigate])

	const submitHandler = (e) => {
		e.preventDefault();
		// const datevisit = new Date();

		// datevisit.setDate(dv.getDate())

		const formData = new FormData(e.target);
		// formData.set('dv', datevisit);
		dispatch(studentEvaluations(formData));
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
			{/* <SideNavbarEmpty /> */}
			{loading? <Loader /> :
				<Fragment>
					<div className="management-content">
						<div className="dashboard-page">
							<div id="multi-step-form-container">
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
									{/* <li className="form-stepper-unfinished text-center form-stepper-list" step="4">
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
							</li> */}
								</ul>
							</div>
							<div className="form-padding-top">
								<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data">
									<section id="step-1" className="form-step">
										<h2 className="font-normal text-center">
											Directions Area
										</h2>
										<div className="mt-3">
											<div className="form-group row">
												<div className="mt-5">
													<h2 className="font-normal text-center">
														Learning Resource Center
													</h2>
												</div>
												<h3 className="evaluationtext font-normal text-center">
													Library User's Satisfaction Survey
												</h3>
												<h4 className="evaluationtext font-normal text-center">
													Directions: This questionnaire is intended to improve library services provided by the Technological University of the Philippines-Taguig Campus, Learning Resource Center. Please answer the question truthfully. Rest assured that all data will be treated with outmost confidentiality.
												</h4>
												<h5 className="evaluationtext font-normal text-center">
													<input type="checkbox"
														name='ia'
														value='true'
														onChange={(e) => setia(e.target.value)} />
													I Agree to the Terms and Conditions
												</h5>
											</div>
										</div>
										<div className="mt-3">
											{/* <Link to="/student/evaluation" className="">
												<button className="button btn-danger">
													Cancel
												</button>
											</Link> */}
											<button className="button btn-navigate-form-step float-right" type="button" step_number="2">
												Next
											</button>
										</div>
									</section>

									<section id="step-2" className="form-step d-none">
										<h2 className="evaluationtext font-normal text-center">
											Information
										</h2>

										<div className="mt-3">

											<div className="form-group row">
												<label htmlFor="tuptId" className="evaluationtext col-sm-2 col-form-label">
													TUPT ID
												</label>
												<div className="col-sm-10">
													<input type="text"
														id="tuptId"
														className="form-control"
														name='tuptId'
														value={tuptId}
														onChange={(e) => setTuptId(e.target.value)}
														required />
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="year_level" className="evaluationtext col-sm-2 col-form-label">
													Year Level
												</label>
												<div className="col-sm-10">
													<select
														type="yl"
														id="year_level"
														className="form-control"
														name='yl'
														value={yl}
														onChange={(e) => setyl(e.target.value)}
														placeholder="Year Level">
														<option value="" disabled hidden> Year Level</option>
														<option value="1st Year">1st Year</option>
														<option value="2nd Year">2nd Year</option>
														<option value="3rd Year">3rd Year</option>
														<option value="4th Year">4th Year</option>
													</select>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="course" className="evaluationtext col-sm-2 col-form-label">
													Course
												</label>
												<div className="col-sm-10">
													<select
														type="course"
														id="course"
														className="form-control"
														name='course'
														value={course}
														onChange={(e) => setyl(e.target.value)}
														placeholder="Year Level">
														<option value="" disabled hidden> Course</option>
														<option value="BETAT">BETAT</option>
														<option value="BETChT">BETChT</option>
														<option value="BETCT">BETCT</option>
														<option value="BETET">BETET</option>
														<option value="BETEMT">BETEMT</option>
														<option value="BETElxT">BETElxT</option>
														<option value="BETInCT">BETInCT</option>
														<option value="BETMT">BETMT</option>
														<option value="BETMecT">BETMecT</option>
														<option value="BETNDTT">BETNDTT</option>
														<option value="BETDMT">BETDMT</option>
														<option value="BETHVACRT">BETHVAC/RT</option>
														<option value="BSCESEP">BSCESEP</option>
														<option value="BSEESEP">BSEESEP</option>
														<option value="BSECESEP">BSECESEP</option>
														<option value="BSMESEP">BSMESEP</option>
														<option value="BSIT">BSIT</option>
														<option value="BSIS">BSIS</option>
														<option value="BSESSDP">BSESSDP</option>
														<option value="BGTAT">BGTAT</option>
														<option value="BTVTEdET">BTVTEdET</option>
														<option value="BTVTEdLXt">BTVTEdLXt</option>
														<option value="BTVTEdICT">BTVTEdICT</option>
													</select>
												</div>
												{/* <div className="col-sm-10">
													<input type="text"
														id="course"
														className="form-control"
														name='course'
														value={course}
														onChange={(e) => setcourse(e.target.value)} />
												</div> */}
											</div>

											<div className="form-group row">
												<label htmlFor="gender" className="evaluationtext col-sm-2 col-form-label">
													Gender
												</label>
												<div className="col-sm-10">
													<select
														type="gender"
														id="gender"
														className="form-control"
														name="gender"
														value={gender}
														onChange={(e) => setgender(e.target.value)}
														placeholder="Select Gender">
														<option value="" disabled hidden> Select Gender</option>
														<option value="Male">Male</option>
														<option value="Female">Female</option>
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
										<h2 className="font-normal text-center">
											Evaluation
										</h2>
										<div className="evaluation-container">
											<div className="evaluation-content">
												<div className="descriptions">Description</div>
												<ul className="evaluation-ul">
													<li><b>1. Library Facilities </b></li>
													<li>1.1 Study/Reading Area</li>
													<li>1.2 Lighting & Ventilation</li>
													<li>1.3 Cleanliness</li>
													<li><b>2. Library Services</b></li>
													<li>2.1 HoursOpen</li>
													<li>2.2 Borrowing and Returning of Books</li>
													<li>2.3 Library Management System</li>
													<li><b>3. Library Collection</b></li>
													<li>3.1 Book Collection</li>
													<li>3.2 Periodical Collection</li>
													<li>3.3 Thesis/Project Study</li>
													<li>3.4 Electronic Resources (E-Books)</li>
													<li><b>4. Library Staff</b></li>
													<li>4.1 Staff knowledge in answering queries</li>
													<li>4.2 Customer Service Skills</li>
												</ul>
											</div>
											<div className="rating-shit">
												<p className="rating">Rating</p>
												<div className="rating-numbers five">
													<span>
														Excellent
													</span>
												</div>
												<div className="rating-numbers four">
													<span>
														Good
													</span>
												</div>
												<div className="rating-numbers three">
													<span>
														Average
													</span>
												</div>
												<div className="rating-numbers two">
													<span>
														Poor
													</span>
												</div>
												<div className="rating-numbers one">
													<span>

														Very Poor
													</span>
												</div>
												<div className="pota1 radiogaga"><input type="radio" name="sra" id="" value="5" onChange={e => setsra(e.target.value)} /></div>
												<div className="pota2 radiogaga"><input type="radio" name="sra" id="" value="4" onChange={e => setsra(e.target.value)} /></div>
												<div className="pota3 radiogaga"><input type="radio" name="sra" id="" value="3" onChange={e => setsra(e.target.value)} /></div>
												<div className="pota4 radiogaga"><input type="radio" name="sra" id="" value="2" onChange={e => setsra(e.target.value)} /></div>
												<div className="pota5 radiogaga"><input type="radio" name="sra" id="" value="1" onChange={e => setsra(e.target.value)} /></div>

												<div className="pota6 radiogaga"><input type="radio" name="lav" id="" value="5" onChange={e => setlav(e.target.value)} /></div>
												<div className="pota7 radiogaga"><input type="radio" name="lav" id="" value="4" onChange={e => setlav(e.target.value)} /></div>
												<div className="pota8 radiogaga"><input type="radio" name="lav" id="" value="3" onChange={e => setlav(e.target.value)} /></div>
												<div className="pota9 radiogaga"><input type="radio" name="lav" id="" value="2" onChange={e => setlav(e.target.value)} /></div>
												<div className="pota10 radiogaga"><input type="radio" name="lav" id="" value="1" onChange={e => setlav(e.target.value)} /></div>

												<div className="pota11 radiogaga"><input type="radio" name="clean" id="" value="5" onChange={e => setclean(e.target.value)} /></div>
												<div className="pota12 radiogaga"><input type="radio" name="clean" id="" value="4" onChange={e => setclean(e.target.value)} /></div>
												<div className="pota13 radiogaga"><input type="radio" name="clean" id="" value="3" onChange={e => setclean(e.target.value)} /></div>
												<div className="pota14 radiogaga"><input type="radio" name="clean" id="" value="2" onChange={e => setclean(e.target.value)} /></div>
												<div className="pota15 radiogaga"><input type="radio" name="clean" id="" value="1" onChange={e => setclean(e.target.value)} /></div>

												<div className="pota16 radiogaga"><input type="radio" name="ho" id="" value="5" onChange={e => setho(e.target.value)} /></div>
												<div className="pota17 radiogaga"><input type="radio" name="ho" id="" value="4" onChange={e => setho(e.target.value)} /></div>
												<div className="pota18 radiogaga"><input type="radio" name="ho" id="" value="3" onChange={e => setho(e.target.value)} /></div>
												<div className="pota19 radiogaga"><input type="radio" name="ho" id="" value="2" onChange={e => setho(e.target.value)} /></div>
												<div className="pota20 radiogaga"><input type="radio" name="ho" id="" value="1" onChange={e => setho(e.target.value)} /></div>

												<div className="pota21 radiogaga"><input type="radio" name="brb" id="" value="5" onChange={e => setbrb(e.target.value)} /></div>
												<div className="pota22 radiogaga"><input type="radio" name="brb" id="" value="4" onChange={e => setbrb(e.target.value)} /></div>
												<div className="pota23 radiogaga"><input type="radio" name="brb" id="" value="3" onChange={e => setbrb(e.target.value)} /></div>
												<div className="pota24 radiogaga"><input type="radio" name="brb" id="" value="2" onChange={e => setbrb(e.target.value)} /></div>
												<div className="pota25 radiogaga"><input type="radio" name="brb" id="" value="1" onChange={e => setbrb(e.target.value)} /></div>

												<div className="pota26 radiogaga"><input type="radio" name="opac" id="" value="5" onChange={e => setopac(e.target.value)} /></div>
												<div className="pota27 radiogaga"><input type="radio" name="opac" id="" value="4" onChange={e => setopac(e.target.value)} /></div>
												<div className="pota28 radiogaga"><input type="radio" name="opac" id="" value="3" onChange={e => setopac(e.target.value)} /></div>
												<div className="pota29 radiogaga"><input type="radio" name="opac" id="" value="2" onChange={e => setopac(e.target.value)} /></div>
												<div className="pota30 radiogaga"><input type="radio" name="opac" id="" value="1" onChange={e => setopac(e.target.value)} /></div>

												<div className="pota31 radiogaga"><input type="radio" name="bc" id="" value="5" onChange={e => setbc(e.target.value)} /></div>
												<div className="pota32 radiogaga"><input type="radio" name="bc" id="" value="4" onChange={e => setbc(e.target.value)} /></div>
												<div className="pota33 radiogaga"><input type="radio" name="bc" id="" value="3" onChange={e => setbc(e.target.value)} /></div>
												<div className="pota34 radiogaga"><input type="radio" name="bc" id="" value="2" onChange={e => setbc(e.target.value)} /></div>
												<div className="pota35 radiogaga"><input type="radio" name="bc" id="" value="1" onChange={e => setbc(e.target.value)} /></div>

												<div className="pota36 radiogaga"><input type="radio" name="pc" id="" value="5" onChange={e => setpc(e.target.value)} /></div>
												<div className="pota37 radiogaga"><input type="radio" name="pc" id="" value="4" onChange={e => setpc(e.target.value)} /></div>
												<div className="pota38 radiogaga"><input type="radio" name="pc" id="" value="3" onChange={e => setpc(e.target.value)} /></div>
												<div className="pota39 radiogaga"><input type="radio" name="pc" id="" value="2" onChange={e => setpc(e.target.value)} /></div>
												<div className="pota40 radiogaga"><input type="radio" name="pc" id="" value="1" onChange={e => setpc(e.target.value)} /></div>

												<div className="pota41 radiogaga"><input type="radio" name="tps" id="" value="5" onChange={e => settps(e.target.value)} /></div>
												<div className="pota42 radiogaga"><input type="radio" name="tps" id="" value="4" onChange={e => settps(e.target.value)} /></div>
												<div className="pota43 radiogaga"><input type="radio" name="tps" id="" value="3" onChange={e => settps(e.target.value)} /></div>
												<div className="pota44 radiogaga"><input type="radio" name="tps" id="" value="2" onChange={e => settps(e.target.value)} /></div>
												<div className="pota45 radiogaga"><input type="radio" name="tps" id="" value="1" onChange={e => settps(e.target.value)} /></div>

												<div className="pota46 radiogaga"><input type="radio" name="er" id="" value="5" onChange={e => seter(e.target.value)} /></div>
												<div className="pota47 radiogaga"><input type="radio" name="er" id="" value="4" onChange={e => seter(e.target.value)} /></div>
												<div className="pota48 radiogaga"><input type="radio" name="er" id="" value="3" onChange={e => seter(e.target.value)} /></div>
												<div className="pota49 radiogaga"><input type="radio" name="er" id="" value="2" onChange={e => seter(e.target.value)} /></div>
												<div className="pota50 radiogaga"><input type="radio" name="er" id="" value="1" onChange={e => seter(e.target.value)} /></div>

												<div className="pota51 radiogaga"><input type="radio" name="skaq" id="" value="5" onChange={e => setskaq(e.target.value)} /></div>
												<div className="pota52 radiogaga"><input type="radio" name="skaq" id="" value="4" onChange={e => setskaq(e.target.value)} /></div>
												<div className="pota53 radiogaga"><input type="radio" name="skaq" id="" value="3" onChange={e => setskaq(e.target.value)} /></div>
												<div className="pota54 radiogaga"><input type="radio" name="skaq" id="" value="2" onChange={e => setskaq(e.target.value)} /></div>
												<div className="pota55 radiogaga"><input type="radio" name="skaq" id="" value="1" onChange={e => setskaq(e.target.value)} /></div>

												<div className="pota56 radiogaga"><input type="radio" name="css" id="" value="5" onChange={e => setcss(e.target.value)} /></div>
												<div className="pota57 radiogaga"><input type="radio" name="css" id="" value="4" onChange={e => setcss(e.target.value)} /></div>
												<div className="pota58 radiogaga"><input type="radio" name="css" id="" value="3" onChange={e => setcss(e.target.value)} /></div>
												<div className="pota59 radiogaga"><input type="radio" name="css" id="" value="2" onChange={e => setcss(e.target.value)} /></div>
												<div className="pota60 radiogaga"><input type="radio" name="css" id="" value="1" onChange={e => setcss(e.target.value)} /></div>
											</div>
										</div>
										<div className="mt-3">
											<button className="button btn-navigate-form-step" type="button" step_number="2">Prev</button>
											<button className="button submit-btn float-right" type="submit">Save</button>
										</div>
									</section>

								</form>
							</div>
						</div>
					</div>
				</Fragment>
			}
		</Fragment>


	)

}
export default StudentEvaluation