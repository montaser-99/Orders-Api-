
import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: {
            type: Date
        }

    }
)
const Category = mongoose.model("Category", categorySchema)
export default Category