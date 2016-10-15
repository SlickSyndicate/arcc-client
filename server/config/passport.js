const Passport = require('passport');
const StrategyGoogleOAuth = require('passport-google-oauth').OAuth2Strategy;

const User = require("../models/user");

const callbackURLBase = process.env.CALLBACK_URL_BASE || 'http://localhost:3000';
const redirectURLBase = process.env.REDIRECT_URL_BASE || 'http://localhost:9002';

Passport.serializeUser(function(user, done) {
    done(null, user.id);
});

Passport.deserializeUser(function(id, done) {
    User.get(id).run((err, user) => {
        done(err, user);
    });
});

Passport.use(new StrategyGoogleOAuth({
    clientID: process.env.OAUTH_GOOGLE_ID,
    clientSecret: process.env.OAUTH_GOOGLE_SECRET,
    callbackURL: callbackURLBase + "/auth/google/callback"
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
        Passport.authenticate('google', {failureRedirect: redirectURLBase + '/login'}),
        (req, res) => {
            res.redirect(redirectURLBase + '/dashboard')
        }
    )
};