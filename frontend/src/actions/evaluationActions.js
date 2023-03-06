import axios from 'axios';
import {
    CHECK_EVALUATION_REQUEST,
	CHECK_EVALUATION_SUCCESS,
	CHECK_EVALUATION_FAIL,

    ALL_EVALUATION_REQUEST,
    ALL_EVALUATION_SUCCESS,
    ALL_EVALUATION_FAIL,

    NEW_EVALUATION_REQUEST,
    NEW_EVALUATION_SUCCESS,
    NEW_EVALUATION_FAIL,

    EDIT_EVALUATION_REQUEST,
	EDIT_EVALUATION_SUCCESS,
	EDIT_EVALUATION_FAIL,

    DELETE_EVALUATION_REQUEST,
	DELETE_EVALUATION_SUCCESS,
	DELETE_EVALUATION_FAIL,

    STUDENT_EVALUATION_REQUEST,
    STUDENT_EVALUATION_SUCCESS,
    STUDENT_EVALUATION_FAIL,
} from '../constants/evaluationConstants'

export const checkEvaluation = () => async (dispatch) => {
    try {

        // console.log('checkEvaluation')
        dispatch({ type: CHECK_EVALUATION_REQUEST })

        const { data } = await axios.get('/api/v1/check/evaluation')

        dispatch({
            type: CHECK_EVALUATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: CHECK_EVALUATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allEvaluation = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_EVALUATION_REQUEST })

        const { data } = await axios.get('/api/v1/admin/evaluation')

        dispatch({
            type: ALL_EVALUATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_EVALUATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newEvaluations = (evaluationData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_EVALUATION_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post('/api/v1/evaluation/new', evaluationData, config)

        dispatch({
            type: NEW_EVALUATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_EVALUATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const editEvaluations = (id, evaluationData) => async (dispatch) => {
    try {

        dispatch({ type: EDIT_EVALUATION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/evaluation/${id}`, evaluationData, config)

        dispatch({
            type: EDIT_EVALUATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: EDIT_EVALUATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteEvaluations = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_EVALUATION_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/evaluation/${id}`)

        dispatch({
            type: DELETE_EVALUATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_EVALUATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const studentEvaluations = (evaluationData) => async (dispatch) => {
    try {

        dispatch({ type: STUDENT_EVALUATION_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post('/api/v1/evaluation/post', evaluationData, config)

        dispatch({
            type: STUDENT_EVALUATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STUDENT_EVALUATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: clearErrors
    })
}