import {
	CHECK_EVALUATION_REQUEST,
	CHECK_EVALUATION_SUCCESS,
	CHECK_EVALUATION_FAIL,

	ALL_EVALUATION_REQUEST,
	ALL_EVALUATION_SUCCESS,
	ALL_EVALUATION_FAIL,

	NEW_EVALUATION_REQUEST,
	NEW_EVALUATION_SUCCESS,
	NEW_EVALUATION_RESET,
	NEW_EVALUATION_FAIL,

	EDIT_EVALUATION_REQUEST,
	EDIT_EVALUATION_SUCCESS,
	EDIT_EVALUATION_RESET,
	EDIT_EVALUATION_FAIL,

	DELETE_EVALUATION_REQUEST,
	DELETE_EVALUATION_SUCCESS,
	DELETE_EVALUATION_RESET,
	DELETE_EVALUATION_FAIL,

	STUDENT_EVALUATION_REQUEST,
	STUDENT_EVALUATION_SUCCESS,
	STUDENT_EVALUATION_RESET,
	STUDENT_EVALUATION_FAIL,

	CLEAR_ERRORS
} from '../constants/evaluationConstants'

export const checkEvaluationsReducer = (state = {}, action) => {
	switch (action.type) {

		case CHECK_EVALUATION_REQUEST:
			return {
				...state,
				loading: true,
			}
		case CHECK_EVALUATION_SUCCESS:
			return {
				...state,
				loading: false,
				checksuccess: action.payload,
			}
		case CHECK_EVALUATION_FAIL:
			return {
				...state,
				loading: false,
				checkerror: action.payload
			}
		case CLEAR_ERRORS:
			return {
				...state,
				checkerror: null
			}
		default:
			return state;
	}
}

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
				evaluation: action.payload.accession
			}
		case NEW_EVALUATION_FAIL:
			return {
				...state,
				new_eval_error: action.payload
			}
		case NEW_EVALUATION_RESET:
			return {
				...state,
				success: false
			}

		case CLEAR_ERRORS:
			return {
				...state,
				new_eval_error: null
			}
		default:
			return state
	}
}

export const evaluationReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_EVALUATION_REQUEST:
		case DELETE_EVALUATION_REQUEST:
			return {
				...state,
				loading: true
			}
		case EDIT_EVALUATION_SUCCESS:
			return {
				...state,
				loading: false,
				isEdited: action.payload,
			}
		case DELETE_EVALUATION_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			}
		case EDIT_EVALUATION_RESET:
			return {
				...state,
				isEdited: false
			}
		case DELETE_EVALUATION_RESET:
			return {
				...state,
				isDeleted: false
			}
		case EDIT_EVALUATION_FAIL:
		case DELETE_EVALUATION_FAIL:
			return {
				...state,
				eval_error: action.payload
			}
		case CLEAR_ERRORS:
			return {
				...state,
				eval_error: null
			}

		default: return state

	}

}

export const studentEvaluationReducer = (state = { evaluation: {} }, action) => {
	switch (action.type) {

		case STUDENT_EVALUATION_REQUEST:
			return {
				...state,
				loading: true
			}
		case STUDENT_EVALUATION_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				evaluation: action.payload
			}
		case STUDENT_EVALUATION_RESET:
			return {
				...state,
				success: false
			}
		case STUDENT_EVALUATION_FAIL:
			return {
				...state,
				student_error: action.payload
			}


		case CLEAR_ERRORS:
			return {
				...state,
				student_error: null
			}
		default:
			return state
	}
}