const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const User = require('../models/user');
const Borrow = require('../models/borrow');
const Book = require('../models/book');
const Return = require('../models/return');
const HistoryLog = require('../models/historylog');
const Notification = require('../models/notification');
const Penalty = require('../models/penalty');

exports.getPersonnel = async (req, res, next) => {
    const personnel = await User.find({ $or: [{ role: 'admin' }, { role: 'personnel' }] });
    res.status(200).json({
        success: true,
        personnel
    })
}

exports.createPersonnel = async (req, res, next) => {
    const newPersonnelData = {
        id_number: req.body.id_number,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        role: 'personnel'
    }
    const personnel = await User.create(newPersonnelData);
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " added a personnel named: " + req.body.name + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Create'
        }
    );

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
    if (!personnel) {
        return next(new ErrorHandler('Personnel not found', 404));
    }
    const newPersonnelData = {
        id_number: req.body.id_number,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address,
        email: req.body.email
    }
    personnel = await User.findByIdAndUpdate(req.params.id, newPersonnelData, {
        new: true,
        runValidators: true,
    })

    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " updated a personnel named: " + req.body.name + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        }
    );

    res.status(200).json({
        success: true,
        personnel,
        history
    })
}

exports.deletePersonnel = async (req, res, next) => {
    //creation of history log is executed first because deleting the object will remove all necessary for history log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " deleted a personnel named: " + req.body.name + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );

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
    const active_students = await User.find({ role: 'student' });
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
    if (!student) {
        return next(new ErrorHandler('Student not found', 404));
    }
    const newStudentData = {
        id_number: req.body.id_number,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address,
        email: req.body.email
    }
    student = await User.findByIdAndUpdate(req.params.id, newStudentData, {
        new: true,
        runValidators: true,
    })
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " updated a student named: " + req.body.name + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        }
    );

    res.status(200).json({
        success: true,
        student
    })
}

exports.deleteStudent = async (req, res, next) => {
    const student = await User.findById(req.params.id);
    if (!student) {
        return next(new ErrorHandler('Student not found', 404));
    }
    //creation of history log is executed first because deleting the object will remove all necessary for history log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " deleted a student named: " + student.name + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );

    await student.remove();

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
    res.status(200).json({
        success: true,
        borrower
    })
}

exports.acceptAppointment = async (req, res, next) => {
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
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " approved a borrowing request by " + newBorrower.name + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Approve'
        }
    );


    res.status(200).json({
        success: true,
        borrower,
        history
    })
}

exports.declineAppointment = async (req, res, next) => {
    // const test = req.params.id ;
    const copyCount = await Borrow.findOne({ _id: req.params.id }).select('bookId')
    // console.log(test, copyCount)
    // loop all book from the borrow bookId array and restore on_shelf value while decrementing out value
    for (let i = 0; i < copyCount.bookId.length; i++) {
        test = await Book.findByIdAndUpdate(copyCount.bookId[i], { $inc: { on_shelf: 1, out: -1 } })
    }

    let borrower = await Borrow.findById(req.params.id);
    if (!borrower) {
        return next(new ErrorHandler('Borrower not found', 404));
    }
    borrower = await Borrow.findByIdAndDelete(req.params.id)

    const userId = borrower.userId;
    const newBorrower = await User.findById(userId)
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " declined a borrowing request by " + newBorrower.name + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Decline'
        }
    );

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
            select: ['title', 'accession_numbers'],
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

    res.status(200).json({
        success: true,
        returnedbooks
    })
}

