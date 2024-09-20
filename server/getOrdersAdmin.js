const Order=require("./models/OrderModel")


async function getOrdersAdmin(req,res){
    try{
        const orderData=await Order.find().populate('productId');
        console.log(orderData,'odaata')
        res.json({success:'true',error:'false',data:orderData});
        
        
    }
    
    catch(e){
        res.json(e)

    }
}
module.exports =getOrdersAdmin