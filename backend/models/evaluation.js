const mongoose = require('mongoose')

const evaluationSchema = new mongoose.Schema({
    ia: {
        type: Boolean,
        required: true,
    },
    dv: {
        type: Date,
    },
    tr: {
        type: String,
    },
    yl: {
        type: String,
    },
    course: {
        type: String,
    },
    gender: {
        type: String,
    },
    sra: {
        type: String,
    },
    lav: {
        type: String,
    },
    clean: {
        type: String,
    },
    ho: {
        type: String,
    },
    brb: {
        type: String,
    },
    opac: {
        type: String,
    },
    bc: {
        type: String,
    },
    pc: {
        type: String,
    },
    tps: {
        type: String,
    },
    er: {
        type: String,
    },
    skaq: {
        type: String,
    },
    css: {
        type: String,
    },

})
module.exports = mongoose.model('Evalutation', evaluationSchema);