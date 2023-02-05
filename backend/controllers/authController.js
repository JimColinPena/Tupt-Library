const crypto = require('crypto');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorhand');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

// Google Login
exports.GoogleSignIn = async (req, res, next) => {
    if(req.body.UserInfoResponseData !== undefined){
        try{
            const user = await User.findOne({google:
                {
                    google_mail:req.body.UserInfoResponseData.email,
                    google_id:req.body.UserInfoResponseData.id
                }
            });
            if (user === null){
                res.send({success: false, message: "Account Doesn't Exist"});
            }
            if (!user) {
                res.send({success: false, message: 'Invalid Credentials'});
            } else if (user.status == "deactivated" ) {
                res.send({success: false, message: 'Account is on Hold!'});
            } else if (user) {
                sendToken(user, 200, res);
            }
        }catch(err){
            console.log(err);
        }
    }else{
        res.send({success: false, message: 'A Problem has Occured during Sign-In \n Try Again Later'});
    }
}

// Google Register
exports.GoogleRegisterIn = async(req,res,next) => {
    req.body.email = req.body.userInfo.email
    req.body.name = req.body.userInfo.given_name + " " + req.body.userInfo.family_name
    req.body.password = req.body.userInfo.family_name
    req.body.google = {google_mail : req.body.userInfo.email, google_id : req.body.userInfo.id}
    req.body.avatar = {url: req.body.userInfo.picture}
    
    try{
        const user = await User.create(req.body);
        sendToken(user, 200, res)
    }catch(catchAsyncErrors){
        res.json({
            error: catchAsyncErrors
        });
    }
}