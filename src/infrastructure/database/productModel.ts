import mongoose, {Schema} from "mongoose";

const productSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    images:{
        type:Array,
        maxitems:4
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        max:50
    },
    description:{
        type:String,
        required:true
    }    
},
{timestamps:true}) 

export const productModel = mongoose.model('product',productSchema)
module.exports = productModel