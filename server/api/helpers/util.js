
module.exports={
    //utility function for checking if a user already existsor not
    checkIfUserExists : async function(data){
       const result = await userModel.find({email: data});
       if(result)
       return result.length;
       else
       return 0;
    }
}