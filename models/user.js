var mongoose = require("mongoose");

//Define User Schema with Username and Password
var UserSchema = new mongoose.Schema({
    username: String, 
    password: String
});

module.exports = mongoose.model("User", UserSchema);