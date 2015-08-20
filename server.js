var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'root',
    database    : 'books',
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    var data = {
        "Data":""
    };
    data["Data"] = "Welcome to Book Store DEMO...";
    res.json(data);
});

app.get('/book', function (req, res) {
    var data = {
        "error":1,
        "Book":""
    };

    connection.query("SELECT * from book", function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = 0;
            data["Book"] = rows;
            res.json(data);
        }else{
            data["Book"] = 'No books Found..';
            res.json(data);
        }
    });
});

app.post('/book', function(req, res){
    var Bookname = req.body.bookname;
    var Authorname = req.body.authorname;
    var Price = req.body.price;
    var data = {
        "error":1,
        "Book":""
    };
    if(!!Bookname && !!Authorname && !!Price){
        connection.query("INSERT INTO book VALUES('',?,?,?)",[Bookname,Authorname,Price],function(err, rows, fields){
            if(!!err){
                data["Book"] = "Error Adding data";
            }else{
                data["error"] = 0;
                data["Book"] = "Book Added Successfully.";
            }
            res.json(data);
        });
    }else{
        data["Book"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
        res.json(data);
    }
});
app.put('/book', function(req, res){
    var Id = req.body.id;
    var Bookname = req.body.bookname;
    var Authorname = req.body.authorname;
    var Price = req.body.price;
    var data = {
        "error":1,
        "Book":""
    };
    if(!!Bookname && !!Authorname && !!Price){
        connection.query("UPDATE book SET BookName=?, AuthorName=?, Price=? WHERE id=?" ,[Bookname,Authorname,Price,Id],function(err, rows, fields){
            if(!!err){
                data["Book"] = "Error Updating data";
            }else{
                data["error"] = 0;
                data["Book"] = "Updated Book Successfully.";
            }
            res.json(data);
        });
    }else{
        data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
        res.json(data);
    }
});
app.delete('/book', function(req, res){
    var Id = req.body.id;
    var data = {
        "error":1,
        "Book":""
    };
    if(!!Id){
        connection.query("DELETE FROM book WHERE id=?" ,[Id],function(err, rows, fields){
            if(!!err){
                data["Book"] = "Error deleting data";
            }else{
                data["error"] = 0;
                data["Book"] = "Delete Book Successfully.";
            }
            res.json(data);
        });
    }else{
        data["Book"] = "Please provide all required data (i.e : id)";
        res.json(data);
    }
});

app.listen(3000);
console.log('Api is running on port 3000');
