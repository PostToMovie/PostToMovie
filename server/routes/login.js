var express = require('express');

//DB구성
var mysql = require('mysql2');
var dbConfig = require('./config/db/dbConfig')
var connection = mysql.createConnection(dbConfig);
var router = express.Router();
var app = express()
var passport = require('passport');

connection.connect();
router.get('/', (req, res) => {
    console.log("3");
    res.render("login.html", { title : 'Login' })
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
    console.log("check");
    console.log(req.body);
    console.log("id : " + req.body.id)
    console.log("pw : " + req.body.pwd)

    const id = req.body.id;
    const pwd = req.body.pwd;

    //req.session.userid = req.body.id;
    //console.log("session 확인" + req.session.userid)

    connection.query('SELECT * FROM users',
        function( error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if(results.length > 0) {
                console.log(results);
                if(results[0].pwd == pwd) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            } else {
                res.send({
                    "code":204,
                    "success": "Email does not exists"
                });
            }
        }    
    })
})

module.exports = router;