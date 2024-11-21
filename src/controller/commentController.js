import Comments from "../model/Comment.js";
import Post from "../model/PostModel.js";


export const createComment = async (req, res) => {
    try {
        const { comment, postId, likes, createdby } = req.body;
        if (!req.body) return res.status(400).json({
            status: 400,
            message: "Please enter a comment"
        });

        const model = new Comments({
            comment: comment,
            postId: postId,
            likes: likes,
            createdby: createdby
        });
        const data = await model.save();
        await Post.findByIdAndUpdate(postId, {
            $push: { comments: data._id }
        }, { new: true }).exec();
        return res.status(201).json({
            status: 201,
            message: 'Comment was added successfully'
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const getCommentByPostId = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const data = await Comments.find({
            'postId': { $in: postId }
        }).sort({ datefield: -1 })
            .populate({ path: 'createdby', select: '_id username imageUrl' });
        return res.status(200).json({
            status: 200,
            message: 'Comments found',
            data: data
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};



export const deleteComment = async (req, res) => {
    try {
        await Comments.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 200,
            message: 'Comments was deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};