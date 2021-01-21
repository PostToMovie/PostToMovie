var express = require('express');
var router = express.Router();
var app = express()
var passport = require('passport');

router.get('/', (req, res) => {
    res.render("login", { title : 'Login' })
})

router.get('/google', 
    passport.authenticate('google', { scope : ['profile']})
    );

router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/'
    }))


router.post('/', (req, res) => {
    console.log("id : " + req.body.email)
    console.log("pw : " + req.body.pwd)

    console.log(req.session);
    req.session.userid = req.body.email
    console.log("session 확인" + req.session.userid)

    res.redirect("/")
})

module.exports = router;