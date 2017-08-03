const express = require('express');
const database = require('../database/index');
const helpers = require('../helpers/github');
// const headers = {'Content-Type': 'json/application'};

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = [];
  req.on('data', (chunk) => {
    username.push(chunk);
    console.log('******username on post ', username);
  }).on('end', () => {
    username = Buffer.concat(username).toString();
    username = username.slice(1, username.length - 1);
    helpers.getReposByUsername(username, function(data) {
      helpers.updateDatabase(data);
      res.status(201).send();
    });
  }).on('error', () => {
    res.status(400).send();
  });
});

app.get('/repos', function (req, res) {
  console.log('***********arrives at get server side');
  // This route should send back the top 25 repos
  // Sorted by date
  // create helper function to find from database
  // might need a stream to collect all records
  let username = [];
  let count = 25;
  // req.on('data', (chunk) => {
  //   username.push(chunk);
  //   console.log('******username on get ', username);
  // })
  // req.on('end', () => {
    // username = Buffer.concat(username).toString();
    // username = username.slice(1, username.length - 1);
    helpers.databaseGetAll(count, function(data) {
      console.log('********data from databaseGetByUsername ', data);
      res.status(200).send(data);
    });
  // });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
