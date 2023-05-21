//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const lodash = require("lodash");

// let posts = [];

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {
  useNewUrlParser: true,
});

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const blogSchema = mongoose.Schema({
  blogTitle: String,
  blogContent: String,
});

const Blog = mongoose.model("Blog", blogSchema);

const homeBlog = new Blog({
  blogTitle: "Home",
  blogContent: homeStartingContent
});

// homeBlog.save();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

  Blog.find()
    .then((ele) => {
      res.render("home", { blogArray: ele });
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:postType", function (req, res) {

  const blogTitle = lodash.lowerCase(req.params.postType);
  console.log(blogTitle);

  // lodash.lowerCase(blogTitle): blogTitle

  // Blog.find({
  //   // $where: function () {
  //   //   return lodash.lowerCase(this.blogTitle) === blogTitle;
  //   // }
  // })
  Blog.find({ blogTitle: req.params.postType })
    .then((ele) => {
      res.render('post', { blogTitle: ele[0].blogTitle, blogContent: ele[0].blogContent });
    })
    .catch((err) => {
      console.log(err);
    })


  // posts.forEach(function (post) {
  //   if (lodash.lowerCase(postType) === lodash.lowerCase(post.postTitle)) {
  //     res.render("post", { title: post.postTitle, content: post.postBody });
  //   } else {
  //     console.log("Match not found!");
  //   }
  // });
});

const maxLength = 100;

app.post("/compose", function (req, res) {
  let blogTitle = req.body.blogTitle;
  let blogContent = req.body.blogContent;

  const newBlog = new Blog({
    blogTitle: blogTitle,
    blogContent: blogContent
  });

  newBlog.save();

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
