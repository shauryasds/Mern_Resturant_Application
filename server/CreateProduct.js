const ProductModel = require("./models/ProductModel");

async function createProduct(req, res) {
  try {
    const { name, imageUrl, price, body,category } = req.body;

    
      const productRes = await ProductModel.create({
        name,
        imageUrl,
        price,
        body,
        category
      });
      if (productRes) {
        res.json({ success: true, error: false,body:productRes, message: "product created" });
      } else {
        res.json({ error: true, success: false, message: "product not created" });
      }
    
  } catch (e) {
    res.status(500).json({ success: false, error: true, message: e.message });
  }
}

module.exports = createProduct;