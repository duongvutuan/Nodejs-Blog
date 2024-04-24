const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type :String,
        require:[true, "title is required,..."]
    },
    body: {
        type:String,
        require:[true, "body is required,..."]
    },
    username: {
        type: String,
    },
    image:{
        type: String,
    },
    postedAt:{
        type: Date,
        default: new Date,
    },
});






const PostModel = mongoose.model("Post",postSchema);


module.exports = PostModel;