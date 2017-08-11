const User = require('../models/user');

exports.show = function(req, res, next) {
  User.findOne({_id: req.params.user_id}, function(err, user) {
    User.findOne({email: user.partnerEmail}, function(err, partner) {
      res.send({currentUser: user, partner: partner});
    })
  })
}

exports.index = function(req, res, next) {
  User.find({}, function(err, users) {
    res.send(users);
  })
};

exports.update = function(req, res, next) {
    const userQuery = {_id: req.params.user_id};
    User.update(userQuery, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio
    }, function(err, affected, resp) {
    });
    User.findOne({_id: req.params.user_id}, function(err, user) {
      console.log(user,'user in backend');
      res.send(user);
    })
}
