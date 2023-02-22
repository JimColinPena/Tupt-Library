import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import SideNavbarUser from '../layout/SideNavbarUser'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { getBookDetails , clearErrors} from '../../actions/bookActions'

const BookDetails = () => {
    
    const dispatch = useDispatch();
    let { id } = useParams();
    // let loading = true;
    
    const { BookDetails, loading } = useSelector(state => state.bookDetails)

    useEffect(() => {
        // loading = true
        dispatch(getBookDetails(id))
      }, [dispatch])

    return (
        <Fragment>
            {/* {loading == true ? <Loader /> :( */}
            {loading || loading == undefined ? <Fragment/>:(
                <Fragment>
                    <MetaData title={'User Details'} />
                    <SideNavbarAdmin />
                    <div className="management-content">
                        {/* {console.log(userdetail)} */}
                                        <div>
                                            {/* <img src={BookDetails.book_image.url} alt=''></img> */}

                                            <div className='col-md-6'>
                                                <div className='card-header'>
                                                    {((BookDetails.book_image == null || undefined) || (BookDetails.book_image.url == null || undefined)) ?
                                                        <img alt="" src="https://res.cloudinary.com/dxcrzvpbz/image/upload/v1671458821/TUPT_Library/Resources/default-book_p70mge.png" />
                                                        :
                                                        <img alt="" src={BookDetails.book_image.url} />
                                                    }
                                                </div>
                                            </div>

                                            <h3>Title: {BookDetails.title}</h3>
                                            <h5>Responsibility: {BookDetails.responsibility}</h5>
                                            <h5>Uniform Title: {BookDetails.uniform_title}</h5>
                                            <h5>Parallel Title: {BookDetails.parallel_title}</h5>
                                            <h5>Main Author: {BookDetails.main_author}</h5>
                                            <h5>Contributors: {BookDetails.contributors}</h5>
                                            <h5>Corporate Author: {BookDetails.corp_author}</h5>
                                            <h5>Place of Publication: {BookDetails.placePub}</h5>
                                            <h5>Publisher: {BookDetails.publisher}</h5>
                                            <h5>Year of Publication: {BookDetails.yearPub}</h5>
                                            <h5>Edition: {BookDetails.edition}</h5>
                                            <h5>Pages/Extent: {BookDetails.pages}</h5>
                                            <h5>Other Details: {BookDetails.other_details}</h5>
                                            <h5>Dimension: {BookDetails.dimension}</h5>
                                            <h5>Acc. Materials: {BookDetails.acc_materials}</h5>
                                            <h5>Series: {BookDetails.series}</h5>
                                            <h5>General Notes: {BookDetails.gen_notes}</h5>
                                            <h5>ISBN: {BookDetails.isbn}</h5>
                                            <h5>Call Number: {BookDetails.call_number}</h5>
                                            <h5>Language: {BookDetails.languange}</h5>
                                            <h5>Library/Location: {BookDetails.location}</h5>
                                            <h5>Entered By: {BookDetails.entered_by}</h5>
                                            <h5>Updated By: {BookDetails.updated_by}</h5>
                                            <h5>Date Entered: {BookDetails.date_entered}</h5>
                                            <h5>Date Updated: {BookDetails.date_updated}</h5>
                                            <h5>Copy: {BookDetails.copy}</h5>
                                            <h5>On Shelf: {BookDetails.on_shelf}</h5>
                                            <h5>Out: {BookDetails.out}</h5>
                                            <h5>Times Out: {BookDetails.times_out}</h5>
                                            <h5>Id: {BookDetails.id}</h5>
                                            <h5>Subjects: {BookDetails.subject}</h5>
                                            <h5>Content Notes: {BookDetails.content_notes}</h5>
                                            <h5>Abstract: {BookDetails.abstract}</h5>
                                            <h5>Times Borrowed: {BookDetails.borrow_count}</h5>
                                            <h5>Ratings: {BookDetails.ratings}</h5>
                                        </div>
                    </div>
                </Fragment>
            )} 
        </Fragment>

    )

}

export default BookDetails