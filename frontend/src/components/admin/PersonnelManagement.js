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

import { DELETE_PERSONNEL_RESET, DELETE_STUDENT_RESET , UPDATE_PERSONNEL_RESET} from '../../constants/personnelConstants'

// import { loadUser} from '../../actions/userActions'
const PersonnelManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { loading, error, personnels } = useSelector(state => state.allPersonnels);
    const { active_students } = useSelector(state => state.allActiveStudents);
    const { PersonnelDeleted } = useSelector(state => state.personnel);
    const { StudentDeleted, isUpdated } = useSelector(state => state.student);
    // const { user } = useSelector(state => state.auth)

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

    }, [dispatch, alert, error, PersonnelDeleted, isUpdated, StudentDeleted, navigate])

    const deletePersonnelHandler = (id) => {
        dispatch(deletePersonnel(id))
    }

    const deleteStudentHandler = (id) => {
        dispatch(deleteStudent(id))
    }

    // const approveStudentHandler = (id) => {
    //     dispatch(approveStudent(id))
    // }

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
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeletePersonnelModal"+personnels._id}>
                        <i className="fa fa-trash"></i>
                    </button>
                    {/*<button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deletePersonnelHandler(personnels._id)}>
                        <i className="fa fa-trash"></i>
                    </button>*/}

                    <div class="modal fade" id={"DeletePersonnelModal"+personnels._id} tabindex="-1" role="dialog" aria-labelledby="DeletePersonnelModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="modal-title" id="DeletePersonnelModalLabel">Delete User</h3>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this user?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" onClick={() => deletePersonnelHandler(personnels._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
                name: <Link to={`/detail/student/${active_student._id}`}>{active_student.name} </Link>,
                contact: active_student.contact,
                // yearPub: active_students.yearPub,
                actions: <Fragment>
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeleteActiveModal"+active_student._id}>
                        <i className="fa fa-trash"></i>
                    </button>

                    <div class="modal fade" id={"DeleteActiveModal"+active_student._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="modal-title" id="DeleteActiveModalLabel">Delete User</h3>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this user?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" onClick={() => deleteStudentHandler(active_student._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
            {loading ? <Loader /> : (
                <Fragment>

                    <MetaData title={'TUP-T Online Library - Admin'} />
                    {/*<div className="row">*/}
                    <SideNavbarAdmin />

                    <div className="management-content">
                        {/*<div className="management-header">
                        <h1>Personnels <span></span>
                            <Link to={"/personnel/new"}>
                                <i className="fa-solid fa-circle-plus"></i>
                            </Link> 
                        </h1>
                    </div>*/}
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
                </Fragment>
            )}
        </Fragment>
    )
}
export default PersonnelManagement