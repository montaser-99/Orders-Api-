import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import validator from "validator"



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minLength: [3, 'FirstName Must Be More Than 3 Characters'],
        lowercase: true,
        required: true

    },

    lastName: {
        type: String,
        trim: true,
        minLength: [3, 'LastName Must Be More Than 3 Characters'],
        lowercase: true,
        required: true

    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(val) { if (!validator.isEmail(val)) { throw new Error('email is invalid') } }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            const password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
            if (!password.test(val)) { throw new Error("password must be uppercase-lowercase-numbers-special characters") }
        }

    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: { type: String },
    resetCode: { type: String },
    tokens: [String]

})

userSchema.pre("save", async function (next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }
    user.password = await bcrypt.hash(user.password, 8)
    next()

})



const User = mongoose.model("User", userSchema)

export default User

