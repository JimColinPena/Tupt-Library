const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Book = require('../models/book');
const Accession = require('../models/accession');
const HistoryLog = require('../models/historylog')
const User = require('../models/user');

exports.getBooks = async (req, res, next) => {
    const book = await Book.find();
    res.status(200).json({
        success: true,
        book
    })
}

exports.createBook = async (req, res, next) => {
    const all_accession = []

    const accession = req.body.accession
    console.log(accession)
    const accession_count = accession.length
    console.log(accession_count)

    for (let i = 0; accession_count > i; i++) {
        accessions = await Accession.create({
            accession_number: accession[i],
            on_shelf: 1,
            out: 0
        })
        all_accession.push(accessions._id)
    }

    const newBookData = {
        title: req.body.title,
        responsibility: req.body.responsibility,
        uniform_title: req.body.uniform_title,
        parallel_title: req.body.parallel_title,
        main_author: req.body.main_author,
        other_author: req.body.other_author,
        contributors: req.body.contributors,
        corp_author: req.body.corp_author,
        placePub: req.body.placePub,
        publisher: req.body.publisher,
        yearPub: req.body.yearPub,
        edition: req.body.edition,
        pages: req.body.pages,
        other_details: req.body.other_details,
        dimension: req.body.dimension,
        series: req.body.series,
        gen_notes: req.body.gen_notes,
        isbn: req.body.isbn,
        call_number: req.body.call_number,
        languange: req.body.languange,
        location: req.body.location,
        entered_by: req.body.entered_by,
        updated_by: req.body.updated_by,
        date_entered: req.body.date_entered,
        date_updated: req.body.date_updated,
        copy: req.body.copy,
        on_shelf: req.body.on_shelf,
        out: req.body.out,
        times_out: req.body.times_out,
        subject: req.body.subjects,
        content_notes: req.body.content_notes,
        abstract: req.body.abstract,
        reviews: req.body.reviews
    }


    const callNumberPrefix = req.body.callNumberPrefix

    if (callNumberPrefix == "Fil") {
        newBookData.Fil = 1
    } else if (callNumberPrefix == "Ref") {
        newBookData.Ref = 1
    } else if (callNumberPrefix == "Bio") {
        newBookData.Bio = 1
    } else if (callNumberPrefix == "Fic") {
        newBookData.Fic = 1
    } else if (callNumberPrefix == "Res") {
        newBookData.Res = 1
    }

    const book = await Book.create(newBookData);

    for (let i = 0; all_accession > i; i++) {
        await Book.findByIdAndUpdate(book._id, { $push: { accession_number: all_accession[i] } })
    }

    await Book.findByIdAndUpdate(book._id, { $push: { accession_number: all_accession } })
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + ' added a book "' + book.title + '", on ' + newDate,
            historylogDate: formatDate,
            historylogType: 'Create'
        }
    );
    res.status(201).json({
        success: true,
        book,
        history
    });
};

exports.getSingleBook = async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }
    res.status(200).json({
        success: true,
        book
    })
}

exports.updateBook = async (req, res, next) => {

    let book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    const newBookData = {
        title: req.body.title,
        responsibility: req.body.responsibility,
        uniform_title: req.body.uniform_title,
        parallel_title: req.body.parallel_title,
        main_author: req.body.main_author,
        other_author: req.body.other_author,
        contributors: req.body.contributors,
        corp_author: req.body.corp_author,
        placePub: req.body.placePub,
        publisher: req.body.publisher,
        yearPub: req.body.yearPub,
        edition: req.body.edition,
        pages: req.body.pages,
        other_details: req.body.other_details,
        dimension: req.body.dimension,
        acc_materials: req.body.acc_materials,
        series: req.body.series,
        gen_notes: req.body.gen_notes,
        isbn: req.body.isbn,
        call_number: req.body.call_number,
        accession: req.body.accession,
        languange: req.body.languange,
        location: req.body.location,
        electronic_access: req.body.electronic_access,
        entered_by: req.body.entered_by,
        updated_by: req.body.updated_by,
        date_entered: req.body.date_entered,
        date_updated: req.body.date_updated,
        copy: req.body.copy,
        on_shelf: req.body.on_shelf,
        out: req.body.out,
        times_out: req.body.times_out,
        subject: req.body.subjects,
        content_notes: req.body.content_notes,
        abstract: req.body.abstract,
        reviews: req.body.reviews
    }


    const callNumberPrefix = req.body.callNumberPrefix
    if (callNumberPrefix == "Fil") {
        newBookData.Fil = 1
        newBookData.Ref = 0
        newBookData.Bio = 0
        newBookData.Fic = 0
        newBookData.Res = 0
    } else if (callNumberPrefix == "Ref") {
        newBookData.Fil = 0
        newBookData.Ref = 1
        newBookData.Bio = 0
        newBookData.Fic = 0
        newBookData.Res = 0
    }
    else if (callNumberPrefix == "Bio") {
        newBookData.Fil = 0
        newBookData.Ref = 0
        newBookData.Bio = 1
        newBookData.Fic = 0
        newBookData.Res = 0
    } else if (callNumberPrefix == "Fic") {
        newBookData.Fil = 0
        newBookData.Ref = 0
        newBookData.Bio = 0
        newBookData.Fic = 1
        newBookData.Res = 0
    } else if (callNumberPrefix == "Res") {
        newBookData.Fil = 0
        newBookData.Ref = 0
        newBookData.Bio = 0
        newBookData.Fic = 0
        newBookData.Res = 1
    }

    book = await Book.findByIdAndUpdate(req.params.id, newBookData, {
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
            historylogText: user.name + " updated a Book titled: " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        }
    );

    res.status(200).json({
        success: true,
        book,
        history
    })
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
    const all_accession = []
    const accession = req.body.accession
    const accession_count = accession.length
    for (let i = 0; accession_count > i; i++) {
        accessions = await Accession.create({
            accession_number: accession[i],
            on_shelf: 1,
            out: 0
        })
        all_accession.push(accessions._id)
    }

    const book = await Book.updateOne({ _id: req.body.bookId }, { $push: { accession_number: all_accession } })

    res.status(200).json({
        success: true,
        message: 'Accession Added',
        book
    })
}