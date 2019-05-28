var config = {
    dev: "development",
    prod: "production",
    db: {
        url: "mongodb+srv://Drew:Hopesdie2@cluster0-z92ln.mongodb.net/Smash?retryWrites=true"
    },

    port: process.env.PORT || 3000,
    secrets: {
        jwt: process.env.JWT || "Banana"
    },
    expireTime: 60 * 24 * 5,
    // expires in 5 days
   
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;

try {
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};

} catch(e) {
    envConfig = {}; 
}

module.exports = Object.assign(config, envConfig)
