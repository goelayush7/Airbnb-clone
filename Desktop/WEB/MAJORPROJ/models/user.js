const { required } = require("joi");
const mongoose = require("mongoose");
const schema  = mongoose.Schema;
const PassportLocalmongoose = require("passport-local-mongoose");
const User = new schema({   //passport-local-mongoose will automatic create a username and password in the schema
    email:{
        type:String,
        required:true
    }
})
User.plugin(PassportLocalmongoose);
module.exports = mongoose.model("User",User);