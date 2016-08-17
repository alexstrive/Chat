let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    login: String,
    password: Number
});

module.exports = UserSchema;