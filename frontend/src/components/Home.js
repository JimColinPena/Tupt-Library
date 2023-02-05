import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from './layout/Loader'
import MetaData from './layout/MetaData'
import Header from './layout/Header'
import Footer from './layout/Footer'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../actions/userActions'
import { useNavigate } from "react-router-dom";
import Login from '../components/credential/Login'

const Home = () => {
    return (
        <Fragment>
            <MetaData title='' />
            <body className='home-body'>
                <Header />
                <Login/>
                <Footer />
            </body>
        </Fragment>
    )
}
export default Home