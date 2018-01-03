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
    connection.query('SELECT category_news.category_id, category_news.news_id, categories.id, categories.category_name, categories.category_link, news.id, news.title,  news.top_news, news.breaking_news, news.newsview, news.accepted, news.created_at, details.news_id, details.headline,  details.description, coverphotos.news_id, coverphotos.photo FROM category_news INNER JOIN categories ON   category_news.category_id = categories.id INNER JOIN news ON category_news.news_id = news.id INNER JOIN details ON news.id = details.news_id INNER JOIN coverphotos ON news.id = coverphotos.news_id WHERE category_news.category_id = 1 ORDER BY news.created_at DESC LIMIT 50', function(error, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('all', {
            title: 'all news ',
            news: chunk
        })
    })
});

router.get('/h', function(req, res, next) {
    res.render('hello', { title: 'Express' });
});

module.exports = router;