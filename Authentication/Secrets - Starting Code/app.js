//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
// const date = require(__dirname + "/date.js");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.render('home');
});

app.get("/login", function (req, res) {
    res.render('login');
});

app.get("/register", function (req, res) {
    res.render('register');
});

app.post('/register', function (req, res) {

    const user = new User({
        email: req.body.username,
        password: req.body.password
    })

    user.save()
        .then(function () {
            res.render('secrets');
        }
        )
        .catch(function (err) {
            console.log(err);
        });
});

app.post('/login', function (req, res) {

    User.findOne({ email: req.body.username, password: req.body.password })
        .then(function (user) {
            if (user) {
                res.render('secrets');
            }
            else {
                console.log("Invalid login credentials");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
})


// listen express
app.listen(3000, function () {
    console.log("Server started on port 3000");
});