exports.returnBook = async (req, res, next) => {
    let borrower = await Borrow.findById(req.params.id);
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
    await Return.create(returndata)
    const copyCount = await Borrow.findById(req.params.id).select('bookId')
    for (let i = 0; i < copyCount.bookId.length; i++) {
        test = await Book.findByIdAndUpdate(copyCount.bookId[i], { $inc: { on_shelf: 1, out: -1 } })
    }
    await Borrow.findByIdAndDelete(req.params.id);

    const newBorrower = await User.findById(userId)
    const bookBorrowed = await Book.findById(bookId)
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: newBorrower.name + ' returned a book "' + bookBorrowed.title + '", on ' + newDate,
            historylogDate: formatDate,
            historylogType: 'Return'
        }
    );

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
    const copyCount = await Borrow.findById(req.params.id).select('bookId')
    for (let i = 0; i < copyCount.bookId.length; i++) {
        test = await Book.findByIdAndUpdate(copyCount.bookId[i], { $inc: { on_shelf: 1, out: -1 } })
    }
    await Borrow.findByIdAndDelete(req.params.id);

    const newBorrower = await User.findById(userId)
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + ' decline a book appointment from ' + newBorrower.name + ', on ' + newDate + ' due to book(s) not picked up on date',
            historylogDate: formatDate,
            historylogType: 'Decline'
        }
    );

    res.status(200).json({
        success: true,
        borrower,
        history
    })
}


