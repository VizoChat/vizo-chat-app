var express = require('express');
var widgetController = require('../controller/widgetControllers/widgetController')
var router = express.Router();
const validation = require('../helpers/validation');
const mids = require('../helpers/middlewares');


//Widget.js
router.get('/js/:channelid', widgetController.widget_js)

//widget APIs
router.post('/newWidgetUser', validation.newWUser, widgetController.newWUser)
router.post('/getChatRooms', validation.getChatRoom, widgetController.getChatRooms)
router.post('/newChatRoom', validation.newChatRoom, widgetController.newChatRooms)
router.post('/getChats', validation.getChats, widgetController.getChats)
router.post('/sentImageMessage', validation.sentImage_chat, mids.multer_init({route:'message_image',filename:'message_image'}) ,widgetController.sentImage_chat)


module.exports = router;
