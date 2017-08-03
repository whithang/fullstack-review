const request = require('request');
const config = require('../config.js');
const database = require('../database/index');

var github_url = 'https://api.github.com';

let getReposByUsername = (username, callback) => {

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

  request(options, function(error, res, body) {
    if (!error && res.statusCode === 200) {
      callback(JSON.parse(body));
    } else {
      throw error;
    }
  });
};

module.exports.updateDatabase = (data) => {
  data.forEach((repo) => {
    var repoExists = database.Repo.findOne({'repo_id': repo.id}, (err, repoExists) => {
      if (err) {
        return err; //handle error
      } else {
        return repoExists;
      }
    });
    if (!!repoExists) {
      database.save(cleanRecord(repo));
    }
  });
};

let cleanRecord = (repo) => {
  var cleanRecord = {};
  cleanRecord['repo_id'] = repo.id;
  cleanRecord['name'] = repo.name;
  cleanRecord['owner_id'] = repo.owner.id;
  cleanRecord['owner_name'] = repo.owner.login;
  cleanRecord['owner_avatar_url'] = repo.owner.avatar_url;
  cleanRecord['created_at'] = repo.created_at;
  cleanRecord['updated_at'] = repo.updated_at;
  cleanRecord['pushed_at'] = repo.pushed_at;

  // var myRepo = database.tempRepo(cleanRecord);
  return new database.Repo(cleanRecord);
};

module.exports.databaseGetAll = function (count, callback) {
  database.Repo.find()
    .sort({'created_at': -1})
    .limit(count)
    .exec((err, data) => {
      if (err) {
        return err; //handle error
      } else {
        console.log('***********data from get ', data);
        callback(data);
      }
  });
};

module.exports.getReposByUsername = getReposByUsername;
