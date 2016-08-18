// Native modules
let crypto = require("crypto");
// Community modules
let express = require("express");
// Project modules
let db = require("../lib/db");
let mn = require("../magicnumbers.json"); // for salt

// Variables
let router = express.Router();
let re = new RegExp("[_+-.,!@#$%<>^&*()\\\/:] ");

router.get('/', function(req, res, next) {
    console.log("Сессия: " + req.session.user);
    res.render('auth', {});
});

router.post("/", (req, res) => {

    console.log("Сессия: " + req.session.user);

    // salt needed for security reasons
    let salt = Date.now() + mn.number;

    db.UserModel.findOne({login: req.body.login}, (err, user) => {
        "use strict";
        if (err) {
            console.log(err);
        }

        if (req.body.password == user.password)
        {
            req.session.user = {};
            req.session.user["login"] = user.login;
            req.session.user["password"] = user.password;

            console.log(req.session.user)
        } 

        res.send(req.session.user["login"]);
        return;
    });
});

module.exports = router;