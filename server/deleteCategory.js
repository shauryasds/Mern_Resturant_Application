const CategoryModel=require('./models/CategoriesModel')

async function deleteCategory(req, res) {
    try {
        const  {categoryId}   = req.body;
      console.log(categoryId);
  
      const categoryRes = await CategoryModel.findByIdAndDelete(categoryId).catch((E)=>console.log(E));
      console.log(categoryRes)
      if (categoryRes) {
        res.json({ success: true, error: false, body: categoryRes, message: "category deleted" });
      } else {
        res.json({ error: true, success: false, body: categoryId, message: "category not deleted" });
      }
    } catch (e) {
      res.status(500).json({ success: false, error: true, body: {}, message: e.message });
    }
  }

module.exports = deleteCategory;