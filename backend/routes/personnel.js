const express = require('express');
const router = express.Router();

const {
	getPersonnel,
	createPersonnel,
	getSinglePersonnel,
	updatePersonnel,
	deletePersonnel,
	getActiveStudent,
	getInactiveStudent,
	getSingleStudent,
	updateStudent,
	deleteStudent,
	getBorrowers,
	acceptAppointment,
	declineAppointment,
	getBorrowedBoooks,
	returnBook,
	declineBook,
	getReturnedBooks,
	getUserDetails,
	getHistoryLog,
	deleteHistoryLog,
	changeDueDate
} = require('../controllers/personnelController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/personnels').get(getPersonnel);
router.route('/personnel/:id').get(getSinglePersonnel);
router.route('/personnel/new').post(isAuthenticatedUser, createPersonnel);
router.route('/admin/personnel/:id').put(isAuthenticatedUser, updatePersonnel).delete(isAuthenticatedUser, deletePersonnel);

router.route('/active/student').get(isAuthenticatedUser, getActiveStudent);
router.route('/inactive/student').get(isAuthenticatedUser, getInactiveStudent);
router.route('/single/student/:id').get(isAuthenticatedUser, getSingleStudent);
router.route('/admin/student/:id').put(isAuthenticatedUser, updateStudent).delete(isAuthenticatedUser, deleteStudent);

router.route('/borrowers').get(getBorrowers);
router.route('/borrowers/appointment/:id').put(isAuthenticatedUser, acceptAppointment).delete(isAuthenticatedUser, declineAppointment);

router.route('/borrowed').get(getBorrowedBoooks);

router.route('/borrowers/return/:id').put(isAuthenticatedUser, returnBook);
router.route('/returned/books').get(isAuthenticatedUser, getReturnedBooks);
router.route('/borrowers/decline/:id').put(isAuthenticatedUser, declineBook);
router.route('/detail/student/:id').get(isAuthenticatedUser, getUserDetails);

router.route('/admin/historylog').get(getHistoryLog);
router.route('/admin/historylog/:id').delete(isAuthenticatedUser, deleteHistoryLog);

router.route('/change/duedate').post(isAuthenticatedUser, changeDueDate);

module.exports = router;