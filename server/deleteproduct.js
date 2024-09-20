const ProductModel = require("./models/ProductModel");

async function deleteProduct(req, res) {
    try {
        const  {productId}   = req.body;
  
      const productRes = await ProductModel.findByIdAndDelete(productId).catch((E)=>console.log(E));
      console.log(productRes)
      if (productRes) {
        res.json({ success: true, error: false, body: productRes, message: "product deleted" });
      } else {
        res.json({ error: true, success: false, body: productData, message: "product not deleted" });
      }
    } catch (e) {
      res.status(500).json({ success: false, error: true, body: {}, message: e.message });
    }
  }

module.exports = deleteProduct;