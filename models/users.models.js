const mongoose = require("mongoose");

const UserShchema = mongoose.Schema({

    email: String,
    password : String
})

const UserModel = mongoose.model("user", UserShchema)

module.exports = { UserModel };