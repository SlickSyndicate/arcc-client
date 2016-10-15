const Passport = require('passport');
const StrategyGoogleOAuth = require('passport-google-oauth').OAuth2Strategy;

const User = require("../models/user");

Passport.serializeUser(function(user, done) {
    done(null, user.id);
});

Passport.deserializeUser(function(id, done) {
    User.get(id).run((err, user) => {
        done(err, user);
    });
});

Passport.use(new StrategyGoogleOAuth({
    clientID: "803116182621-d5mh232duhl1oa5jo1v7bugqo9ohub1o.apps.googleusercontent.com",
    clientSecret: "UF0wpjc1yxastlc_B_Xu504Z",
    callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.filter({googleId: profile.id})
        .run((err, users) => {
            if (users.length === 0) {
                new User({googleId: profile.id}).save((err, result) => {
                    done(err, result);
                })
            } else {
                done(err, users[0]);
            }
        })
}));

module.exports = (app) => {
    app.get('/auth/google', Passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));
    app.get('/auth/google/callback',
        Passport.authenticate('google', {failureRedirect: 'http://localhost:9002/login'}),
        (req, res) => {
            res.redirect('http://localhost:9002/dashboard')
        }
    )
};