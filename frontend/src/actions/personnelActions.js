import axios from 'axios';
import {
    ALL_PERSONNELS_REQUEST,
    ALL_PERSONNELS_SUCCESS,
    ALL_PERSONNELS_FAIL,

    NEW_PERSONNEL_REQUEST,
    NEW_PERSONNEL_SUCCESS,
    NEW_PERSONNEL_FAIL,

    PERSONNEL_DETAILS_REQUEST,
    PERSONNEL_DETAILS_SUCCESS,
    PERSONNEL_DETAILS_FAIL,

    UPDATE_PERSONNEL_REQUEST,
    UPDATE_PERSONNEL_SUCCESS,
    UPDATE_PERSONNEL_FAIL,

    DELETE_PERSONNEL_REQUEST,
    DELETE_PERSONNEL_SUCCESS,
    DELETE_PERSONNEL_FAIL,

    ALL_ACTIVESTUDENT_REQUEST,
    ALL_ACTIVESTUDENT_SUCCESS,
    ALL_ACTIVESTUDENT_FAIL,

    ALL_INACTIVESTUDENT_REQUEST,
    ALL_INACTIVESTUDENT_SUCCESS,
    ALL_INACTIVESTUDENT_FAIL,

    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,

    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,

    APPROVE_STUDENT_REQUEST,
    APPROVE_STUDENT_SUCCESS,
    APPROVE_STUDENT_FAIL,

    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAIL,

    ALL_BORROW_REQUEST,
    ALL_BORROW_SUCCESS,
    ALL_BORROW_FAIL,

    ALL_BORROWED_REQUEST,
    ALL_BORROWED_SUCCESS,
    ALL_BORROWED_FAIL,

    ACCEPT_BORROW_REQUEST,
    ACCEPT_BORROW_SUCCESS,
    ACCEPT_BORROW_FAIL,

    DECLINE_BORROW_REQUEST,
    DECLINE_BORROW_SUCCESS,
    DECLINE_BORROW_FAIL,

    RETURN_BOOK_REQUEST,
    RETURN_BOOK_SUCCESS,
    RETURN_BOOK_FAIL,

    DECLINE_BOOK_REQUEST,
    DECLINE_BOOK_SUCCESS,
    DECLINE_BOOK_FAIL,

    RETURNED_BOOKS_REQUEST,
    RETURNED_BOOKS_SUCCESS,
    RETURNED_BOOKS_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    ALL_HISTORYLOG_REQUEST,
    ALL_HISTORYLOG_SUCCESS,
    ALL_HISTORYLOG_FAIL,

    DELETE_HISTORYLOG_REQUEST,
    DELETE_HISTORYLOG_SUCCESS,
    DELETE_HISTORYLOG_FAIL,

    DELETE_ALL_HISTORYLOG_REQUEST,
    DELETE_ALL_HISTORYLOG_SUCCESS,
    DELETE_ALL_HISTORYLOG_FAIL,

    UPDATE_DUE_DATE_REQUEST,
    UPDATE_DUE_DATE_SUCCESS,
    UPDATE_DUE_DATE_FAIL,

    PENATY_CHECK_REQUEST,
    PENATY_CHECK_SUCCESS,
    PENATY_CHECK_FAIL,

    CLEAR_ERRORS
} from '../constants/personnelConstants'

