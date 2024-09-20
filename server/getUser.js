const UserModel=require("./models/UserModel")


async function getUsers(req,res) {
        try{
            const data=await UserModel.find();
            
        res.json({success:'true',error:'false',data:data});
        }catch(e){
        res.json(e)

    }
 }
module.exports=getUsers