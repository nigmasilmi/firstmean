const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    _id: {
        type: String
    },
    author: {
        type: String
    },
    created_at: {
        type: Date
    },
    story_title: {
        type: String
    },
    story_url: {
        type: String
    },

});

module.exports = mongoose.model('News', newsSchema);