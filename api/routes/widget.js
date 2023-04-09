var express = require('express');
var widgetController = require('../controller/widgetControllers/widgetController')
var router = express.Router();
const validation = require('../helpers/validation');


//Widget.js
router.get('/js/:channelid', widgetController.widget_js)

//widget APIs
router.post('/newWidgetUser', validation.newWUser, widgetController.newWUser)
router.post('/getChatRooms', validation.getChatRoom, widgetController.getChatRooms)
router.post('/newChatRoom', validation.newChatRoom, widgetController.newChatRooms)
router.post('/getChats', validation.getChats, widgetController.getChats)


module.exports = router;
