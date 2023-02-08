const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
	getEvaluation,
	createEvaluation,
} = require('../controllers/evaluationController');

router.route('/evaluation').get(getEvaluation);
router.route('/evaluation/new').post(createEvaluation);

module.exports = router;