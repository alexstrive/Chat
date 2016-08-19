// Native modules
// Community modules
let express = require("express");
// Project modules
// Variables
let router = express.Router();


router.get("/", (req, res) => {

    let session = req.session;

    if (!session.user) {
        res.redirect("/auth");
        return;
    }

    res.render("chat", {});
});

module.exports = router;
