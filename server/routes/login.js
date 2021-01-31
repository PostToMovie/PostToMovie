var express = require('express');

//DB구성
var mysql = require('mysql2');
var dbConfig = require('./config/db/dbConfig');
var connection = mysql.createConnection(dbConfig);
var router = express.Router();
var app = express();
var passport = require('passport');

connection.connect();

router.get('/', (req, res) => {
	console.log('3');
	res.render('login.html', { title: 'Login' });
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login',
		successRedirect: '/',
	})
);

router.post('/', (req, res) => {
	passport.authenticate(
		// 미들웨어를 받아서 인증작업을 처리
		'local', // 로컬 방식
		{
			successRedirect: '/', // 로그인 성공
			failureRedirect: '/login', // 로그인 실패
			failureFlash: false,
		}
	);
});

module.exports = router;
