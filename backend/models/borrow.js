const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    bookId: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    }],
    accession: {
        type: String,
    },
    appointmentDate: {
        type: Date,
    },
    dueDate: {
        type: Date,
    },
    status: {
        type: String,
        maxLength: [100, 'Status cannot exceed 100 characters']
    }
})
module.exports = mongoose.model('Borrow', borrowSchema);