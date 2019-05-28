// Import  model
var Users = require('../db/index')

exports.params = function(req, res, next, id){
    console.log('hello')
    Users.findById(id)
        .then(function(user) {
            if (!user) {
                next(new Error('No user with that Id'));
            } else {
                req.user = user;
                next();
            }
        }, function(err) {
            next(err);
        })
    };

exports.getAllUsers = function(req, res, next){
    Users.find({}).sort({ranking:-1})
        .then(function(users){
            res.json(users);
        }, function (err) {
            next(err);
        });
};

exports.getOne = function(req, res, next) {
    var user = req.user;
    res.json(user)
};

exports.updateUser = function(req, res, next) {
    let user = req.user; // old
    let update = req.body; // new
    // Does this make sense?
    

    user = Object.assign(user,update)
    
    user.save(function(err, saved) {
        if (err){
            next(err);
        } else {
            res.json(saved)
        }
    })
};
       
exports.delete = function(req, res, next) {
    req.user.remove(function(err, removed) {
        if(err){
            next(err);
        } else {
            res.json(removed)
        }
    });
};