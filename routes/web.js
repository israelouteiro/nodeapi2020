var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	// return view with bag
  res.render('index', { title: process.env.APPLICATION_NAME });  
});

module.exports = router;
