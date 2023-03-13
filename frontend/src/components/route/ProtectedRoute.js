import React from 'react'
// import { Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import {  Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader'


const ProtectedRoute = ({ children, isAdmin = null }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth);
    if (loading === false) {
        if (isAuthenticated === false) {
            return <Navigate to='/login' />
        }

        if (isAdmin === true && user.role !== 'admin') {
            return <Navigate to='/' />
        }

        if (isAdmin === false && user.role === 'admin') {
            return <Navigate to='/' />
        }

        return children
    }
    return <Loader />;
};
export default ProtectedRoute;
