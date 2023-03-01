//jshint esversion:6

/*
    ToDo
        - Fill out database credentials in the 'Database Setup' section for MongoDB Atlas
*/

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Database libraries
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const encrypt = require("mongoose-encryption");

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

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] } );

const User = mongoose.model("User", userSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.get("/submit", function (req, res) {
    // TODO
});

app.post("/submit", function (req, res) {
    res.render("submit");
});

app.post("/register", function (req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save().then(() => {
        res.render("secrets");
    }).catch((err) => {
        console.log(err);
    })
});

app.post("/login", async function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    const foundUser = await User.findOne({
        email: username
    }).exec();


    if (foundUser != null) {
        if (foundUser.password === password) {
            res.render("secrets");
        } else {
            console.log("Incorrect password!");
        }
    } else {
        console.log("No user found with that username!");
    }
});




app.listen(process.env.PORT || 3000, function () {
    console.log(process.env.PORT);
    if (process.env.PORT === undefined) {
        console.log("Server is running on port 3000.");
    } else {
        console.log("Server is running on port " + process.env.PORT + ".");
    }
});