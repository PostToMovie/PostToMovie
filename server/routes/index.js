var express = require('express');
var router = express.Router();

var usersRouter = require('./users');
var registerRouter = require('./register');
var loginRouter = require('./login');

router.use('/users', usersRouter);
router.use('/register', registerRouter);
router.use('/login', loginRouter);

router.get('/', (req, res) => {
	if (req.user && req.user.displayName) {
		// passport로 부터 받은 유저 객체가 사용자 정보와 같으면
		res.send(`
        <h1>Hello, ${req.user.displayName}</h1>
        <a href="/auth/logout">logout</a>
        `);
	} else {
		res.send(`
        <h1>Welcome</h1>
        <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
        </ul>
        `);
	}
});

module.exports = router;
