const express= require("express");
// const path = require("path");

const ejs = require("ejs") //quan trọng

const mongoose = require('mongoose')



const bodyParser = require("body-parser")
const {
    addPost,
    listPosts,
    getPost,
    updatePost,
    removePost,
} = require ("./src/routes/post.rout");

const { v4: uuidv4 } = require('uuid');

const fileUpload = require("express-fileupload");

const path = require("path");

const { create } = require("./src/models/post.model");


const app = express()

//set template ejs
app.set("view engine","ejs")

// connect mongoDB
try {
    mongoose.connect("mongodb://localhost:27017/blog");
    console.log("connect to mongodb");
} catch (error) {
    console.log("connect to mongodb", error);
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));





//đăng kí thư mục public
app.use(express.static("public"));

//user fileupload
app.use(fileUpload())

app.get("/posts", async (req, res) => {
    const posts = await listPosts();
    res.status(200).json({
        status: "success",
        data: posts,
    })
})

app.get("/", async (req, res) => {
    const posts = await listPosts();
    res.render("index", {
        posts: posts,
    });
    
});
app.get("/about", (req, res) => {
    res.render("about")
});
app.get("/contact", (req, res) => {
    res.render("contact")
});
app.get("/post/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await getPost(postId);
    res.render("post", {
       post: post,
    });
});

//GET, POST, PUT/PATCH, DELETE (CRUD)
app.get("/posts/new", async (req, res) => {
    //open create.ejs page
    res.render("create");
});

app.post("/posts/store", async (req, res) => {
 const { title, body } = req.body; //for short

    try {
        const image = req.files.image;
        const imageName = `${uuidv4()}-${image.name}`
        image.mv(path.resolve(__dirname,"public/upload",imageName),(erro) => {
           console.log("OK")
        });

        const newPost = await addPost(title, body, imageName);
        res.redirect(`/post/${newPost.id}`);

        // res.status(200).json({
        //     status: "success",
        //     data: newPost,
        // });

    } catch (error) {
        res.status(400).json({
            status: "error",
            error, //for short
        });
    }
});



app.get("/", (req, res) => {
    app.get("/", async (req, res) => {
        const post = await updatePost('12c', {
            body: "Something....",
        });
        console.log("post:", post);
        res.render("index");
    });
});

app.listen(5000, () => {
    console.log("https:5000")
});