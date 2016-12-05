var express = require('express'),
    User = require('../model/user');

var router = express.Router();

router.get('/users', (req, res) => {
	User.find({}, (err, users) => {
		res.json(users);
	});
});

router.post('/users', (req, res) => {
	var user = new User({
		name: req.body.name,
		password: req.body.password
	});

	user.save((err) => {
		if (err) throw err;
		res.end('Created!');
	});
});

module.exports = router;