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

// Display register form
router.get("/", (req, res) => {
    let session = req.session;
    res.render('register', {error: session.error.registry});
});

// Handle register data
router.post("/", (req, res) => {

    let session = req.session;

    if (req.body.password !== req.body.repeatPassword) {
        session.error.registry = "Пароли не соответсвуют!";
        res.redirect("/register");
        return;
    }
    
    // warn! hash cannot used again!
    let hash = crypto.createHash("sha512");
    hash.update((mn.salt).toString() + (req.body.password).toString());
    let generatedPassword = hash.digest("hex");

    let user = new db.UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        login: req.body.login,
        email: req.body.email,
        password: generatedPassword
    });

  //  user.save();
    res.redirect("/register")
});

module.exports = router;