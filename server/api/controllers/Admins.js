const e = require("express");

// set containing valid roles for further checking
let set = new Set();
set.add("user");
set.add("admin");
set.add("member");
set.add("convener");

module.exports = {
    //function for fetching dashboard data
    getDashboard: async function(req,res,next){
        const data = {
            admin:{},
            clubs: [],
            users:[]
        };
        const admin = await userModel.findById(req.body.userId);
        data.admin = admin;
        const users = await userModel.find({role:"user"});
        if(users.length)
        data.users = users;
        const clubs = await clubModel.find();
        if(clubs.length){
            for(let clb of clubs){
                const club = {
                    info: clb,
                    convener:[],
                    members:[],
                    requests:[]
                }
                const convener = await userModel.findOne({role:"convener", clubName: clb.name});
                if(convener)
                club.convener.push(convener);
                const members = await userModel.find({role:"member", clubName: clb.name});
                if(members.length)
                club.members = members;
                for(const member of members){
                    const requests = await requestModel.find({requestID: member._id, status:"Awaiting Approval"});
                    for(let request of requests){
                        club.requests.push(request);
                    }
                }

                data.clubs.push(club);
            }
            res.json({code:1, status:'Success', message:'Data fetched successfully', data: data });
        }
        else{
            res.json({code: 0, status:'err', message:'Failed', data:null});
        }
    },
    //function for changing role of convener
    changeConvenerRole: async function(req,res,next){
        const user = await userModel.findById(req.body.convenerID);
        if(user && set.has(req.body.role) ){
            if(req.body.role == "user"){
                const finalUser = await userModel.findOneAndUpdate({_id: req.body.convenerID},{role:req.body.role, clubName:"nil"});
            }
            else{
                const finalUser = await userModel.findOneAndUpdate({_id: req.body.convenerID},{role:req.body.role});
            }
            res.json({code:1, status:'success', message:'role changed', data: null});
        }
        else{
            res.json({code:0, status:'error', message:'Convener not found or invalid role', data:null});
        }
    },
    // function for changing role of member
    changeMemberRole: async function(req,res,next){
        const user = await userModel.findById(req.body.memberID);
        if(user && set.has(req.body.role) ){
            if(req.body.role === "user"){
                const finalUser = await userModel.findOneAndUpdate({_id: req.body.memberID},{role:req.body.role, clubName:'nil'});
                const requests = await requestModel.find({requestID: req.body.memberID});
                for(let request of requests){
                    const reques = await requestModel.findByIdAndDelete(request._id);
                }
            }
            else if(req.body.role == "convener"){
                const checkConvener = await userModel.findOne({clubName: user.clubName, role:"convener"});
                if(checkConvener){
                    res.json({code:0, status:'error', message:'Convener already exists', data:null});
                }
                if(!checkConvener){
                    const requests = await requestModel.find({requestID: req.body.memberID});
                    for(let request of requests){
                        const reques = await requestModel.findByIdAndDelete(request._id);
                    }
                }
            }
            const finalUser = await userModel.findByIdAndUpdate({_id: req.body.memberID},{role:req.body.role});
            res.json({code:1, status:'success', message:'role changed', data: null});
        }
        else{
            res.json({code:0, status:'error', message:'Convener not found or invalid role', data:null});
        }
    },
    // function for adding new club
    addNewClub: async function(req,res,next){
        const clb = await clubModel.findOne({name: req.body.clbName});
        if(clb){
            res.json({code:0, status:'error', message:'Club with same name already exists', data:null});
        }
        else{
            clubModel.create({
                name: req.body.clbName,
                description: req.body.clbDescription,
                items:[],
            },function(err,result){
                if(err){
                    console.log(err);
                    res.json({code:0, status:'error', message:err, data:null});
                }
                else{
                    res.json({ code:1, status: 'success',message: "User created successfully!!", data: result});
                }
            });
        }
    },
    // function for adding a user to a club
    createUser: async function(req,res,next){
        const clb = await clubModel.findOne({name: req.body.clbName});
        if(clb){
            const user = await userModel.findByIdAndUpdate(req.body.uID, {role:"member", clubName: clb.name});
            res.json({code:1, status: 'success', message:'User added to club successfully', data: user});
        }
        else{
            res.json({code:0, status:'error', message:'Club Name entered is wrong', data:null});
        }
    }
};