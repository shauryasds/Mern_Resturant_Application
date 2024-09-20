const Order = require("./models/OrderModel");


async function addOrder(req,res){
    try {
        const { uid, pid, quantity, totalprice } = req.body;
        const order = new Order({
          userId:uid,
          productId:pid,
          quantity,
          totalPrice:totalprice
        });
        await order.save();
        res.json({ message: 'Order created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
      }
}
module.exports=addOrder