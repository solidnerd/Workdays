var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { dates: 'api/dates' });
});

module.exports = router;
