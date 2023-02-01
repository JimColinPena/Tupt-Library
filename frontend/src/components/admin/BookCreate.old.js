import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
// import Pagination from 'react-js-pagination'

import MetaData from '../layout/MetaData'
// import Loader from '../layout/Loader'
import SideNavbarAdmin from './../layout/SideNavbarAdmin'

import { newBooks, clearErrors } from '../../actions/bookActions'
import { NEW_BOOK_RESET } from '../../constants/bookConstants'

const BookCreate = () => {


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
    const [id, setId] = useState('')
    const [subject, setSubject] = useState('')
    const [content_notes, setContent_notes] = useState('')
    const [abstract, setAbstract] = useState('')
    const [reviews, setReviews] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
    const { loading, error, success } = useSelector(state => state.newBook);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/books');
            alert.success('Book created successfully');
            dispatch({ type: NEW_BOOK_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.set('title', title);
    //     formData.set('responsibility', responsibility);
    //     formData.set('uniform_title', uniform_title);
    //     formData.set('parallel_title', parallel_title);
    //     // formData.set('main_author', main_author);
    //     // formData.set('other_author', other_author);
    //     // formData.set('contributors', contributors);
    //     // formData.set('corp_author', corp_author);
    //     // formData.set('placePub', placePub);
    //     // formData.set('publisher', publisher);
    //     // formData.set('yearPub', yearPub);
    //     // formData.set('edition', edition);
    //     // formData.set('pages', pages);
    //     // formData.set('other_details', other_details);
    //     // formData.set('dimension', dimension);
    //     // formData.set('acc_materials', acc_materials);
    //     // formData.set('series', series);
    //     // formData.set('gen_notes', gen_notes);
    //     // formData.set('isbn', isbn);
    //     // formData.set('call_number', call_number);
    //     // formData.set('accession', accession);
    //     // formData.set('languange', languange);
    //     // formData.set('location', location);
    //     // formData.set('electronic_access', electronic_access);
    //     // formData.set('entered_by', entered_by);
    //     // formData.set('updated_by', updated_by);
    //     // formData.set('date_entered', date_entered);
    //     // formData.set('date_updated', date_updated);
    //     // formData.set('copy', copy);
    //     // formData.set('on_shelf', on_shelf);
    //     // formData.set('out', out);
    //     // formData.set('times_out', times_out);
    //     // formData.set('id', id);
    //     // formData.set('subject', subject);
    //     // formData.set('content_notes', content_notes);
    //     // formData.set('abstract', abstract);
    //     // formData.set('reviews', reviews);

    //     dispatch(newBooks(formData))
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        dispatch(newBooks(formData));
    };

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            {/*<div className="row">*/}
                    <SideNavbarAdmin/>
                    <div></div>
                <div className="dashboard-content">
                    <div className="dashboard-page">
                        <div className="dashboard-header">
                            <h1>Add Book</h1>
                        </div> 
                        <div className="dashboard-body">
                            <form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                                <div className="row g-3">
                                    <div className="col md-6">
                                        <div className="form-group">
                                            <label htmlFor="title_field">Title</label>
                                            <input
                                                type="text"
                                                id="title_field"
                                                className="form-control"
                                                name='title'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="responsibility_field">Responsibility</label>
                                            <input
                                                type="text"
                                                id="responsibility_field"
                                                className="form-control"
                                                name='responsibility'
                                                value={responsibility}
                                                onChange={(e) => setResponsibility(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="parallelTitle_field">Parallel Title</label>
                                            <input
                                                type="text"
                                                id="parallelTitle_field"
                                                className="form-control"
                                                name='parallel_title'
                                                value={parallel_title}
                                                onChange={(e) => setParallel_title(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="uniformTitle_field">Uniform Title</label>
                                            <input
                                                type="text"
                                                id="uniformTitle_field"
                                                className="form-control"
                                                name='uniform_title'
                                                value={uniform_title}
                                                onChange={(e) => setUniform_title(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="mainAuthor_field">Main Author</label>
                                            <input
                                                type="text"
                                                id="mainAuthor_field"
                                                className="form-control"
                                                name='main_author'
                                                value={main_author}
                                                onChange={(e) => setMain_author(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="otherAuthor_field">Other Author</label>
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
                                <div className="col md-6">
                                    <div className="form-group">
                                        <label htmlFor="contributors_field">Contributors</label>
                                        <input
                                            type="text"
                                            id="contributors_field"
                                            className="form-control"
                                            name='contributors'
                                            value={contributors}
                                            onChange={(e) => setContributors(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="corpAuthor_field">Corporate Author</label>
                                        <input
                                            type="text"
                                            id="corpAuthor_field"
                                            className="form-control"
                                            name='corp_author'
                                            value={corp_author}
                                            onChange={(e) => setCorp_author(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="placePub_field">Place of Publication</label>
                                        <input
                                            type="text"
                                            id="placePub_field"
                                            className="form-control"
                                            name='placePub'
                                            value={placePub}
                                            onChange={(e) => setPlacePub(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="publisher_field">Publisher</label>
                                        <input
                                            type="text"
                                            id="publisher_field"
                                            className="form-control"
                                            name='publisher'
                                            value={publisher}
                                            onChange={(e) => setPublisher(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="yearPub_field">Year of Publication</label>
                                        <input
                                            type="text"
                                            id="yearPub_field"
                                            className="form-control"
                                            name='yearPub'
                                            value={yearPub}
                                            onChange={(e) => setYearPub(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="edition_field">Edition</label>
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
                                <div className="col md-6">
                                    <div className="form-group">
                                        <label htmlFor="pages_field">Pages</label>
                                        <input
                                            type="text"
                                            id="pages_field"
                                            className="form-control"
                                            name='pages'
                                            value={pages}
                                            onChange={(e) => setPages(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="otherDetails_field">Other Details</label>
                                        <input
                                            type="text"
                                            id="otherDetails_field"
                                            className="form-control"
                                            name='other_details'
                                            value={other_details}
                                            onChange={(e) => setOther_details(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dimension_field">Dimension</label>
                                        <input
                                            type="text"
                                            id="dimension_field"
                                            className="form-control"
                                            name='dimension'
                                            value={dimension}
                                            onChange={(e) => setDimension(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="accMaterials_field">Accounting Materials</label>
                                        <input
                                            type="text"
                                            id="accMaterials_field"
                                            className="form-control"
                                            name='acc_materials'
                                            value={acc_materials}
                                            onChange={(e) => setAcc_materials(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="series_field">Series</label>
                                        <input
                                            type="text"
                                            id="series_field"
                                            className="form-control"
                                            name='series'
                                            value={series}
                                            onChange={(e) => setSeries(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="genNotes_field">General Notes</label>
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
                                <div className="col md-6">
                                    <div className="form-group">
                                        <label htmlFor="isbn_field">ISBN</label>
                                        <input
                                            type="text"
                                            id="isbn_field"
                                            className="form-control"
                                            name='isbn'
                                            value={isbn}
                                            onChange={(e) => setIsbn(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="callNumber_field">Call Number</label>
                                        <input
                                            type="text"
                                            id="callNumber_field"
                                            className="form-control"
                                            name='call_number'
                                            value={call_number}
                                            onChange={(e) => setCall_number(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="accession_field">Accession</label>
                                        <input
                                            type="text"
                                            id="accession_field"
                                            className="form-control"
                                            name='accession'
                                            value={accession}
                                            onChange={(e) => setAccession(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="language_field">Language</label>
                                        <input
                                            type="text"
                                            id="language_field"
                                            className="form-control"
                                            name='languange'
                                            value={languange}
                                            onChange={(e) => setLanguange(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="location_field">Location</label>
                                        <input
                                            type="text"
                                            id="location_field"
                                            className="form-control"
                                            name='location'
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="electronicAccess_field">Electronic Access</label>
                                        <input
                                            type="text"
                                            id="electronicAccess_field"
                                            className="form-control"
                                            name='electronic_access'
                                            value={electronic_access}
                                            onChange={(e) => setElectronic_access(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col md-6">
                                    <div className="form-group">
                                        <label htmlFor="enteredBy_field">Entered By</label>
                                        <input
                                            type="text"
                                            id="enteredBy_field"
                                            className="form-control"
                                            name='entered_by'
                                            value={entered_by}
                                            onChange={(e) => setEntered_by(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="updatedBy_field">Updated By</label>
                                        <input
                                            type="text"
                                            id="updatedBy_field"
                                            className="form-control"
                                            name='updated_by'
                                            value={updated_by}
                                            onChange={(e) => setUpdated_by(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dateEntered_field">Date Entered</label>
                                        <input
                                            type="text"
                                            id="dateEntered_field"
                                            className="form-control"
                                            name='date_entered'
                                            value={date_entered}
                                            onChange={(e) => setDate_entered(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dateUpdated_field">Date Updated</label>
                                        <input
                                            type="text"
                                            id="dateUpdated_field"
                                            className="form-control"
                                            name='date_updated'
                                            value={date_updated}
                                            onChange={(e) => setDate_updated(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="copy_field">Copy</label>
                                        <input
                                            type="text"
                                            id="copy_field"
                                            className="form-control"
                                            name='copy'
                                            value={copy}
                                            onChange={(e) => setCopy(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="onShelf_field">On Shelf</label>
                                        <input
                                            type="text"
                                            id="onShelf_field"
                                            className="form-control"
                                            name='on_shelf'
                                            value={on_shelf}
                                            onChange={(e) => setOn_shelf(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col md-6">
                                    <div className="form-group">
                                        <label htmlFor="out_field">Out</label>
                                        <input
                                            type="text"
                                            id="out_field"
                                            className="form-control"
                                            name='out'
                                            value={out}
                                            onChange={(e) => setOut(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="timesOut_field">Times Out</label>
                                        <input
                                            type="text"
                                            id="timesOut_field"
                                            className="form-control"
                                            name='times_out'
                                            value={times_out}
                                            onChange={(e) => setTimes_out(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="id_field">ID</label>
                                        <input
                                            type="text"
                                            id="id_field"
                                            className="form-control"
                                            name='id'
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject_field">Subject</label>
                                        <input
                                            type="text"
                                            id="subject_field"
                                            className="form-control"
                                            name='subject'
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </div>
                                     <div className="form-group">
                                            <label htmlFor="contentNotes_field">Content Notes</label>
                                        <input
                                            type="text"
                                            id="contentNotes_field"
                                            className="form-control"
                                            name='content_notes'
                                            value={content_notes}
                                            onChange={(e) => setContent_notes(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="abstract_field">Abstract</label>
                                        <input
                                            type="text"
                                            id="abstract_field"
                                            className="form-control"
                                            name='abstract'
                                            value={abstract}
                                            onChange={(e) => setAbstract(e.target.value)}
                                        />
                                    </div>
                                </div></div>
                                <div className="col md-6">
                                    <div className="form-group">
                                        <label htmlFor="reviews_field">Reviews</label>
                                        <input
                                            type="text"
                                            id="reviews_field"
                                            className="form-control"
                                            name='reviews'
                                            value={reviews}
                                            onChange={(e) => setReviews(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        id="submit_button"
                                        type="submit"
                                        disabled={loading ? true : false}
                                    >
                                        Submit
                                    </button>
                                </div>
                            
                        </form>
                    </div> 
                </div> 
            </div> 
        </Fragment>
    )
}
export default BookCreate