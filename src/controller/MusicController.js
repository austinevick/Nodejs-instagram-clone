import MusicModel from "../model/MusicModel.js";
import { handleFileUpload } from "../utils/handleFileUpload.js";


export const uploadMusic = async (req, res) => {
    try {
        const { title } = req.body;

        console.log(req.file.path, req.body);

        const result = await handleFileUpload(req.file.path, 'raw');

        const post = new MusicModel({
            mediaUrl: result.url,
            title: title
        });

        const data = await post.save();
        return res.status(200).json({
            status: 200,
            message: `${ data.title } uploaded successfully`,
            data: data
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
};


export const getSongs = async (req, res) => {
    try {
        const data = await MusicModel.find({});
        return res.status(200).json({
            status: 200,
            message: 'Success',
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
