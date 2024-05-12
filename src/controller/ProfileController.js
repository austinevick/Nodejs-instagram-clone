import User from "../model/UserModel.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        return res.status(200).json({
            status: 200,
            message: 'Users found',
            data: users
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password').populate({
                path: 'posts',
                select: '_id caption media media_type'
            }).exec();
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: 'User found',
                data: user
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const followUser = async (req, res) => {

    try {
        if (req.user._id == req.params.id) {
            return res.status(400).json({
                status: 400,
                message: 'You can not follow yourself'
            });
        } else {

            await User.findByIdAndUpdate(req.user._id, {
                $push: { following: req.params.id },
            }, { new: true }).exec();

            await User.findByIdAndUpdate(req.params.id, {
                $push: { followers: req.user._id },
            }, { new: true }).exec();
            return res.status(200).json({
                status: 200,
                message: 'Success'
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};
export const unfollowUser = async (req, res) => {
    try {

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.params.id },
        }, { new: true }).exec();

        await User.findByIdAndUpdate(req.params.id, {
            $pull: { followers: req.user._id },
        }, { new: true }).exec();
        return res.status(200).json({
            status: 200,
            message: 'Success'
        });

    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const deleteProfile = (req, res) => {
    try {

    } catch (error) {

    }
};


export const EditProfile = (req, res) => {
    try {

    } catch (error) {

    }
};