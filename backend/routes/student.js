const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
	getStudentDetails,
	updateStudentDetails,
	getStudentBooks,
	getSingleStudentBook,
	getStudentBorrowBook,
	getStudentAppointmentBook,
	checkPenalty,
} = require('../controllers/studentController');

router.route('/getstudent/:id').get(isAuthenticatedUser, getStudentDetails);
router.route('/update/student/:id').put(isAuthenticatedUser, updateStudentDetails);
router.route('/student/books').get(isAuthenticatedUser, getStudentBooks);
router.route('/student/book/:id').get(getSingleStudentBook);
router.route('/studentbook/borrow').get(isAuthenticatedUser, getStudentBorrowBook);
router.route('/studentbook/appointment').get(isAuthenticatedUser, getStudentAppointmentBook);
router.route('/penalty/check').get(isAuthenticatedUser, checkPenalty);

module.exports = router;