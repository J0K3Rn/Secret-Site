//jshint esversion:6

/*
    ToDo
        - Fill out database credentials in the 'Database Setup' section for MongoDB Atlas
        - Uncomment .env from gitignore
*/

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Database libraries
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const {
    authenticate
} = require('passport');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Database Setup
const database = 'userDB';
if (process.env.PORT === undefined) {
    // Local Database connection
    mongoose.connect('mongodb://localhost:27017/' + database);
} else {
    // Cloud Database connection
    let username = "";
    let password = "";
    let clusername = "";
    mongoose.connect('mongodb+srv://' + username + ':' + password + '@' + clusername + '.mongodb.net/' + database);
}

// Database Schema / Model
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/logout", function (req, res) {
    res.redirect("/");
});

app.get("/secrets", function (req, res) {
    if(req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});


app.get("/submit", function (req, res) {
    // TODO
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.post("/submit", function (req, res) {
    res.render("submit");
});

app.post("/register", async function (req, res) {


    User.register({
        username: req.body.username
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });
});

app.post("/login", async function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    })
});


app.listen(process.env.PORT || 3000, function () {
    console.log(process.env.PORT);
    if (process.env.PORT === undefined) {
        console.log("Server is running on port 3000.");
    } else {
        console.log("Server is running on port " + process.env.PORT + ".");
    }
});