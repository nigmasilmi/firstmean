const express = require('express');

const app = express();



app.use('/api/news', (req, res, next) => {
  const dummyNews = [{
      id: 1,
      title: 'First dummy news',
      author: 'Fist dummy author',
    },

    {
      id: 2,
      title: 'Second dummy news',
      author: 'Second dummy author',
    },
  ];
  res.json({
    message: "News fetched success",
    data: dummyNews
  });
});

module.exports = app;
