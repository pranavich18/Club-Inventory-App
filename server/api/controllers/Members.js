module.exports ={
    getDashboard: async function(req,res,next) {
        let data = {
            name:'',
            member:[],
            itemList:[],
            requestList:[]
        };
        const userInfo = await userModel.findById(req.body.userId);
        if(userInfo){
            data.member.push(userInfo)
            data.name = userInfo.name;
            const club = await clubModel.findOne({name: userInfo.clubName});
            if(club){
                data.itemList = club.items;
            }
            const requests = await requestModel.find({requestID: req.body.userId});
            if(requests.length){
                requests.forEach(function(request){
                    data.requestList.push(request);
                });
            } 
            res.json({code:1, status:'Success', message:'Data fetched successfully', data: data });
        }
        else{
            res.json({ code: 0, status: 'error', message:"Failed", data: null});
        }
    },
    getUserDashboard: async function(req,res,next){
        const data = {
            user:{}
        };
        const user = await userModel.findById(req.body.userId);
        data.user = user;
        if(user){
            res.json({code: 1, status: 'success', message: 'Data Fetched Successfully', data: data});
        }
        else{
            res.json({code: 0, status: 'error', message: 'User not found', data: null});
        }
    },
    requestNewItem: async function(req,res,next){
        const request = await requestModel.create({
            requestID: req.body.requesterid,
            itemID: req.body.itemid,
            quantity: req.body.quantity
        });
        if(request){
            res.json({code:1, status:'Success', message:'Request made successfully', data: null });
        }
        else{
            res.json({code:0, status:'err', message:'Failed to make request', data: null });
        }
    }
};