const { default: mongoose } = require("mongoose");
const Order = require("./models/OrderModel");

async function updateOrder(req,res){
    try {
        const { uid, pid, quantity, totalprice,status } = req.body;
         // convert string uid to ObjectId
        console.log(uid, pid, quantity, totalprice,'update')
        const order =await Order.findByIdAndUpdate(uid, {
            
            productId:pid,
            quantity,
            totalPrice:totalprice,
            status
          }, { new: true }).catch((E)=>console.log(E));
         console.log(order,'order')
          if (order) {
            res.json({ success: true, error: false, body: order, message: "order Updated" });
          } else {
            res.json({ error: true, success: false, body: order, message: "order not Updated" });
          }
        } catch (e) {
          res.status(500).json({ success: false, error: true, body: {}, message: e.message });
        }
}

module.exports=updateOrder