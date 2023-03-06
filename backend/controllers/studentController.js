const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Book = require('../models/book');
const Borrow = require('../models/borrow');
const User = require('../models/user');
const Penalty = require('../models/penalty');

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
    // const book = await Book.find();
    const apiFeatures = new APIFeatures(Book.find(),req.query).filter();
    const studentbook = await apiFeatures.query

    studentbook.map(b =>{
        let new_callnumber = ""
        if (b.Fil == true) { 
            new_callnumber = "FIL "+ b.call_number
        } else if (b.Ref == true) {
            new_callnumber = "REF "+ b.call_number
        } else if (b.Bio == true) {
            new_callnumber = "BIO "+ b.call_number
        } else if (b.Res == true) {
            new_callnumber = "RES "+ b.call_number
        } else {
            new_callnumber = "N/A "+ b.call_number
        }
        // console.log(new_callnumber)
        b.new_callnumber = new_callnumber
    })

    const yearPub = await Book.find().select('yearPub -_id')

    let yearPub_val = []
    yearPub.forEach(y => {
        yearPub_val.push(y.yearPub)
    });

    let formattedYearPubArr = yearPub_val.map(Number)

    const lowestYearPub = Math.min(...formattedYearPubArr)
    console.log(lowestYearPub)

    const highestYearPub = Math.max(...formattedYearPubArr)
    console.log(highestYearPub)

    const bookSubjects = await Book.distinct('subjects')

    console.log(bookSubjects)

    res.status(200).json({
        success: true,
        studentbook,
        lowestYearPub,
        highestYearPub,
        bookSubjects
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

exports.studentPenalty = async (req, res, next) => {
    const penalties = await Penalty.findOne({userId: req.user.id}).populate({path: 'userId'});

    res.status(200).json({
        success: true,
        penalties
    })
}