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

    // const myArray = [1]
    // const myArrayLength = myArray.length
    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();

    const { loading, error, history } = useSelector(state => state.historyLogs);
    const { historyLogDeleted } = useSelector(state => state.deletehistoryLogs);
    const { historylogAllDeleted } = useSelector(state => state.allDeleteHistoryLog);

    useEffect(() => {
        dispatch(allHistoryLog());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (historyLogDeleted) {
            alert.success('History Log deleted successfully');
            navigate('/historyLog');
            dispatch({ type: DELETE_HISTORYLOG_RESET })
        }

        if (historylogAllDeleted) {
            alert.success('All history Log deleted successfully');
            navigate('/historyLog');
            dispatch({ type: DELETE_ALL_HISTORYLOG_RESET })
        }

    }, [dispatch, alert, error, navigate, historyLogDeleted, historylogAllDeleted,])

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
                <div className="management-content">
                    <button className="btn btn-danger" style={{ "borderStyle":"solid", "float":"right", "marginTop":"25px"}} onClick={() => deleteAllHistoryLogHandler()}>Clear All</button>
                    <h1 className='history-log-header'>History Log</h1>
                    {history.map((h) => (
                        <div style={{ "border-style": "solid", "margin-bottom": "5px", "padding": "10px" }}>
                            <button className="btn btn-outline-danger" onClick={() => deleteHistoryLogHandler(h._id)} style={{ "float": "right" }}>&#10006;</button>
                            <h5>{h.historylogText}</h5>
                            <h6>{h.historylogType}</h6>
                            <p>{h.historylogDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                        </div>
                    ))}
                </div>

            )}
        </Fragment>
    )
}
export default HistoryLog