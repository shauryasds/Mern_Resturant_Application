const { default: mongoose } = require('mongoose');
const Cart=require('./models/CartModel')
async function removeFromCart(req, res) {
    const userId = req.user._id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
  console.log(userId,productId,quantity ,'from remove')
    const cart = await Cart.findOne({ userId });
    console.log(cart,'cart')
    if (cart) {
      const existingProductIndex = cart.items.findIndex((item) => item.productId.equals(new mongoose.Types.ObjectId(productId)));
      console.log(existingProductIndex,'existingProductIndex')
      if (existingProductIndex !== -1 ) {
        if (quantity === 0) {
          cart.items.splice(existingProductIndex, 1);
        } else {
          cart.items[existingProductIndex].quantity -= quantity;
        }
        await cart.save();
      }
    }
  
    res.json({ message: 'Item removed from cart' });
  }
  module.exports=removeFromCart
  