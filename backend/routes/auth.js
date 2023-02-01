const express = require('express');
const router = express.Router();
const passport = require("passport");
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const sendToken = require('../utils/googleToken');
const { 
	registerUser,
	loginUser,
	logout,
	getUserProfile,

} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/profile').get(isAuthenticatedUser, getUserProfile);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",passport.authenticate('google', { failureRedirect: '/', hostedDomain: 'tup.edu.ph' }),
  function( req, res) {
    // console.log(req.cookies.session)
    sendToken(req.user, 200, res)
  });

module.exports = router;