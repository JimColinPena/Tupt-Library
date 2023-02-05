const express = require('express');
const router = express.Router();
// const { isAuthenticatedUser } = require('../middlewares/auth')

const {
    registerforpushnotification,
    unregisterforpushnotification,
    sendnotification,
    recievednotification,
    getnotification
}  = require('../controllers/notificationController');

router.route('/notification/register').post(registerforpushnotification);
router.route('/notification/unregister').post(unregisterforpushnotification);
router.route('/notification/sendmessage').post(sendnotification);
router.route('/notification/recieved').post( recievednotification);
router.route('/notification/all/:id').get(getnotification);

// router.route('/notification/register').post(isAuthenticatedUser, registerforpushnotification);
// router.route('/notification/unregister').post(isAuthenticatedUser, unregisterforpushnotification);
// router.route('/notification/sendmessage').post(isAuthenticatedUser, sendnotification);
// router.route('/notification/recieved').post(isAuthenticatedUser, recievednotification);

module.exports = router;
