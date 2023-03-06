import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { Modal, Button, Form } from "react-bootstrap";

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allPersonnels, deletePersonnel, getAllActiveStudents, getAllInactiveStudents, approveStudent, deleteStudent, clearErrors } from '../../actions/personnelActions'

import { DELETE_PERSONNEL_RESET, DELETE_STUDENT_RESET, APPROVE_STUDENT_RESET } from '../../constants/personnelConstants'
const PersonnelManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, personnels } = useSelector(state => state.allPersonnels);
    const { active_students } = useSelector(state => state.allActiveStudents);
    const { inactive_students } = useSelector(state => state.allInactiveStudents);
    const { PersonnelDeleted } = useSelector(state => state.personnel);
    const { StudentDeleted, isApproved } = useSelector(state => state.student);

    useEffect(() => {
        dispatch(allPersonnels());
        dispatch(getAllActiveStudents());
        dispatch(getAllInactiveStudents());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (PersonnelDeleted) {
            alert.success('Personnel deleted successfully');
            navigate('/admin/personnels');
            dispatch({ type: DELETE_PERSONNEL_RESET })
        }

        if (StudentDeleted) {
            alert.success('Student deleted successfully');
            navigate('/admin/personnels');
            dispatch({ type: DELETE_STUDENT_RESET })
        }

        if (isApproved) {
            alert.success('User approved successfully');
            navigate('/admin/personnels');
            dispatch({ type: APPROVE_STUDENT_RESET })
        }

    }, [dispatch, alert, error, PersonnelDeleted, StudentDeleted, isApproved, navigate])

    const deletePersonnelHandler = (id) => {
        dispatch(deletePersonnel(id))
    }

    const deleteStudentHandler = (id) => {
        dispatch(deleteStudent(id))
    }

    const approveStudentHandler = (id) => {
        dispatch(approveStudent(id))
    }

    const setPersonnels = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id_number',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Contact No.',
                    field: 'contact',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        personnels.forEach(personnels => {
            data.rows.push({
                id_number: personnels.id_number,
                name: personnels.name,
                contact: personnels.contact,
                // yearPub: personnels.yearPub,
                actions: <Fragment>
                    <Link to={`/admin/personnel/${personnels._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#DeletePersonnelModal">
                        <i className="fa fa-trash"></i>
                    </button>
                    {/*<button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deletePersonnelHandler(personnels._id)}>
                        <i className="fa fa-trash"></i>
                    </button>*/}

                    <div className="modal fade" data-backdrop="false" id="DeletePersonnelModal" tabindex="-1" role="dialog" aria-labelledby="DeletePersonnelModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeletePersonnelModalLabel">Delete User</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this user?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => deletePersonnelHandler(personnels._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Fragment>
            })
        })

        return data;
    }

    const setActiveStudents = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id_number',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Contact No.',
                    field: 'contact',
                    sort: 'asc'
                },
                // {
                //     label: 'Date Published',
                //     field: 'yearPub',
                //     sort: 'asc'
                // },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        active_students.forEach(active_student => {
            data.rows.push({
                id_number: active_student.id_number,
                name: active_student.name,
                contact: active_student.contact,
                // yearPub: active_students.yearPub,
                actions: <Fragment>
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#DeleteActiveModal">
                        <i className="fa fa-trash"></i>
                    </button>

                    <div className="modal fade" id="DeleteActiveModal" tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
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
                                    <button type="button" className="btn btn-danger" onClick={() => deleteStudentHandler(active_student._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Fragment>
            })
        })

        return data;

        // console.log(data);
    }

    const setInactiveStudents = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id_number',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Contact No.',
                    field: 'contact',
                    sort: 'asc'
                },
                {
                    label: 'Uploads',
                    field: 'credentials',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }


        inactive_students.forEach(inactive_student => {
            data.rows.push({
                id_number: inactive_student.id_number,
                name: inactive_student.name,
                contact: inactive_student.contact,
                credentials:
                    <Fragment>
                        <a data-toggle="modal" data-target={"#FilesModal" + inactive_student._id}>View Files</a>
                        <div className="modal fade" id={"FilesModal" + inactive_student._id} tabindex="-1" role="dialog" aria-labelledby="FilesModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="FilesModalLabel">Files Uploaded</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {inactive_student.credentials.map((item, index) => (
                                            <Fragment>
                                                <img src={item.url}></img>
                                                {/* else */}
                                            </Fragment>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>,

                actions: <Fragment>
                    <button className="btn btn-success py-1 px-2 ml-2" data-toggle="modal" data-target="#ApproveModal">
                        <i className="fa fa-check"></i>
                    </button>
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#DeleteInactiveModal">
                        <i className="fa fa-trash"></i>
                    </button>
                    <div>
                        <div className="modal fade" id="ApproveModal" tabindex="-1" role="dialog" aria-labelledby="ApproveModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="ApproveModalLabel">User Approval</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to approve this user?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success" onClick={() => approveStudentHandler(inactive_student._id)} data-dismiss="modal">Approve</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="modal fade" id="DeleteInactiveModal" tabindex="-1" role="dialog" aria-labelledby="ApproveModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="ApproveModalLabel">Delete User</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to delete this user?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={() => deleteStudentHandler(inactive_student._id)} data-dismiss="modal">Delete</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            })
        })

        return data;

        // console.log(data);
    }

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            <div className="management-content">
                <div className="row">
                    <div className="col-10 table-section">
                        <div className="">
                            <h1 className="text-center">Approval of Users
                            </h1>
                            {loading || loading === undefined ? <Loader /> : (
                                <MDBDataTable
                                    data={setInactiveStudents()}
                                    className="px-3"
                                    bordered
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="tab-container">
                    <ul className="tabs">
                        <Link className="tab-link" to={"/admin/personnels"}>
                            Personnel
                        </Link> 
                        <Link className="tab-link" to={"/active/student"}>
                            Registered Users
                        </Link> 
                        <Link className="tab-link" to={"/inactive/student"}>
                            Approval of Users
                        </Link> 
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
export default PersonnelManagement