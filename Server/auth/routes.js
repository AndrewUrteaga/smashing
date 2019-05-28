let router = require('express').Router();
let controller = require('./controller');
let auth = require('./auth')





// check
// the password and username match what is in the DB
router.get('/checkuser', auth.decodeToken(), auth.getUserObject(), controller.sendLoginUser)
router.post('/signin', auth.verifyUser(), controller.signin);
router.post('/register', controller.createNewUser, controller.signin);

//protected endpoints 
// 1. edit user
//    - edit photo 
//    - etc. 
// 2. track wins/losses

module.exports = router;
