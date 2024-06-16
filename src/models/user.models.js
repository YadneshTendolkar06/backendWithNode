import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from bcrypt;

const userSchema = new mongoose.Schema(
    {
        watchHistory:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        username:
        {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password:
        {
            type: String,
            required: true
        },
        fullName:
        {
            type: String,
            required: true,
        },
        avtar:
        {
            type: String,
            required: true
        },
        coverImage:
        {
            type: String,
        },
        refreshToken:
        {
            type: String
        }

    }, { timestamps: true }
);

userSchema.pre('save', async function(next){
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
    else
    {
        return next();
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generatesAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
)}

userSchema.methods.generatesRefreshToken = function(){
    return jwt.sign(
    {
        _id: this._id
    },
    process.env.REFRESS_TOKEN_SECRET,
    {
        expiresIn: REFRESS_TOKEN_EXPIRY
    }
)}

export const User = mongoose.model("User", userSchema);