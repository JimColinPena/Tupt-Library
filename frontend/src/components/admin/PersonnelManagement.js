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

import { allUsers, activateUsers, deactivatedUsers, endterm } from '../../actions/userActions'

import { DELETE_PERSONNEL_RESET, DELETE_STUDENT_RESET, UPDATE_PERSONNEL_RESET } from '../../constants/personnelConstants'

import { ACTIVATE_USER_RESET, DEACTIVATED_USER_RESET, END_TERM_USER_RESET } from '../../constants/userConstants'

// import { loadUser} from '../../actions/userActions'
const PersonnelManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { loading, error, personnels } = useSelector(state => state.allPersonnels);
    const { active_students } = useSelector(state => state.allActiveStudents);
    const { PersonnelDeleted } = useSelector(state => state.personnel);
    const { StudentDeleted, isUpdated } = useSelector(state => state.student);
    const { users } = useSelector(state => state.allUsers)
    const { isActivated } = useSelector(state => state.activateUser);
    const { isDeactivated } = useSelector(state => state.deactivateUser);
    const { isEndterm } = useSelector(state => state.endtermuser)
    // const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(allPersonnels());
        dispatch(getAllActiveStudents());
        dispatch(getAllInactiveStudents());
        dispatch(allUsers());

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

        if (isEndterm) {
            alert.error('All student account has been deactivated');
            navigate('/admin/personnels');
            dispatch({ type: END_TERM_USER_RESET })
        }

    }, [dispatch, alert, error, PersonnelDeleted, isUpdated, StudentDeleted,  isActivated, isDeactivated, isEndterm, navigate])

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
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeletePersonnelModal" + personnels._id}>
                        <i className="fa fa-trash"></i>
                    </button>
                    {/*<button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deletePersonnelHandler(personnels._id)}>
                        <i className="fa fa-trash"></i>
                    </button>*/}

                    <div className="modal fade" data-backdrop="false" id={"DeletePersonnelModal" + personnels._id} tabindex="-1" role="dialog" aria-labelledby="DeletePersonnelModalLabel" aria-hidden="true">
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
                name: <Link to={`/detail/student/${active_student._id}`}>{active_student.name} </Link>,
                contact: active_student.contact,
                // yearPub: active_students.yearPub,
                actions: <Fragment>
                    <button className="btn btn-danger py-1 px-2 px-2" data-toggle="modal" data-target={"#DeleteActiveModal" + active_student._id}>
                        <i className="fa fa-trash"></i>
                    </button>

                    {active_student.status == 'active' ?
                        <button className="btn btn-success py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeactivateModal"+active_student._id}>
                            <i className="fa fa-unlock"></i>
                        </button>

                    : <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#ActivateModal"+active_student._id}>
                            <i className="fa fa-lock"></i>
                        </button>

                    }

                    <div className="modal fade" data-backdrop="false" id={"DeleteActiveModal" + active_student._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
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
                    
                    <div className="modal fade" data-backdrop="false" id={"DeactivateModal"+active_student._id} tabindex="-1" role="dialog" aria-labelledby="DeactivateModal" aria-hidden="true">
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
                                    <button type="button" className="btn btn-danger" onClick={() => deacvateUserHandler(active_student._id)} data-dismiss="modal">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" data-backdrop="false" id={"ActivateModal"+active_student._id} tabindex="-1" role="dialog" aria-labelledby="ActivateModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeactivateModalLabel">Activate User</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to activate this User?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => acvateUserHandler(active_student._id)} data-dismiss="modal">Confirm</button>
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
            <MetaData title={'User Management'} />
            <SideNavbarAdmin />
            {loading ? <Loader /> : (
                <div className="management-content">

                    <div className='endterm'>
                        <button className='btn btn-danger' data-toggle="modal" data-target={"#EndTermModal"}><i class="fa-solid fa-triangle-exclamation"></i> End Term <i class="fa-solid fa-triangle-exclamation"></i></button>
                    </div>

                    <div className="modal fade" data-backdrop="false" id={"EndTermModal"} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeleteActiveModalLabel">End Term</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    By clicking this button you are ending the term and DEACTIVATING the students Account!
                                    Are you sure you want continue?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => endtermhandler()} data-dismiss="modal">Confirm</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="">
                                <h1 className="text-center">
                                    <Link to={"/personnel/new"}>
                                        <i className="fa-solid fa-circle-plus"></i>
                                    </Link>
                                    Personnel
                                </h1>
                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setPersonnels()}
                                        className="px-3"
                                        bordered
                                        striped
                                        hover
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <h1 className="text-center">Registered Users</h1>
                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setActiveStudents()}
                                        className="px-3"
                                        bordered
                                        striped
                                        hover
                                    />
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