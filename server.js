/*
 * ENGO 551 - IMGEO Server Implementation
 * File        : server.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 11:14:35
 * Description : Implements the webserver for the ENGO500 project website
 */
var express     = require('express'),
	getHandlers = require('./routes/getHandlers'),
	nunjucks    = require('nunjucks'),
	http        = require('http'),
	path        = require('path');

var app = express();
app.set('port', process.env.PORT || 8000);
app.set('env', process.env.NODE_ENV || 'development');
app.set('views', path.join(__dirname, 'views'));
app.set('FQDN', process.env.NODE_FQDN || "http://localhost:" + app.get('port'));

// Templating using nunjucks
nunjucks.configure('views', { 
	autoescape:  true,
	express:     app
});

// all environments
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some garbage'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if(app.get('env') === 'development') { 
	app.use(express.errorHandler());
}

/*
 * Define GET routes and handlers for application
 */
getHandlers(app); 

/*
 * Define POST routes and handlers for application
 */

// start server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Listening on port ' + app.get('port') + 
		'. Go to ' + app.get('FQDN') + '/');
});
