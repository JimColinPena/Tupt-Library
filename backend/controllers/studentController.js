const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Book = require('../models/book');
const Borrow = require('../models/borrow');
const User = require('../models/user');

exports.getStudentDetails = async (req, res, next) => {
    const student = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        student
    })
}

exports.updateStudentDetails = async (req, res, next) => {
    const birthdate = new Date(req.body.birthday)
    const data = {
        id_number: req.body.id_number,
        name: req.body.name,
        course: req.body.course,
        section: req.body.section,
        birthday: birthdate,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address,
    }

    const student = await User.findByIdAndUpdate(req.params.id, data);
    res.status(200).json({
        success: true,
        student
    })
}


exports.getStudentBooks = async (req, res, next) => {
    const studentbook = await Book.find();
    res.status(200).json({
        success: true,
        studentbook
    })
}

exports.getSingleStudentBook = async (req, res, next) => {
    const studentbook = await Book.findById(req.params.id);
    if (!studentbook) {
        return next(new ErrorHandler('Book not found', 404));
    }
    res.status(200).json({
        success: true,
        studentbook
    })
}

exports.getStudentBorrowBook = async (req, res, next) => {

    const studentborrowbook = await Borrow.findOne(
        {
            'userId': req.user.id, $or: [
                { 'status': "To Confirm" },
                { 'status': "Pending" }
            ]
        }
    )
        .populate(
            {
                path: 'bookId',
                select: ['title', 'book_image'],
            }
        );

    res.status(200).json({
        success: true,
        studentborrowbook
    })
}

exports.getStudentAppointmentBook = async (req, res, next) => {
    const studentappointmentbook = await Borrow.findOne({ 'userId': req.user.id, 'status': "Accepted" })
        .populate(
            {
                path: 'bookId',
                select: ['title', 'book_image'],
            }
        );
    res.status(200).json({
        success: true,
        studentappointmentbook
    })
}

