import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const MONGO_URI = process.env.MONGO_URI as string

const mongoOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    autoIndex: true,
}

const connectDB = async ()=>{
    console.log('hee');
   return new Promise((resolve,reject)=>{
    mongoose.connect(MONGO_URI,mongoOptions)
    .then((conn)=>{
        console.log(`connected to ${conn.connections[0].name}:${conn.connections[0].port}`);
        resolve(conn)
    })
    .catch((error)=> reject(error))
   })
}

export default connectDB