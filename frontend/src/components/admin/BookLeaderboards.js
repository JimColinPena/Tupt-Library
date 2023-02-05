import React, { Fragment, useState, useRef, useEffect } from 'react'
// import dateFormat from 'dateformat';
// import { Bar } from 'react-chartjs-2';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getBookLeaderboards, clearErrors } from '../../actions/borrowActions'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
// import Profile from './profileBookLeaderboards'
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, registerables } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     ChartDataLabels,
//     ...registerables
// )

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

    const handleClick = (e) => {
        // console.log(e.target)
    }
    // console.log(bookCounts)


    return (
    	<Fragment>
        <MetaData title={'Dashboard'} />
    	{loading ? <Loader /> : (
           <div className="col-md-4">
           <div className='board'>
               <h1 className='leaderboard'>Most Borrowed Books</h1>

               <div className='duration'>
                   <button onClick={handleClick} data-id='7'>7 Days</button>
                   <button onClick={handleClick} data-id='30'>30 Days</button>
                   <button onClick={handleClick} data-id='0'>All-Time</button>
               </div>
               {bookCounts.map((data) => 
               <div className='flex'>
               <div className='item'>
                   <div className='info'>
                    {/* {console.log(data)} */}
                       <h3 className='name text-dark'>{data.title}</h3>
                   </div>
               </div>

               <div className='item'>
                   <span>Score: {data.count}</span>
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
