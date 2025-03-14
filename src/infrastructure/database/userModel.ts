import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document{
    _id:ObjectId;
    email:String | null;
    name:String |null;
    isBlocked:Boolean | null;
    password:String | null;
    mobile:String | null;
}

const UserSchema:Schema = new Schema({
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
        type:String
    },
    wallet:{
        type:Number,
        default:0
    },
    walletHistory:[{
        transactionType:String,
        method:String,
        amount:Number,
        date:Date,
    }],
    isBlocked:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

const userModel =  mongoose.model<IUser>('User',UserSchema)
export default userModel
