const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
	getBooks,
	createBook,
	getSingleBook,
	updateBook,
	deleteBook,
} = require('../controllers/bookController');

router.route('/book/new').post(isAuthenticatedUser, createBook);
router.route('/admin/books').get(isAuthenticatedUser, getBooks);
router.route('/book/:id').get(getSingleBook);
router.route('/admin/book/:id').put(isAuthenticatedUser, updateBook).delete(isAuthenticatedUser, deleteBook);

module.exports = router;