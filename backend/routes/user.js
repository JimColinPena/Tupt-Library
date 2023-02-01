const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const {
	updateUser,
	deactivateUser,
    activateUser,
    updatepasswordUser,
} = require('../controllers/userController');

router.route('/user/updatepassword/:id').put(isAuthenticatedUser, updatepasswordUser);
router.route('/user/deactivate/:id').put(isAuthenticatedUser, deactivateUser);
router.route('/user/activate/:id').put(activateUser);

module.exports = router;