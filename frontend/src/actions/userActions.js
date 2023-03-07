import axios from 'axios'
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
    DELETE_NOTIFICATION_FAIL,

    DELETE_ALL_NOTIFICATION_REQUEST,
    DELETE_ALL_NOTIFICATION_SUCCESS,
    DELETE_ALL_NOTIFICATION_FAIL,

    SEEN_NOTIFICATION_REQUEST,
    SEEN_NOTIFICATION_SUCCESS,
    SEEN_NOTIFICATION_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    UPDATE_ROLE_REQUEST,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL,

    ACTIVATE_USER_REQUEST,
    ACTIVATE_USER_SUCCESS,
    ACTIVATE_USER_FAIL,

    DEACTIVATED_USER_REQUEST,
    DEACTIVATED_USER_SUCCESS,
    DEACTIVATED_USER_FAIL,

    END_TERM_USER_REQUEST,
    END_TERM_USER_SUCCESS,
    END_TERM_USER_FAIL,

    CLEAR_ERRORS
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/login', { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const profile = () => async (dispatch) => {
    try {

        dispatch({ type: PROFILE_REQUEST })
        const { data } = await axios.get(`/api/v1/profile`)

        dispatch({
            type: PROFILE_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
                // 'Content-Type': 'application/json',
            }
        }
        // for(var pair of userData.entries()) {
        //    console.log(pair[0]+ ', '+ pair[1]); 
        // }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allNotification = (id) => async (dispatch) => {
    try {

        dispatch({ type: ALL_NOTIFICATION_REQUEST })

        const { data } = await axios.get(`/api/v1/notification/`)

        dispatch({
            type: ALL_NOTIFICATION_SUCCESS,
            payload: data.notifications
        })
    } catch (error) {
        dispatch({
            type: ALL_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const counterNotification = (id) => async (dispatch) => {
    try {

        dispatch({ type: COUNTER_NOTIFICATION_REQUEST })

        const { data } = await axios.get(`/api/v1/counter/notification`)

        dispatch({
            type: COUNTER_NOTIFICATION_SUCCESS,
            payload: data.notifications
        })
    } catch (error) {
        dispatch({
            type: COUNTER_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteSingleNotification = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_NOTIFICATION_REQUEST })

        const { data } = await axios.delete(`/api/v1/notification/${id}`)

        dispatch({
            type: DELETE_NOTIFICATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAllNotification = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ALL_NOTIFICATION_REQUEST })

        const { data } = await axios.delete(`/api/v1/clear/notification/`)

        dispatch({
            type: DELETE_ALL_NOTIFICATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ALL_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const seenNotification = (id) => async (dispatch) => {
    try {

        dispatch({ type: SEEN_NOTIFICATION_REQUEST })
        const { data } = await axios.put(`/api/v1/notification/seen/${id}`)

        dispatch({
            type: SEEN_NOTIFICATION_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: SEEN_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout')

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateRole = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ROLE_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
                // "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`/api/v1/updateuser/role`, userData, config)

        dispatch({
            type: UPDATE_ROLE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ROLE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const activateUsers = (id) => async (dispatch) => {
    try {

        dispatch({ type: ACTIVATE_USER_REQUEST })

        const { data } = await axios.put(`/api/v1/user/activate/${id}`)

        dispatch({
            type: ACTIVATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ACTIVATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deactivatedUsers = (id) => async (dispatch) => {
    try {

        dispatch({ type: DEACTIVATED_USER_REQUEST })

        const { data } = await axios.put(`/api/v1/user/deactivate/${id}`)

        dispatch({
            type: DEACTIVATED_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DEACTIVATED_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const endterm = () => async (dispatch) => {
    try {

        dispatch({ type: END_TERM_USER_REQUEST })

        const { data } = await axios.put(`/api/v1/user/endterm`)

        dispatch({
            type: END_TERM_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: END_TERM_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}