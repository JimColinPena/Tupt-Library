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
	studentPenalty,
} = require('../controllers/studentController');

router.route('/getstudent/:id').get(isAuthenticatedUser, getStudentDetails);
router.route('/profile/update/:id').put(isAuthenticatedUser, updateStudentDetails);
router.route('/books').get(isAuthenticatedUser, getStudentBooks);
router.route('/book/:id').get(getSingleStudentBook);
router.route('/borrow/request').get(isAuthenticatedUser, getStudentBorrowBook);
router.route('/borrow/books').get(isAuthenticatedUser, getStudentAppointmentBook);
router.route('/penalty').get(isAuthenticatedUser, studentPenalty);


module.exports = router;