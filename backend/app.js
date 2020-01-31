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

// first time populating db
app.post('/api/news', (req, res, next) => {

  const news = req.body;

  cleanedData.forEach(element => {
    const newDoc = new News({
      author: element.author,
      created_at: element.created_at,
      story_title: element.story_title,
      story_url: element.story_url
    });

    newDoc.save();

  });
  res.send('done populating the database');

});


app.get('/api/news', (req, res, next) => {

  // TODO: QUERY FOR ALL DOCUMENTS IN DB AND SORT BY CREATED_AT
  const dummyNews = [{
      story_id: 1,
      title: 'First dummy news',
      author: 'Fist dummy author',
      story_url: {
        value: 'https://sneak.berlin/20200129/starlink/'
      }
    },

    {
      story_id: 2,
      title: 'Second dummy news',
      author: 'Second dummy author',
      story_url: {
        value: 'https://godotengine.org/article/here-comes-godot-3-2'
      }
    },
  ];
  res.json({
    data: dummyNews
  });
});



module.exports = app;