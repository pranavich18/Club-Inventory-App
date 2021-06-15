const transporter = require('../helpers/emailSender');

module.exports = {
    // function for fetching dashboard data
    getDashboard: async function(req, res, next) {
        let data = {
            name: '',
            info:[],
            memberList:[],
            requestList: [],
            itemList:[]
        }
        const conv = await userModel.findById(req.body.userId);
        if(conv){
            data.info.push(conv);
            data.name = conv.name;
            const clbName = conv.clubName;
            const club = await clubModel.findOne({name: clbName});
            if(club){
                data.itemList = club.items;
            }
            const members = await userModel.find({role:"member", clubName: clbName});
            data.memberList = members;
            for(const member of members){
                const requests = await requestModel.find({requestID: member._id, status:"Awaiting Approval"});
                for(let request of requests){
                    data.requestList.push(request);
                }
            }
            res.json({code:1, status:'Success', message:'Data fetched successfully', data: data});
        }
        else{
            res.json({code:0, status:'error', message:'Failed', data: null});
        }
    },
    // function for accepting member request
    acceptMemberRequest: async function(req,res,next){
        var flag = 0;
        const conv = await userModel.findById(req.body.userId);
        const request = await requestModel.findOneAndUpdate({requestID: req.body.requestid, itemID: req.body.itemid, quantity: req.body.quantity}, {status:"Approved"});
        if(request){
            const user = await userModel.findOne({_id: request.requestID});
            const club = await clubModel.findOne({name: user.clubName});
            let itemList = club.items;
            for( item of itemList){
                if(item._id == request.itemID){
                    if(item.quantity<request.quantity){
                        flag = 1;
                    }
                    else{
                        const availableQuantity = item.quantity;
                        item.quantity = availableQuantity - request.quantity;

                    }
                }
            }
            if(!flag){
                const message = 'Hello '+user.name+', Your Request for item with itemID- '+request.itemID+', quantity- '+request.quantity+' has been approved!';
                const mailOptions = {
                    from: conv.email,
                    to: 'pranavjoshixavierite@gmail.com',
                    subject: 'Request Approved',
                    text: message
                };
                transporter.sendMail(mailOptions, function(err, info) {
                    if(err)
                    throw err;
                    else
                    console.log('Mail sent: ' , info);
                });
                const newClub = await clubModel.findOneAndUpdate({name:club.name},{items:itemList});
                res.json({code:1, status:'success', message:'Request Accepted', data:null});
            }
            else{
                const changeRequest = await requestModel.findOneAndUpdate({requestID: req.body.requestid, itemID: req.body.itemid, quantity: req.body.quantity}, {status:"Awaiting Approval"});
                res.json({code:0, status:'error', message:'Insufficient quantity', data: null});
            }
        }
        else{
            res.json({code:0, status:'error', message:'No such request exists.', data: null});
        }
    },
    // function for rejecting member request
    denyMemberRequest: async function(req,res,next){
        const conv = await userModel.findById(req.body.userId);
        const request = await requestModel.findOneAndUpdate({requestID: req.body.requestid}, {status:"Denied"});
        const user = await userModel.findById(req.body.requestid);
        if(request){
            const message = 'Hello '+user.name+', Your Request for item with itemID- '+request.itemID+', quantity- '+request.quantity+' has been denied!';
            const mailOptions = {
                from: conv.email,
                to: 'pranavjoshixavierite@gmail.com',
                subject: 'Request Denied',
                text: message
            };
            transporter.sendMail(mailOptions, function(err, info) {
                if(err)
                  throw err;
                else
                 console.log('Mail sent: ' , info);
            });
            res.json({code:1, status:'success', message:'Request Denied', data:null});
        }
        else{
            res.json({code:0, status:'error', message:'No such request exists.', data: null});
        }
    },
    // function for adding new item in a club
    addNewItem: async function(req,res,next){
        const club = await clubModel.findOne({name: req.body.clbName});
        if(club){
            const itemList = club.items;
            let item = {
                itemName: req.body.itemName,
                itemImage: req.body.imageId,
                itemDescription: req.body.itemDescription,
                quantity: req.body.itemNumber
            };
            itemList.push(item);
            const newClub = await clubModel.findOneAndUpdate({name: club.name},{items: itemList});
            res.json({code:1, status:'success', message:'Item added successfully', data: null});
        }
        else{
            res.json({code:0, status:'error', message:'No club found to add item', data: null});
        }
    }
};