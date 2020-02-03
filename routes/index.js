var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PolSemena.by — Световая новогодняя иллюминация для улицы и декоративная светотехника' });
});

module.exports = router;
