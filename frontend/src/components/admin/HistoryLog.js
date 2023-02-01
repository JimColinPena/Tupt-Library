import React, { Fragment, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { allHistoryLog, deleteHistoryLog, clearErrors } from '../../actions/personnelActions'
import { DELETE_HISTORYLOG_RESET } from '../../constants/personnelConstants'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
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

    }, [dispatch, alert, error, navigate, historyLogDeleted])

    const deleteHistoryLogHandler = (id) => {
        dispatch(deleteHistoryLog(id))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <SideNavbarAdmin />
                    <div className="management-content">
                        <h1>History Log</h1>
                    {history.map((h) => (
                        <div style={{"border-style": "solid", "margin-bottom": "5px", "padding": "10px"}}>
                            <button onClick={() => deleteHistoryLogHandler(h._id)} style={{"float": "right"}}>&#10006;</button>
                            <h5>{h.historylogText}</h5>
                            <h6>{h.historylogType}</h6>
                            <p>{h.historylogDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                        </div>
                    ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default HistoryLog