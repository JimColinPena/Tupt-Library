const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Personnel = require('../models/personnel');
const User = require('../models/user');
const Borrow = require('../models/borrow');
const Book = require('../models/book');
const Return = require('../models/return');
const HistoryLog = require('../models/historylog');
const Notification = require('../models/notification');

const { constants } = require('crypto');
const borrow = require('../models/borrow');

exports.getPersonnel = async (req, res, next) => {
    const personnel = await User.find({ $or: [{ role: 'admin' }, { role: 'personnel' }] });
    res.status(200).json({
        success: true,
        personnel
    })
}

exports.createPersonnel = async (req, res, next) => {
    // console.log(req.body);
    const newPersonnelData = {
        id_number: req.body.id_number,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
    }
    // console.log(newPersonnelData)
    const personnel = await User.create(newPersonnelData);
    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +" added a personnel named: "+ req.body.name+ ", on "+ newDate,
            historylogDate: formatDate,
            historylogType: 'Create'
        }
    );
    
    console.log(history);
    res.status(201).json({
        success: true,
        personnel,
        history
    });
};

exports.getSinglePersonnel = async (req, res, next) => {
    const personnel = await User.findById(req.params.id);

    if (!personnel) {
        return next(new ErrorHandler('Personnel not found', 404));
    }
    res.status(200).json({
        success: true,
        personnel
    })
}

exports.updatePersonnel = async (req, res, next) => {
    let personnel = await User.findById(req.params.id);

    const newPersonnelData = {
        id_number: req.body.id_number,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address,
        email: req.body.email
    }
    if (!personnel) {
        return next(new ErrorHandler('Personnel not found', 404));
    }

    personnel = await User.findByIdAndUpdate(req.params.id, newPersonnelData, {
        new: true,
        runValidators: true,
    })
    
    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +" updated a personnel named: "+ req.body.name+ ", on "+ newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        }
    );
    
    console.log(history);
    res.status(200).json({
        success: true,
        personnel,
        history
    })
}

exports.deletePersonnel = async (req, res, next) => {
    // const personnel = await User.findById(req.params.id);
    // console.log(personnel)

    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +" deleted a personnel named: "+ req.body.name+ ", on "+ newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );
    
    console.log(history);

    const personnel = await User.findById(req.params.id);
    if (!personnel) {
        return next(new ErrorHandler('Personnel not found', 404));
    }
    await personnel.remove();
    res.status(200).json({
        success: true,
        message: 'Personnel deleted',
        history
    })
}

exports.getActiveStudent = async (req, res, next) => {
    const active_students = await User.find({ role: 'student', status: 'active' });
    res.status(200).json({
        success: true,
        active_students
    })
}

exports.getInactiveStudent = async (req, res, next) => {
    const inactive_students = await User.find({ role: 'student', status: 'inactive' });
    res.status(200).json({
        success: true,
        inactive_students
    })
}

exports.getSingleStudent = async (req, res, next) => {
    const student = await User.findById(req.params.id);

    if (!student) {
        return next(new ErrorHandler('Student not found', 404));
    }
    res.status(200).json({
        success: true,
        student
    })
}

exports.updateStudent = async (req, res, next) => {
    let student = await User.findById(req.params.id);
    const newStudentData = {
        id_number: req.body.id_number,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address,
        email: req.body.email
    }
    if (!student) {
        return next(new ErrorHandler('Student not found', 404));
    }

    student = await User.findByIdAndUpdate(req.params.id, newStudentData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        student
    })
}

