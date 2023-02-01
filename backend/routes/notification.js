const express = require('express');
const router = express.Router();

const {
} = require('../controllers/notificationController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


module.exports = router;