export const allPersonnels = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_PERSONNELS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/personnels')

        dispatch({
            type: ALL_PERSONNELS_SUCCESS,
            payload: data.personnel
        })

    } catch (error) {
        dispatch({
            type: ALL_PERSONNELS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newPersonnel = (personnelData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PERSONNEL_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
                // "Content-Type": "application/json"
            }
        }
        // for(var pair of personnelData.entries()) {
        //    console.log(pair[0]+ ', '+ pair[1]); 
        // }

        const { data } = await axios.post('/api/v1/personnel/new', personnelData, config)

        dispatch({
            type: NEW_PERSONNEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getPersonnelDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PERSONNEL_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/personnel/${id}`)
        dispatch({
            type: PERSONNEL_DETAILS_SUCCESS,
            payload: data.personnel
        })
    } catch (error) {
        dispatch({
            type: PERSONNEL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePersonnel = (id, personnelData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PERSONNEL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/personnel/${id}`, personnelData, config)

        dispatch({
            type: UPDATE_PERSONNEL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deletePersonnel = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PERSONNEL_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/personnel/${id}`)

        dispatch({
            type: DELETE_PERSONNEL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getAllActiveStudents = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ACTIVESTUDENT_REQUEST })

        const { data } = await axios.get('/api/v1/active/student')

        dispatch({
            type: ALL_ACTIVESTUDENT_SUCCESS,
            payload: data.active_students
        })

    } catch (error) {
        dispatch({
            type: ALL_ACTIVESTUDENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAllInactiveStudents = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_INACTIVESTUDENT_REQUEST })

        const { data } = await axios.get('/api/v1/inactive/student')

        dispatch({
            type: ALL_INACTIVESTUDENT_SUCCESS,
            payload: data.inactive_students
        })

    } catch (error) {
        dispatch({
            type: ALL_INACTIVESTUDENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getStudentDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: STUDENT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/single/student/${id}`)
        dispatch({
            type: STUDENT_DETAILS_SUCCESS,
            payload: data.student
        })
    } catch (error) {
        dispatch({
            type: STUDENT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateStudent = (id, studentData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_STUDENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/student/${id}`, studentData, config)

        dispatch({
            type: UPDATE_STUDENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_STUDENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const approveStudent = (id, studentData) => async (dispatch) => {
    try {

        dispatch({ type: APPROVE_STUDENT_REQUEST })

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        const { data } = await axios.put(`/api/v1/approve/student/${id}`, studentData)

        dispatch({
            type: APPROVE_STUDENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: APPROVE_STUDENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteStudent = (id) => async (dispatch) => {
    try {
        // console.log(id)

        dispatch({ type: DELETE_STUDENT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/student/${id}`)

        dispatch({
            type: DELETE_STUDENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_STUDENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allBorrow = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_BORROW_REQUEST })

        const { data } = await axios.get('/api/v1/borrowers')

        dispatch({
            type: ALL_BORROW_SUCCESS,
            payload: data.borrower
        })

    } catch (error) {
        dispatch({
            type: ALL_BORROW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allBorrowed = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BORROWED_REQUEST })

        const { data } = await axios.get('/api/v1/borrowed')

        dispatch({
            type: ALL_BORROWED_SUCCESS,
            payload: data.borrowedbooks
        })
    } catch (error) {
        dispatch({
            type: ALL_BORROWED_FAIL,
            payload: error.response.data.message
        })
    }
}

export const acceptBorrow = (id) => async (dispatch) => {
    try {

        dispatch({ type: ACCEPT_BORROW_REQUEST })
        const { data } = await axios.put(`/api/v1/borrowers/appointment/${id}`)

        dispatch({
            type: ACCEPT_BORROW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: ACCEPT_BORROW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const declineBorrow = (id) => async (dispatch) => {
    try {

        dispatch({ type: DECLINE_BORROW_REQUEST })

        const { data } = await axios.delete(`/api/v1/borrowers/appointment/${id}`)

        dispatch({
            type: DECLINE_BORROW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DECLINE_BORROW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const returnBook = (id) => async (dispatch) => {
    try {

        dispatch({ type: RETURN_BOOK_REQUEST })
        const { data } = await axios.put(`/api/v1/borrowers/return/${id}`)

        dispatch({
            type: RETURN_BOOK_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: RETURN_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const declineBook = (id) => async (dispatch) => {
    try {

        dispatch({ type: DECLINE_BOOK_REQUEST })
        const { data } = await axios.put(`/api/v1/borrowers/decline/${id}`)

        dispatch({
            type: DECLINE_BOOK_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DECLINE_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allReturned = () => async (dispatch) => {
    try {
        dispatch({ type: RETURNED_BOOKS_REQUEST })

        const { data } = await axios.get('/api/v1/returned/books')

        dispatch({
            type: RETURNED_BOOKS_SUCCESS,
            payload: data.returnedbooks
        })
    } catch (error) {
        dispatch({
            type: RETURNED_BOOKS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserDetail = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/detail/student/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.userdetail
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allHistoryLog = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_HISTORYLOG_REQUEST })

        const { data } = await axios.get('/api/v1/admin/historylog')

        dispatch({
            type: ALL_HISTORYLOG_SUCCESS,
            payload: data.history
        })

    } catch (error) {
        dispatch({
            type: ALL_HISTORYLOG_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteHistoryLog = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_HISTORYLOG_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/historylog/${id}`)

        dispatch({
            type: DELETE_HISTORYLOG_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_HISTORYLOG_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAllHistoryLog = () => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ALL_HISTORYLOG_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/delete/historylog`)

        dispatch({
            type: DELETE_ALL_HISTORYLOG_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ALL_HISTORYLOG_FAIL,
            payload: error.response.data.message
        })
    }

}

export const updateDueDate = (borrowData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_DUE_DATE_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
                // "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(`/api/v1/change/duedate`, borrowData, config)

        dispatch({
            type: UPDATE_DUE_DATE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_DUE_DATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getPenaltyCheck = () => async (dispatch) => {
    try {
        dispatch({ type: PENATY_CHECK_REQUEST })
        const { data } = await axios.get(`/api/v1/penalty/check/`)
        dispatch({
            type: PENATY_CHECK_SUCCESS,
            payload: data.penalties
        })
    } catch (error) {
        dispatch({
            type: PENATY_CHECK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}