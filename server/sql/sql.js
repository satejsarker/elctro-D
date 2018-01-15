var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "182.48.84.89",
    user: "dbcdb",
    password: "DbcGrand@2018",
    database: "content_manager"
});

module.exports.sqlid = function() {
    return new Promise(function(resove, reject) {
        connection.query("select id from news order by created_at desc limit 1", function(err, result) {

            if (err) reject;
            else {
                resove(result[0].id);
            }


        });

    })




}