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

router.get('/', function (req, res) {

    let session = req.session;
    let sessionError = session.error;
    let sessionUser = session.user;

    if (sessionUser) {
        console.log(sessionUser);
    }
    else {
        console.log(sessionError);
        console.log("Вошел неавторизованный пользователь!");
    }

    res.render('auth', {error: sessionError});
});

router.post("/", (req, res) => {

    db.UserModel.findOne({login: req.body.login, password: req.body.password}, (err, user) => {
        if (err) {
            console.log(err);
            res.render("error", {error: err});
        }

        if (user) {

            req.session.user = {
                login: user.login,
                password: user.password
            };

            req.session.error = undefined;
            res.redirect("/auth");
        }
        else {
            req.session.error = "Неверный пароль или логин!";
            res.redirect("/auth");
        }
    });
});

module.exports = router;