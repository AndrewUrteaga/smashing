const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
// const uri = 'mongodb://localhost/smash';
const config = require('../config/config')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Drew:Hopesdie2@cluster0-z92ln.mongodb.net/Smash?retryWrites=true", {useNewUrlParser:true })
    .then(() => {
        console.log("Database connection established!")})
    .catch( err => {console.log(err)})


var userSchema = new Schema({
  name: {
      type: String,
  },
  picture: {type:String, default: "https://smashbucket123.s3.amazonaws.com/1557787837407"},
  main: String,
  secondary: String,
  gender: String,
  wins: {type: Number, default: 0},
  losses:  {type: Number, default: 0},
  winRatio: {type: Number, default: 0},
  username: {
      type: String,
      unique: true    
  },
  elite: Boolean,
  password: {
      type: String,
      required: true
  }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

userSchema.methods = {
    authenticate: function(plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
    },
    encryptPassword: function(plainPassword) {
        if (!plainPassword) {
            return ''
        } else {
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainPassword, salt)
        }
    }
};

// .catch(err => console.log("Error connecting Database instance due to: ", err))
module.exports = mongoose.model('users', userSchema)
// perform actions on the collection object

