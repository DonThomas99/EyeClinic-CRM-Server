import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},
{timestamps:true})

const brandModel = mongoose.model('brand',brandSchema)
export default brandModel