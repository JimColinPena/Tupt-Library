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
	getAccession,
	updateAccession,
	returnBook,
	declineBook,
	getReturnedBooks,
	getUserDetails,
	getHistoryLog,
	deleteHistoryLog,
	deleteAllHistoryLog,
	changeDueDate,
	checkPenalty,
	getPenalties,
	paidPenalties
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

router.route('/borrowers').get(isAuthenticatedUser, getBorrowers);
router.route('/borrowers/appointment/:id').put(isAuthenticatedUser, acceptAppointment);
router.route('/borrowers/appointment/decline/:id').put(isAuthenticatedUser, declineAppointment);

router.route('/borrowed').get(isAuthenticatedUser, getBorrowedBoooks);
// router.route('/borrowed/accession/:id').get(isAuthenticatedUser, getAccession);
router.route('/borrowed/accession/').post(isAuthenticatedUser, updateAccession);

router.route('/borrowers/return/:id').put(isAuthenticatedUser, returnBook);
router.route('/returned/books').get(isAuthenticatedUser, getReturnedBooks);
router.route('/borrowers/decline/:id').put(isAuthenticatedUser, declineBook);
router.route('/detail/student/:id').get(isAuthenticatedUser, getUserDetails);

router.route('/admin/historylog').get(getHistoryLog);
router.route('/admin/historylog/:id').delete(isAuthenticatedUser, deleteHistoryLog);
router.route('/admin/delete/historylog').delete(isAuthenticatedUser,deleteAllHistoryLog);


router.route('/change/duedate').post(isAuthenticatedUser, changeDueDate);

router.route('/penalty/check').get(isAuthenticatedUser, checkPenalty);
router.route('/admin/penalty').get(isAuthenticatedUser, getPenalties);
router.route('/admin/penalty/:id').put(isAuthenticatedUser, paidPenalties);

module.exports = router;