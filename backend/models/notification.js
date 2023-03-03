const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    notificationType: {
        type: String,
        // enum: {
        //     values: ['Approve', 'Decline', 'Penalty', 'Others'],
        //     message: 'There is error on proccessing this input'
        // }
    },
    notificationTitle:{
        type: String,
    },
    notificationText: {
        type: String,
        maxLength: [250, 'Status cannot exceed 100 characters']
    },
    notificationDate: {
        type: Date,
    },
    notificationWebDate: {
        type: String,
    },
    deliveryStatus:{
        type: String,
        enum: {
            values: ['Delivered', 'Seen'],
            message: 'There is error on proccessing this input'
        }
    },
    reasons: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})
module.exports = mongoose.model('Notification', notificationSchema);