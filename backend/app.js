const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post');

const mongoose = require('mongoose');

const app = express();

const connectUrl = "mongodb+srv://mongouser:mongouser1@cluster0-sdtm9.mongodb.net/node-angular?retryWrites=true&w=majority";
const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(connectUrl, connectConfig)
.then( () => {
  console.log('Database connected')
})
.catch( () => {
  console.log('Sth went really wrong :/')
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added',
      postId: result._id
    });
  });

});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then( documents => {
      res.status(200).json({
        message: "Post fetched. Status: OK",
        posts: documents
      });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({message: "deleted"});
});
module.exports = app;
