import mongoose, { Schema } from "mongoose";

const productSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    images: {
        type: [String],  
        validate: [(val: string[]) => val.length <= 4, '{PATH} exceeds the limit of 4']
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const productModel = mongoose.model('product', productSchema);  
