var express = require('express'),
	jwt = require('jsonwebtoken'),
	config = require('config'),
    User = require('../model/user');

var router = express.Router();

router.post('/login', (req, res) => {
	User.findOne({ name: req.body.name, password: req.body.password }, (err, user) => {
		if (err) throw err;
		if (!user) {
			res.json({ authenticated: false, message : 'The user has not found'});
		} else {
			var token = jwt.sign(user.name, config.secret);
			res.json({ authenticated: true, token: token });
		}
	});
});

router.post('/register', (req, res) => {
	var user = new User({
		name: req.body.name,
		password: req.body.password
	});

	user.save((err) => {
		if (err) throw err;
		res.end('Created!');
	});	
});

if(process.env.NODE_ENV == 'production'){
	router.use('/api', (req, res, next) => {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, config.secret, (err, user) => {
				if (err) {
					tokenError(res);
				} else {
					req.user = user;
					next();
				}
			});
		} else {
			tokenError(res);
		}
	});
}else{
	router.use('/api', (req, res, next) => {
			req.user = {
				login : 'Admin',
				isAdmin : true
			}

			next();
		});
}


var tokenError = function(res){
	res.statusCode = 401;
	res.json({ message: 'No token or the token is invalid' });
}



module.exports = router;