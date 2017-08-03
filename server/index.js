const express = require('express');
const database = require('../database/index');
const helpers = require('../helpers/github');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = [];
  req.on('data', (chunk) => {
    username.push(chunk);
  }).on('end', () => {
    username = Buffer.concat(username).toString();
    username = username.slice(1, username.length - 1);
    helpers.getReposByUsername(username);
      // , function(repos) {
      // console.log('*********repos returned ', repos);
      // res.end(repos);
    // });
  }).on('error', () => {
    //log error
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