exports.approveStudent = async (req, res, next) => {
    let student = await User.findById(req.params.id);
    
    // const newStudentData = {
    //     status: 'active'
    // }
    if (!student) {
        return next(new ErrorHandler('Student not found', 404));
    }

    student = await User.findByIdAndUpdate(req.params.id, { status: 'active' }, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    
    res.status(200).json({
        success: true,
        student
    })
}

exports.deleteStudent = async (req, res, next) => {
    // const test = await History.deleteMany({});
    // console.log(req.params.id)
    const student = await User.findById(req.params.id);
    console.log(student)
    if (!student) {
        return next(new ErrorHandler('Student not found', 404));
    }
    await student.remove();
    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +" deleted a student named: "+ student.name+ ", on "+ newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );
    
    console.log(history);

    res.status(200).json({
        success: true,
        message: 'Student deleted',
        history
    })
}

exports.getBorrowers = async (req, res, next) => {
    const borrower = await Borrow.find({ status: 'Pending' }).populate(
        [
            {
                path: 'userId',
                select: 'name',
            },
            {
                path: 'bookId',
                select: 'title',
            },
        ]
    );
    // console.log(borrower)
    res.status(200).json({
        success: true,
        borrower
    })
}

exports.acceptAppointment = async (req, res, next) => {
    const date = new Date().getDate();
    let borrower = await Borrow.findById(req.params.id);

    if (!borrower) {
        return next(new ErrorHandler('Borrower not found', 404));
    }

    const statusData = {
        status: 'Accepted'
    }
    borrower = await Borrow.findByIdAndUpdate(req.params.id, statusData)

    const userId = borrower.userId;
    const newBorrower = await User.findById(userId)

    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +" approved a borrowing request by "+ newBorrower.name+ ", on "+ newDate,
            historylogDate: formatDate,
            historylogType: 'Approve'
        }
    );
    
    console.log(history);

    res.status(200).json({
        success: true,
        borrower,
        history
    })
}

exports.declineAppointment = async (req, res, next) => {
    const date = new Date().getDate();
    let borrower = await Borrow.findById(req.params.id);

    if (!borrower) {
        return next(new ErrorHandler('Borrower not found', 404));
    }

    // const statusData = {
    //     status: 'Declined'
    // }
    borrower = await Borrow.findByIdAndDelete(req.params.id)
    const userId = borrower.userId;
    const newBorrower = await User.findById(userId)

    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +" declined a borrowing request by "+ newBorrower.name+ ", on "+ newDate,
            historylogDate: formatDate,
            historylogType: 'Decline'
        }
    );
    
    console.log(history);

    res.status(200).json({
        success: true,
        borrower,
        history
    })
}

exports.getBorrowedBoooks = async (req, res, next) => {
    const borrowedbooks = await Borrow.find({ status: 'Accepted' }).populate([
        {
            path: 'userId',
            select: ['name', 'id_number', 'gender', 'email', 'contact']
        },
        {
            path: 'bookId',
            select: 'title',
        }
    ]);
    res.status(200).json({
        success: true,
        borrowedbooks
    })
}

exports.getReturnedBooks = async (req, res, next) => {
    
    const returnedbooks = await Return.find().populate(
        [
            {
                path: 'userId',
                select: ['name', 'email', 'contact', 'id_number'],
                // select: 'title',
            },
            {
                path: 'bookId',
                select: 'title',
            },
            {
                path: 'returnedTo',
                select: 'name',
            },
        ]
    );
    // console.log(returnedbooks)
    res.status(200).json({
        success: true,
        returnedbooks
    })
}

