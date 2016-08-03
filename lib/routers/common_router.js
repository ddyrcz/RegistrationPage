var express = require('express'),
	jwt = require('jsonwebtoken'),
	config = require('config'),
    User = require('user');

var router = express.Router();
var apiRouter = express.Router();

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

apiRouter.use((req, res, next) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				res.json({ message: 'token error' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.json({ message: 'token error' });
	}
});

router.use('/api', apiRouter);

module.exports = router;