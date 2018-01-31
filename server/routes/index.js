var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sqlq = require('.././sql/sql');
var date = require('date-and-time');

var now = new Date();


var connection = mysql.createConnection({
    host: "182.48.84.89",
    user: "dbcdb",
    password: "DbcGrand@2018",
    database: "content_manager",
    multipleStatements: true
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});







router.route('/test').get(function(req, res, next) {
    var newsid;

    sqlq.sqlid().then(function(id) {
        console.log(id);
        newsid = id;

        connection.query("select * from news where id=? ", [id], function(err, doc) {
            console.log(doc);
            res.render('hello', {
                value: doc
            })
        })
    })
}).post(function(req, res, next) {
    req.flash('info', 'Flash is back!')
    var user = { name: req.body.userName, password: req.body.password }
    connection.query("insert into user set?", user, function(err, doc) {
        if (err) throw err;
    })
    res.redirect('/');
})




router.get('/', function(req, res, next) {
    connection.query('SELECT news.*, users.name FROM news INNER JOIN details ON news.id = details.news_id INNER JOIN users ON news.user_id = users.id', function(error, docs) {
        console.log(docs[1].created_at)
        res.render('pages/dashboard.hbs', {
            title: 'News List',
            news: docs,
            info: req.flash('info')
        })
    })
});



router.route('/news-update/:news').get(function(req, res, next) {
    var id = req.params.news;

    connection.query('SELECT * FROM news INNER JOIN details ON news.id = details.news_id WHERE news.id = ?', [id], function(error, docs) {

        connection.query('SELECT * FROM categories', function(error, categorylists) {

            connection.query('SELECT * FROM category_news INNER JOIN categories ON category_news.category_id = categories.id WHERE category_news.news_id = ?', [id], function(error, category_docs) {


                res.render('pages/update-news', {
                    title: 'News Update',
                    id: docs[0].news_id,
                    headline: docs[0].headline,
                    photo: docs[0].photo,
                    top_news: docs[0].top_news,
                    breaking_news: docs[0].breaking_news,
                    video: docs[0].video,
                    description: docs[0].description,
                    category_list: categorylists,
                    sel_category: category_docs,
                    message: req.flash('catagory')
                })
            })
        })

    })
}).post(function(req, res) {
    var id = req.params.news;
    var headline = req.body.headline;

    var topNews = Boolean(req.body.newsT);
    connection.query("update news set headline=?,top_news=? where id=?", [headline, topNews, id], function(error, doc) {
        if (error) throw error;

    });
    if (req.body.description) {
        connection.query("update details set  description=?, updated_at=? where news_id=?", [req.body.description, date.format(now, 'YYYY/MM/DD HH:mm:ss'), id], function(err, doc) {
            if (err) throw err;

        })
    }
    if (req.body.optionsCheckboxes) {
        var values = [];
        var select = req.param('optionsCheckboxes');

        for (var i = 0; i < select.length; i++) {
            values.push([id, select[i]]);

        }
        connection.query('delete from category_news where news_id=?', id);


        connection.query('INSERT INTO category_news (news_id, category_id) VALUES ? on duplicate key update news_id=? ', [values, id], function(err, result) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/');

    } else {
        req.flash('catagory', 'Catagory have to select');
        res.redirect('/news-update/' + id);

    }
})
router.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    connection.query('delete from details where news_id=?', id, function(err, doc) {
        if (err) throw err;
        else {
            console.log(doc);
            res.redirect('/');
        }
    })
})



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


module.exports = router;