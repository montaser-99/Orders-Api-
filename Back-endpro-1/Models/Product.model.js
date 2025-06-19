import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"

    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        trim: true
    },
    quantity: { type: Number, default: 1 },
    discount: { type: Number, default: 0 },
    price: { type: Number },
    createdAt: { type: Date }
})

const Product = mongoose.model("Product", productSchema)
export default Product