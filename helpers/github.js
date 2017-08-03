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
    if (!error && res.statusCode === 200) {
      updateDatabase(JSON.parse(body));
    }
  }

  request(options, callback);
};

let updateDatabase = (data) => {
  data.forEach((repo) => {
    var cleanRecord = {};
    cleanRecord['_id'] = repo.id;
    cleanRecord['name'] = repo.name;
    cleanRecord['owner'] = {
      login: repo.owner.login,
      id: repo.owner.id,
      avatar_url: repo.owner.avatar_url
    };
    cleanRecord['created_at'] = repo.created_at;
    cleanRecord['updated_at'] = repo.updated_at;
    cleanRecord['pushed_at'] = repo.pushed_at;

    var myRepo = database.tempRepo(cleanRecord);
    database.save(myRepo);
  });
};

module.exports.getReposByUsername = getReposByUsername;
