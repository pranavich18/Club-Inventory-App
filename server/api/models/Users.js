const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    password:{ 
        type: String,
        trim: true,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
    clubName:{
        type: String,
        default:'nil'
    }
});


module.exports = UserSchema;