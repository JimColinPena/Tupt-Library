const mongoose = require('mongoose')

const accessionSchema = new mongoose.Schema({
    accession_number: {
        type: String,
    },
    on_shelf: {
        type: Boolean,
        default: 1
    },
    out: {
        type: Boolean,
        default: 0
    }
})
module.exports = mongoose.model('Accession', accessionSchema);