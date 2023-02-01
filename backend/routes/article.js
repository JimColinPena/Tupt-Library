const express = require('express');
const router = express.Router();

const {
	getArticle,
	createArticle,
	getSingleArticle,
	updateArticle,
	deleteArticle,

} = require('../controllers/articleController');

router.route('/article/new').post(createArticle);
router.route('/admin/article').get(getArticle);
router.route('/article/:id').get(getSingleArticle);
router.route('/admin/article/:id').put(updateArticle).delete(deleteArticle);


module.exports = router;