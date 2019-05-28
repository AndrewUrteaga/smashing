var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User = require("../db/index");


exports.decodeToken = function() {
  return function(req, res, next) {
    // follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.headers.authorization) {
    //   req.headers.authorization = 'Bearer ' + req.body.token;
    // }

    // this will call next if token is valid
    // and send error if its not. It will attach
    // the decoded token to req.user
    checkToken(req, res, next);
    } 
  };
};


// we'll have access to req.user here
// because we'll use decodeToken
exports.getUserObject = function() {
  return function(req, res, next) {
 
// get full user object here
    User.findById(req.user._id)
      .then(function(user) {
        if (!user) {
          res.status(401).send('Unauthorized!');
        } else {
          req.user = user;
          next()
        }
      }, function(err) {
        next(err);
      });
  }
};

exports.verifyUser = function() {
  return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // if no username or password then stop.
    if (!username || !password) {
      res.status(400).send("You need a username and password!")
      return;
    } else {
      User.findOne({username: username})
      .then(function(user) {
        if (!user) {
          res.status(401).send('No user by this username!');
        } else {
          if (!user.authenticate(password)) {
            res.status(401).send('Wrong password!')
          } else {
            req.user = user
            next()
          }
        }
      })
    }
    // use the authenticate() method on a user doc. Passin
    // in the posted password, it will hash the
    // password the same way as the current passwords got hashed


  };
};

// util method to sign tokens on signup
exports.signToken = function(id, username) {
  return jwt.sign(
    {_id: id,
     username:username},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
    //in Minutes
  );
};
