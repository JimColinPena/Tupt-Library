import axios from 'axios';
import {
    ALL_BOOKS_REQUEST,
    ALL_BOOKS_SUCCESS,
    ALL_BOOKS_FAIL,

    NEW_BOOK_REQUEST,
    NEW_BOOK_SUCCESS,
    NEW_BOOK_FAIL,

    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL,

    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAIL,

    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,

    ADD_BOOK_ACCESSION_REQUEST,
    ADD_BOOK_ACCESSION_SUCCESS,
    ADD_BOOK_ACCESSION_FAIL,

    ACCESSION_BOOK_REQUEST,
    ACCESSION_BOOK_SUCCESS,
    ACCESSION_BOOK_FAIL,

    ACCESSION_DETAILS_REQUEST,
    ACCESSION_DETAILS_SUCCESS,
    ACCESSION_DETAILS_FAIL,

    EDIT_BOOK_ACCESSION_REQUEST,
    EDIT_BOOK_ACCESSION_SUCCESS,
    EDIT_BOOK_ACCESSION_FAIL,

    DELETE_BOOK_ACCESSION_REQUEST,
    DELETE_BOOK_ACCESSION_SUCCESS,
    DELETE_BOOK_ACCESSION_FAIL,

    ACCESSION_REPORTS_REQUEST,
    ACCESSION_REPORTS_SUCCESS,
    ACCESSION_REPORTS_FAIL,

    ACCREDITATION_REPORTS_REQUEST,
    ACCREDITATION_REPORTS_SUCCESS,
    ACCREDITATION_REPORTS_FAIL,

    CLEAR_ERRORS
} from '../constants/bookConstants'

export const allBooks = (yearPub, subjects) => async (dispatch) => {
    try {

        dispatch({ type: ALL_BOOKS_REQUEST })

        let link = `/api/v1/admin/books?&yearPub[lte]=${yearPub[1]}&yearPub[gte]=${yearPub[0]}`

        if (subjects){
            link = `/api/v1/admin/books?&yearPub[lte]=${yearPub[1]}&yearPub[gte]=${yearPub[0]}&subjects=${subjects}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_BOOKS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_BOOKS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newBooks = (bookData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_BOOK_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post('/api/v1/book/new', bookData, config)

        dispatch({
            type: NEW_BOOK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBookDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOOK_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/single/book/${id}`)
        dispatch({
            type: BOOK_DETAILS_SUCCESS,
            payload: data.BookDetails
        })
    } catch (error) {
        dispatch({
            type: BOOK_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateBook = (id, bookData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_BOOK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/book/${id}`, bookData, config)

        dispatch({
            type: UPDATE_BOOK_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBook = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BOOK_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/book/${id}`)

        dispatch({
            type: DELETE_BOOK_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addBookAccession = (bookData) => async (dispatch) => {
    try {

        dispatch({ type: ADD_BOOK_ACCESSION_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post('/api/v1/book/accession', bookData, config)

        dispatch({
            type: ADD_BOOK_ACCESSION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADD_BOOK_ACCESSION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const changeBookAccession = (accessionData) => async (dispatch) => {
    try {

        dispatch({ type: ACCESSION_BOOK_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
                // "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(`/api/v1/edit/accession`, accessionData, config)

        dispatch({
            type: ACCESSION_BOOK_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: ACCESSION_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBookAccession = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACCESSION_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/accession/detail/${id}`)
        dispatch({
            type: ACCESSION_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACCESSION_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const editBookAccession = (id, accessionData) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        dispatch({ type: EDIT_BOOK_ACCESSION_REQUEST })

        const { data } = await axios.put(`/api/v1/book/accession/${id}`, accessionData, config)

        dispatch({
            type: EDIT_BOOK_ACCESSION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: EDIT_BOOK_ACCESSION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBookAccession = (id, accessionData) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        dispatch({ type: DELETE_BOOK_ACCESSION_REQUEST })

        console.log(id, accessionData)

        const { data } = await axios.put(`/api/v1/delete/accession/${id}`, accessionData, config)

        dispatch({
            type: DELETE_BOOK_ACCESSION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_BOOK_ACCESSION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const bookReports = () => async (dispatch) => {
    try {

        dispatch({ type: ACCESSION_REPORTS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/accessionReport/books')

        dispatch({
            type: ACCESSION_REPORTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ACCESSION_REPORTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const bookAccreditation = (subjectsData) => async (dispatch) => {
    try {

        dispatch({ type: ACCREDITATION_REPORTS_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.post(`/api/v1/admin/accreditationReport/books`, subjectsData, config)

        // let link = `/api/v1/admin/accreditationReport/books`

        // if (subjects){
            // link = (`/api/v1/admin/accreditationReport/books`, subjects, config)
        // }

        // const { data } = await axios.post(link)

        dispatch({
            type: ACCREDITATION_REPORTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ACCREDITATION_REPORTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}