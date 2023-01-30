const cabController = require('../controllers/cabController');
const express = require("express");
const router = express.Router();

router.route('/').get(cabController.get).post(cabController.post);
router.route('/:id').get(cabController.getById).update(cabController.updateById).delete(cabController.deleteCab);


module.exports = router;
