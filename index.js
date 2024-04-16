const express= require("express");
const path = require("path");

const ejs = require("ejs") //quan trọng

const mongoose = require('mongoose')


const app = express()

//set template ejs
app.set("view engine","ejs")

// connect mongoDB
try {
    mongoose.connect("mongodb://localhost:27017/blog");
    console.log("connect to mongodb");
} catch (eror) {
    console.log("connect to mongodb", error);
};

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));





//đăng kí thư mục public
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index")
});
app.get("/about", (req, res) => {
    res.render("about")
});
app.get("/contact", (req, res) => {
    res.render("contact")
});
app.get("/post", (req, res) => {
    res.render("post")
});
// app.get('/', (request,response) => {
//     response.sendFile(path.resolve(__dirname,"pages/index.html"));
// });
// app.get('/about', (request,response) => {
//     response.sendFile(path.resolve(__dirname,"pages/about.html"));
// });
// app.get('/post', (request,response) => {
//     response.sendFile(path.resolve(__dirname,"pages/post.html"));
// });
// app.get('/contact', (request,response) => {
//     response.sendFile(path.resolve(__dirname,"pages/contact.html"));
// });


app.listen(5000, () => {
    console.log("https:5000")
});