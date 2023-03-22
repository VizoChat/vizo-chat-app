var express = require('express');
var widgetController = require('../controller/widgetController')
var router = express.Router();


//Widget.js
router.get('/js/:channelid', widgetController.widget)


module.exports = router;
