// Native modules
let crypto = require("crypto");
// Community modules
let express = require("express");
// Project modules
let db = require("../lib/db");
let mn = require("../magicnumbers.json"); // for salt

// Variables
let router = express.Router();

router.post("/", (req, res) => {

    let salt = Date.now() + mn.number;
    console.log(salt.toString() + (req.body.password).toString());

    let hash = crypto.createHash("sha512");
    hash.update(salt.toString() + (req.body.password).toString());
    console.log(hash.digest("hex"));


    res.redirect("/");
});

module.exports = router;