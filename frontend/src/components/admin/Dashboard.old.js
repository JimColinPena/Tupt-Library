import React, { Fragment} from 'react'
import MetaData from '../layout/MetaData'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

const Dashboard = () => {

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin/>
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Overview</h1>
                </div>
                <div className="dashboard-body">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="dashboard-card1">
                                <div className="row no-gutters" >
                                    <div className="col-md-9">
                                        <div className="card-count">
                                            <p>25</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card-detail">
                                             <p><a href="/">view details</a></p>
                                        </div>
                                    </div>
                                </div>

                                <hr/>
                                <div className="card-title">
                                    <p>Borrowed Books</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="dashboard-card2">
                                <div className="row no-gutters" >
                                    <div className="col-md-9">
                                        <div className="card-count">
                                            <p>22</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card-detail">
                                             <p><a href="/">view details</a></p>
                                        </div>
                                    </div>
                                </div>

                                <hr/>
                                <div className="card-title">
                                    <p>Pending Book Approval</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="dashboard-card3">
                                <div className="row no-gutters" >
                                    <div className="col-md-9">
                                        <div className="card-count">
                                            <p>22</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card-detail">
                                             <p><a href="/">view details</a></p>
                                        </div>
                                    </div>
                                </div>

                                <hr/>
                                <div className="card-title">
                                    <p>Pending Book Approval</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <h1>Analytics</h1>
                </div> 
            </div>
        </Fragment>
    )
}
export default Dashboard