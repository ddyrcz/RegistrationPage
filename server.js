var express     = require('express'),
    bodyParser  = require('body-parser'),
	morgan      = require('morgan'),
	mongoose    = require('mongoose'),
	jwt         = require('jsonwebtoken'),
	config      = require('./config'),
	User        = require('./app/models/user');

var app = express();

mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.end('ok');
});

app.get('/users', (req, res) => {
	User.find({}, (err, users) => {
		res.json(users);
	});
});

app.get('/setup', (req, res) => {
	var user = new User({
		name:'Dawid',
		password:'dd'
	 });

	 user.save((err) => {
		if(err){
			console.log(err);
		}
		res.end('Created!');
	});
});


app.listen(8000);
console.log('service in running');