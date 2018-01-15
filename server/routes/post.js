var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sqlq = require('.././sql/sql');
var crypto = require('crypto');
var date = require('date-and-time');

var now = new Date();

function randomValueBase64(len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64') // convert to base64 format
        .slice(0, len) // return required number of characters
        .replace(/\+/g, '0') // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
}



var connection = mysql.createConnection({
    host: "182.48.84.89",
    user: "dbcdb",
    password: "DbcGrand@2018",
    database: "content_manager"
});

router.route('/jd')

.get(function(req, res, next) {

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
})

.post(function(req, res, next) {



    var slug = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var news = {
        top_news: Boolean(req.body.newsT),
        headline: req.body.hedline,
        user_id: 1,
        slug: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        created_at: date.format(now, 'YYYY/MM/DD HH:mm:ss'),
        updated_at: date.format(now, 'YYYY/MM/DD HH:mm:ss')
    }

    connection.query('insert into news set?', news, function(error, doc) {
        if (error) {
            throw error;
        } else {
            console.log(doc);
        }
    })

    sqlq.sqlid().then(function(id) {
        console.log(id);
        var details = {
            news_id: id,
            photo: req.body.photo,
            created_at: date.format(now, 'YYYY/MM/DD HH:mm:ss'),
            description: req.body.description,
            updated_at: date.format(now, 'YYYY/MM/DD HH:mm:ss'),

        }
        connection.query("insert into details set?", [details], function(err, doc) {
            if (err) throw err;
            else {
                res.redirect('/');
                console.log(doc);
            }

        })

        var array = []
        var select = req.param('optionsCheckboxes');


        var values = [];

        for (var i = 0; i < select.length; i++)
            values.push([id, select[i]]);

        console.log(values);
        // var stringObj = JSON.stringify(select);
        connection.query('INSERT INTO category_news (news_id, category_id) VALUES ?', [values], function(err, result) {
            if (err) {
                res.send('Error');
            } 
        });
    })

})



module.exports = router;