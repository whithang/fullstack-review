var data = require('../data');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));

var promiseDB = mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
  }, function(error, db) {
    console.error.bind(console, 'connection error:')
});

promiseDB.then(function() {
  mongoose.connection.db.dropDatabase();
  let repos = mongoose.Schema({
    repo_id: {type: Number, unique: true},
    name: String,
    owner_id: Number,
    owner_name: { type: String, index: true },
    owner_avatar_url: String,
    created_at: Date,
    updated_at: Date,
    pushed_at: Date,
    default_branch: String
  });

  module.exports.Repo = mongoose.model('Repo', repos);
  // code for importing sample data

  // data.forEach((repo) => {
  //   var cleanRecord = {};
  //   cleanRecord['_id'] = repo.id;
  //   cleanRecord['name'] = repo.name;
  //   cleanRecord['owner'] = {
  //     login: repo.owner.login,
  //     id: repo.owner.id,
  //     avatar_url: repo.owner.avatar_url
  //   };
  //   cleanRecord['created_at'] = repo.created_at;
  //   cleanRecord['updated_at'] = repo.updated_at;
  //   cleanRecord['pushed_at'] = repo.pushed_at;
  //
  //   var tempRepo = new Repo(cleanRecord);
  //   tempRepo.save(function (err, tempRepo) {
  //     if (err) {return console.error(err);}
  //   });
  // });

  // var tempRepo = new Repo(cleanRecord);
  // module.exports.tempRepo = function(record) {
  //   return new module.exports.Repo(record);
    //refactor to only send above one exported
  // };

  let save = (repo) => {
    repo.save(function(err, repo) {
      if (err) {
        return console.error(err);
      }
    });
  };

  module.exports.save = save;
});
