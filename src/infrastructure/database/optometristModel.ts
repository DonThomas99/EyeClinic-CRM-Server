import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IOpto extends Document {
    _id:ObjectId;
    mobile:String | null;
    email:String | null;
    password:String | null;
    isBlocked:Boolean | null;
    name:String | null;
}

const OptoSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

const OptoModel = mongoose.model<IOpto>('Opto',OptoSchema)

export default OptoModel
