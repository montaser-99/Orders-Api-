import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    email: {
        type: String
    },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        quantity: Number,
        price: Number,

    }],
    totalPrice: Number,
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
const Order = mongoose.model("Order", orderSchema)
export default Order