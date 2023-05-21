const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true,
    },
    lastName: {
        type:String,
        required:true,
        trim:true,
    }, 
    userName: {
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {  
        type:String,
        required:true
    },
    profile: {
        type: String,
        default:"/images/profilePic.png"
    }

},{

    timestamps: true,
});

module.exports = mongoose.model('User', userSchema)