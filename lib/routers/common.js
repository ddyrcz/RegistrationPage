var express = require('express'),
	jwt = require('jsonwebtoken'),
	config = require('config'),
    User = require('../models/user');

var router = express.Router();
var validateTokenRouter = express.Router();

router.post('/authenticate', (req, res) => {
	User.findOne({ name: req.body.name, password: req.body.password }, (err, user) => {
		if (err) throw err;
		if (!user) {
			res.json({ authenticated: false });
		} else {
			var token = jwt.sign(user, config.secret);
			res.json({ authenticated: true, token: token });
		}
	});
});

validateTokenRouter.use((req, res, next) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				tokenError(res);
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		tokenError(res);
	}
});

var tokenError = function(res){
	res.statusCode = 401;
	res.json({ message: 'No token or the token is invalid' });
}

if(config.util.getEnv('NODE_ENV') === 'production'){
	// Validate token only when poduction
	router.use('/api', validateTokenRouter);
}

module.exports = router;