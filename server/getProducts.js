const ProductModel=require("./models/ProductModel")


async function getProducts(req,res) {
        try{
            const ProductData=await ProductModel.find().sort({ price: -1 });
            
        res.json({success:'true',error:'false',data:ProductData});
        }catch(e){
        res.json(e)

    }
 }
module.exports=getProducts