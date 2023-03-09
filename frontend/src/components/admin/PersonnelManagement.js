import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import {
    allPersonnels,
    deletePersonnel,
    getAllActiveStudents,
    getAllInactiveStudents,
    // approveStudent,
    deleteStudent,
    clearErrors
} from '../../actions/personnelActions'
import { DELETE_PERSONNEL_RESET, DELETE_STUDENT_RESET, UPDATE_PERSONNEL_RESET } from '../../constants/personnelConstants'

import { allUsers, activateUsers, deactivatedUsers, endterm } from '../../actions/userActions'
import { ACTIVATE_USER_RESET, DEACTIVATED_USER_RESET, END_TERM_USER_RESET } from '../../constants/userConstants'

const PersonnelManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, personnels } = useSelector(state => state.allPersonnels);
    const { active_students } = useSelector(state => state.allActiveStudents);
    const { PersonnelDeleted } = useSelector(state => state.personnel);
    const { StudentDeleted, isUpdated } = useSelector(state => state.student);
    const { isActivated } = useSelector(state => state.activateUser);
    const { isDeactivated } = useSelector(state => state.deactivateUser);
    const { isEndterm } = useSelector(state => state.endtermuser)

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allPersonnels());
        dispatch(getAllActiveStudents());
        dispatch(getAllInactiveStudents());


        // dispatch(loadUser())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (PersonnelDeleted) {
            alert.success('Personnel deleted successfully');
            navigate('/admin/personnels');
            dispatch({ type: DELETE_PERSONNEL_RESET })
        }

        if (isUpdated) {
            alert.success('Personnel updated successfully');
            navigate('/admin/personnels');
            dispatch({ type: UPDATE_PERSONNEL_RESET })
        }

        if (StudentDeleted) {
            alert.success('Student deleted successfully');
            navigate('/admin/personnels');
            dispatch({ type: DELETE_STUDENT_RESET })
        }

        if (isActivated) {
            alert.success('Student account has been activated');
            navigate('/admin/personnels');
            dispatch({ type: ACTIVATE_USER_RESET })
        }

        if (isDeactivated) {
            alert.error('Student account has been deactivated');
            navigate('/admin/personnels');
            dispatch({ type: DEACTIVATED_USER_RESET })
        }

        if (isEndterm) {
            alert.error('All student account has been deactivated');
            navigate('/admin/personnels');
            dispatch({ type: END_TERM_USER_RESET })
        }

    }, [dispatch, alert, error, PersonnelDeleted, isUpdated, StudentDeleted, isActivated, isDeactivated, isEndterm, navigate])

    const deletePersonnelHandler = (id) => {
        dispatch(deletePersonnel(id))
    }

    const deleteStudentHandler = (id) => {
        dispatch(deleteStudent(id))
    }

    const acvateUserHandler = (id) => {
        dispatch(activateUsers(id))
    }

    const deacvateUserHandler = (id) => {
        dispatch(deactivatedUsers(id))
    }

    const endtermhandler = () => {
        dispatch(endterm())
    }

    const colPersonnels = [
        {
            title: 'ID',
            field: 'id_number',
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Name',
            field: 'name',
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Contact',
            field: 'contact',
            searchable: false,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Actions',
            field: '_id',
            width: 180,
            cellStyle: {
                textAlign: "left",
            },
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Tooltip title="Edit">
                            <Link to={`/admin/personnel/${rowData._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeletePersonnelModal" + rowData._id}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Tooltip>
                    </div>

                    <div className="modal fade" data-backdrop="false" id={"DeletePersonnelModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="DeletePersonnelModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeletePersonnelModalLabel">Delete User</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this personnel?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => deletePersonnelHandler(rowData._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ),
            searchable: false
        },

    ]

    const colStudents = [
        {
            title: 'ID',
            field: 'id_number',
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Name',
            field: 'name',
            render: rowData => (
                <Fragment>
                    <div><p><Link to={`/detail/student/${rowData._id}`}>{rowData.name} </Link></p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Contact',
            field: 'contact',
            searchable: false,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Actions',
            field: '_id',
            cellStyle: {
                textAlign: "left",
            },
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Tooltip title="Delete">
                            <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeleteActiveModal" + rowData._id}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Tooltip>
                        {rowData.status == 'active' ?
                            <Tooltip title="Deactivate">
                                <button className="btn btn-success py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeactivateModal" + rowData._id}>
                                    <i className="fa fa-unlock"></i>
                                </button>
                            </Tooltip>

                            :
                            <Tooltip title="Activate">
                                <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#ActivateModal" + rowData._id}>
                                    <i className="fa fa-lock"></i>
                                </button>
                            </Tooltip>
                        }
                    </div>

                    <div className="modal fade" data-backdrop="false" id={"DeleteActiveModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeleteActiveModalLabel">Delete User</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this user?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => deleteStudentHandler(rowData._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" data-backdrop="false" id={"DeactivateModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="DeactivateModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeactivateModalLabel">Deactivate User</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to deactivate this User?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => deacvateUserHandler(rowData._id)} data-dismiss="modal">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" data-backdrop="false" id={"ActivateModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="ActivateModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="ActivateModalLabel">Activate User</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to activate this User?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => acvateUserHandler(rowData._id)} data-dismiss="modal">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ),
            searchable: false
        },

    ]

    // console.log(personnels)
    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            {loading ? <Loader /> : (
                <div className='col-12'>
                    <div className="dashboard-container">
                        <div className="table-container">
                            <div className="col-12">
                                <div className='personnel-button'>
                                    <Link to={"/personnel/new"}>
                                        <i className="fa-solid fa-circle-plus"></i>
                                        Personnel   
                                    </Link>
                                </div>
                                {loading ? <Loader /> : (
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                        <MaterialTable
                                            title='Personnels List'
                                            data={personnels}
                                            columns={colPersonnels}
                                            localization={
                                                {
                                                    toolbar: {
                                                        searchPlaceholder: 'ID, Name...'
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
                                                emptyRowsWhenPaging: false,

                                            }}
                                        />
                                    </ThemeProvider>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default PersonnelManagement