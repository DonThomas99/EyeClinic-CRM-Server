import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  _id: ObjectId;
  name: string;
  category: ObjectId; // Reference to Category model
  images: string[]; // Array of image URLs
  brand: string;
  price: number;
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
