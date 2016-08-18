// Native modules
let crypto = require("crypto");
// Community modules
let express = require("express");
// Project modules
let db = require("../lib/db");
let mn = require("../magicnumbers.json"); // for salt

// Variables
let router = express.Router();
let re = new RegExp("[_+-.,!@#$%<>^&*()\\\/     :]");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
