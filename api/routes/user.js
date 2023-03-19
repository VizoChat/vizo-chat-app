var express = require('express');
const userController = require('../controller/userController');
const jwt = require('../helpers/jwt');
const mids = require('../helpers/middlewares');
const validation = require('../helpers/validation');
var router = express.Router();

/* Routes. */
router.get('/', userController.home);
router.get('/userdata', jwt.verify, mids.varify_user ,userController.userData)
router.put('/newChannel', jwt.verify,validation.newChannel, userController.newChannel)

router.get('/test', jwt.verify, userController.test);
router.get('/products', userController.products)
router.put('/userupdate', jwt.verify, validation.userUpdateValidate, userController.userUpdate)
router.put('/setAvatar', jwt.verify, userController.avatarUpload)
module.exports = router;
