const { default: mongoose } = require('mongoose');
const Cart=require('./models/CartModel')
async function updateCart(req, res) {
  const userId = req.user._id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    const newCart = new Cart({ userId, items: [{ productId, quantity }] });
    await newCart.save();
  } else {
    const existingProductIndex = cart.items.findIndex((product)=>product.productId.equals(new mongoose.Types.ObjectId(productId)));
    if (existingProductIndex !== -1) {
      
      cart.items[existingProductIndex].quantity = quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
  }

  res.json({ message: 'Item added to cart' });
}

module.exports = updateCart;