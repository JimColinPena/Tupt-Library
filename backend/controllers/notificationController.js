const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const { Expo } = require('expo-server-sdk')
const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({ authorizationToken: "pk_prod_QD4RY8BWFTMJQFHTQ4DBHSDBAFH1" });

const user = require('../models/user');
const notification = require('../models/notification');
const personnel = require('../models/personnel');

exports.registerforpushnotification = async(req,res,next) => {
    try{
        user.updateOne({
            _id : req.body.userid
        },
        {
            notification: { pushToken : req.body.token }
        },
        function(err, data){  
            if(err){
               return res.status(500);
            } else {
               return res.status(200).send({success: true, message: data})
            }
           });
    }catch(err){
        return next(new ErrorHandler(err,404));
    }
}

exports.unregisterforpushnotification = async(req,res,next) => {
    try{
        user.updateOne({
            _id : req.body.userid
        },
        {
            notification: { pushToken : null }
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
    // Accepts 4 parameters
        // Message Title
        // Message
        // The USER ID
        // The SENDER ID
exports.sendnotification = async(req,res,next) => {
    // INPUT NEEDED
    // Title
    // Message
    // Type
    // SenderID
    // RecieverID
    // Date - depends on how it should be handled (server input or client input)


    // Theoretically we can just bypass assigning req.body by defining
    // it all on the req before being sent to the create model.
        let expo = new Expo();
        let title = req.body.title;
        let message = req.body.message;
        let userdata = await user.findById(req.body.userid);
        let RecieverPushToken = 'Initialstate';
        if(userdata.notification?.pushToken !== undefined && userdata.notification?.pushToken !== null){
            RecieverPushToken = userdata.notification.pushToken;
        }
        // Users???? IDK Fam
        let senderdata = await user.findById(req.body.senderid);
        req.body.sender = senderdata._id;
        req.body.reciever = userdata._id;
        req.body.notificationText = message;
        req.body.notificationTitle = title;

        // Auto Determine if User has an EXPO Token and send notification
        // to EXPO and EMAIL
        if (Expo.isExpoPushToken(RecieverPushToken)) {
            const CourierRequestId = await courier.send({
                message: {
                  to: {
                        email: userdata.google.google_mail,
                        expo:{
                            token: RecieverPushToken
                        }
                    },
                    template: "FHC692KM3J4WCCMD5NR8D3ZS7VDM",
                    data: {
                        EMAILSUBJECT: "TUP Taguig - Library App | " + title ,
                        Username: userdata.name,
                        EMAILTITLE: title,
                        EMAILCONTENT: message,
                        SENDERNAME: senderdata.name,
                    },
                }
              });
        }else{
            const CourierRequestId = await courier.send({
                message: {
                  to: {
                        email: userdata.google.google_mail
                    },
                    template: "FHC692KM3J4WCCMD5NR8D3ZS7VDM",
                    data: {
                        EMAILSUBJECT: "TUP Taguig - Library App | " + req.body.title ,
                        Username: userdata.name,
                        EMAILTITLE: title,
                        EMAILCONTENT: message,
                        SENDERNAME: senderdata.name,
                    },
                },
            });
        }
        req.body.deliveryStatus = "Delivered";
        const notificationmodel = await notification.create(req.body);
        // CAN FURTHER REFRACT CODE 
        res.send({
            success: true,
            data: {message: userdata.name + " has been notified on : " + title }
        });
}

exports.recievednotification = async(req,res,next) => {
    const notifications = await notification.findByIdAndUpdate(req.body.id,{'deliveryStatus':'seen'});
    // console.log(notifications);
    res.status(200).json({
        success: true,
        notifications
    })
}

exports.getnotification = async(req,res,next) => {
    const notifications = await notification.find({'userId': req.params.userid , 'deliveryStatus': 'Delivered'})
    res.status(200).json({
        success: true,
        notifications
    })
}

exports.usernotification = async(req, res, next) => {
    const notifications = await notification.find({receiver: req.user.id}).sort({createdAt:'descending'})

    res.status(200).json({
        success: true,
        notifications
    })
}

exports.counternotification = async(req, res, next) => {
    const notifications = (await notification.find({receiver: req.user.id, deliveryStatus: 'Delivered'})).length
    
    res.status(200).json({
        success: true,
        notifications
    })
}

exports.notificationseen = async(req, res, next) => {
    // const notifications = await notification.find({receiver: req.user.id})

    // await notification.updateMany

    const notifications = await notification.updateMany(
        {receiver: req.user.id},
        {$set:{deliveryStatus: 'Seen'}}
        )

    res.status(200).json({
        success: true,
        notifications
    })
}

exports.deleteNotification = async (req, res, next) => {
    const notifications = await notification.findById(req.params.id);
    // if (!notifications) {
    //     return next(new ErrorHandler('Notification not found', 404));
    // }
    await notifications.remove();

    res.status(200).json({
        success: true,
        message: 'Notification cleared'
    })
}

exports.deleteAllNotification = async (req, res, next) => {
    const notifications = await notification.find({ receiver: req.user.id }).deleteMany()


    res.status(200).json({
        success: true,
        message: 'All notification cleared',
        
    })
}
