const categoryModel=require("./models/CategoriesModel")


async function getCategory(req,res){
    try{
        const categoryData=await categoryModel.find();
        res.json({success:'true',error:'false',data:categoryData});
        
        
    }
    
    catch(e){
        res.json(e)

    }
}
module.exports =getCategory