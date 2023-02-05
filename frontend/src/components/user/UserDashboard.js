import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Loader from '../layout/Loader'
import { loadUser } from '../../actions/userActions'
const UserDashboard = () => {
    const [show, setShow] = useState(true);
    const { user, loading } = useSelector(state => state.auth)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="management-content">
                        {(user.course === undefined | null) ?
                            (<Modal show={show} centered>
                                <Modal.Header>
                                    <Modal.Title>One Step Closer</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Before proceeding on using the application.
                                    We encourage you to edit your profile first and fill up your
                                    Course and Section in order to avoid uneccesarry errors.
                                    Thank you for your pantience TUPTians!
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleClose} href="/profile">
                                            EDIT PROFILE NOW
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            ) : (<div></div>)
                        }
                        <h1>Dashboard</h1>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default UserDashboard