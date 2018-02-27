var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var expressHbs = require('express-handlebars');
var hbsHelpers = require('handlebars-helpers');
var flash = require('connect-flash-plus');
var moment = require('moment');
var passport = require('passport');
var flash = require('connect-flash');


require('./config/passport')(passport);


moment.locale('bn')
moment().format('LL');

// var hbs = require('hbs');


var DateFormats = {
    'short': "MMM Do YY",
    'long': 'h:mm a , Do MMMM , YYYY'
};
var Handlebars = require('handlebars');

var hbs = expressHbs.create({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "/views/layouts/"),
    partialsDir: path.join(__dirname, '/views/partials/'),
    defaultLayout: 'layout.hbs',
    helpers: {

        formatDate: function(datetime, format) {
            if (moment) {
                // can use other formats like 'lll' too
                format = DateFormats[format] || format;
                return moment(datetime).format(format);
            } else {
                return datetime;
            }
        },
        ifCond: function(v1, operator, v2, options) {

            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }

    }
});







var index = require('./routes/index');
var users = require('./routes/users');
var post = require('./routes/post');
var image =require('./routes/image');



var app = express();

// view engine setup
app.engine('hbs', hbs.engine);



app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');

hbsHelpers.apply(hbs.handlebars, {});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({
    secret: 'satejsarker###$$$$&*%@%12111jjasdgAA',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session




app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));



app.use('/', index);
app.use('/users', users);
app.use('/post', post);
app.use('/image',image);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;