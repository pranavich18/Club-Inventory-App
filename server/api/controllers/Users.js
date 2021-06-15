const bcrypt = require('bcrypt');
const saltRounds = 10;
const {checkIfUserExists} = require('../helpers/util');
const jwt = require('jsonwebtoken');

module.exports = {
    create: async function (req,res,next) {
        const val = await checkIfUserExists(req.body.email);
        if(!val){
            bcrypt.hash(req.body.password, saltRounds, function(err,hash){
                if(err)
                console.log(err);
                else{
                    userModel.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }, function(err, result){
                        if(err)
                        console.log(err);
                        else{
                            res.json({ code: 1, status: 'success',
                                message: "User created successfully!!", data: result});
                        }
                    });
                }
            });
        }
        else{
            res.json({code: 0, status: 'failed',
                message: "User already exists with the entered email id" });
        }
    },
    login: function(req,res,next) {
        userModel.findOne({email: req.body.email}, function(err, userInfo) {
            if(err){
                console.log(err);

            }
            else{
                if(userInfo){
                    if(bcrypt.compareSync(req.body.password, userInfo.password)){
                        const token = jwt.sign({id: userInfo._id},'secretKey',{expiresIn: '1h'});
                        res.cookie('token', token, {
                            maxAge: 1000 * 60 * 60, // 1 hour
                          });
                        res.json({ code: 1, status: 'success',
                          message: "User Found", data: {user: userInfo, token: token}});
                    }
                    else{
                        res.json({ code: 0, status: 'failed',
                            message: "There is some problem in Siging In, check the password or email id"});
                    }
                }
                else{
                    res.json({ code: 0, status: 'failed',
                        message: "There is some problem in Siging In, check the password or email id"});
                }
            }
        });
    },
    logout: function(req,res,next){
        if(req.cookies.token){
            res.clearCookie('token');
            res.json({code: 1, status: 'success', message: 'Logged Out..', data: null});
        }
        else{
            res.json({code: 0, status: 'error', message: 'Log in first..', data: null});
        }
    }
};