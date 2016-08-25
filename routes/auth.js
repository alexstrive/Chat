// Community modules
let express = require("express");
// Project modules
let db = require("../lib/db");
let mn = require("../magicnumbers.json"); // for security

// Variables
let router = express.Router();

router.get('/', function (req, res) {

    let session = req.session;

    session.error = session.error || {};

    if (session.user)
    {
        res.redirect("/chat");
        return;
    }

    res.render('auth', {
        error: session.error.auth
    });
});

router.post("/", (req, res) => {

    let session = req.session;
    session.error = {};

    db.UserModel.findOne({login: req.body.login, password: req.body.password}, (err, user) => {

        // handle errors
        if (err) {
            res.render("error", {error: err});
            return;
        }

        if (!user) {
            session.error.auth = "Неверный пароль или логин!";
            res.redirect("/auth");
            return;
        }

        session.user = {
            login: user.login,
            password: user.password
        };

        session.error.auth = undefined;
        res.redirect("/auth");

    });
});

module.exports = router;