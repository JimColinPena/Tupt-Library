import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate , Link} from "react-router-dom";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from './../layout/SideNavbarAdmin'

import { newResearches, clearErrors } from '../../actions/researchActions'
import { NEW_RESEARCH_RESET } from '../../constants/researchConstants'

const ResearchCreate = () => {

	
	const [reviews, setReviews] = useState('')

	const alert = useAlert();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const { loading, error, success } = useSelector(state => state.newResearch);

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors())
		}

		if (success) {
			navigate('/admin/research');
			alert.success('Research created successfully');
			dispatch({ type: NEW_RESEARCH_RESET })
		}

	}, [dispatch, alert, error, success, navigate])

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		dispatch(newResearches(formData));
	};


   	return (
	 	<Fragment>
			<MetaData title={'TUP-T Online Library - Admin'} />
			<SideNavbarAdmin/>
			<div className="dashboard-content">
				<div className="dashboard-page">
					<div className="addResearch-body">

					</div> 
				</div> 
			</div> 
		</Fragment>
	)
}
export default ResearchCreate