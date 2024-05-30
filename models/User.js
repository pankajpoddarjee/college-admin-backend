const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    mobile:String,
    email:String,
    password:String
});
module.exports = mongoose.model('users',UserSchema);
