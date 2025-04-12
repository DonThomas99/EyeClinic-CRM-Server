import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  _id: ObjectId;
  name: string;
  category: ObjectId;
  images: string[]; 
  brand: ObjectId;
  price: number;
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface product{
  name: string;
  category: ObjectId;
  brand: ObjectId;
  price: number;
  stock: number;
  description: string;
}

export interface ProductResponse {
  status: number;
  message: string;
  data: any| null
}
