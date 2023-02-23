import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button';

const UserDashboard = () => {
    return (
        <Fragment>
            <div>
            <h1>One Step Closer</h1>
            <hr/>
            <div className="management-body">
                <h2>
                Before proceeding on using the application.
                </h2>
                <h2>
                We encourage you to edit your profile first and fill up your
                Course and Section in order to avoid uneccesarry errors.
                </h2>
                <h2>Thank you for your pantience TUPTians!</h2>
            </div>
            <Button variant="primary" href="/profile">
                EDIT PROFILE NOW
            </Button>
            </div>

        </Fragment>
    )
}
export default UserDashboard