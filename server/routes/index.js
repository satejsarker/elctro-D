var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "182.48.84.89",
    user: "dbcdb",
    password: "DbcGrand@2018",
    database: "dbc_new"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// router.get('/',function(req,res,next){
// res.render('index');
// });
/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query('SELECT category_news.category_id, category_news.news_id, categories.id, categories.category_name, categories.category_link, news.id, news.title,  news.top_news, news.breaking_news, news.newsview, news.accepted, news.created_at, details.news_id, details.headline,  details.description, coverphotos.news_id, coverphotos.photo FROM category_news INNER JOIN categories ON   category_news.category_id = categories.id INNER JOIN news ON category_news.news_id = news.id INNER JOIN details ON news.id = details.news_id INNER JOIN coverphotos ON news.id = coverphotos.news_id WHERE category_news.category_id = 1 ORDER BY news.created_at DESC', function(error, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('pages/dashboard.hbs', {
            title: 'News List',
            news: chunk
        })
    })
});

router.get('/publish', function(req, res, next) {
    res.render('pages/publish.hbs', { title: 'Express' });
});

router.get('/news-update', function(req, res, next) {
    res.render('pages/update-news', { title: 'Express' });
});

router.get('/image-list', function(req, res, next) {
    res.render('pages/image-list', { title: 'Express' });
});

router.get('/image-upload', function(req, res, next) {
    res.render('pages/image-upload', { title: 'Express' });
});

router.get('/statistics', function(req, res, next) {
    res.render('pages/statistics', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
    res.render('pages/profile', { title: 'Express' });
});

router.get('/ng', function(req, res) {
    connection.query('SELECT category_news.category_id, category_news.news_id, categories.id, categories.category_name, categories.category_link, news.id, news.title,  news.top_news, news.breaking_news, news.newsview, news.accepted, news.created_at, details.news_id, details.headline,  details.description, coverphotos.news_id, coverphotos.photo FROM category_news INNER JOIN categories ON   category_news.category_id = categories.id INNER JOIN news ON category_news.news_id = news.id INNER JOIN details ON news.id = details.news_id INNER JOIN coverphotos ON news.id = coverphotos.news_id WHERE category_news.category_id = 1 ORDER BY news.created_at DESC ', function(error, docs) {
        res.json(docs);
    });
});

module.exports = router;