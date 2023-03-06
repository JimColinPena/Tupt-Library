const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
	getBooks,
	createBook,
	getSingleBook,
	updateBook,
	deleteBook,
	createBookAccession,
	updateBookAccession,
	singleBookAccession,
	editBookAccession,
	deleteBookAccession,
	importMRC	
} = require('../controllers/bookController');

router.route('/book/new').post(isAuthenticatedUser, createBook);
router.route('/admin/books').get(isAuthenticatedUser, getBooks);
router.route('/admin/single/book/:id').get(getSingleBook);
router.route('/admin/book/:id').put(isAuthenticatedUser, updateBook).delete(isAuthenticatedUser, deleteBook);
router.route('/book/accession').post(isAuthenticatedUser, createBookAccession);
router.route('/edit/accession/').post(isAuthenticatedUser, updateBookAccession);
router.route('/accession/detail/:id').get(isAuthenticatedUser, singleBookAccession);
router.route('/book/accession/:id').put(isAuthenticatedUser, editBookAccession)
router.route('/delete/accession/:id').put(isAuthenticatedUser, deleteBookAccession);

// Testing only: Comment this later or delete altogether.
router.route('/admin/book/importmrc').post(importMRC);
// Uncomment below for Active:
// router.route('/admin/book/importmrc').post(isAuthenticatedUser,importMRC);

module.exports = router;