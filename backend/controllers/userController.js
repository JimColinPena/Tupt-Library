const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const bcrypt = require('bcryptjs');

const Users = require('../models/user');

exports.updatepasswordUser = async (req,res,next) => {
    try{
        Users.findOneAndUpdate({
            _id : req.params.id
        },
        {
            password: await bcrypt.hash(req.body.password, 10)
        },
        function(err, data){  
            if(err){
               return res.status(500);
            } else {
               return res.status(200).send({success: true})
            }
           });
    }catch(err){
        return next(new ErrorHandler(err,404));
    }
}

exports.deactivateUser = async (req,res,next) => {
    try{
        Users.findOneAndUpdate({
            _id : req.params.id
        },
        {
            status: "deactivated"
        },
        function(err, data){  
            if(err){
               return res.status(500);
            } else {
               return res.status(200).send({success: true})
            }
           });
    }catch(err){
        return next(new ErrorHandler(err,404));
    }
}

exports.activateUser = async (req,res,next) => {
    try{
        Users.findOneAndUpdate({
            _id : req.params.id
        },
        {
            status: "active"
        },
        function(err, data){  
            if(err){
               return res.status(500);
            } else {
               return res.status(200).send({success: true})
            }
           });
    }catch(err){
        return next(new ErrorHandler(err,404));
    }
}