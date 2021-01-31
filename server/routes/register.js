var express = require('express');
const { compile } = require('morgan');
var bkfd2Password = require('pbkdf2-password');
var router = express.Router();
var hasher = bkfd2Password();

var user_data = [];

router.get('/', (req, res) => {
	res.render('register.html');
});

/* GET users listing. */
router.post('/auth/register', function (req, res) {
	hasher({ password: req.body.password }, function (err, pass, salt, hash) {
		var user = {
			username: req.body.username,
			password: hash,
			salt: salt,
			displayName: req.body.displayName,
		};
		users.push(user);
		req.login(user, function (err) {
			req.session.save(function () {
				res.redirect('/welcome');
			});
		});
	});
});

module.exports = router;
