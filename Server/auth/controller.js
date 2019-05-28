let signToken = require('./auth').signToken;
let Users = require('../db/index')

exports.sendLoginUser = function(req,res) {
  res.json(req.user)
};

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  
  var token = signToken(req.user.id, req.user.username);
  res.json({
    username: req.user.username,
    token: token
  })
};

exports.createNewUser = function(req, res, next) {
    Users.create(req.body)
    .then(user => {
        req.user = user
        next();
    }, err => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(err);
      } else {
        next(error);
      }
    })
  }
 








