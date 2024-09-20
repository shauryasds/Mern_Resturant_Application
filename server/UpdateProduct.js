const ProductModel = require("./models/ProductModel");

async function updateProduct(req, res) {
    try {
        const  productData   = req.body;
      console.log(productData);
  
      const productRes = await ProductModel.findByIdAndUpdate(productData._id, productData, { new: true }).catch((E)=>console.log(E));
      console.log(productRes)
      if (productRes) {
        res.json({ success: true, error: false, body: productRes, message: "product Updated" });
      } else {
        res.json({ error: true, success: false, body: productData, message: "product not Updated" });
      }
    } catch (e) {
      res.status(500).json({ success: false, error: true, body: {}, message: e.message });
    }
  }

module.exports = updateProduct;