exports.returnBook = async (req, res, next) => {
    let borrower = await Borrow.findById(req.params.id);
    const date = new Date().getDate();
    if (!borrower) {
        return next(new ErrorHandler('Borrowed books not found', 404));
    }

    const userdata = await Borrow.findById(req.params.id)
    const userId = userdata.userId
    const bookId = userdata.bookId
    
    const borrow = await Borrow.findById(req.params.id).select('bookId')
    const bookArray = borrow.bookId
    const returnedDate = new Date();

    const returndata = {
        userId: userId,
        bookId: bookArray,
        returnedDate: returnedDate,
        returnedTo: req.user.id

    }
    // console.log(returndata)
    await Return.create(returndata)

    const copyCount = await Borrow.findById(req.params.id).select('bookId')
    // console.log(copyCount.bookId)

    for (let i = 0; i < copyCount.bookId.length; i++) {
        // console.log(copyCount.bookId[i])
        test = await Book.findByIdAndUpdate(copyCount.bookId[i], { $inc: { copy: 1, on_shelf: 1, out: -1 } })
        // console.log(test)
    }

    await Borrow.findByIdAndDelete(req.params.id);

    const newBorrower = await User.findById(userId)
    const bookBorrowed = await Book.findById(bookId)
    // console.log(newBorrower);

    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: newBorrower.name +' returned a book "'+ bookBorrowed.title+ '", on '+ newDate,
            historylogDate: formatDate,
            historylogType: 'Return'
        }
    );
    
    console.log(history);

    res.status(200).json({
        success: true,
        borrower,
        history
    })
}

exports.declineBook = async (req, res, next) => {
    let borrower = await Borrow.findById(req.params.id);
    if (!borrower) {
        return next(new ErrorHandler('Borrowed books not found', 404));
    }

    const userdata = await Borrow.findById(req.params.id)
    const userId = userdata.userId
    const bookId = userdata.bookId

    const copyCount = await Borrow.findById(req.params.id).select('bookId')

    for (let i = 0; i < copyCount.bookId.length; i++) {
        test = await Book.findByIdAndUpdate(copyCount.bookId[i], { $inc: { copy: 1, on_shelf: 1, out: -1 } })
    }

    await Borrow.findByIdAndDelete(req.params.id);

    const newBorrower = await User.findById(userId)

    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +' decline a book appointment from '+ newBorrower.name+ ', on '+ newDate + ' due to book(s) not picked up on date',
            historylogDate: formatDate,
            historylogType: 'Decline'
        }
    );
    
    console.log(history);

    res.status(200).json({
        success: true,
        borrower,
        history
    })
}


exports.getUserDetails = async (req, res, next) => {
    // console.log(req.params.id)
    // const userdetail = await Return.findOne({userId: req.params.id})
    // let returnedBooks = ""
    const getUserInfo = await User.findById(req.params.id)
    const getReturnedBooks = await Return.find({ userId: req.params.id }).populate(
        {
            path: 'bookId',
            select: 'title',
             }
    );
    // if (!getUserInfo) {
    //     getUserInfo = null;
    // }

    if (!getReturnedBooks) {
        getReturnedBooks ==  null;
    }

    const userdetail = {
        userinfo: getUserInfo,
        returnedBooks: getReturnedBooks
    }
    
    res.status(200).json({
        success: true,
        userdetail
    })
}

exports.getHistoryLog = async (req,res,next) => {
    const history = await HistoryLog.find();
    res.status(200).json({
        success: true,
        history
    })
}

exports.deleteHistoryLog = async (req,res,next) => {
    const history = await HistoryLog.findById(req.params.id);
    if (!history) {
        return next(new ErrorHandler('History Log not found', 404));
    }
    await history.remove();

    console.log('Successfully Deleted');
    
    res.status(200).json({
        success: true,
        message: 'History Log deleted'
    })
}

exports.changeDueDate = async (req, res, next) => {
    const date = new Date();
    const borrowerId = await Borrow.findById(req.body.borrowId)
    const personnel = await User.findById(req.user.id)

    // console.log(req.body)
    console.log(req.body.dueDate)
    const borrow = await Borrow.findByIdAndUpdate(req.body.borrowId, {dueDate: req.body.dueDate, accession: req.body.accession})

    console.log(borrow)
    const notification = await Notification.create({
        sender: req.user.id,
        receiver: borrowerId.userId,
        notificationType: 'Others',
        notificationText: 'Personnel:'+personnel.name+' has changed your duedate to '+req.body.dueDate+' with a reason of: '+req.body.reason,
        notificationDate: date,
        deliveryStatus: 'Delivered',

    })

    res.status(200).json({
        success: true,
        notification
    })
}