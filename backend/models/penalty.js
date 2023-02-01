const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    // dueDate: {
    //     type: Date,
    // },
    penalty:{
        type: Number,
    }
    
})
module.exports = mongoose.model('Penalty', notificationSchema);