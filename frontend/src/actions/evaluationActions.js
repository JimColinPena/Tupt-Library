import axios from 'axios';
import {
	ALL_EVALUATION_REQUEST,
    ALL_EVALUATION_SUCCESS,
    ALL_EVALUATION_FAIL,

    NEW_EVALUATION_REQUEST,
    NEW_EVALUATION_SUCCESS,
    NEW_EVALUATION_FAIL,
} from '../constants/evaluationConstants'

export const allEvaluations = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_EVALUATION_REQUEST })

        const { data } = await axios.get('/api/v1/books')

        dispatch({
            type: ALL_EVALUATION_SUCCESS,
            payload: data.evaluation
        })

    } catch (error) {
        dispatch({
            type: ALL_EVALUATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newEvaluations = (evaluationData) => async (dispatch) => {
	try{

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

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: clearErrors
    })
}