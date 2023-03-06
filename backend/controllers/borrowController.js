const Borrow = require('../models/borrow');
const Book = require('../models/book');
const User = require('../models/user');
const Return = require('../models/return');

exports.borrowBook = async (req, res, next) => {
    // console.log(req.body);
    const checkAvailability = await Borrow.find({ userId: req.body.userId});

    if (checkAvailability.length == 0) {
        //if user has no book request, create borrow object and decrement on_shelf value while increment out value
        await Book.findByIdAndUpdate(req.body.bookId, { $inc: { on_shelf: -1, out: 1 } })
        const newBorrowData = {
            userId: req.body.userId,
            bookId: req.body.bookId,
            status: "To Confirm"
        }
        // console.log(newBorrowData)
        const borrowbook = await Borrow.create(newBorrowData);

        res.status(201).json({
            success: true,
            borrowbook
        });
    }
    else {
        // update borrow object and append bookId and decrement on_shelf value while increment out value
        await Book.findByIdAndUpdate(req.body.bookId, { $inc: { on_shelf: -1, out: 1 } })
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

    // query to check if the book is currently requested or in possession of the user
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

    // query to check if the user have more than 2 books
    // console.log(pendingBook.length)
    if (pendingBook.length > 0) {
        if (pendingBook[0].bookId.length < 2) {
            pendingvar = false;
        }
        else {
            pendingvar = true;
        }
    }
    else {
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
    const borrow = await Borrow.findOne({ userId: req.body.userId });
    const borrowcount = borrow.bookId.length
    
    if (borrowcount <= 1) {
        //if book in user borrow is only one, and increment on_shelf value while decrement out value
        await Book.findByIdAndUpdate(req.body.bookId, { $inc: { on_shelf: 1, out: -1 } })
        const cancelbook = await Borrow.findOneAndDelete({ userId: req.body.userId })
        res.status(201).json({
            success: true,
            cancelbook
        });
    }
    else {
        //if book in user borrow has more than one, pull the current book from the array and increment on_shelf value while decrement out value
        await Book.findByIdAndUpdate(req.body.bookId, { $inc: { on_shelf: 1, out: -1 } })
        const cancelbook = await Borrow.findOneAndUpdate(
            { userId: req.body.userId },
            { $pull: { bookId: req.body.bookId } }
        )
        // console.log(cancelbook)
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

    const copyCount = await Borrow.findOne({ userId: req.body.userId }).select('bookId')
    //loop all book from the borrow bookId array and restore on_shelf value while decrementing out value
    for (let i = 0; i < copyCount.bookId.length; i++) {
        test = await Book.findByIdAndUpdate(copyCount.bookId[i], { $inc: { on_shelf: 1, out: -1 } })
    }

    //delete the borrow object from the database to free user's accessibillity to borrow book again
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

    res.status(200).json({
        success: true,
        borrowedbooksLength
    })
}

exports.getPendingRequests = async (req,res,next) => {
    const test = await Borrow.find({status: 'Pending'});
	const pendingRequests = test.length;

    res.status(200).json({
        success: true,
        pendingRequests
    })
}

exports.getPendingUsersLength = async (req,res,next) => {
    const test = await User.find({status: 'inactive'});
	const pendingUsers = test.length;

    res.status(200).json({
        success: true,
        pendingUsers
    })
}

exports.BorrowedBooksChart = async (req, res, next) => {
    const borrowedDate = await Return.find({}).select(['returnedDate']);
    // console.log(borrowedDate);
    res.status(200).json({
        success: true,
        borrowedDate
    })
}

exports.SectionBorrowedChart = async (req, res, next) => {
    let sectionArr = []
    // let obj = {}

    const NumberOfSection = await Return.find({}).populate({
        path: 'userId',
        select: 'course -_id',
    }).select('returnedDate -_id')

    for (let i = 0; i < NumberOfSection.length; i++) {
        // const section = NumberOfSection[i].userId.course:
        // let obj = {}
        // obj.keys = NumberOfSection[i].userId.course
        // obj.values = NumberOfSection[i].returnedDate
        sectionArr.push({section: NumberOfSection[i].userId.course, returnedDate: NumberOfSection[i].returnedDate})
    }
    // console.log(sectionArr);
    res.status(200).json({
        success: true,
        sectionArr
    })
}

exports.BookLeaderboards = async (req, res, next) => {
    // let bookArr = []
    // const distinctBook = await Return.find({}).populate({
    //     path: 'bookId',
    //     select: 'title _id'
    // }).select('title _id')

    // // console.log(distinctBook)
    // //fetching all titles from the returned book and putting them into array
    // for (let i = 0; i < distinctBook.length; i++) {
    //     for (let j = 0; j < distinctBook[i].bookId.length; j++) {
    //         bookArr.push(
    //             {
    //                 _id: distinctBook[i].bookId[j]._id,
    //                 title: distinctBook[i].bookId[j].title,
    //             }
    //         )

    //     }
    // }

    // // console.log(bookArr)
    // //reducing data to eliminate duplication and count how many duplicates then putting them into object array
    // const bookGroup = {};
    // bookArr.forEach(({title }) => {
    //     // bookGroup[_id] = bookArr._id;
    //     bookGroup[title] = (bookGroup[title] || 0) + 1;
    // });
    
    // // bookArr.forEach(({ _id }) => {
    // //     // bookGroup[_id] = bookGroup._id;
    // //     bookGroup[_id] = bookGroup._id;
    // // });

    // // console.log(bookGroup)
    // //inserting the two data entries from the bookgroup into object array and sorting the most duplicate
    // const bookCounts = Object.entries(bookGroup)
    // .map(([title, count]) => ({title, count }))
    // .sort((a, b) => b.count - a.count);


    const bookCounts = await Return.aggregate([
        {
          "$lookup": {
            "from": "books",
            "localField": "bookId",
            "foreignField": "_id",
            "pipeline": [
              {
                $project: {
                  _id: 1,
                  title: 1,
                }
              }
            ],
            "as": "bookId"
          }

        },
        {
          $unwind: "$bookId"
        },
        {
          $group: {
            _id: "$bookId",
            count: {
              $sum: 1
            }
          }
        },
        {
          $project: {
            _id: 1,
            title: "$_id.title",
            count: 1
          }
        },
        {$sort: { count: -1 }}
      ])
      

    console.log(bookCounts)
    res.status(200).json({
        success: true,
        bookCounts,
    })
}

exports.BorrowerLeaderboards = async (req, res, next) => {
    let borrowerArr = []

    const borrowerRanking = await Return.aggregate([
        {
          "$lookup": {
            "from": "users",
            "localField": "userId",
            "foreignField": "_id",
            "pipeline": [
              {
                $project: {
                  _id: 1,
                  name: 1,
                  course: 1,
                  avatar: 1
                }
              }
            ],
            "as": "userId"
          }

        },
        {
          $unwind: "$userId"
        },
        {
          $group: {
            _id: "$userId",
            count: {
              $sum: 1
            },
            returnedDate: {
                $first: "$returnedDate"
              },
          }
        },
        {
          $project: {
            _id: 1,
            name: "$_id.name",
            course: "$_id.course",
            avatar: "$_id.avatar.url",
            returnedDate: 1,
            count: 1
          }
        },
        {$sort: { count: -1 }}
      ])
      
    res.status(200).json({
        success: true,
        borrowerRanking,
    })
}