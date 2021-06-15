require('dotenv').config({
    path:'config/.env',
});

const mongoose = require("mongoose");
const username = process.env.ATLAS_USERNAME;
const password = process.env.ATLAS_PASSWORD;
const DB = process.env.MONGO_DATABASE_NAME;

const mongoDB = 'mongodb+srv://' + username + ':' + password + '@cluster0.mvvb7.mongodb.net/' + DB + '?retryWrites=true&w=majority' ;

// connection establishment with mongoDB
async function connectMongo(mongoDB){
    const connection = await mongoose.createConnection(mongoDB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    
    return connection;
}

module.exports = {
    connectMongo,
    mongoURI: mongoDB
};