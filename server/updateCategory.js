const CategoryModel=require('./models/CategoriesModel')

async function updateCategory(req, res) {
    try {
        const  data   = req.body;
      console.log(data);
  
      const categoryRes = await CategoryModel.findByIdAndUpdate(data._id, data, { new: true }).catch((E)=>console.log(E));
      console.log(categoryRes)
      if (categoryRes) {
        res.json({ success: true, error: false, body: categoryRes, message: "category Updated" });
      } else {
        res.json({ error: true, success: false, body: data, message: "category not Updated" });
      }
    } catch (e) {
      res.status(500).json({ success: false, error: true, body: {}, message: e.message });
    }
  }

module.exports = updateCategory;