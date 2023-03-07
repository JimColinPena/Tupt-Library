import axios from 'axios';
import { 
    ALL_RESEARCHES_REQUEST,
    ALL_RESEARCHES_SUCCESS,
    ALL_RESEARCHES_FAIL,

    NEW_RESEARCH_REQUEST,
    NEW_RESEARCH_SUCCESS,
    NEW_RESEARCH_FAIL,

    RESEARCH_DETAILS_REQUEST,
    RESEARCH_DETAILS_SUCCESS,
    RESEARCH_DETAILS_FAIL,

    UPDATE_RESEARCH_REQUEST,
    UPDATE_RESEARCH_SUCCESS,
    UPDATE_RESEARCH_FAIL,

    DELETE_RESEARCH_REQUEST,
    DELETE_RESEARCH_SUCCESS,
    DELETE_RESEARCH_FAIL,
	CLEAR_ERRORS 
} from '../constants/researchConstants'

export const allResearches = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_RESEARCHES_REQUEST })

        const { data } = await axios.get('/api/v1/admin/researchs')

        dispatch({
            type: ALL_RESEARCHES_SUCCESS,
            payload: data.research
        })

    } catch (error) {
        dispatch({
            type: ALL_RESEARCHES_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newResearches = (researchData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_RESEARCH_REQUEST })

        const config = {
            headers: {
                 "Content-Type": "multipart/form-data"
                 // "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post('/api/v1/research/new', researchData, config)

        dispatch({
            type: NEW_RESEARCH_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_RESEARCH_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getResearchDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: RESEARCH_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/research/${id}`)
        dispatch({
            type: RESEARCH_DETAILS_SUCCESS,
            payload: data.research
        })
    } catch (error) {
        dispatch({
            type: RESEARCH_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateResearch = (id, researchData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_RESEARCH_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/research/${id}`, researchData, config)

        dispatch({
            type: UPDATE_RESEARCH_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_RESEARCH_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteResearch = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_RESEARCH_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/research/${id}`)

        dispatch({
            type: DELETE_RESEARCH_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_RESEARCH_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}