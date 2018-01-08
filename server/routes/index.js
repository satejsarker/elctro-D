var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "182.48.84.89",
    user: "dbcdb",
    password: "DbcGrand@2018",
    database: "content_manager"
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
    connection.query('SELECT * FROM news INNER JOIN details ON news.id = details.news_id INNER JOIN users ON news.user_id = users.id', function(error, docs) {
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
    connection.query('SELECT * FROM categories', function(error, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('pages/publish.hbs', {
            title: 'New News Create',
            category: chunk
        })
    })
});


router.get('/news-update/:news', function(req, res, next) {
    var id = req.params.news;
    // console.log(req.params);
    connection.query('SELECT * FROM news INNER JOIN details ON news.id = details.news_id WHERE news.id = ?', [id], function(error, docs) {
        // var chunk = [];
        // var chunksize = 1;
        // for (var i = 0; i < docs.length; i++) {
        //     chunk.push(docs.slice(i, i + chunksize));
        // }
        connection.query('SELECT * FROM categories', function(error, categorylists) {
                // var catsize = 1;
                // for (var i = 0; i < categorylists.length; i++) {
                //     category.push(categorylists.slice(i, i + catsize));
                // }

                connection.query('SELECT * FROM category_news INNER JOIN categories ON category_news.category_id = categories.id WHERE category_news.news_id = ?', [id], function(error, category_docs) {

                    // var catsizes = 1;
                    // for (var i = 0; i < category_docs.length; i++) {
                    //     category_sel.push(category_docs.slice(i, i + catsizes));
                    // }

                    // console.log(category_sel);
                    // console.log(categoryl)
                    res.render('pages/update-news', {
                        title: 'News Update',
                        headline: docs[0].headline,
                        photo: docs[0].photo,
                        top_news: docs[0].top_news,
                        breaking_news: docs[0].breaking_news,
                        video: docs[0].video,
                        description: docs[0].description,
                        category_list: categorylists,
                        sel_category: category_docs
                    })
                })
            })
            // console.log(docs[0].headline)
    })
});


// router.get('/news-update', function(req, res, next) {
//     res.render('pages/update-news', { title: 'Express' });
// });

router.get('/image-list', function(req, res, next) {
    res.render('pages/image-list', { title: 'Image List' });
});

router.get('/image-upload', function(req, res, next) {
    res.render('pages/image-upload', { title: 'Image Upload' });
});

router.get('/statistics', function(req, res, next) {
    res.render('pages/statistics', { title: 'Statistics' });
});

router.get('/profile', function(req, res, next) {
    res.render('pages/profile', { title: 'User Profile' });
});

// router.get('/ng', function(req, res) {
//     connection.query('SELECT category_news.category_id, category_news.news_id, categories.id, categories.category_name, categories.category_link, news.id, news.title,  news.top_news, news.breaking_news, news.newsview, news.accepted, news.created_at, details.news_id, details.headline,  details.description, coverphotos.news_id, coverphotos.photo FROM category_news INNER JOIN categories ON   category_news.category_id = categories.id INNER JOIN news ON category_news.news_id = news.id INNER JOIN details ON news.id = details.news_id INNER JOIN coverphotos ON news.id = coverphotos.news_id WHERE category_news.category_id = 1 ORDER BY news.created_at DESC LIMIT 50', function(error, docs) {
//         res.json(docs);
//     });
// });

module.exports = router;