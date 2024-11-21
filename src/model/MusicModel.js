import mongoose from "mongoose";


const musicSchema = new mongoose.Schema({
    title: String,
    mediaUrl: String
}, {
    timestamps: true
});

const MusicModel = mongoose.model('Music', musicSchema);

export default MusicModel;