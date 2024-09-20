const CartModel = require("./models/CartModel");

const getCart = async (req, res) => {
  const userId = req.body.userId;
  const cart = await CartModel.findOne({ userId })
    .populate('items.productId')
    .exec();
  console.log(cart);
  res.json(cart);
};
module.exports=getCart