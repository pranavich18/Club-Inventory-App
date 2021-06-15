const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    image:{
        type: String,
        default: ''
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    items: [{
        itemName:{
            type: String,
            trim: true,
            required: true
        },
        itemImage:{
            type: String,
            default: ''
        },
        itemDescription:{
            type: String,
            trim: true,
            required: true
        },
        quantity:{
            type: Number,
            default: 0
        }
    }]
});


module.exports = ClubSchema;