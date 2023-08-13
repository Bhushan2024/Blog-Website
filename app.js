//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to our daily blog, where every day brings a fresh wave of captivating content. From thought-provoking articles to practical tips and entertaining stories, we cover a wide range of topics that cater to diverse interests. Our team of dedicated writers and experts strive to deliver accurate, engaging, and informative content that sparks curiosity and keeps you coming back for more. Join us on this daily adventure as we explore new horizons, share valuable insights, and create a community where ideas flourish. Discover something new every day with our daily blog.";
const aboutContent = "We are committed to providing exceptional learning resources and empowering individuals to reach their fullest potential. With a wide range of courses and expert instructors, we strive to create a dynamic and engaging learning environment that nurtures growth, sparks curiosity, and fosters success. Whether you are a student, professional, or lifelong learner, our goal is to provide you with the knowledge, skills, and support needed to thrive in today's ever-evolving world. Join us on this exciting educational journey and unlock your true potential with our transformative learning experiences.";
const contactContent = "You can reach us directly via email at Support@dd.com, and we'll be happy to assist you. Thank you for visiting our website, and we look forward to connecting with you soon!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
