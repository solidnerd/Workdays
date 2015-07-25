var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user: 'nm', dates:'[]'});
});

module.exports = router;