const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
const Book = require('../models/book');
const Accession = require('../models/accession');
const HistoryLog = require('../models/historylog')
const User = require('../models/user');

exports.getBooks = async (req, res, next) => {
    const book = await Book.find().populate('accession_numbers');
    res.status(200).json({
        success: true,
        book
    })
}

exports.createBook = async (req, res, next) => {
    console.log(req.body)
    let book = {}
    try {
        if (req.body.bookImage === '') {
            if (req.body.callNumberPrefix == 'Fil'){
                req.body.Fil = true
            } else if (req.body.callNumberPrefix == 'Ref'){
                req.body.Ref = true
            } else if (req.body.callNumberPrefix == 'Bio'){
                req.body.Bio = true
            } else if (req.body.callNumberPrefix == 'Fic'){
                req.body.Fic = true
            } else if (req.body.callNumberPrefix == 'Res'){
                req.body.Res = true
            } else {}

            const book = await Book.create(req.body);

        } else {
            const result = await cloudinary.v2.uploader.upload(req.body.bookImage, {
                folder: 'TUPT_Library/Books/' + req.body.title,
                width: 150,
                height: 150,
                crop: "scale"
            })
            
            req.body.book_image = {
                public_id: result.public_id,
                    url: result.secure_url
            }

            if (req.body.callNumberPrefix == 'Fil'){
                req.body.Fil = true
            } else if (req.body.callNumberPrefix == 'Ref'){
                req.body.Ref = true
            } else if (req.body.callNumberPrefix == 'Bio'){
                req.body.Bio = true
            } else if (req.body.callNumberPrefix == 'Fic'){
                req.body.Fic = true
            } else if (req.body.callNumberPrefix == 'Res'){
                req.body.Res = true
            } else {}

            const book = await Book.create(req.body);
        }

        const nowDate = new Date();
        const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
        const user = await User.findById(req.user._id);
        const formatDate = nowDate.toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
            hour12: true
        })
        const history = await HistoryLog.create({
            userId: user._id,
            historylogText: user.name + ' added a book "' + book.title + '", on ' + newDate,
            historylogDate: formatDate,
            historylogType: 'Create'
        });

        res.status(201).json({
            success: true,
            book,
            history
        });

    } catch (err) {
        console.log(err)
    }
};

exports.getSingleBook = async (req, res, next) => {
    const BookDetails = await Book.findById(req.params.id);
    if (!BookDetails) {
        return next(new ErrorHandler('Book not found', 404));
    }
    res.status(200).json({
        success: true,
        BookDetails
    })
}

exports.updateBook = async (req, res, next) => {
    const check_book = await Book.findById(req.params.id);
    let book = {}
    try {
        if (!check_book) {
            return next(new ErrorHandler('Book not found', 404));
        }
        if (req.body.bookImage === '') {

            const callNumberPrefix = req.body.callNumberPrefix
            if (req.body.callNumberPrefix == "Fil") {
                req.body.Fil = 1
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Ref") {
                req.body.Fil = 0
                req.body.Ref = 1
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Bio") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 1
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Fic") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 1
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Res") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 1
            }

            book = await Book.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            })
        }

        else {
            const result = await cloudinary.v2.uploader.upload(req.body.bookImage, {
                folder: 'TUPT_Library/Books/' + req.body.title,
                width: 150,
                height: 150,
                crop: "scale"
            })

            req.body.book_image = {
                public_id: result.public_id,
                    url: result.secure_url
            }

            if (req.body.callNumberPrefix == "Fil") {
                req.body.Fil = 1
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Ref") {
                req.body.Fil = 0
                req.body.Ref = 1
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Bio") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 1
                req.body.Fic = 0
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Fic") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 1
                req.body.Res = 0
            } else if (req.body.callNumberPrefix == "Res") {
                req.body.Fil = 0
                req.body.Ref = 0
                req.body.Bio = 0
                req.body.Fic = 0
                req.body.Res = 1
            }

            book = await Book.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            })
        }
        //create history Log
        const nowDate = new Date();
        const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
        const user = await User.findById(req.user._id);
        const formatDate = nowDate.toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
            hour12: true
        })
        const history = await HistoryLog.create({
            userId: user._id,
            historylogText: user.name + " updated a Book titled: " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        });

        res.status(200).json({
            success: true,
            book,
            history
        })
    } catch (err) {
        console.log(err)
    }
}

exports.deleteBook = async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }
    await book.remove();
    //create history Log
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const user = await User.findById(req.user._id);
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " deleted a Book titled: " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Book deleted',
        history
    })
}

exports.createBookAccession = async (req, res, next) => {
    // const all_accession = []
    const accession_number = req.body.accession

    const accession = await Accession.create({
        accession_number: accession_number,
        on_shelf: 1,
        out: 0
    })

    console.log(accession)
    console.log(accession._id)

    const book = await Book.updateOne({ _id: req.body.bookId }, { $push: { accession_numbers: accession._id } })

    // console.log(accession)
    // console.log(book)

    res.status(200).json({
        success: true,
        message: 'Accession Added',
        accession
    })
}

exports.singleBookAccession = async (req, res, next) => {
    const getbook_accessions = await Book.findById(req.params.id).populate({
        path: 'accession_numbers',
    }).select('accession_number -_id')

    const bookAccessions = getbook_accessions.accession_numbers


    res.status(200).json({
        success: true,
        bookAccessions
    })
}

exports.editBookAccession = async (req, res, next) => {

}

exports.deleteBookAccession = async (req,res,next) => {
    const accession = await Accession.findById(req.params.id);
    if (!accession) {
        return next(new ErrorHandler('History Log not found', 404));
    }
    await accession.remove();

    const book = await Book.updateOne({ _id: req.body.bookId }, { $pull: { accession_numbers: accession._id } })

    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const user = await User.findById(req.user._id);
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " deleted a Book accession from " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Book deleted',
        history
    })
}