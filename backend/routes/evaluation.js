const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
	checkEvaluation,
	getEvaluation,
	createEvaluation,
	postEvaluation,
	editEvaluation,
	deleteEvaluation
} = require('../controllers/evaluationController');

router.route('/check/evaluation').get(checkEvaluation);
router.route('/admin/evaluation').get(isAuthenticatedUser, getEvaluation);
router.route('/admin/evaluation/:id').put(isAuthenticatedUser, editEvaluation).delete(isAuthenticatedUser, deleteEvaluation);
router.route('/evaluation/new').post(isAuthenticatedUser, createEvaluation);
router.route('/evaluation/post').post(isAuthenticatedUser, postEvaluation);


module.exports = router;