const mongoose = require('mongoose')

const historylogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    historylogText: {
        type: String,
        maxLength: [500, 'Status cannot exceed 100 characters']
    },
    historylogDate: {
        type: String,
    },
    historylogType: {
        type: String,
        enum: {
            values: ['Approve', 'Decline', 'Create', 'Update', 'Delete', 'Return'],
            message: 'There is error on proccessing this input'
        }
    }
})
module.exports = mongoose.model('Historylog', historylogSchema);