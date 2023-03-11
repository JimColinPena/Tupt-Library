import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrowerLeaderboards, clearErrors } from '../../actions/borrowActions'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
// import {getAllActiveStudents} from '../../actions/personnelActions'


const BorrowerLeaderboards  = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
    const { loading, error, borrowerRanking } = useSelector(state => state.borrowerLeaderboards);
    // const { active_students } = useSelector(state => state.allActiveStudents);
    const [period, setPeriod] = useState(0);

    useEffect(() => {
        dispatch(getBorrowerLeaderboards());
        // dispatch(getAllActiveStudents());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    return (
    	<Fragment>
        <MetaData title={'Dashboard'} />
    	{loading || loading === undefined ? <Loader /> : (
           <div className="col-md-6">
           <div className='board'>
               <h2 className='leaderboard'>Frequent Borrowers</h2>

               {borrowerRanking.map((data) => 
               <div className='profile-leaderboards'>
               <div className='flex'>
               <div className='item'>
                <img className='profile-leaderboards-img' src={data.avatar} alt=''></img>
                   <div className='info'>
                    {/* {console.log(data)} */}
                       <h3 className='text-dark'><Link to={`/detail/student/${data._id._id}`}>{data.name} </Link></h3>
                       <span className='text-dark'>{data.course}</span>
                   </div>
               </div>

               <div className='item'>
                   <span>&#215; Borrowed: {data.count}</span>
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
export default BorrowerLeaderboards
