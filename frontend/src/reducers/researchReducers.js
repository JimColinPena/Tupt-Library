import { 
    ALL_RESEARCHES_REQUEST,
    ALL_RESEARCHES_SUCCESS,
    ALL_RESEARCHES_FAIL,

    NEW_RESEARCH_REQUEST,
    NEW_RESEARCH_SUCCESS,
    NEW_RESEARCH_RESET,
    NEW_RESEARCH_FAIL,

    RESEARCH_DETAILS_REQUEST,
    RESEARCH_DETAILS_SUCCESS,
    RESEARCH_DETAILS_FAIL,

    UPDATE_RESEARCH_REQUEST,
    UPDATE_RESEARCH_SUCCESS,
    UPDATE_RESEARCH_RESET,
    UPDATE_RESEARCH_FAIL,

    DELETE_RESEARCH_REQUEST,
    DELETE_RESEARCH_SUCCESS,
    DELETE_RESEARCH_RESET,
    DELETE_RESEARCH_FAIL,
	CLEAR_ERRORS 
} from '../constants/researchConstants'
export const allResearchesReducer = (state = { researches: [] }, action) => {
    switch (action.type) {

        case ALL_RESEARCHES_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_RESEARCHES_SUCCESS:
            return {
                ...state,
                loading: false,
                researches: action.payload
            }

        case ALL_RESEARCHES_FAIL:
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

export const newResearchReducer = (state = { research: {} }, action) => {
    switch (action.type) {

        case NEW_RESEARCH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_RESEARCH_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                research: action.payload.research
            }

        case NEW_RESEARCH_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_RESEARCH_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const researchDetailsReducer = (state = { research: {} }, action) => {
    switch(action.type) {
        case RESEARCH_DETAILS_REQUEST:
        return {
            ...state,
            loading: true,
        }
        case RESEARCH_DETAILS_SUCCESS:
        return {
            ...state,
            loading:false,
            research: action.payload,

        }
        case RESEARCH_DETAILS_FAIL:
        return {
            ...state,
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

export const researchReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_RESEARCH_REQUEST:
        case UPDATE_RESEARCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_RESEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_RESEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_RESEARCH_FAIL:
        case UPDATE_RESEARCH_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_RESEARCH_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_RESEARCH_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}