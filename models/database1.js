const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const videos = new Schema({
    email:String,
    video_name:String
});

const Video=mongoose.model('video',videos);

module.exports=Video;