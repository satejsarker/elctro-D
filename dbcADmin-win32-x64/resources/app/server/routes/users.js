// router/routes.js
var express = require('express');
var router = express.Router();
require('.././config/passport');
var passport = require('passport');


// =====================================
// HOME PAGE (with login links) ========
// =====================================
router.get('/', function(req, res) {
    res.render('pages/login/login.hbs');
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('pages/login/signin.hbs', { message: req.flash('loginMessage'), });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/users/profile', // redirect to the secure profile section
        failureRedirect: '/users/login', // redirect back to the signup page if there is an error
        failureFlash: { type: 'loginMessage' } // allow flash messages
    }),
    function(req, res) {
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('pages/login/register.hbs', { message: req.flash('signupMessage') });
});

// process the signup formr
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile', // redirect to the secure profile section
    failureRedirect: '/users/signup', // redirect back to the signup page if there is an error
    failureFlash: { type: 'signupMessage' } // allow flash messages
}));

// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('pages/login/profile.hbs', {
        user: req.user // get the user out of session and pass to template
    });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users/');
});


// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;