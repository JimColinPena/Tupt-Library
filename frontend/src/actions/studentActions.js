import axios from 'axios';
import { 
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FAIL,

    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,

    ALL_STUDENTBOOKS_REQUEST,
    ALL_STUDENTBOOKS_SUCCESS,
    ALL_STUDENTBOOKS_FAIL,

    STUDENTBOOK_DETAILS_REQUEST,
    STUDENTBOOK_DETAILS_SUCCESS,
    STUDENTBOOK_DETAILS_FAIL,

    BORROWBOOK_REQUEST,
    BORROWBOOK_SUCCESS,
    BORROWBOOK_FAIL,

    APPOINTENTBOOK_REQUEST,
    APPOINTENTBOOK_SUCCESS,
    APPOINTENTBOOK_FAIL,

    CLEAR_ERRORS 
} from '../constants/studentConstants'

export const getStudentDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_STUDENT_REQUEST })
        const { data } = await axios.get(`/api/v1/getstudent/${id}`)
        dispatch({
            type: GET_STUDENT_SUCCESS,
            payload: data.student
        })
    } catch (error) {
        dispatch({
            type: GET_STUDENT_FAIL,
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

        const { data } = await axios.put(`/api/v1/update/student/${id}`, studentData, config)

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

export const allStudentBooks = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_STUDENTBOOKS_REQUEST })

        const { data } = await axios.get('/api/v1/student/books')

        dispatch({
            type: ALL_STUDENTBOOKS_SUCCESS,
            payload: data.studentbook
        })

    } catch (error) {
        dispatch({
            type: ALL_STUDENTBOOKS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getStudentBookDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: STUDENTBOOK_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/student/book/${id}`)
        dispatch({
            type: STUDENTBOOK_DETAILS_SUCCESS,
            payload: data.studentbook
        })
    } catch (error) {
        dispatch({
            type: STUDENTBOOK_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allStudentBorrowBook = () => async (dispatch) => {
    try {

        dispatch({ type: BORROWBOOK_REQUEST })

        const { data } = await axios.get('/api/v1/studentbook/borrow')

        dispatch({
            type: BORROWBOOK_SUCCESS,
            payload: data.studentborrowbook
        })

    } catch (error) {
        dispatch({
            type: BORROWBOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allStudentAppointmentBook = () => async (dispatch) => {
    try {

        dispatch({ type: APPOINTENTBOOK_REQUEST })

        const { data } = await axios.get('/api/v1/studentbook/appointment')

        dispatch({
            type: APPOINTENTBOOK_SUCCESS,
            payload: data.studentappointmentbook
        })

    } catch (error) {
        dispatch({
            type: APPOINTENTBOOK_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}