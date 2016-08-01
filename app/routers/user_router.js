var express = require('express'),
    User = require('user');

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
		if (err) {
			console.log(err);
		}
		res.end('Created!');
	});
});

module.exports = router;