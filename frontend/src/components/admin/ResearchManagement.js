import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate , Link} from "react-router-dom";
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allResearches, deleteResearch, clearErrors } from '../../actions/researchActions'
import { DELETE_RESEARCH_RESET } from '../../constants/researchConstants'

const ResearchManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, researches } = useSelector(state => state.allResearches);
    const { isDeleted } = useSelector(state => state.research)

    useEffect(() => {
        dispatch(allResearches());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Research deleted successfully');
            navigate('/admin/researches');
            dispatch({ type: DELETE_RESEARCH_RESET })
        }

    }, [dispatch, alert, error, isDeleted, navigate])

    const deleteResearchHandler = (id) => {
        dispatch(deleteResearch(id))
    }

    const setResearches = () => {
        const data = {
            columns: [
                {
                    label: 'Research ID',
                    field: 'call_number',
                    sort: 'asc'
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Author',
                    field: 'main_author',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        researches.forEach(researches => {
            data.rows.push({
                call_number: researches.call_number,
                title: researches.title,
                main_author: researches.main_author,
                actions: <Fragment>
                    <Link to={`/admin/research/${researches._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteResearchHandler(researches._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                  
                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            {/*<div className="row">*/}
                    <SideNavbarAdmin/>

                <div className="management-content">
                    <div className="management-header">
                        <h1>Researches <span></span>
                            <Link to={"/research/new"}>
                                <i className="fa-solid fa-circle-plus"></i>
                            </Link> 
                        </h1>
                    </div>
                    <div className="management-body">
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setResearches()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </div> 
                </div> 
        </Fragment>
    )
}
export default ResearchManagement