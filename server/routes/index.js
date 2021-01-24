var express = require('express');
var router = express.Router();

var usersRouter = require('./users');
var registerRouter = require('./register');
var loginRouter = require('./login')

router.use('/users', usersRouter);
router.use('/register', registerRouter);
router.use('/login', loginRouter)

router.get('/', (req, res) => {
    res.render('index.html');
})

module.exports = router;
