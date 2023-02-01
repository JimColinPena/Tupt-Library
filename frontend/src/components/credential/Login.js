import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);


    useEffect(() => {

        if (isAuthenticated) {
            // console.log(user.role)
            navigate('/dashboard')
        }
        if (!isAuthenticated) {
            navigate('/')
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }


    }, [dispatch, alert, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/api/v1/google/callback`,
			"_self"
		);
	};

    return (
        <div className="login_container">
            <div className="form_container">
                <form action="" onSubmit={submitHandler}>
                    {/*<form className="form-wrapper" action="/admin/dashboard">*/}

                    <div className="h-form">
                        <img src="/images/TUPT-Logo.png" alt="Technological University of the Philippines logo" width="70px" height="70px"></img>
                        <h3>Login Panel</h3>
                    </div>

                    <div className="field_input">
                        <label for="emailaddress">Email Address</label>
                        <input type="email" name="emailaddress" id="emailaddress" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="field_input">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p className="forgot_link"><a href="#">Forgot password?</a></p>

                    <button className="custom-btn button_login" type="submit">Sign In</button>
                    <span className='btn-between'>OR</span>
                </form>
            </div>
            <div className='google_button'>
            <button className="custom-btn button_google" onClick={googleAuth}>
                <img src='images/icons8-google-48.png' height="23" width="23"></img>
                Sign in with Google
            </button>
            </div>
        </div>
    )
}
export default Login