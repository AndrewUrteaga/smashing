let router = require('express').Router();
let controller = require('./usersController');
let auth = require('../auth/auth')
let checkUser = [auth.decodeToken, auth.getUserObject]
let userMW = require('./usersMiddleware')

router.param('id', controller.params);

router.route('/')
    .get(controller.getAllUsers)
    // .post(controller.createNewUser)

router.route('/:id')
    .get( controller.getOne)
    .put( userMW.updateRank(), controller.updateUser)
    .delete(checkUser,  controller.delete)

module.exports = router;

