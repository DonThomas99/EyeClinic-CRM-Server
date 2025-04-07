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
},
{
    timestamps:true
})

const categoryModel = mongoose.model('category',categorySchema)
export default  categoryModel