import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IStaff extends Document{
    _id:ObjectId;
    mobile:String| null;
    email:String | null;
    password:String | null;
    isBlocked:Boolean | null;

}

const StaffSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:String,
        default:false
    }
})

const staffModel = mongoose.model<IStaff>('Staff',StaffSchema)

export default staffModel