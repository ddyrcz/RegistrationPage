var express = require('express'),
    bodyParser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	config = require('config'),
	userRouter = require('./lib/routers/user_router'),
	commonRouter = require('./lib/routers/common_router');

var app = express();

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

app.use(commonRouter);
app.use('/api', userRouter);

app.listen(8000);
console.log('Service in running');