var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
  
  passport.use(new GoogleStrategy({
    clientID: "194293777931-k8nehhsq6cbjpvg4iesqrb7vituc128q.apps.googleusercontent.com",
    clientSecret: "WS78pFJwfw5aCahoqjxjKWc1",
    callbackURL: "http://localhost:3000/login/google/callback"
    },
    (accessToken, refreshToken, profile, callback) => {
        console.log(profile);
        return callback(null, profile);
    }
  ));
  
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user);
  })
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  })


}



  