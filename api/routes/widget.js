var express = require('express');
var widgetController = require('../controller/widgetController')
var router = express.Router();
const validation = require('../helpers/validation');


//Widget.js
router.get('/js/:channelid', widgetController.widget_js)

//widget APIs
router.post('/getChatRooms', validation.getChatRoom, widgetController.getChatRooms)
router.post('/newChatRoom', validation.newChatRoom, widgetController.newChatRooms)


module.exports = router;
