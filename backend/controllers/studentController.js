const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Book = require('../models/book');
const Borrow = require('../models/borrow');
const Penalty = require('../models/penalty');
const User = require('../models/user');

exports.getStudentDetails = async (req, res, next) => {
    const student = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        student
    })
}

exports.updateStudentDetails = async (req, res, next) => {
    // console.log(req.body.birthday)
    const birthdate = new Date(req.body.birthday)
    console.log(birthdate)
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
    // console.log(data)
    // const student = await User.findByIdAndUpdate(req.params.id, data);
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
    // console.log(req.user.id);
    // when returned status, remove from book borrow page
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
                select: 'title',
            }
        );
    // console.log(studentborrowbooks);
    // if(!studentborrowbook) {
    //     return next(new ErrorHandler('Student Borrow Book not found',404));
    // }
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
                select: 'title',
            }
        );
    // console.log(studentborrowbooks);
    // if(!studentborrowbook) {
    //     return next(new ErrorHandler('Student Borrow Book not found',404));
    // }
    res.status(200).json({
        success: true,
        studentappointmentbook
    })
}

exports.checkPenalty = async (req, res, next) => {
    let penalty = {}
    const borrow = await Borrow.findOne({ userId: req.user.id })
    console.log(borrow)
    console.log(borrow.dueDate)

    if (!borrow) {
        return next(new ErrorHandler('Book not found', 404));
    }
    else {
        penalty = await Penalty.find({ userId: req.user.id })
        if (!penalty) {
            const dueDate = borrow.dueDate.getTime()
            const today = new Date().getTime()

            const time_due = today - dueDate
            var Difference_In_Days = Math.round(time_due / (1000 * 3600 * 24));

            console.log(Difference_In_Days)
            if (Difference_In_Days <= 0) {
                console.log("no penalty")
            }
            else {
                total_Penalty = Difference_In_Days * 10
                console.log(total_Penalty)
                penalty = await Penalty.create({
                    userId: req.user.id,
                    penalty: total_Penalty
                })

            }
        }
        else {
            const dueDate = borrow.dueDate.getTime()
            const today = new Date().getTime()

            const time_due = today - dueDate
            var Difference_In_Days = Math.round(time_due / (1000 * 3600 * 24));
            total_Penalty = Difference_In_Days * 10
            
            penalty = await Penalty.findOneAndUpdate({userId: req.user.id},{
                penalty: total_Penalty
            })
        }
    }
    res.status(200).json({
        success: true,
        penalty
    })
}
