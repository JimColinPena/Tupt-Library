const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const {
	updateUser,
	deactivateUser,
    activateUser,
    updatepasswordUser,
    allUsers,
    endTerm
} = require('../controllers/userController');

router.route('/user/updatepassword/:id').put(isAuthenticatedUser, updatepasswordUser);
router.route('/user/deactivate/:id').put(isAuthenticatedUser, deactivateUser);
router.route('/user/activate/:id').put(activateUser);
router.route('/users').get(isAuthenticatedUser, allUsers);
router.route('/user/endterm').put(isAuthenticatedUser, endTerm)

module.exports = router;