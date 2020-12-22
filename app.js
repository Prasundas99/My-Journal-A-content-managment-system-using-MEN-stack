//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const Postmodel = require("./models/posts")

const homeStartingContent = "My journal is a flexible journal entry app. Write, save without wasting time.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION;
const PORT = process.env.PORT|| 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ limit:"30mb",extended: true}));
app.use(bodyParser.json({ limit:"30mb",extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", async (req, res) => {

  try {
    const posts = await Postmodel.find();
    
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
            });
  } catch (error) {
    console.log(error);
  }



});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", async (req, res) => {

   
  res.render("compose");

});

app.post("/compose", async (req, res)=>{

  const post = req.body;
  const newPost = new Postmodel({
    Title: req.body.title,
    Message: req.body.message
    })
  
      console.log(newPost);
  try {
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    console.log(error);
  }

  

  res.redirect("/");

});




    
