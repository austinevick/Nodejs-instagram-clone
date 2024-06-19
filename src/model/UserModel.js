import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    gender: { type: String },
    password: { type: String },
    imageUrl: { type: String },
    location: { type: String },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;