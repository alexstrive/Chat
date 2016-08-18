let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    login: String,
    password: String,
    email: String,
    dateRegister: String
});

module.exports = UserSchema;