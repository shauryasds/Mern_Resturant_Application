const mongoose=require("mongoose") ;

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    body:{
        type:String,
    },
    category : {
        type:String,
        required:true
    }
})

const ProductModel=mongoose.model('Product',productSchema);
module.exports=ProductModel;
