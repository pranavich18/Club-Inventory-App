require('dotenv').config({
    path:"config/.env",
});
//packages required
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const {connectMongo} = require("./config/database");
const {mongoURI} = require("./config/database");
const UserSchema = require('./api/models/Users');
const ClubSchema = require('./api/models/Clubs');
const RequestSchema = require('./api/models/Requests');
const ImageSchema = require('./api/models/Images');
const users = require('./routes/Users');
const members = require('./routes/Members');
const conveners = require('./routes/Conveners');
const admins = require('./routes/Admins');

const app= express();


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
    extended: true
}));

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err)
          return reject(err);
        const fileName = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          fileName: fileName,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });
// eslint-disable-next-line no-unused-vars
let gfs;

console.log("=> Connecting to MongoDB Atlas ...");

//MongoDB Connecion setup
connectMongo(mongoURI).then((connection)=>{
    global.userModel = connection.model('User', UserSchema);
    global.imageModel = connection.model('Image', ImageSchema);
    global.clubModel = connection.model('Club', ClubSchema);
    global.requestModel = connection.model('Request', RequestSchema);

    console.log("=> MongoDB Connected !!");

    connection.on('error', function(err){
        if(err)
        console.log(err);
    });

    connection.once('open', function() {
        gfs = new mongoose.mongo.GridFSBucket(connection.db, {
            bucketName: 'uploads',
        });
    });

    app.listen(4000,function(){
        console.log("Local Man listening on Port 4000");
    });

});

// middleware to verify the logged in user by checking for token
function validateUser(req,res,next){
    jwt.verify(req.cookies.token,'secretKey', function(err,decoded){
        if(err){
            res.json({ code: 0, status: 'error', message: err.message, data: null});
        }
        else{
            req.body.userId = decoded.id;
            userModel.findById(decoded.id,function(err, userInfo){
                if(err){
                    log(err);
                    next();
                }
                else{
                    req.body.userEmail = userInfo.email;
                    next();
                }
            });
        }
    });
}

// route for uploading image
app.post('/upload/single', upload.single('file'), (req, res, next) => {
    console.log(req.file);
    // eslint-disable-next-line new-cap
    var imageId = req.file.id;
    if(imageId){
      res.json({code:1, status:'success', message: 'Image uploaded successfully', data: imageId});
    }
    else{
      res.json({code:0, status:'failed', message:'Image not uploaded', data: null});
    }
});
  
//Routes called from front-end
app.use('/admins',validateUser,admins);
app.use('/conveners',validateUser,conveners);
app.use('/users',users);
app.use('/members',validateUser,members);
