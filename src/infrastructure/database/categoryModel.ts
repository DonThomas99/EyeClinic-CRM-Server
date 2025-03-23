import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})

const categoryModel = mongoose.model('category',categorySchema)
module.exports = categoryModel