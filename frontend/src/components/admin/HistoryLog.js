import React, { Fragment, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { allHistoryLog, deleteHistoryLog, deleteAllHistoryLog, clearErrors } from '../../actions/personnelActions'
import { DELETE_HISTORYLOG_RESET, DELETE_ALL_HISTORYLOG_RESET } from '../../constants/personnelConstants'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
const HistoryLog = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();

    const { loading, error, history } = useSelector(state => state.historyLogs);
    const { isDeletedAll, isDeleted } = useSelector(state => state.historylog);

    useEffect(() => {
        dispatch(allHistoryLog());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            navigate('/historyLog');
            alert.success('History Log deleted successfully');
            dispatch({ type: DELETE_HISTORYLOG_RESET })
        }
        if (isDeletedAll) {
            navigate('/historyLog');
            alert.success('All history Log deleted successfully');
            dispatch({ type: DELETE_ALL_HISTORYLOG_RESET })
        }

    }, [dispatch, isDeleted, isDeletedAll, alert, error, navigate])

    const deleteHistoryLogHandler = (id) => {
        dispatch(deleteHistoryLog(id))
    }

    const deleteAllHistoryLogHandler = () => {
        dispatch(deleteAllHistoryLog())
    }

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            {loading ? <Loader /> : (
                <div className="dashboard-container">
                    <div className="wrapper-container">
                        <header className='d-flex align-items-center justify-content-between'>
                            History Logs
                            <button className="btn text-danger" data-toggle="modal" data-target={"#DeleteActiveModal"}>
                                <i class="fa-solid fa-trash mr-2"></i>
                                Clear All
                            </button>
                        </header>
                        <div className="modal fade" data-backdrop="false" id={"DeleteActiveModal"} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="DeleteActiveModalLabel">Clear all History Log</h3>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to clear the History Log?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={() => deleteAllHistoryLogHandler()} data-dismiss="modal">Confirm</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="history-logs-container">
                            {history.map((h) => (
                                <div id={h._id}>
                                    <div className="modal fade" data-backdrop="false" id={"DeleteSingeActiveModal"} tabindex="-1" role="dialog" aria-labelledby="DeleteSingeActiveModal" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h3 className="modal-title" id="DeleteSingeActiveModal">Delete history log</h3>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure you want to delete this History Log?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger" onClick={() => deleteHistoryLogHandler(h._id)} data-dismiss="modal">Confirm</button>
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="history-logs">
                                        <p>{h.historylogText}</p>
                                        {/* <h6>{h.historylogType}</h6> */}
                                        <p>{h.historylogDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                        <button className="btn" data-toggle="modal" data-target={"#DeleteSingeActiveModal"}>
                                            <i class="fa-solid fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default HistoryLog