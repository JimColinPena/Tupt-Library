const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const Book = require('../models/book');
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
    // console.log(req.body);
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
        call_number: req.body.call_number[0] + " " + req.body.call_number[1],
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
        // bookId: req.body.bookId,
        subject: req.body.subject,
        content_notes: req.body.content_notes,
        abstract: req.body.abstract,
        reviews: req.body.reviews
    }
    // console.log(newBookData)
    const book = await Book.create(newBookData);

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

    console.log(history);
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

exports.updateBook = async(req,res,next) => {
    let book = await Book.findById(req.params.id);
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
        call_number: req.body.call_number[0]+" "+req.body.call_number[1],
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
        // bookId: req.body.bookId,
        subject: req.body.subject,
        content_notes: req.body.content_notes,
        abstract: req.body.abstract,
        reviews: req.body.reviews
    }
    if(!book) {
        return next(new ErrorHandler('Book not found',404));
    }

    book = await Book.findByIdAndUpdate(req.params.id, newBookData,{
        new: true,
        runValidators:true,
        // useFindandModify:false
    })

    const nowDate = new Date();
    const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
    const user = await User.findById(req.user._id);
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +" updated a Book titled: "+ book.title+ ", on "+ newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        }
    );
    
    console.log(history);
    res.status(200).json({
        success:true,
        book,
        history
    })
}

exports.deleteBook = async(req,res,next) =>{
    const book = await Book.findById(req.params.id);
    if(!book) {
            return next(new ErrorHandler('Book not found',404));
     }
     await book.remove();

     const nowDate = new Date();
     const newDate = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear();
     const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const user = await User.findById(req.user._id);
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name +" deleted a Book titled: "+ book.title+ ", on "+ newDate,
            historylogDate: formatDate,
            historylogType: 'Delete'
        }
    );
    
    console.log(history);

     res.status(200).json({
        success: true,
        message: 'Book deleted',
        history
     })
}