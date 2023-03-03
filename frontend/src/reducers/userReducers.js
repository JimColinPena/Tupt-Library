import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    ALL_NOTIFICATION_REQUEST,
    ALL_NOTIFICATION_SUCCESS,
    ALL_NOTIFICATION_FAIL,

    COUNTER_NOTIFICATION_REQUEST,
    COUNTER_NOTIFICATION_SUCCESS,
    COUNTER_NOTIFICATION_FAIL,

    DELETE_NOTIFICATION_REQUEST,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_RESET,
    DELETE_NOTIFICATION_FAIL,

    DELETE_ALL_NOTIFICATION_REQUEST,
    DELETE_ALL_NOTIFICATION_SUCCESS,
    DELETE_ALL_NOTIFICATION_RESET,
    DELETE_ALL_NOTIFICATION_FAIL,

    SEEN_NOTIFICATION_REQUEST,
    SEEN_NOTIFICATION_SUCCESS,
    SEEN_NOTIFICATION_FAIL,
    SEEN_NOTIFICATION_RESET,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    ACTIVATE_USER_REQUEST,
    ACTIVATE_USER_SUCCESS,
    ACTIVATE_USER_RESET,
    ACTIVATE_USER_FAIL,

    DEACTIVATED_USER_REQUEST,
    DEACTIVATED_USER_SUCCESS,
    DEACTIVATED_USER_RESET,
    DEACTIVATED_USER_FAIL,

    END_TERM_USER_REQUEST,
    END_TERM_USER_SUCCESS,
    END_TERM_USER_RESET,
    END_TERM_USER_FAIL,

     CLEAR_ERRORS 
    } from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
         case LOGIN_SUCCESS:
         case REGISTER_USER_SUCCESS:
         case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
         case LOGIN_FAIL:
         case REGISTER_USER_FAIL:
             return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL:
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
            return state
    }  
}

export const allNotificationReducer = (state = { notification : [] }, action ) => {
    switch (action.type) {
        
        case ALL_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notification: action.payload
            }

        case ALL_NOTIFICATION_FAIL:
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

export const counterNotificationReducer = (state = { notification: [] }, action) => {
    switch (action.type) {

        case COUNTER_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case COUNTER_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notification: action.payload
            }

        case COUNTER_NOTIFICATION_FAIL:
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

export const notificationDeleteReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notificationDeleted: action.payload
            }
        case DELETE_NOTIFICATION_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_NOTIFICATION_RESET:
            return {
                ...state,
                notificationDeleted: false
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

export const notificationAllDeleteReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ALL_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_ALL_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notificationAllDeleted: action.payload
            }
        case DELETE_ALL_NOTIFICATION_RESET:
            return {
                ...state,
                notificationAllDeleted: false
            }
        case DELETE_ALL_NOTIFICATION_FAIL:
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
            return state
    }
}

export const seenNotificationReducer = (state = {}, action) => {
    switch (action.type) {

        case SEEN_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case SEEN_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isSeen: action.payload,
            }

        case SEEN_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case SEEN_NOTIFICATION_RESET:
            return {
                ...state,
                loading: false,
                isSeen: false
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

export const profileReducer = (state = { user: {} },
    action) => {
        switch (action.type) {
            case PROFILE_REQUEST:
                return {
                    ...state,
                    loading: true,
                }
            
            case PROFILE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    user: action.payload
                }
            
            case PROFILE_FAIL:
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

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return{
                ...state,
                loading: false,
                users: action.payload
            }

        case ALL_USERS_FAIL:
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
    
export const activateUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIVATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isActivated: false
            }

        case ACTIVATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isActivated: action.payload
            }

        case ACTIVATE_USER_RESET:
            return {
                ...state,
                isActivated: false
            }

        case ACTIVATE_USER_FAIL:
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
    
export const deactivatedUserReducer = (state = {}, action) => {
    switch (action.type) {
        case DEACTIVATED_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isDeactivated: false
            }

        case DEACTIVATED_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeactivated: action.payload
            }

        case DEACTIVATED_USER_RESET:
            return {
                ...state,
                isDeactivated: false
            }

        case DEACTIVATED_USER_FAIL:
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

export const endtermReducer = (state = {}, action) => {
    switch (action.type) {
        case END_TERM_USER_REQUEST: 
            return {
                ...state,
                loading: true,
                isEndterm: false
            }
        case END_TERM_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isEndterm: action.payload
            }
        case END_TERM_USER_RESET:
            return {
                ...state,
                isEndterm: false
            }
        case END_TERM_USER_FAIL:
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