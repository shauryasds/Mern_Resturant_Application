const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})
const categoryModel=mongoose.model('Category',categorySchema);
module.exports=categoryModel;