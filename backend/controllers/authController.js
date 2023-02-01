const crypto = require('crypto');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorhand');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');

exports.registerUser = async (req, res, next) => {

    
	const { fname, lname, contact, email, password} = req.body;

    req.body.name = fname +" "+ lname;

    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        user
    })
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    const user = await User.findOne({email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Credentials', 401));
    }

    else if (user.status == "deactive" ) {
        return next(new ErrorHandler('Account is on Hold!', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    sendToken(user, 200, res)
}


exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
}