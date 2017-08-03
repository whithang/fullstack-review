const request = require('request');
const config = require('../config.js');
const database = require('../database/index');

var github_url = 'https://api.github.com';

let getReposByUsername = (username) => {

  let options = {
    // url: github_url + '/search/repositories',
    // q: 'user=' + username,
    // **what is format for q?
    // url: `${github_url}/users/${username}/repos`,
    url: github_url + '/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  };

  function callback(error, res, body) {
    console.log('********callback accessed res ', res);
    if (!error && res.statusCode === 200) {
      var info = JSON.parse(body);
      console.log('**********info from github ', info);
    }
  }

  request(options, callback);
};

module.exports.getReposByUsername = getReposByUsername;
