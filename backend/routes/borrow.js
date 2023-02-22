const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
	borrowBook,
	checkBorrowBook,
	cancelBorrowBook,
	confirmBorrowBook,
	cancelAllBorrowBook,
	getBorrowedBooksLength,
	getPendingRequests,
	getPendingUsersLength,
	BorrowedBooksChart,
	SectionBorrowedChart,
	BookLeaderboards,
	BorrowerLeaderboards
} = require('../controllers/borrowController');

router.route('/book/borrow').post(isAuthenticatedUser, borrowBook);
router.route('/book/check').post(isAuthenticatedUser, checkBorrowBook);
router.route('/book/cancel').post(isAuthenticatedUser, cancelBorrowBook);
router.route('/book/confirm').post(isAuthenticatedUser, confirmBorrowBook);
router.route('/book/cancel/all').post(isAuthenticatedUser, cancelAllBorrowBook);
router.route('/bookLength').get(isAuthenticatedUser, getBorrowedBooksLength);
router.route('/bookRequests').get(isAuthenticatedUser, getPendingRequests);
router.route('/userRequests').get(isAuthenticatedUser, getPendingUsersLength);
router.route('/borrowedbooksChart').get(isAuthenticatedUser, BorrowedBooksChart);
router.route('/sectionborrowedChart').get(isAuthenticatedUser, SectionBorrowedChart);
router.route('/bookLeaderboards').get(isAuthenticatedUser, BookLeaderboards);
router.route('/borrowerLeaderboards').get(isAuthenticatedUser, BorrowerLeaderboards);

module.exports = router;