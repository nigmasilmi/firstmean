// const extCall = require('request');

// // Functionality for serving to this app from algolia api
// // data needed to bring: story_title, title, author, url, posted date
// // properties of interest: created_at, story_title or title, url, author
// const urlStr = 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs';

// extCall({
//     url: urlStr,
//     json: true
// }, (err, res) => {

//     const data = res.body.hits;

//     dataProcessor(data);

// });

// // fuction that filters the data according to the content 
// const cleanedData = [];
// const dataProcessor = (dataComing) => {

//     dataComing.forEach(element => {
//         let item = {};
//         if (element.title === null && element.story_title === null) {
//             return;
//         } else if (element.story_title !== null) {
//             item.title = element.story_title;
//         } else {
//             item.title = element.title;
//         }

//         if (element.url === null && element.story_url === null) {
//             return;
//         } else if (element.story_url !== null) {
//             item.story_url = element.story_url;
//         } else {
//             item.story_url = element.url;
//         }
//         item.author = element.author;
//         item.created_at = element.created_at;
//         item.story_id = element.story_id;
//         cleanedData.push(item);
//     });
//     // console.log(cleanedData);
//     return cleanedData;

// };


// module.exports = cleanedData;