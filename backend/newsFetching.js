const extCall = require('request');

// Functionality for serving to this app from algolia api
// data needed to bring: story_title, title, author, url, posted date
// properties of interest: created_at, story_title or title, url, author
const urlStr = 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs';

extCall({
    url: urlStr,
    json: true
}, (err, res) => {

    const data = res.body.hits;

    dataProcessor(data);

});

// fuction that filters the data according to the content 

const dataProcessor = (dataComing) => {
    let cleanedData = [];
    dataComing.forEach(element => {
        let item = {};
        if (element.title === null && element.story_title === null) {
            return;
        } else if (element.story_title !== null) {
            item.title = element.story_title;
        } else {
            item.title = element.title;
        }
        item.author = element.author;
        item.created_at = element.created_at;
        item.story_id = element.story_id;
        item.story_url = element.story_url;
        cleanedData.push(item);
    });
    // return cleanedData;
    console.log(cleanedData);
};


// module.exports = cleanedData;