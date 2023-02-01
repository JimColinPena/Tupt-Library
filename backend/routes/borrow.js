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
} = require('../controllers/borrowController');

router.route('/book/borrow').post(isAuthenticatedUser, borrowBook);
router.route('/book/check').post(isAuthenticatedUser, checkBorrowBook);
router.route('/book/cancel').post(isAuthenticatedUser, cancelBorrowBook);
router.route('/book/confirm').post(isAuthenticatedUser, confirmBorrowBook);
router.route('/book/cancel/all').post(isAuthenticatedUser, cancelAllBorrowBook);
router.route('/bookLength').get(isAuthenticatedUser, getBorrowedBooksLength);
router.route('/bookRequests').get(isAuthenticatedUser, getPendingRequests);
router.route('/userRequests').get(isAuthenticatedUser, getPendingUsersLength);


module.exports = router;