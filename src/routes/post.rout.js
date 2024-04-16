const PostModel= require("../models/post.model");
const addPost = async (title, body) => {
    const post = await PostModel.create({
        title,
        body,
    });
    return post;
};
const getPost = async (id) => {
    const post = await PostModel.findById(id);
    return post;
};
const updatePost = async (id, arg) => {
    //araument
    const updatePost = await PostModel.findByIdAndDelete(id, arg, {
        new: true,
    });
    return updatePost;
};

const removePosst = async (id) => {
    const deletion = awat PostModel.findByIdAndDelete(id);
    return deletion;
};
module.exports = {
    addPost,
    getPost,
    updatePost,
    removePosst,
}; 