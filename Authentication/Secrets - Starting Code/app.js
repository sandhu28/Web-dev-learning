//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
const _ = require("lodash");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const saltRounds = 10;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);


//uses AES encrytion scheme
// userSchema.plugin(encrypt, { secret: process.env.KEY, encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render('home');
});

app.get("/login", function (req, res) {
    res.render('login');
});

app.get("/register", function (req, res) {
    res.render('register');
});

app.get('/secrets', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('secrets');
    }
    else {
        res.redirect('/login');
    }
});

app.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        else {

            res.redirect('/');
        }
    });

});

app.post('/register', function (req, res) {

    User.register({ username: req.body.username }, req.body.password)
        .then(function (user) {
            console.log(user);
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            })
        })
        .catch((err) => {
            console.log(err);
        });

    // bcrypt.hash(req.body.password, 10, function (err, hash) {
    //     const user = new User({
    //         email: req.body.username,
    //         password: hash
    //     })

    //     user.save()
    //         .then(function () {
    //             res.render('secrets');
    //         }
    //         )
    //         .catch(function (err) {
    //             console.log(err);
    //         });

    // })


});

app.post('/login', function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            })
        }
    })

    // User.findOne({ email: req.body.username })
    //     .then(function (user) {
    //         // compare using bcrypt
    //         bcrypt.compare(req.body.password, user.password, function (err, result) {
    //             if (result === true) {
    //                 res.render('secrets');
    //             }
    //             else {
    //                 console.log("Invalid login credentials");
    //             }
    //         })
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });


})


// listen express
app.listen(3000, function () {
    console.log("Server started on port 3000");
});