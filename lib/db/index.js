let mongoose = require("mongoose");
// Load schemas
let UserSchema = require("./schemas/UserSchema");
// Apply schemas to models
let User = mongoose.model("user", UserSchema);

mongoose.connect("mongodb://localhost/chat");

exports.UserModel = User;
exports.mongoose = mongoose;