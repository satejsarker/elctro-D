var express = require('express');
var router = express.Router();
var mysql = require('mysql');



var connection = mysql.createConnection({
    host: "182.48.84.89",
    user: "dbcdb",
    password: "DbcGrand@2018",
    database: "dbc_new"
});

router.get('/all',(req,res)=>{
  
    connection.query('select * from coverphotos order by id desc limit 500',(err,doc)=>{
        
            if(err) throw err;
            else
            {
                res.render('pages/image-list',
            {
                title:'image galary',
                images:doc
            })
            }
    })

})


module.exports = router;