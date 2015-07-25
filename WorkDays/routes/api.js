var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/dates', function (req, res) {
  res.json(
    {
      "success": 1,
      "result": [{
          "id": 1,
          "title": "Arbeiten",
          "url": "http://example.com",
          "class": "event-important",
          "start": 1437826249000, // Milliseconds
          "end": 1437829849000 // Milliseconds
        }]
    }
   );
});

module.exports = router;