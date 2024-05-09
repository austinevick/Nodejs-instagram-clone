import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    media: String,
    media_type: String,
    caption: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;