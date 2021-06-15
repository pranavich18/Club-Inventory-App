const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    requestID:{
        type: String,
        required: true
    },
    itemID:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "Awaiting Approval"
    }
});


module.exports = RequestSchema;