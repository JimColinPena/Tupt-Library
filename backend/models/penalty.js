const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    penalty: {
        type: Number,
    },
    status: {
        type: String,
        default: 'Unpaid'
    }
    
})
module.exports = mongoose.model('Penalty', notificationSchema);