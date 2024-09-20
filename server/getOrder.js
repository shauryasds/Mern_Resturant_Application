const Order=require("./models/OrderModel")


async function getOrder(req,res){
    const userId=req.body.userId
    console.log(userId)
    try{
        const orderData=await Order.find({userId}).populate('productId');
        console.log(orderData)
        res.json({success:'true',error:'false',data:orderData});
        
        
    }
    
    catch(e){
        res.json(e)

    }
}
module.exports =getOrder