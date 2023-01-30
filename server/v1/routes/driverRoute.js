const driverController = require('../controllers/driverController');
const tripController = require('../controllers/tripController');
const role_check = require('../middlewares/role_check');
const multer  = require('multer');
const check_user = require('../utils/check_user');
const upload = multer({ dest: 'uploads/' });
const router = require('express').Router();
router.route('/').get(driverController.get).post(upload.single('profileImage'),driverController.post);
router.route('/:id').patch(driverController.update).delete(driverController.delete);
router.route('/login').post(driverController.login);
router.route('/find').post(check_user,tripController.findDrivers);

module.exports = router;