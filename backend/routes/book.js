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
	singleBookAccession,
	editBookAccession,
	deleteBookAccession
} = require('../controllers/bookController');

router.route('/book/new').post(isAuthenticatedUser, createBook);
router.route('/admin/books').get(isAuthenticatedUser, getBooks);
router.route('/admin/single/book/:id').get(getSingleBook);
router.route('/admin/book/:id').put(isAuthenticatedUser, updateBook).delete(isAuthenticatedUser, deleteBook);
router.route('/book/accession').post(isAuthenticatedUser, createBookAccession);
router.route('/accession/detail/:id').get(isAuthenticatedUser, singleBookAccession);
router.route('/book/accession/:id').put(isAuthenticatedUser, editBookAccession)
router.route('/delete/accession/:id').put(isAuthenticatedUser, deleteBookAccession);
module.exports = router;