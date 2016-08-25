// Community modules
let express = require("express");
// Project modules
let db = require("../lib/db");
let mn = require("../magicnumbers.json"); // for salt

// Variables
let router = express.Router();

// Display register form
router.get("/", (req, res) => {

    let session = req.session;

    session.error = session.error || {};

    res.render('register', {
        error: session.error.registry
    });

});

// Handle register data
router.post("/", (req, res) => {

    let user;
    let session = req.session;

    if (!(req.body.password === req.body.repeatPassword)) {
        session.error.registry = "Пароли не соответсвуют!";
        res.redirect("/register");
        return;
    }

    user = new db.UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    });

    user.save();
    res.redirect("/auth")
});

module.exports = router;