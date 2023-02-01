import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './../layout/SideNavbarAdmin'

import { getBookDetails, updateBook, clearErrors } from '../../actions/bookActions'
import { UPDATE_BOOK_RESET } from '../../constants/bookConstants'

const BookUpdate = () => {

	const [title, setTitle] = useState('')
	const [responsibility, setResponsibility] = useState('')
	const [uniform_title, setUniform_title] = useState('')
	const [parallel_title, setParallel_title] = useState('')
	const [main_author, setMain_author] = useState('')
	const [other_author, setOther_author] = useState('')
	const [contributors, setContributors] = useState('')
	const [corp_author, setCorp_author] = useState('')
	const [placePub, setPlacePub] = useState('')
	const [publisher, setPublisher] = useState('')
	const [yearPub, setYearPub] = useState('')
	const [edition, setEdition] = useState('')
	const [pages, setPages] = useState('')
	const [other_details, setOther_details] = useState('')
	const [dimension, setDimension] = useState('')
	const [acc_materials, setAcc_materials] = useState('')
	const [series, setSeries] = useState('')
	const [gen_notes, setGen_notes] = useState('')
	const [isbn, setIsbn] = useState('')
	const [call_number, setCall_number] = useState('')
	const [accession, setAccession] = useState('')
	const [languange, setLanguange] = useState('')
	const [location, setLocation] = useState('')
	const [electronic_access, setElectronic_access] = useState('')
	const [entered_by, setEntered_by] = useState('')
	const [updated_by, setUpdated_by] = useState('')
	const [date_entered, setDate_entered] = useState('')
	const [date_updated, setDate_updated] = useState('')
	const [copy, setCopy] = useState('')
	const [on_shelf, setOn_shelf] = useState('')
	const [out, setOut] = useState('')
	const [times_out, setTimes_out] = useState('')
	const [bookId, setBookId] = useState('')
	const [subject, setSubject] = useState('')
	const [content_notes, setContent_notes] = useState('')
	const [abstract, setAbstract] = useState('')
	const [reviews, setReviews] = useState('')

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
    const { error, isUpdated } = useSelector(state => state.book);
	const { loading, book } = useSelector(state => state.bookDetails)
	const {id} = useParams();

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {

		if (book && book._id !== id) {
            dispatch(getBookDetails(id))
        } else {
        	setTitle(book.title)
			setResponsibility(book.responsibility)
			setUniform_title(book.uniform_title)
			setParallel_title(book.parallel_title)
			setMain_author(book.main_author)
			setOther_author(book.other_author)
			setContributors(book.contributors)
			setCorp_author(book.corp_author)
			setPlacePub(book.placePub)
			setPublisher(book.publisher)
			setYearPub(book.yearPub)
			setEdition(book.edition)
			setPages(book.pages)
			setOther_details(book.other_details)
			setDimension(book.dimension)
			setAcc_materials(book.acc_materials)
			setSeries(book.series)
			setGen_notes(book.gen_notes)
			setIsbn(book.isbn)
			setCall_number(book.call_number)
			setAccession(book.accession)
			setLanguange(book.languange)
			setLocation(book.location)
			setElectronic_access(book.electronic_access)
			setEntered_by(book.entered_by)
			setUpdated_by(book.updated_by)
			setDate_entered(book.date_entered)
			setDate_updated(book.date_updated)
			setCopy(book.copy)
			setOn_shelf(book.on_shelf)
			setOut(book.out)
			setTimes_out(book.times_out)
			// setBookId(book.bookId)
			setSubject(book.subject)
			setContent_notes(book.content_notes)
			setAbstract(book.abstract)
			setReviews(book.reviews)
        }

		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (isUpdated) {
            alert.success('Book updated successfully')

            navigate('/admin/books')

            dispatch({
                type: UPDATE_BOOK_RESET
            })
        }

	}, [dispatch, alert, error, navigate, isUpdated, id, book])

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		dispatch(updateBook(book._id, formData));
	};

	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber)
	}
	const navigateToFormStep = (stepNumber) => {

	   document.querySelectorAll(".form-step").forEach((formStepElement) => {
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
		{loading ? <Loader /> : (
			<Fragment>
			<MetaData title={'TUP-T Online Library - Admin'} />
			<SideNavbarAdmin/>
			<div className="management-content">
				<div className="dashboard-page">
					<div className="add-body">
						<div id="multi-step-form-container">
							<div>
								<ul className="form-stepper form-stepper-horizontal text-center mx-auto pl-0">
									<li className="form-stepper-active text-center form-stepper-list" step="1">
										<a className="mx-2">
											<span className="form-stepper-circle">
												<span>1</span>
											</span>
											<div className="label ">Title & Statement <br/>Responsibility Area</div>
										</a>
									</li>
									<li className="form-stepper-unfinished text-center form-stepper-list" step="2">
										<a className="mx-2">
											<span className="form-stepper-circle text-muted">
												<span>2</span>
											</span>
											<div className="label text-muted">Published, ISBN, <br/> Description etc.</div>
										</a>
									</li>
									<li className="form-stepper-unfinished text-center form-stepper-list" step="3">
										<a className="mx-2">
											<span className="form-stepper-circle text-muted">
												<span>3</span>
											</span>
											<div className="label text-muted">Local & Other <br/> Information</div>
										</a>
									</li>
									<li className="form-stepper-unfinished text-center form-stepper-list" step="4">
										<a className="mx-2">
											<span className="form-stepper-circle text-muted">
												<span>4</span>
											</span>
											<div className="label text-muted">Abstracts,<br/>Contents etc. </div>
										</a>
									</li>
								</ul>
							</div>
							<div className="form-padding-top">
								<form id="userAccountSetupForm" name="userAccountSetupForm" onSubmit={submitHandler} encType="multipart/form-data">
									<section id="step-1" className="form-step">
										<h2 className="font-normal text-center">Title & Statement Responsibility Area</h2>
										<div className="mt-3">
											<div className="form-group row">
												<label htmlFor="title_field" className="col-sm-2 col-form-label">Title</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="title_field"
													className="form-control"
													name='title'
													value={title}
													onChange={(e) => setTitle(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group row">
												<label htmlFor="responsibility_field" className="col-sm-2 col-form-label">Responsibility</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="responsibility_field"
													className="form-control"
													name='responsibility'
													value={responsibility}
													onChange={(e) => setResponsibility(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group row">
												<label htmlFor="uniformTitle_field" className="col-sm-2 col-form-label">Uniform Title</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="uniformTitle_field"
													className="form-control"
													name='uniform_title'
													value={uniform_title}
													onChange={(e) => setUniform_title(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="parallelTitle_field" className="col-sm-2 col-form-label">Parallel Title</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="parallelTitle_field"
													className="form-control"
													name='parallel_title'
													value={parallel_title}
													onChange={(e) => setParallel_title(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="mainAuthor_field" className="col-sm-2 col-form-label">Main Author</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="mainAuthor_field"
													className="form-control"
													name='main_author'
													value={main_author}
													onChange={(e) => setMain_author(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="otherAuthor_field" className="col-sm-2 col-form-label">Other Author</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="otherAuthor_field"
													className="form-control"
													name='other_author'
													value={other_author}
													onChange={(e) => setOther_author(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="contributors_field" className="col-sm-2 col-form-label">Contributors</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="contributors_field"
													className="form-control"
													name='contributors'
													value={contributors}
													onChange={(e) => setContributors(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="corpAuthor_field" className="col-sm-2 col-form-label">Corporate Author</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="corpAuthor_field"
													className="form-control"
													name='corp_author'
													value={corp_author}
													onChange={(e) => setCorp_author(e.target.value)}
													/>
												</div>
											</div>
										</div>
										<div className="mt-3">
											<Link to="/admin/books" className="">
												<button className="button btn-danger">Cancel</button>
											</Link>
											<button className="button btn-navigate-form-step float-right" type="button" step_number="2">Next</button>
										</div>
									</section>

									<section id="step-2" className="form-step d-none">
										<h2 className="font-normal text-center">Published, ISBN, Description etc.</h2>

										<div className="mt-3">

											<div className="form-group row">
												<label htmlFor="placePub_field" className="col-sm-2 col-form-label">Place of Publication</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="placePub_field"
													className="form-control"
													name='placePub'
													value={placePub}
													onChange={(e) => setPlacePub(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="publisher_field" className="col-sm-2 col-form-label">Publisher</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="publisher_field"
													className="form-control"
													name='publisher'
													value={publisher}
													onChange={(e) => setPublisher(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="yearPub_field" className="col-sm-2 col-form-label">Year of Publication</label>
												<div className="col-sm-4">
													<input
													type="text"
													id="yearPub_field"
													className="form-control"
													name='yearPub'
													value={yearPub}
													onChange={(e) => setYearPub(e.target.value)}
													/>
												</div>

												<label htmlFor="edition_field" className="col-sm-1 col-form-label">Edition</label>
												<div className="col-sm-5">
													<input
													type="text"
													id="edition_field"
													className="form-control"
													name='edition'
													value={edition}
													onChange={(e) => setEdition(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="pages_field" className="col-sm-2 col-form-label">Pages/Extent</label>
												<div className="col-sm-4">
													<input
													type="text"
													id="pages_field"
													className="form-control"
													name='pages'
													value={pages}
													onChange={(e) => setPages(e.target.value)}
													/>
												</div>

												<label htmlFor="otherDetails_field" className="col-sm-2 col-form-label">Other Details</label>
												<div className="col-sm-4">
													<input
													type="text"
													id="otherDetails_field"
													className="form-control"
													name='other_details'
													value={other_details}
													onChange={(e) => setOther_details(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="dimension_field" className="col-sm-2 col-form-label">Dimension</label>
												<div className="col-sm-4">
													<input
													type="text"
													id="dimension_field"
													className="form-control"
													name='dimension'
													value={dimension}
													onChange={(e) => setDimension(e.target.value)}
													/>
												</div>

												<label htmlFor="accMaterials_field" className="col-sm-2 col-form-label">Acc. Materials</label>
												<div className="col-sm-4">
													<input
													type="text"
													id="accMaterials_field"
													className="form-control"
													name='acc_materials'
													value={acc_materials}
													onChange={(e) => setAcc_materials(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="series_field" className="col-sm-2 col-form-label">Series</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="series_field"
													className="form-control"
													name='series'
													value={series}
													onChange={(e) => setSeries(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="genNotes_field" className="col-sm-2 col-form-label">General Notes</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="genNotes_field"
													className="form-control"
													name='gen_notes'
													value={gen_notes}
													onChange={(e) => setGen_notes(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="isbn_field" className="col-sm-2 col-form-label">ISBN</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="isbn_field"
													className="form-control"
													name='isbn'
													value={isbn}
													onChange={(e) => setIsbn(e.target.value)}
													/>
												</div>
											</div>

										</div>
										<div className="mt-3">
											<button className="button btn-navigate-form-step" type="button" step_number="1">Prev</button>
											<button className="button btn-navigate-form-step float-right" type="button" step_number="3">Next</button>
										</div>
									</section>

									<section id="step-3" className="form-step d-none">
										<h2 className="font-normal text-center">Local & Other Information</h2>

										<div className="mt-3">

											<div className="form-group row">
												<label htmlFor="callNumber_field" className="col-sm-2 col-form-label">Call Number</label>
												<div className="col-sm-2">
													<select id="callNumber1" name="call_number" className="form-control">
														<option value="FIL">FIL</option>
														<option value="REF">REF</option>
														<option value="CIR">CIR</option>
													</select>
												</div>
												<div className="col-sm-8">
													<input
													type="text"
													id="callNumber2"
													className="form-control"
													name='call_number'
													value={call_number}
													onChange={(e) => setCall_number(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="accession_field" className="col-sm-2 col-form-label">Accession</label>
												<div className="col-sm-10">
													<input
													type="text"
													id="accession_field"
													className="form-control"
													name='accession'
													value={accession}
													onChange={(e) => setAccession(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="language_field" className="col-sm-2 col-form-label">Language</label>
												<div className="col-sm-10">
													<select id="language_field" name="languange" className="form-control">
														<option value="" disabled selected>Select Book Language...</option>
														<option value="English">English</option>
														<option value="Filipino">Filipino</option>
													</select>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="location_field" className="col-sm-2 col-form-label">Library/Location</label>
												<div className="col-sm-10">
													<select id="location_field" name="location" className="form-control">
														<option value="TUP-T Library">TUP-T Library</option>
													</select>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="electronicAccess_field" className="col-sm-2 col-form-label">Electronic Access</label>
												<div className="col-sm-4">
													<input 
													type="file" 
													disabled
													id="electronicAccess_field" 
													// className="form-control"
													name="electronic_access" 
													value={electronic_access}
													onChange={(e) => setElectronic_access(e.target.value)}
													/>
												</div>

												<label htmlFor="copy_field" className="col-sm-1 col-form-label">Vol/Copy</label>
												<div className="col-sm-5">
													<input
													type="text"
													id="copy_field"
													className="form-control"
													name='copy'
													value={copy}
													onChange={(e) => setCopy(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="enteredBy_field" className="col-sm-2 col-form-label">Entered By</label>
												<div className="col-sm-4">
													<input
													type="text"
													id="enteredBy_field"
													className="form-control"
													name='entered_by'
													value={entered_by}
													onChange={(e) => setEntered_by(e.target.value)}
													/>
												</div>

												<label htmlFor="updatedBy_field" className="col-sm-2 col-form-label">Updated By</label>
												<div className="col-sm-4">
													<input
													type="text"
													id="updatedBy_field"
													className="form-control"
													name='updated_by'
													value={updated_by}
													onChange={(e) => setUpdated_by(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="dateEntered_field" className="col-sm-2 col-form-label">Date Entered</label>
												<div className="col-sm-4">
													<input
													type="date"
													id="dateEntered_field"
													className="form-control"
													name='date_entered'
													value={date_entered}
													onChange={(e) => setDate_entered(e.target.value)}
													/>
												</div>

												<label htmlFor="dateUpdated_field" className="col-sm-2 col-form-label">Date Updated</label>
												<div className="col-sm-4">
													<input
													type="date"
													id="dateUpdated_field"
													className="form-control"
													name='date_updated'
													value={date_updated}
													onChange={(e) => setDate_updated(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="timesOut_field" className="col-sm-2 col-form-label">Times Out</label>
												<div className="col-sm-1">
													<input
													type="number"
													id="timesOut_field"
													className="form-control"
													name='times_out'
													value={times_out}
													onChange={(e) => setTimes_out(e.target.value)}
													/>
												</div>

												<label htmlFor="out_field" className="col-sm-1 col-form-label">Out</label>
												<div className="col-sm-1">
													<input
													type="number"
													id="out_field"
													className="form-control"
													name='out'
													value={out}
													onChange={(e) => setOut(e.target.value)}
													/>
												</div>

												<label htmlFor="onShelf_field" className="col-sm-1 col-form-label">On Shelf</label>
												<div className="col-sm-1">
													<input
													type="number"
													id="onShelf_field"
													className="form-control"
													name='on_shelf'
													value={on_shelf}
													onChange={(e) => setOn_shelf(e.target.value)}
													/>
												</div>

												{/*<label htmlFor="id_field" className="col-sm-1 col-form-label">ID</label>
												<div className="col-sm-4">
													<input
													type="text"
													id="id_field"
													className="form-control"
													name='id'
													value={bookId}
													onChange={(e) => setBookId(e.target.value)}
													/>
												</div>*/}
											</div>

											<div className="form-group row">
												<label htmlFor="subject_field" className="col-sm-2 col-form-label">Subjects</label>
												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="General Circulation"/> General Circulation
												</div>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Circulation"/> Circulation
												</div>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Special Collection"/> Special Collection
												</div>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Easy"/> Easy
												</div>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Teachers Reference"/> Teacher Reference
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="subject_field" className="col-sm-2 col-form-label"> </label>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Reference"/> Reference
												</div>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Biography"/> Biography
												</div>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Fiction"/> Fiction
												</div>

												<div className="col-sm-3">
													<input type="checkbox" id="checkbox" name="checkbox" value="Filipiniana/Reference"/> Filipiniana/Reference
												</div>

											</div>

											<div className="form-group row">
												<label htmlFor="subject_field" className="col-sm-2 col-form-label"> </label>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Filipiniana"/> Filipiniana
												</div>

												<div className="col-sm-2">
													<input type="checkbox" id="checkbox" name="checkbox" value="Reserve"/> Reserve
												</div>
											</div>

										</div>
										<div className="mt-3">
											<button className="button btn-navigate-form-step" type="button" step_number="2">Prev</button>
											<button className="button btn-navigate-form-step float-right" type="button" step_number="4">Next</button>
										</div>
									</section>
									<section id="step-4" className="form-step d-none">
										<h2 className="font-normal text-center">Abstracts, Contents etc.</h2>
										<div className="mt-3">

											<div className="form-group row">
												<label htmlFor="contentNotes_field" className="col-sm-2 col-form-label">Content Notes</label>
												<div className="col-sm-10">
													<textarea

													rows="4" cols="50"
													id="contentNotes_field"
													className="form-control"
													name='content_notes'
													value={content_notes}
													onChange={(e) => setContent_notes(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="abstract_field" className="col-sm-2 col-form-label">Abstract</label>
												<div className="col-sm-10">
													<textarea

													rows="4" cols="50"
													id="abstract_field"
													className="form-control"
													name='abstract'
													value={abstract}
													onChange={(e) => setAbstract(e.target.value)}
													/>
												</div>
											</div>

											<div className="form-group row">
												<label htmlFor="reviews_field" className="col-sm-2 col-form-label">Reviews</label>
												<div className="col-sm-10">
													<textarea

													rows="4" cols="50"
													id="reviews_field"
													className="form-control"
													name='reviews'
													value={reviews}
													onChange={(e) => setReviews(e.target.value)}
													/>
												</div>
											</div>

										</div>
										<div className="mt-3">
											<button className="button btn-navigate-form-step" type="button" step_number="3">Prev</button>
											<button className="button submit-btn float-right" type="submit">Save</button>
										</div>
									</section>

								</form>
							</div>
						</div>


					</div> 
				</div> 
			</div> 
			</Fragment>
            )}
        </Fragment>
	)
}
export default BookUpdate