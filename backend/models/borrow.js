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
    accessions: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Accession'
    }],
    borrower_role: {
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