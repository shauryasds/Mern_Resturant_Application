const categoryModel=require("./models/CategoriesModel")


async function createCategory(req,res){
    try{
        console.log("log")
        const {name,url}=req.body;
        console.log(name,url)

    const categoryData=await categoryModel.findOne({name}).catch((e)=>console.log(e));
    console.log(categoryData)
    if(!categoryData){
       const categoryRes= await categoryModel.create({

            name,
            imageUrl:url
        })
        console.log("saved",categoryRes)
        if(categoryRes){
            res.json({success:'true',error:'false',body:categoryRes,message:'category created'})
        }else{
            res.json({error:'true',success :'false',message:'category not created'})

        }
        
    }
    else{
        res.json({error:'true',success :'false',message:'category already exists'})

    }
    }
    catch(e){
        res.json(e)

    }
}
module.exports =createCategory