import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
// import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';

import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import SideNavbarAdmin from '../../layout/SideNavbarAdmin'

import { checkEvaluation, allEvaluation, newEvaluations, editEvaluations, deleteEvaluations, clearErrors } from '../../../actions/evaluationActions'
import { NEW_EVALUATION_RESET, EDIT_EVALUATION_RESET, DELETE_EVALUATION_RESET } from '../../../constants/evaluationConstants'

const EvaluationManagement = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    let { id } = useParams();
    let navigate = useNavigate();

    const { loading, evaluations, error } = useSelector(state => state.allevaluation);
    const { eval_error, success } = useSelector(state => state.newevaluation);
    const { edit_eval_error, isEdited, isDeleted, new_eval_error } = useSelector(state => state.evaluationReducer);
    const { checksuccess, checkerror } = useSelector(state => state.checkEvaluations);


    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allEvaluation())

        if (checksuccess) {
            navigate("/student/evaluation");
        }

        if (checkerror) {
            alert.error(checkerror);
            dispatch(clearErrors())
        }

        if (new_eval_error) {
            alert.error(eval_error);
            dispatch(clearErrors())
        }

        if (eval_error) {
            alert.error(edit_eval_error);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Evaluation created successfully');
            dispatch({ type: NEW_EVALUATION_RESET })
            navigate(`/admin/evaluation`);
        }

        if (isEdited) {
            alert.success('Evaluation edited successfully');
            dispatch({ type: EDIT_EVALUATION_RESET })
            navigate(`/admin/evaluation`);
        }

        if (isDeleted) {
            alert.success('Evaluation deleted successfully');
            dispatch({ type: DELETE_EVALUATION_RESET })
            navigate(`/admin/evaluation`);
        }


    }, [dispatch, alert, success, checksuccess, checkerror, isEdited, isDeleted, new_eval_error, eval_error, edit_eval_error])

    const [school_year, setSchool_year] = useState('')
    const [edit_school_year, setEdit_school_year] = useState('')

    const checkEvaluationHandler  = () => {
        // console.log('checkEvaluationHandler')
        dispatch(checkEvaluation());
    }

    const submitHandler = () => {
        // e.preventDefault();
        console.log('submitHandler')
        const formData = new FormData();
        formData.set('school_year', school_year)
        dispatch(newEvaluations(formData));
    }

    const editEvaluationHandler = (evaluationId) => {
        console.log('editEvaluationHandler')
        const formData = new FormData();
        formData.set('school_year', edit_school_year)
        dispatch(editEvaluations(evaluationId, formData));
    }

    const deleteEvaluationHandler  = (deleteId) => {
        dispatch(deleteEvaluations(deleteId));
    }

    const col = [
        {
            title: 'School Year',
            field: 'school_year',
            searchable: false,
            render: rowData => (
                <Fragment>
                    <div><p>{rowData.school_year}</p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Status',
            field: 'status',
            searchable: false,
            render: rowData => (
                <Fragment>
                    <div><p>{rowData.status}</p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Actions',
            field: '_id',
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Tooltip className="" title="Edit">
                            <button className="btn btn-warning py-1 px-2 ml-2" data-toggle="modal" data-target={"#EditEvaluationModal" + rowData._id}>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </Tooltip>
                        <Tooltip className="" title="Delete">
                            <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeleteEvaluationModal" + rowData._id}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Tooltip>
                    </div>
                    <div className="modal fade" id={"EditEvaluationModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="EditEvaluationModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="EditEvaluationModalLabel">Edit Evaluation Form</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <label htmlFor="edit_school_year_field" className="col-sm-6 col-form-label">School Year</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    id="edit_school_year_field"
                                                    className="form-control"
                                                    name='edit_school_year'
                                                    value={edit_school_year}
                                                    placeholder={rowData.school_year}
                                                    onChange={(e) => setEdit_school_year(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => editEvaluationHandler(rowData._id)} data-dismiss="modal">Update</button>
                                    <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" data-backdrop="false" id={"DeleteEvaluationModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeleteActiveModalLabel">Delete Evaluation</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this Evaluation?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => deleteEvaluationHandler(rowData._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    ]

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            <div className="management-content">
                <h1>Evaluation <span></span>
                    <button className="btn btn-primary" data-toggle="modal" data-target={"#AddEvaluationModal"}>
                        <i className="fa-solid fa-circle-plus"></i>
                    </button>
                    <div className="modal fade" id={"AddEvaluationModal"} tabindex="-1" role="dialog" aria-labelledby="AddEvaluationModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="AddEvaluationModalLabel">Add Evalation</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div>
                                    <form className="EvaluationForm">
                                        <div className="modal-body">
                                            <label htmlFor="accession_field" className="col-sm-2 col-form-label">School Year</label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    id="accession_field"
                                                    className="form-control"
                                                    name='accession'
                                                    value={school_year}
                                                    placeholder='S.Y XX-XX'
                                                    onChange={(e) => setSchool_year(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={submitHandler} data-dismiss="modal">Add</button>
                                            <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Link to="/student/evaluation" className="evaluation_btn"> */}
                        <button type="button" className="evaluation_btn btn btn-danger" onClick={() => checkEvaluationHandler()}>
                            Student Evaluation 
                        </button>
                    {/* </Link> */}
                    <div className='management-body'>
                        {loading || loading === undefined ? <Loader /> : (
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <MaterialTable
                                    title='Evaluations List'
                                    data={evaluations.evaluation}
                                    columns={col}
                                    localization={
                                        {
                                            toolbar: {
                                                searchPlaceholder: 'School Year, Status...'
                                            }
                                        }
                                    }
                                    options={{
                                        pageSize: 10,
                                        headerStyle: {
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            backgroundColor: '#BA0202',
                                            color: '#ffffff',
                                        },
                                        rowStyle: {
                                            fontSize: 15,
                                            backgroundColor: '#F9F5F5',
                                        },
                                        emptyRowsWhenPaging: false
                                    }}
                                />
                            </ThemeProvider>
                        )}
                    </div>

                </h1>
            </div>
        </Fragment>
    )
}
export default EvaluationManagement