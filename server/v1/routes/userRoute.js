const userController = require('../controllers/userController');
const role_check = require('../middlewares/role_check');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });
const router = require('express').Router();
router.route('/').get(userController.get).post(upload.single('profileImage'),userController.post);
router.route('/:id').patch(userController.update).delete(userController.delete);
router.route('/login').post(userController.login);

module.exports = router;