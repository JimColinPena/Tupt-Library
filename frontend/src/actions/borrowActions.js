import axios from 'axios';
import {
    BORROW_BOOK_REQUEST,
    BORROW_BOOK_SUCCESS,
    BORROW_BOOK_FAIL,

    CHECKBORROW_BOOK_REQUEST,
    CHECKBORROW_BOOK_SUCCESS,
    CHECKBORROW_BOOK_FAIL,

    CANCELBORROW_BOOK_REQUEST,
    CANCELBORROW_BOOK_SUCCESS,
    CANCELBORROW_BOOK_FAIL,

    CONFIRM_BOOK_REQUEST,
    CONFIRM_BOOK_SUCCESS,
    CONFIRM_BOOK_FAIL,

    CANCEL_ALL_BORROW_BOOK_REQUEST,
    CANCEL_ALL_BORROW_BOOK_SUCCESS,
    CANCEL_ALL_BORROW_BOOK_FAIL,
    
    BORROWBOOK_LENGTH_REQUEST,
    BORROWBOOK_LENGTH_SUCCESS,
    BORROWBOOK_LENGTH_FAIL,

    BOOK_PENDING_REQUEST,
    BOOK_PENDING_SUCCESS,
    BOOK_PENDING_FAIL,

    USER_PENDING_REQUEST,
    USER_PENDING_SUCCESS,
    USER_PENDING_FAIL,  

    GET_BORROWEDBOOKSCHART_REQUEST,
    GET_BORROWEDBOOKSCHART_SUCCESS,
    GET_BORROWEDBOOKSCHART_FAIL,

    GET_SECTIONBORROWEDCHART_REQUEST,
    GET_SECTIONBORROWEDCHART_SUCCESS,
    GET_SECTIONBORROWEDCHART_FAIL,

    GET_BOOKLEADERBOARDS_REQUEST,
    GET_BOOKLEADERBOARDS_SUCCESS,
    GET_BOOKLEADERBOARDS_FAIL,

    GET_BORROWERLEADERBOARDS_REQUEST,
    GET_BORROWERLEADERBOARDS_SUCCESS,
    GET_BORROWERLEADERBOARDS_FAIL,

    CLEAR_ERRORS
} from '../constants/borrowConstants'


export const borrowBooks = (borrowbookData) => async (dispatch) => {
    try {

        dispatch({ type: BORROW_BOOK_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post('/api/v1/book/borrow', borrowbookData, config)

        dispatch({
            type: BORROW_BOOK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BORROW_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const checkBorrowBooks = (userId, bookId) => async (dispatch) => {

    try {

        dispatch({ type: CHECKBORROW_BOOK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/book/check', { userId, bookId }, config)

        dispatch({
            type: CHECKBORROW_BOOK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CHECKBORROW_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const cancelBorrowBooks = (userId, bookId) => async (dispatch) => {
    // console.log(userId)
    // console.log(bookId)
    try {

        dispatch({ type: CANCELBORROW_BOOK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/book/cancel', { userId, bookId }, config)

        dispatch({
            type: CANCELBORROW_BOOK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CANCELBORROW_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const confirmBorrowBooks = (confirmdata) => async (dispatch) => {
    // console.log(userId)
    // console.log(bookId)
    try {

        dispatch({ type: CONFIRM_BOOK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/book/confirm', confirmdata, config)

        dispatch({
            type: CONFIRM_BOOK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CONFIRM_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const cancelAllBorrowBooks = (canceldata) => async (dispatch) => {
    // console.log(userId)
    // console.log(bookId)
    try {

        dispatch({ type: CANCEL_ALL_BORROW_BOOK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/book/cancel/all', canceldata, config)

        dispatch({
            type: CANCEL_ALL_BORROW_BOOK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CANCEL_ALL_BORROW_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const borrowedBooksLength = () => async (dispatch) => {
    try {

        dispatch({ type: BORROWBOOK_LENGTH_REQUEST })

        const { data } = await axios.get('/api/v1/bookLength')

        dispatch({
            type: BORROWBOOK_LENGTH_SUCCESS,
            payload: data.borrowedbooksLength
        })

    } catch (error) {
        dispatch({
            type: BORROWBOOK_LENGTH_FAIL,
            payload: error.response.data.message
        })
    }
}

export const pendingBookRequests = () => async (dispatch) => {
    try {

        dispatch({ type: BOOK_PENDING_REQUEST })

        const { data } = await axios.get('/api/v1/bookRequests')

        dispatch({
            type: BOOK_PENDING_SUCCESS,
            payload: data.pendingRequests
        })

    } catch (error) {
        dispatch({
            type: BOOK_PENDING_FAIL,
            payload: error.response.data.message
        })
    }
}

export const pendingUserRequests = () => async (dispatch) => {
    try {

        dispatch({ type: USER_PENDING_REQUEST })

        const { data } = await axios.get('/api/v1/userRequests')

        dispatch({
            type: USER_PENDING_SUCCESS,
            payload: data.pendingUsers
        })

    } catch (error) {
        dispatch({
            type: USER_PENDING_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBorrowedBooksChart = () => async (dispatch) => {
    try {

        dispatch({ type:GET_BORROWEDBOOKSCHART_REQUEST })

        const { data } = await axios.get(`/api/v1/borrowedbooksChart`)

        dispatch({
            type: GET_BORROWEDBOOKSCHART_SUCCESS,
            payload: data.borrowedDate
        })

    } catch (error) {
        dispatch({
            type: GET_BORROWEDBOOKSCHART_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getSectionBorrowedChart = () => async (dispatch) => {
    try {

        dispatch({ type:GET_SECTIONBORROWEDCHART_REQUEST })

        const { data } = await axios.get(`/api/v1/sectionborrowedChart`)

        dispatch({
            type: GET_SECTIONBORROWEDCHART_SUCCESS,
            payload: data.sectionArr
        })

    } catch (error) {
        dispatch({
            type: GET_SECTIONBORROWEDCHART_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBookLeaderboards = () => async (dispatch) => {
    try {

        dispatch({ type:GET_BOOKLEADERBOARDS_REQUEST })

        const { data } = await axios.get(`/api/v1/bookLeaderboards`)

        dispatch({
            type: GET_BOOKLEADERBOARDS_SUCCESS,
            payload: data.bookCounts
        })

    } catch (error) {
        dispatch({
            type: GET_BOOKLEADERBOARDS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBorrowerLeaderboards = () => async (dispatch) => {
    try {

        dispatch({ type:GET_BORROWERLEADERBOARDS_REQUEST })

        const { data } = await axios.get(`/api/v1/borrowerLeaderboards`)

        dispatch({
            type: GET_BORROWERLEADERBOARDS_SUCCESS,
            payload: data.borrowerRanking,
            // payload: data.borrowerCourseCounts
        })

    } catch (error) {
        dispatch({
            type: GET_BORROWERLEADERBOARDS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}