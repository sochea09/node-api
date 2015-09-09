var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var posts  = require('./routes/posts');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});


module.exports = app;