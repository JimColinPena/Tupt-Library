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

    CLEAR_ERRORS
} from '../constants/bookConstants'

export const allBooks = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_BOOKS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/books')

        dispatch({
            type: ALL_BOOKS_SUCCESS,
            payload: data.book
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
            payload: data.book
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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}