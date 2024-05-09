import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    comment: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Replies' }],
},
    {
        timestamps: true
    });

const Comments = mongoose.model('Comments', commentSchema);

export default Comments;