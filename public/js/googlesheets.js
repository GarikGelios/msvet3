document.addEventListener("DOMContentLoaded", ready);

const urlDocs = "https://spreadsheets.google.com/feeds/list/";
const sheetsId = "1dziTjA-eZib8b4g3UerdVD55DW-VjYhauQYd8NIpQ18";
const urlParams = "/1/public/full?alt=json";

const endpoint = urlDocs + sheetsId + urlParams;

function ready() {

//jQuery
// $.getJSON(endpoint, function (data) {
//     //first row "title" column
//     console.log(data.feed.entry);
// });

//plain JavaScript
var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

getJSON(endpoint,
  function (err, data) {
    if (err !== null) {
      alert('Something went wrong: ' + err);
    } else {
      console.log(data.feed.entry);
    }
  });

};