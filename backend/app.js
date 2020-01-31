const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const News = require('./models/news');


// Functionality for serving from this app

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PATCH', 'OPTIONS');
  next();
});

// connection to mongodb

mongoose.connect('mongodb+srv://nig:NgTJunHJDxxHLUAq@cluster0-czjkv.mongodb.net/reignfs?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Game on, we are connected!');
  })
  .catch(() => {
    console.log('Connection failed, debug and try again');
  });



app.post("/api/news", (req, res, next) => {
  const newDoc = new News({
    author: req.body.author,
    created_at: req.body.created_at,
    story_title: req.body.story_title,
    story_url: req.body.story_url,
  });
  newDoc.save();
});

app.get("/api/news", (req, res, next) => {
  News.find().then(documents => {
    res.status(200).json({
      news: documents
    });
  });
});

app.delete('/api/news/:id', (req, res, next) => {
  console.log(req.params.id);
});



module.exports = app;