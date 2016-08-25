// Community modules
let express = require("express");
// Project modules
let db = require("../lib/db");

let router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.session.error);
    res.render('index', {title: 'Express'});
});

module.exports = router;
