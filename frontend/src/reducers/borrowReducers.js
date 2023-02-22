import {
	BORROW_BOOK_REQUEST,
	BORROW_BOOK_SUCCESS,
	BORROW_BOOK_FAIL,
	BORROW_BOOK_RESET,

	CHECKBORROW_BOOK_REQUEST,
	CHECKBORROW_BOOK_SUCCESS,
	CHECKBORROW_BOOK_FAIL,

	CANCELBORROW_BOOK_REQUEST,
	CANCELBORROW_BOOK_SUCCESS,
	CANCELBORROW_BOOK_RESET,
	CANCELBORROW_BOOK_FAIL,

	CONFIRM_BOOK_REQUEST,
	CONFIRM_BOOK_SUCCESS,
	CONFIRM_BOOK_RESET,
	CONFIRM_BOOK_FAIL,

	CANCEL_ALL_BORROW_BOOK_REQUEST,
	CANCEL_ALL_BORROW_BOOK_SUCCESS,
	CANCEL_ALL_BORROW_BOOK_RESET,
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

export const borrowBookReducer = (state = { borrowbook: {} }, action) => {
	switch (action.type) {

		case BORROW_BOOK_REQUEST:
			return {
				...state,
				loading: true
			}

		case BORROW_BOOK_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				borrowbook: action.payload.borrowbook
			}

		case BORROW_BOOK_FAIL:
			return {
				...state,
				error: action.payload
			}

		case BORROW_BOOK_RESET:
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


export const checkBorrowBookReducer = (state = { checkbook: {} }, action) => {
	switch (action.type) {
		case CHECKBORROW_BOOK_REQUEST:
			return {
				...state,
				loading: true,
			}
		case CHECKBORROW_BOOK_SUCCESS:
			return {
				...state,
				loading: false,
				checkbook: action.payload.checkbook,

			}
		case CHECKBORROW_BOOK_FAIL:
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

export const cancelBorrowBookReducer = (state = {}, action) => {
	switch (action.type) {
		case CANCELBORROW_BOOK_REQUEST:
			return {
				...state,
				loading: true,
			}
		case CANCELBORROW_BOOK_SUCCESS:
			return {
				...state,
				loading: false,
				isCancel: action.payload,

			}
		case CANCELBORROW_BOOK_FAIL:
			return {
				...state,
				error: action.payload
			}
		case CANCELBORROW_BOOK_RESET:
			return {
				...state,
				isCancel: false
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

export const confirmBorrowBookReducer = (state = {}, action) => {
	switch (action.type) {
		case CONFIRM_BOOK_REQUEST:
			return {
				...state,
				loading: true,
			}
		case CONFIRM_BOOK_SUCCESS:
			return {
				...state,
				loading: false,
				isConfirm: action.payload,

			}
		case CONFIRM_BOOK_FAIL:
			return {
				...state,
				error: action.payload
			}
		case CONFIRM_BOOK_RESET:
			return {
				...state,
				isConfirm: false
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

export const cancelAllBorrowBookReducer = (state = {}, action) => {
	switch (action.type) {
		case CANCEL_ALL_BORROW_BOOK_REQUEST:
			return {
				...state,
				loading: true,
			}
		case CANCEL_ALL_BORROW_BOOK_SUCCESS:
			return {
				...state,
				loading: false,
				isCancelAll: action.payload,

			}
		case CANCEL_ALL_BORROW_BOOK_FAIL:
			return {
				...state,
				error: action.payload
			}
		case CANCEL_ALL_BORROW_BOOK_RESET:
			return {
				...state,
				isCancelAll: false
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

export const borrowedBooksLengthReducer = (state = { borrowedbooksLength: [] }, action) => {
    switch (action.type) {

        case BORROWBOOK_LENGTH_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case BORROWBOOK_LENGTH_SUCCESS:
            return {
                ...state,
                loading: false,
                borrowedbooksLength: action.payload
            }

        case BORROWBOOK_LENGTH_FAIL:
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

export const pendingBookRequestsReducer = (state = { pendingBooksRequests: [] }, action) => {
    switch (action.type) {

        case BOOK_PENDING_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case BOOK_PENDING_SUCCESS:
            return {
                ...state,
                loading: false,
                pendingBooksRequests: action.payload
            }

        case BOOK_PENDING_FAIL:
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

export const pendingUserRequestsReducer = (state = { pendingUsersRequests: [] }, action) => {
    switch (action.type) {

        case USER_PENDING_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_PENDING_SUCCESS:
            return {
                ...state,
                loading: false,
                pendingUsersRequests: action.payload
            }

        case USER_PENDING_FAIL:
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

export const borrowedBooksChartReducer = (state = { borrowedDate:[] }, action) => {
    switch(action.type) {
        case GET_BORROWEDBOOKSCHART_REQUEST:
        return {
            ...state,
            loading: true,
            // borrowedDate: []
        }
        case GET_BORROWEDBOOKSCHART_SUCCESS:
        return {
            ...state,
            loading: false,
            borrowedDate: action.payload
        }
        case GET_BORROWEDBOOKSCHART_FAIL:
        return {
            loading:false,
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

export const sectionBorrowedChartReducer = (state = { sectionArr:[] }, action) => {
    switch(action.type) {
        case GET_SECTIONBORROWEDCHART_REQUEST:
        return {
            ...state,
            loading: true,
            // borrowedDate: []
        }
        case GET_SECTIONBORROWEDCHART_SUCCESS:
        return {
            ...state,
            loading: false,
            sectionArr: action.payload
        }
        case GET_SECTIONBORROWEDCHART_FAIL:
        return {
            loading:false,
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

export const bookLeaderboardsReducer = (state = { bookCounts:[] }, action) => {
    switch(action.type) {
        case GET_BOOKLEADERBOARDS_REQUEST:
        return {
            ...state,
            loading: true,
            // borrowedDate: []
        }
        case GET_BOOKLEADERBOARDS_SUCCESS:
        return {
            ...state,
            loading: false,
            bookCounts: action.payload
        }
        case GET_BOOKLEADERBOARDS_FAIL:
        return {
            loading:false,
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

export const borrowerLeaderboardsReducer = (state = { borrowerRanking:[] }, action) => {
    switch(action.type) {
        case GET_BORROWERLEADERBOARDS_REQUEST:
        return {
            ...state,
            loading: true,
            // borrowedDate: []
        }
        case GET_BORROWERLEADERBOARDS_SUCCESS:
        return {
            ...state,
            loading: false,
            borrowerRanking: action.payload,
			// borrowerCourseCounts: action.payload
        }
        case GET_BORROWERLEADERBOARDS_FAIL:
        return {
            loading:false,
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