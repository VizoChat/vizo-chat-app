var express = require('express');
const jwt = require('../helpers/jwt');
const mids = require('../helpers/middlewares');
const validation = require('../helpers/validation');

//controllers
const userController = require('../controller/userControllers/user.controller'); //should remove
const channelController = require('../controller/userControllers/channelController');
const chatController = require('../controller/userControllers/chat.controller');
const teammateController = require('../controller/userControllers/teammate.contoller');

var router = express.Router();

/****** Routes. ******/
router.get('/', userController.home);

//user api routes
router.get('/userdata', jwt.verify, mids.verify_user,userController.userData)
router.post('/updateUserProfile', jwt.verify, mids.verify_user, validation.userUpdateValidate, userController.userUpdate)
router.post('/setAvatar', jwt.verify, mids.verify_user, mids.multer_init({route:'avatar',filename:'userAvatar'}) , userController.avatarUpload)

//Channel api routes
router.put('/newChannel', jwt.verify, mids.verify_user, validation.newChannel, channelController.newChannel)
router.put('/editChannel', jwt.verify, mids.verify_user, validation.editChannel, channelController.editChannel)
router.put('/editChannelMemberPush', jwt.verify, mids.verify_user, validation.editChannelMember, channelController.addAgentToChannel)
router.put('/editChannelMemberPull', jwt.verify, mids.verify_user, validation.editChannelMember, channelController.removeAgentFromChannel)
router.get('/getChannels', jwt.verify, mids.verify_user ,channelController.getChannels)
router.delete('/delChannel', jwt.verify, mids.verify_user, validation.delChannel, channelController.delChannel)

//chat api routes
router.post('/getChatRooms', jwt.verify, mids.verify_user, chatController.getChatRooms)
router.post('/getChats', jwt.verify, mids.verify_user, chatController.getChats)
router.post('/sentImageMessage', jwt.verify, mids.verify_user, mids.multer_init({route:'message_image',filename:'message_image'}) ,chatController.sentImage_chat)

//agent/teammates api routes
router.post('/newTeammate', jwt.verify, mids.verify_user, validation.newTeammate, teammateController.newTeammate)
router.get('/getTeammates', jwt.verify, mids.verify_user, teammateController.getTeammates)



//not in use
router.get('/test', jwt.verify, userController.test);
// router.put('/userupdate', jwt.verify, validation.userUpdateValidate, userController.userUpdate)
// router.put('/setAvatar', jwt.verify, userController.avatarUpload)
module.exports = router;
