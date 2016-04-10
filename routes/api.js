var express = require('express');
var router = express.Router();
var calendar = require('../modules/calendar');
var calendar_transform = require('../modules/calendar_transform');

router.get('/dates', function (req, res) {
  calendar.getEvents().then(function(events){
    res.json({success: 1, result: calendar_transform.transform(events) });
  }).catch(function(errorMessage){
    console.error('getEvents Error: ' + errorMessage );
    res.json({success: 0 , error: errorMessage});
  });
});

module.exports = router;
