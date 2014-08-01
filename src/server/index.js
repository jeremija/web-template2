/*jslint node: true */
'use strict';

console.log('starting express server...');

var express = require('express');
var ejs = require('ejs');
var config = require('./config.js');

var app = express();
ejs.open = '{{';
ejs.close = '}}';

var oneDay = 86400000;
// TODO deprecated
// app.use(express.compress());

config.setup(app);

app.engine('html', ejs.renderFile);
// app.set('view engine', 'html');
app.set('views', __dirname + '/../templates');

app.all('*', function(req, res, next) {
    var request = req.params[0];

    if (request === '/') {
        res.redirect('/index.html');
        return;
    }

    if (request.substr(0, 1) === '/' &&
        request.substr(request.length - 4) === 'html') {
        request = request.substr(1);
        res.render(request, {
            js: 'pages/' + request + '.js'
        });
        return;
    }

    next();
});

app.use(express.static(__dirname + '/../static', {maxAge: oneDay}));
app.use(express.static(__dirname + '/../templates-js', {maxAge: oneDay}));

// app.use(function(req, res, next) {
//     // redirect invalid requests to index page
//     res.render('errors/404.html');
// });

var port = process.env.PORT || 8080;

app.listen(port);

console.log('listening on port ' + port);