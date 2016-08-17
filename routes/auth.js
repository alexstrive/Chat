let express = require("express");
let router = express.Router();

router.post("/", function (req, res) {
    console.log(req.body.login);
    console.log(req.body.password);

    res.redirect("/");
});

module.exports = router;