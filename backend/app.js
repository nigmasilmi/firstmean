const express = require('express');


// Functionality for serving from this app

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PATCH', 'OPTIONS');
  next();
});

app.use('/api/news', (req, res, next) => {
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