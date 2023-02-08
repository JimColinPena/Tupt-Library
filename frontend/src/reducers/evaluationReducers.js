import {
	ALL_EVALUATION_REQUEST,
	ALL_EVALUATION_SUCCESS,
	ALL_EVALUATION_FAIL,

	NEW_EVALUATION_REQUEST,
	NEW_EVALUATION_SUCCESS,
	NEW_EVALUATION_RESET,
	NEW_EVALUATION_FAIL,

	CLEAR_ERRORS
} from '../constants/evaluationConstants'
export const allEvaluationsReducer = (state = { evaluations: [] }, action) => {
	switch (action.type) {

		case ALL_EVALUATION_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ALL_EVALUATION_SUCCESS:
			return {
				...state,
				loading: false,
				evaluations: action.payload
			}
		case ALL_EVALUATION_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
}

export const newEvaluationReducer = (state = { evaluation: {} }, action) => {
	switch (action.type) {

		case NEW_EVALUATION_REQUEST:
			return {
				...state,
				loading: true
			}
		case NEW_EVALUATION_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				evaluation: action.payload.evaluation
			}
		case NEW_EVALUATION_FAIL:
			return {
				...state,
				error: action.payload
			}
		case NEW_EVALUATION_RESET:
			return{
				...state,
				success: false
			}

		case CLEAR_ERRORS:
			return{
				...state,
				error: null
			}
		default:
			return state 
	}
}