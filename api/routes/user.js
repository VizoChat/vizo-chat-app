var express = require('express');
const userController = require('../controller/userController');
const jwt = require('../helpers/jwt');
const mids = require('../helpers/middlewares');
const validation = require('../helpers/validation');
var router = express.Router();

/* Routes. */
router.get('/', userController.home);

//user api routes
router.get('/userdata', jwt.verify, mids.verify_user ,userController.userData)

//Channel api routes
router.put('/newChannel', jwt.verify, mids.verify_user, validation.newChannel, userController.newChannel)
router.put('/editChannel', jwt.verify, mids.verify_user, validation.editChannel, userController.editChannel)
router.get('/getChannels', jwt.verify, mids.verify_user ,userController.getChannels)
router.delete('/delChannel', jwt.verify, mids.verify_user, validation.delChannel, userController.delChannel)

//chat api routes
router.post('/getChatRooms', jwt.verify, mids.verify_user, userController.getChatRooms)

//agent/teammates api routes
router.post('/newTeammate', jwt.verify, mids.verify_user, validation.newTeammate, userController.newTeammate)
router.get('/getTeammates', jwt.verify, mids.verify_user, userController.getTeammates)


//not in use
router.get('/test', jwt.verify, userController.test);
router.get('/products', userController.products)
router.put('/userupdate', jwt.verify, validation.userUpdateValidate, userController.userUpdate)
router.put('/setAvatar', jwt.verify, userController.avatarUpload)
module.exports = router;
