const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Borrow = require('../models/borrow');
const Book = require('../models/book');
const User = require('../models/user');

exports.borrowBook = async (req, res, next) => {
    console.log(req.body);
    const checkAvailability = await Borrow.find({ userId: req.body.userId});

    // console.log(checkAvailability);

    if (checkAvailability.length == 0) {

        // console.log('no items');
        await Book.findByIdAndUpdate(req.body.bookId, { $inc: { copy: -1, on_shelf: -1, out: 1 } })


        const newBorrowData = {
            userId: req.body.userId,
            bookId: req.body.bookId,
            status: "To Confirm"
        }
        console.log(newBorrowData)
        const borrowbook = await Borrow.create(newBorrowData);

        res.status(201).json({
            success: true,
            borrowbook
        });
    }
    else {
        // console.log(checkAvailability._id);

        // update borroow object and append bookId
        await Book.findByIdAndUpdate(req.body.bookId, { $inc: { copy: -1, on_shelf: -1, out: 1 } })
        const borrowbook = await Borrow.updateOne(
            { userId: req.body.userId },
            { $push: { bookId: req.body.bookId } },
            { status: "To Confirm" }
        );

        res.status(201).json({
            success: true,
            borrowbook
        });
    }

};

exports.checkBorrowBook = async (req, res, next) => {
    const currentUserId = req.body.userId;
    const currrentBookId = req.body.bookId;
    let checkvar = false;
    let approvevar = false;
    let pendingvar = false;

    const borrow = await Borrow.find({ userId: currentUserId, bookId: currrentBookId });
    const approveBook = await Borrow.find({ userId: currentUserId, status: "Accepted" });
    const pendingBook = await Borrow.find({ userId: currentUserId }, 'bookId');

    // query to check is the book is currently requested or in possession of the user
    if (borrow.length == 0) {
        checkvar = false;
    }
    else {
        checkvar = true;
    }

    // query to check if the user has aproved book request
    if (approveBook.length == 0) {
        approveBookvar = false;
    }
    else {
        approvevar = true;
    }

    // query to check if the user have more than 3 books
    // console.log(pendingBook.length)
    if (pendingBook.length > 0) {
        if (pendingBook[0].bookId.length < 3) {
            // console.log(pendingBook[0].bookId.length)
            // console.log(pendingBook[0].bookId.length)
            pendingvar = false;
        }
        else {
            // console.log(pendingBook[0].bookId.length)
            pendingvar = true;
        }
    }
    else {
        // console.log('null ito')
    }


    checkbook = {
        check: checkvar,
        approve: approvevar,
        pendinglimit: pendingvar
    }

    res.status(201).json({
        success: true,
        checkbook
    });

};

exports.cancelBorrowBook = async (req, res, next) => {


    const currentUserId = req.body.userId;
    const currrentBookId = req.body.bookId;
    console.log(currentUserId)
    console.log(currrentBookId)
    const borrow = await Borrow.findOne({ userId: req.body.userId });
    const borrowcount = borrow.bookId.length
    // console.log(borrowcount)
    if (borrowcount <= 1) {
        await Book.findByIdAndUpdate(req.body.bookId, { $inc: { copy: 1, on_shelf: 1, out: -1 } })
        const cancelbook = await Borrow.findOneAndDelete({ userId: req.body.userId })
        res.status(201).json({
            success: true,
            cancelbook
        });
    }
    else {
        await Book.findByIdAndUpdate(req.body.bookId, { $inc: { copy: 1, on_shelf: 1, out: -1 } })
        const cancelbook = await Borrow.findOneAndUpdate(
            { userId: req.body.userId },
            { $pull: { bookId: req.body.bookId } }
        )
        console.log(cancelbook)
        res.status(201).json({
            success: true,
            cancelbook
        });
    }
};

exports.confirmBorrowBook = async (req, res, next) => {
    // console.log(req.body.appointmentDate, req.body.dueDate)

    const borrowbook = await Borrow.updateOne(
        { userId: req.body.userId },
        { status: "Pending", appointmentDate: req.body.appointmentDate, dueDate: req.body.dueDate }
    );

    res.status(201).json({
        success: true,
        borrowbook
    });

};

exports.cancelAllBorrowBook = async (req, res, next) => {


    const currentUserId = req.body.userId;
    console.log(currentUserId)
    const copyCount = await Borrow.findOne({ userId: req.body.userId }).select('bookId')
    console.log(copyCount.bookId)

    for (let i = 0; i < copyCount.bookId.length; i++) {
        // console.log(copyCount.bookId[i])
        test = await Book.findByIdAndUpdate(copyCount.bookId[i], { $inc: { copy: 1, on_shelf: 1, out: -1 } })
        // console.log(test)
    }

    //fetch array of booki id and lopp for each book Id to increment copy count
    // await Book.findByIdAndUpdate(req.body.bookId, {$inc: {copy: 1}})
    // also remove 1 to onsgelf and add 1 to out

    const cancelbook = await Borrow.findOneAndDelete(
        { userId: req.body.userId }

    )

    res.status(201).json({
        success: true
    });

};

exports.getBorrowedBooksLength = async (req,res,next) => {
    const test = await Borrow.find({status: 'Accepted'});
    const borrowedbooksLength = test.length;
    console.log(borrowedbooksLength)

    res.status(200).json({
        success: true,
        borrowedbooksLength
    })
}

exports.getPendingRequests = async (req,res,next) => {
    const test = await Borrow.find({status: 'Pending'});
	const pendingRequests = test.length;
    console.log(pendingRequests)
    res.status(200).json({
        success: true,
        pendingRequests
    })
}

exports.getPendingUsersLength = async (req,res,next) => {
    const test = await User.find({status: 'inactive'});
	const pendingUsers = test.length;
    console.log(pendingUsers)
    res.status(200).json({
        success: true,
        pendingUsers
    })
}
