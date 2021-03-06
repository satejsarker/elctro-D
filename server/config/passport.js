
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection({
    host: "182.48.84.89",
    user: "dbcdb",
    password: "DbcGrand@2018",
    database: "content_manager"
});

// connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function(err, rows) {
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
            var id;
                if (req.body ===" ") {
                    return done(null, false, req.flash('signupMessage', 'its cant be empty '));
                } else {
                    // find a user whose email is the same as the forms email
                    // we are checking to see if the user trying to login already exists
                    connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
                        if (err)
                            return done(err);
                        if (rows.length) {
                            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                        } else {
                            // if there is no user with that username
                            // create the user
                            var newUserMysql = {
                                username: username,
                                password: bcrypt.hashSync(password, null, null),
                               phone:req.body.phone ,
                                email:req.body.email,
                                bn_name:req.body.bn_name,
                                area_name:req.body.area_name,
                                designation:req.body.designation

                                // use the generateHash function in our user model
                            };

                            var insertQuery = "INSERT INTO users (username,password,email,phone,bn_name,area_name,designation) values (?,?,?,?,?,?,?)";

                            connection.query(insertQuery, [newUserMysql.username, newUserMysql.password,newUserMysql.email,newUserMysql.phone,
                                newUserMysql.bn_name,newUserMysql.area_name,newUserMysql.designation
                            ], function(err, rows) {
                                if(err) throw err;

                        
                                newUserMysql.id = rows.insertId;

                                return done(null, newUserMysql);
                            });
                        }
                    });

                }
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
                if (username == null) {
                    return done(req.flash('loginMessage', 'value is missing '));
                }
                // callback with email and password from our form
                connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, rows[0]);
                });
            })
    );
};