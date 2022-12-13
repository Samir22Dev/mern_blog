const mongoose = require("mongoose")
const userSchame = mongoose.Schema({
    userName: {type:String, trim:true},
    email: {type:String, required:true, trim:true},
    password: {type:String, required:true, trim:true},
    isActive: {type:String, required:true, trim:true}
})

const User = mongoose.model('user', userSchame)

module.exports= User;