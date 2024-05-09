import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    username: { type: String },
    password: { type: String },
    imageUrl: { type: String },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;