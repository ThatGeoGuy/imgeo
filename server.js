/*
 * ENGO 551 - IMGEO Server Implementation
 * File        : server.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 11:14:35
 * Description : Implements the webserver for the ENGO500 project website
 */
var express = require('express'),
	handlers = require('./routes/handlers'),
	mustacheExpress = require('mustache-express'),
	http = require('http'),
	path = require('path');

var app = express();
app.engine('mustache', mustacheExpress());

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some garbage'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only (DISABLE IN PRODUCTION)
app.use(express.errorHandler());

// index of site / registration of urls
app.get('/', handlers.index);

// start server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Listening on port 8000. Go to http://127.0.0.1:8000/');
});
