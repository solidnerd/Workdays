var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var calendar = require('../modules/calendar');

/* GET users listing. */
router.get('/dates', function (req, res) {
  calendar.getEvents().then(function(events){
    //console.log(events);
    var results = []
    var counter = 0
    for (var i = 0; i < events.length; i++) {
      counter++;
      //console.log(Object.keys(calevent));
      results.push({
        "id": counter,
       "title": events[i].name,
       "url": "http://example.com",
       "class": "event-important",
       "start": events[i].starttime*1000,// Milliseconds *1000 is needed for Seconds in the Unix TimeStamp
       "end": events[i].endtime*1000 // Milliseconds
      });
    }
    console.log(results);
    res.json({success: 1, result: results});

  }).catch(function(errorMessage){
    console.error('getEvents Error: ' + errorMessage );
    res.json({success: 0 , error: errorMessage});
  });
});

module.exports = router;
