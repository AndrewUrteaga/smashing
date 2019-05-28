
let express = require('express')
let bodyParser = require('body-parser');
let apiRoutes = require('./routes/api')
let cors = require('cors')
let config = require('./config/config')
let morgan = require('morgan')

let app = express();



app.use(morgan('dev'));
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRoutes)


app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message)
    
    res.status(500).send(err )
  }
});

// use API routes in app
var port = config.port;

app.get('/', (req, res) => res.send('Hello I am Working'));

app.listen(port, () => {
  console.log("Running Smash at port " + port);
});