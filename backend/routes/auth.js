const express = require('express');
const router = express.Router();
const passport = require("passport");
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const sendToken = require('../utils/googleToken');
const { 
	loginUser,
	logout,
	getUserProfile,
	// Mobile Login 
	// Will try change the MobileApp to use Passport
	// Fall back for mobile
	GoogleSignIn,
    GoogleRegisterIn
} = require('../controllers/authController');

router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/profile').get(isAuthenticatedUser, getUserProfile);

// Google Login / Register
router.route('/user/Google/Login').post(GoogleSignIn);
router.route('/user/Google/Register').post(GoogleRegisterIn);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// on frontend login
router.get("/google/callback",passport.authenticate('google', { failureRedirect: '/', hostedDomain: 'tup.edu.ph' }),
  function( req, res) {
    // console.log(req.cookies.session)
	// if(req.user.status == 'deactivated'){
	// 	res.Redirect('/test');
	// }else{
		sendToken(req.user, 200, res)
	// }
    
  });

module.exports = router;