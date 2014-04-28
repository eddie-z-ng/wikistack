var express = require('express');
var swig = require('swig');
var marked = require('marked');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./filters')(swig);


var routes = require('./routes/index');
var add_routes = require('./routes/add');
var wiki_routes = require('./routes/wiki');
var edit_routes = require('./routes/edit');
var delete_routes = require('./routes/delete');

var app = express();

app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(app.router);

app.use('/', routes);
app.use('/add', add_routes);
app.use('/wiki', wiki_routes);
app.use('/edit', edit_routes);
app.use('/delete', delete_routes);

//app.get('/', routes.index);
//app.get('/users', users.list);
//app.get('/add_page', routes.add_page);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    swig.setDefaults({ cache: false });
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
