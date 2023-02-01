const mongoose = require('mongoose')

const returnSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    bookId: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    }],
    course: {
        type: String,
    },
    returnedDate: {
        type: Date,
    },
    returnedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    
})
module.exports = mongoose.model('Return', returnSchema);