import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getBookLeaderboards, clearErrors } from '../../actions/borrowActions'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const BookLeaderboards  = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
    const { loading, error, bookCounts } = useSelector(state => state.bookLeaderboards);

    useEffect(() => {
        dispatch(getBookLeaderboards());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    return (
    	<Fragment>
        <MetaData title={'Dashboard'} />
    	{loading ? <Loader /> : (
           <div className="col-md-6">
           <div className='board'>
               <h2 className='leaderboard'>Most Borrowed Books</h2>

               {bookCounts.map((data) => 
               <div className='profile-leaderboards'>
               <div className='flex'>
               {/* <div className='item'> */}
                       {/* <h3 className='text-dark'>{data.title}</h3> */}
                       <h3 className='text-dark'><Link to={`/admin/single/book/${data._id._id}`}>{data.title} </Link></h3>
               {/* </div> */}

               <div className='item'>
                   <span>&#215; lended: {data.count}</span>
               </div>
           </div>
           </div>
           )}
           
           </div>
       </div>
        )}
        </Fragment>
    )
}
export default BookLeaderboards
