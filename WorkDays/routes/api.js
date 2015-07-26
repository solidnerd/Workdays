var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/dates', function (req, res) {
  var resultArray = new Array();
  var connection = mysql.createConnection( {
    host     : process.env.MYSQL_HOST || 'localhost',
    port     : process.env.MYSQL_PORTNUMBER || '3306',
    user     : process.env.MYSQL_USER || 'mysql',
    password : process.env.MYSQL_USER_PASSWORD  || 'mysql',
  });
  var calendarid = 2;
  var columns = ['summary', 'startdate', 'enddate']
  var query = connection.query('SELECT ?? FROM ?? WHERE calendarid = ?', [columns, 'owncloud.oc_clndr_objects', calendarid], function (err, results) {
    connection.end();
    var id = 0;
    if (!err){
      results.forEach(function (entry) {
        id++;
        resultArray.push({
          "id": id,
          "title": entry.summary,
          "url": "http://example.com",
          "class": "event-important",
          "start": entry.startdate.getTime(),// Milliseconds
          "end": entry.enddate.getTime() // Milliseconds
        });
      });
      res.json({
        "success": 1,
        "result": resultArray
      });
    }
    else {
      console.log('Error while performing Query.');
      res.json({ success: 0, error: 'Something terrible happened' });
    }
  });

});

module.exports = router;