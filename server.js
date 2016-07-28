var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken');
var config = require('./config'); 
var User   = require('./app/models/user');


//mongoose.connect(config.database);
//app.set('superSecret', config.secret);

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.end('ok');
});


app.listen(8000);
console.log('service in running');