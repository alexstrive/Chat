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
    res.render('register', {});
});

// Handle register data
router.post("/", (req, res) => {

    if (req.body.password !== req.body.repeatPassword) {
        res.render("error", {
            message: "Ошибка",
            error: {
                status: 500,
                stack: "Пароли не соответсвуют"
            }
        });
        return;
    }

    // salt needed for security reasons
    let dateRegister = Date.now();
    let salt = dateRegister + mn.number;
    console.log("Пароль: " + salt.toString() + (req.body.password).toString());

    // warn! hash cannot used again!
    let hash = crypto.createHash("sha512");
    hash.update(salt.toString() + (req.body.password).toString());

    let generatedPassword = hash.digest("hex");

    let user = new db.UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        login: req.body.login,
        email: req.body.email,
        password: generatedPassword,
        dateRegister: dateRegister
    });

    user.save();

    res.redirect("/")
});

module.exports = router;