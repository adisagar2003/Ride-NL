const router = require('express').Router();
const inviteController = require('../controllers/inviteController');

router.route('/').post(inviteController.sendInvitation
).get(inviteController.getInvitations);
module.exports = router