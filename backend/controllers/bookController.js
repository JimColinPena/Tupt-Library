const ErrorHandler = require('../utils/errorhand');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
const Book = require('../models/book');
const Accession = require('../models/accession');
const HistoryLog = require('../models/historylog')
const User = require('../models/user');
const { findById } = require('../models/book');

exports.getBooks = async (req, res, next) => {
    // const book = await Book.find();
    const apiFeatures = new APIFeatures(Book.find(),req.query).filter();
    const book = await apiFeatures.query

    book.map(b =>{
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
        book,
        lowestYearPub,
        highestYearPub,
        bookSubjects
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

    console.log(req.body)
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
    const book = await Book.updateOne({ _id: req.body.bookId }, { $push: { accession_numbers: accession._id } })
    res.status(200).json({
        success: true,
        message: 'Accession Added',
        accession
    })
}

exports.updateBookAccession = async (req, res, next) => {
    if (req.body.func == 'give') {
        const userId = await User.findOne({id_number: req.body.tuptId}).select('_id')
        if (!userId) {
            return res.status(401).json({success: false, message: 'No User Found!'})
        }
        await Accession.findOneAndUpdate(
            { _id: req.body.accession },
            {
                on_shelf: 0,
                out: 1,
                userId: userId
            }
        )

    } else if (req.body.func == 'retrieve') {
        await Accession.findOneAndUpdate(
            { _id: req.body.accession },
            {
                on_shelf: 1,
                out: 0,
                userId: null
            }
        )
    }

    res.status(200).json({
        success: true,
        // accessions
    })
}

exports.singleBookAccession = async (req, res, next) => {
    const getbook_accessions = await Book.findById(req.params.id).populate({
        path: 'accession_numbers',
    }).select('accession_number -_id')

    const bookAccessions = getbook_accessions.accession_numbers

    const bookDetails = await Book.findById(req.params.id).select('title -_id')


    res.status(200).json({
        success: true,
        bookAccessions,
        bookDetails
    })
}

exports.editBookAccession = async (req, res, next) => {
    const accession = await Accession.findByIdAndUpdate(req.params.id, {accession_number: req.body.accession})
    console.log(req.body.bookId)
    const book = await Book.findById(req.body.bookId)
    const nowDate = new Date();
    const newDate = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
    const formatDate = nowDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', hour12: true })
    const user = await User.findById(req.user._id);
    const history = await HistoryLog.create(
        {
            userId: user._id,
            historylogText: user.name + " Edited a Book accession from " + book.title + ", on " + newDate,
            historylogDate: formatDate,
            historylogType: 'Update'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Book Edited',
        history
    })

}

exports.deleteBookAccession = async (req,res,next) => {
    const accession = await Accession.findById(req.params.id);
    if (!accession) {
        return next(new ErrorHandler('Accession Log not found', 404));
    }
    await Book.updateOne({ _id: req.body.bookId }, { $pull: { accession_numbers: accession._id } })
    await accession.remove();

    const book =  await Book.findById(req.body.bookId)
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

// call/install the marcjs with the command: npm install marcjs
// fs is built-in with node and doesn't need to be installed:
// Importing the MRC (ignore: Could not find a declaration file for module 'marcjs'. error)
const { Marc } = require('marcjs');
const fs = require('fs');

exports.importMRC = async(req,res,next) => {
    // Create the code necessary to upload the file in request to the temporary folder named tmp in the root directory
    if (!req.files || req.files.file.mimetype !== 'application/marc'){
        return next(new ErrorHandler("No File Uploaded or Incorrect Extension", 404));
    }
    const fileData = req.files.file.data;
    const filename = req.files.file.name;
    const newFileName = filename.replace(/\s/g, '_');
    const filePath = process.cwd() + '/tmp/' + newFileName; // Set the file path
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          // File already exists, delete it before overwriting
        fs.unlink(filePath, (err) => {
            if (err) {
              return next(new ErrorHandler('File upload failed', 500));
            }
            console.log('Deleted existing file');
            // Create the file through fs
            fs.writeFile(filePath, fileData, (err) => {
              if (err) {
                return next(new ErrorHandler('File upload failed', 500));
              }
              // Now that the file has been created, we can now read it.
            })
            // Read the uploaded file using marcjs
            const reader = Marc.stream(fs.createReadStream(filePath), 'Iso2709');
            let Mrcbookdata;
            reader.on('data', (record) => {
                const MrcContent = JSON.parse(record.as('mij'));
            
                //  We can read the MRC content through the fields object as is below
                //  code below reads the first field content assuming that all mrc is only one content/record
                //  we then access the field through the key identifier such as '001'.
                //  console.log(MrcContent.fields[0]['001']);
                //  code outputs the value of the 001 field: 'UP-CODE'
                //  Example:
                //  ['040'] catalogue number
                //  If you have trouble knowing which ID is which you can refer to this link: https://www.loc.gov/marc/bibliographic/

                //  Code Below Finds the Field with the ID of '020' which correspondes to the International Standard Book Number (ISBN)
                //  console.log(MrcContent.fields.find(field => field['020'])['020'].subfields[0]['a']);
                //  MrcContent.fields.find(field => field['020']) returns the data of the field with the ID of '020'
                //  We still need to access said data through the addition of ['020'] at the end and as such:
                //  MrcContent.fields.find(field => field['020'])['020'] <---- We can now access the data inside of the field ['020']
                //  This has been done to use .subfields as is the structure of mrc files. and as such we can access the subfields of the field with the ID of '020'
                //  console.log(MrcContent.fields.find(field => field['020'])['020'].subfields[0]['a']); // This will output the value of the subfield with the ID of 'a'
                //  console.log(MrcContent.fields.find(field => field['020'])['020'].subfields[0]['b']); // This will output the value of the subfield with the ID of 'b'
                //  etc....
                //  This has been made inline to ease code structurization.

                //  Testing:
                //  console.log( MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['a'])?.['a'] );

                //  040 - Cataloging    // Cataloging Source
                //  035 - UP system ID // System Control Number

                Mrcbookdata = {
                    // Using tertiary condition here just to ease code length
                    title: MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['a'])?.['a'],
                    responsibility: MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['c'])?.['c'],
                    uniform_title: MrcContent.fields.find(field => field['240'])?.['240'].subfields.find(subfield => subfield['a'])?.['a'],
                    main_author: MrcContent.fields.find(field => field['100'])?.['100'].subfields.find(subfield => subfield['a'])?.['a'],
                    other_author: MrcContent.fields.find(field => field['700'])?.['700'].subfields.find(subfield => subfield['a'])?.['a'],
                    corp_author: MrcContent.fields.find(field => field['110'])?.['110'].subfields.find(subfield => subfield['a'])?.['a'],
                    placePub: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['a'])?.['a'],
                    publisher: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['b'])?.['b'],
                    yearPub: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['c'])?.['c'],
                    edition: MrcContent.fields.find(field => field['250'])?.['250'].subfields.find(subfield => subfield['a'])?.['a'],
                    series: MrcContent.fields.find(field => field['400'])?.['400'].subfields.find(subfield => subfield['a'])?.['a'],
                    gen_notes: MrcContent.fields.find(field => field['520'])?.['520'].subfields.find(subfield => subfield['a'])?.['a'],
                    isbn: MrcContent.fields.find(field => field['020'])?.['020'].subfields.find(subfield => subfield['a'])?.['a'],
                    languange: MrcContent.fields.find(field => field['041'])?.['041'].subfields.find(subfield => subfield['a'])?.['a'],
                    abstract: MrcContent.fields.find(field => field['520'])?.['520'].subfields.find(subfield => subfield['a'])?.['a'], // Abstract or Summary
                }

                });
                reader.on('end', () => {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                          return next(new ErrorHandler('File Deletion failed', 500));
                        }
                        console.log('Deleted temp file');
                    });
                    res.status(200).json({
                        success:true,
                        Mrcbookdata
                    })
            });
          });
        } else {
            // File doesn't exist, create it first
            fs.writeFile(filePath, fileData, (err) => {
                if (err) {
                  return next(new ErrorHandler('File upload failed', 500));
                }
                // Now that the file has been created, we can now read it.
              })
            // File doesn't exist, read the uploaded/created file
            const reader = Marc.stream(fs.createReadStream(filePath), 'Iso2709');
            let Mrcbookdata;
            reader.on('data', (record) => {
                const MrcContent = JSON.parse(record.as('mij'));
                Mrcbookdata = {
                    // Using tertiary condition here just to ease code length
                    title: MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['a'])?.['a'],
                    responsibility: MrcContent.fields.find(field => field['245'])?.['245'].subfields.find(subfield => subfield['c'])?.['c'],
                    uniform_title: MrcContent.fields.find(field => field['240'])?.['240'].subfields.find(subfield => subfield['a'])?.['a'],
                    main_author: MrcContent.fields.find(field => field['100'])?.['100'].subfields.find(subfield => subfield['a'])?.['a'],
                    other_author: MrcContent.fields.find(field => field['700'])?.['700'].subfields.find(subfield => subfield['a'])?.['a'],
                    corp_author: MrcContent.fields.find(field => field['110'])?.['110'].subfields.find(subfield => subfield['a'])?.['a'],
                    placePub: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['a'])?.['a'],
                    publisher: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['b'])?.['b'],
                    yearPub: MrcContent.fields.find(field => field['264'])?.['264'].subfields.find(subfield => subfield['c'])?.['c'],
                    edition: MrcContent.fields.find(field => field['250'])?.['250'].subfields.find(subfield => subfield['a'])?.['a'],
                    series: MrcContent.fields.find(field => field['400'])?.['400'].subfields.find(subfield => subfield['a'])?.['a'],
                    gen_notes: MrcContent.fields.find(field => field['520'])?.['520'].subfields.find(subfield => subfield['a'])?.['a'],
                    isbn: MrcContent.fields.find(field => field['020'])?.['020'].subfields.find(subfield => subfield['a'])?.['a'],
                    languange: MrcContent.fields.find(field => field['041'])?.['041'].subfields.find(subfield => subfield['a'])?.['a'],
                    abstract: MrcContent.fields.find(field => field['520'])?.['520'].subfields.find(subfield => subfield['a'])?.['a'], // Abstract or Summary
                }
            });
            reader.on('end', () => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                      return next(new ErrorHandler('File Deletion failed', 500));
                    }
                });
                res.status(200).json({
                    success:true,
                    Mrcbookdata
                })
            });
        }
      });


}