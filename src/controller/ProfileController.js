import User from "../model/UserModel.js";

export const getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password').populate({ path: 'post' }).exec();
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