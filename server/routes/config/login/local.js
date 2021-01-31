var LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(function (username, password, done) {
			// 로컬 전략
			// 콜백함수
			var uname = username;
			var pwd = password;
			for (var i = 0; i < users.length; i++) {
				var user = users[i];

				if (uname === user.username) {
					// 사용자 존재 유무 검사
					return hasher(
						{ password: pwd, salt: user.salt },
						function (err, pass, salt, hash) {
							if (hash === user.password) {
								// 사용자가 있다면
								console.log('LocalStrategy', user);
								done(null, user); // 로그인 성공
								// req.session.displayName = user.displayName;
								// req.session.save(function () {
								// res.redirect('/welcome');
								// })
							} else {
								// 사용자가 없다면
								done(null, false); // 로그인 실패
								// res.send('Who are you? <a href="/auth/login">login</a>');
							}
						}
					);
				}
			}
			done(null, false);
			// res.send('Who are you? <a href="/auth/login">login</a>');
		})
	);

	passport.serializeUser(function (user, done) {
		console.log('serializeUser', user);
		done(null, user.username);
	});

	passport.deserializeUser(function (id, done) {
		console.log('deserializeUser', id);
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			if (user.username === id) {
				return done(null, user);
			}
		}
	});
};
