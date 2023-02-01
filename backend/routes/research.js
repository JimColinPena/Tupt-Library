const express = require('express');
const router = express.Router();

const {
	getResearch,
	createResearch,
	getSingleResearch,
	updateResearch,
	deleteResearch,

} = require('../controllers/researchController');

router.route('/research/new').post(createResearch);
router.route('/admin/research').get(getResearch);
router.route('/research/:id').get(getSingleResearch);
router.route('/admin/research/:id').put(updateResearch).delete(deleteResearch);


module.exports = router;