exports.getUserDetails = async (req, res, next) => {
    const getUserInfo = await User.findById(req.params.id)
    const getReturnedBooks = await Return.find({ userId: req.params.id }).populate(
        {
            path: 'bookId',
            select: 'title',
        }
    );

    if (!getReturnedBooks) {
        getReturnedBooks == null;
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

exports.getHistoryLog = async (req, res, next) => {
    // const history = await HistoryLog.find();
    const history = await HistoryLog.find().sort({ createdAt: 'descending' });
    res.status(200).json({
        success: true,
        history
    })
}

exports.deleteHistoryLog = async (req, res, next) => {
    const history = await HistoryLog.findById(req.params.id);
    if (!history) {
        return next(new ErrorHandler('History Log not found', 404));
    }
    await history.remove();

    res.status(200).json({
        success: true,
        message: 'History Log deleted',
        history
    })
}

exports.deleteAllHistoryLog = async (req, res, next) => {
    const history = await HistoryLog.find().deleteMany()

    res.status(200).json({
        success: true,
        message: 'All History Log Deleted',
        history
    })
}

exports.changeDueDate = async (req, res, next) => {
    const date = new Date();
    const borrowerId = await Borrow.findById(req.body.borrowId)
    const personnel = await User.findById(req.user.id)

    let borrow = {}
    // since this function is being used by two different button in which it is used for
    // changeing duedate and inserting accession number(s) this function will determine if the personnel changed the
    //duedate only so that it will create notification for the user that their duedate is change
    //due to unforseen/ special circumstances
    if (req.body.accession == "") {
        borrow = await Borrow.findByIdAndUpdate(req.body.borrowId, { dueDate: req.body.dueDate })
        await Notification.create({
            sender: req.user.id,
            receiver: borrowerId.userId,
            notificationType: 'Others',
            notificationText: 'Personnel:' + personnel.name + ' has changed your duedate to ' + req.body.dueDate + ' with a reason of: ' + req.body.reason,
            notificationDate: date,
            deliveryStatus: 'Delivered',
        })
    } else {
        borrow = await Borrow.findByIdAndUpdate(req.body.borrowId, { accession: req.body.accession })
    }

    res.status(200).json({
        success: true,
        borrow,
    })
}

exports.checkPenalty = async (req, res, next) => {
    let penalty = {}
    const today = new Date().getTime()

    //fetching all borrow object with status 'Accepted'
    const borrow = await Borrow.find({ status: 'Accepted' })

    //loop borrow collection 
    borrow.forEach(async data => {
        //check if there is existing penalty of user
        const penalty = await Penalty.findOne({ userId: data.userId })
        //check if there is existing penalty notification of user
        const notification = await Notification.findOne({ receiver: data.userId, notificationType: 'Penalty' })
        //fetching duedate into time
        const due_date = data.dueDate.getTime()
        //deduct the duedate from today's time and compute for the range of days
        const time_due = today - due_date
        var Difference_In_Days = Math.round((time_due / (1000 * 3600 * 24) + 1));

        if (!penalty) {
            //if there's no penalty object, determine if the due date is over due
            if (Difference_In_Days > 0) {
                //if the due date is indeed overdue, create a penalty object else, do nothing
                await Penalty.create({
                    userId: data.userId,
                    penalty: Difference_In_Days * 5
                })
            }
        } else {
            //if there is existing penalty, just update the penalty based on the number of overdue dates
            await Penalty.findByIdAndUpdate(penalty.id, {
                penalty: Difference_In_Days * 5
            })
        }

        //after determining the penalty, server wil then reate notification for user

        if (!notification) {
            //if there is no notification object create for penalty, determine the value of days from the due date
            if (Difference_In_Days == -1) {
                //if the duedate is tommorrow, create a notification taht will remind user that they have borrowed boos to be returned tomorrow
                await Notification.create({
                    sender: req.user.id,
                    receiver: data.userId,
                    notificationType: 'Penalty',
                    notificationText: 'This is a reminder that you have a borrowed book(s) that must be returned on ' + data.dueDate.getMonth + " " + data.dueDate.getDay + " " + data.dueDate.getFullYear,
                    notificationDate: today,
                    deliveryStatus: 'Delivered',
                })
            }
            else if (Difference_In_Days == 0) {
                //if the duedate is today, create a notification taht will remind user to return the book today
                await Notification.create({
                    sender: req.user.id,
                    receiver: data.userId,
                    notificationType: 'Penalty',
                    notificationText: 'This is a reminder that you have a borrowed book(s) that must be returned Today. Please return now to avoid any penalties, thank you!',
                    notificationDate: today,
                    deliveryStatus: 'Delivered',
                })
            }
            else if (Difference_In_Days > 0) {
                //if the duedate is overdue, create a notification taht will remind user that they have pending penalty to be cleared
                await Notification.create({
                    sender: req.user.id,
                    receiver: data.userId,
                    notificationType: 'Penalty',
                    notificationText: 'This is a reminder that you have a pending penalty to be cleared. Please check your penalty tab.',
                    notificationDate: today,
                    deliveryStatus: 'Delivered',
                })
            }
        } else {
            //if there is existing notification for penalty, deteremine if that notification is created today or not
            const notif_date = notification.notificationDate.getTime()
            const time_notif = today - notif_date
            var notif_frequency = Math.round((time_notif / (1000 * 3600 * 24) + 1));
            console.log(notif_frequency)
            if (notif_frequency != 0) {
                //if the created notification is not today, redo the sending notifaction for today
                if (Difference_In_Days == -1) {
                    await Notification.create({
                        sender: req.user.id,
                        receiver: data.userId,
                        notificationType: 'Penalty',
                        notificationText: 'This is a reminder that you have a borrowed book(s) that must be returned on ' + data.dueDate.getMonth + " " + data.dueDate.getDay + " " + data.dueDate.getFullYear,
                        notificationDate: today,
                        deliveryStatus: 'Delivered',
                    })
                }
                else if (Difference_In_Days == 0) {
                    await Notification.create({
                        sender: req.user.id,
                        receiver: data.userId,
                        notificationType: 'Penalty',
                        notificationText: 'This is a reminder that you have a borrowed book(s) that must be returned Today. Please return now to avoid any penalties, thank you!',
                        notificationDate: today,
                        deliveryStatus: 'Delivered',
                    })
                }
                else if (Difference_In_Days > 0) {
                    await Notification.create({
                        sender: req.user.id,
                        receiver: data.userId,
                        notificationType: 'Penalty',
                        notificationText: 'This is a reminder that you have a pending penalty to be cleared. Please check your penalty tab.',
                        notificationDate: today,
                        deliveryStatus: 'Delivered',
                    })
                }
            }
        }


    });
    res.status(200).json({
        success: true,
        penalty
    })
}

exports.getPenalty = async (req, res, next) => {
    const penalty = await Penalty.find();

    res.status(200).json({
        success: true,
        penalties
    })
}