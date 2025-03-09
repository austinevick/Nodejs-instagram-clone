import Post from "../model/PostModel.js";
import User from "../model/UserModel.js";
import { handleFileUpload } from "../utils/handleFileUpload.js";

export const createPost = async (req, res) => {
    try {
        const { caption, media_type, comments } = req.body;
        let result;
        console.log(req.file.path, req.body);

        if (media_type == 'video') {
            result = await handleFileUpload(req.file.path, 'video');
        } else {
            result = await handleFileUpload(req.file.path, 'image');
        }

        const post = new Post({
            media: result.url,
            caption: caption,
            media_type: media_type,
            creator: req.user._id,
            comments: comments
        });
        const data = await post.save();

        await User.findByIdAndUpdate(req.user._id, {
            $push: { posts: data._id }
        }, { new: true }).exec();

        return res.status(200).json({
            status: 200,
            message: 'Your post has been uploaded successfully',
            data: post
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
};

export const getPosts = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1;

        const data = await Post.find({}).sort({ _id: -1 })
            .skip(page * limit).limit(limit)
            .populate({ path: 'creator', select: '-password' })
            .populate({
                path: 'comments',
                populate: {
                    path: 'createdby', select: '-password'
                }
            });

        return res.status(200).json({
            status: 200,
            message: 'Success',
            length: data.length,
            page: page,
            limit: limit,
            data: data
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};


export const handleLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        if (!postId) return res.status(400)
            .json({ status: 400, message: "Post not found" });

        const post = await Post.findByIdAndUpdate(postId,
            {
                $push: { likes: userId }
            }, { new: true }).exec();
        return res.status(200).json({
            status: 200,
            message: "Post liked successfully",
            data: post
        });

    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const handleUnLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findByIdAndUpdate(postId,
            {
                $pull: { likes: userId }
            }, { new: true }).exec();
        return res.status(200).json({
            status: 200,
            message: "Post unlike successfully",
            data: post
        });

    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.deleteOne({ _id: id });
        return res.status(200).json({
            status: 200,
            message: "Post was deleted successfully",
            data: post
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};