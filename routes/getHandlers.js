/* 
 * ENGO 551 - IMGEO Project
 * File        : routes/handlers.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 14:00:24
 * Description : Implements the request handlers for each page on the server
 */

authors = [ 
	{ "name": "Jeremy Steward" },
	{ "name": "Laura Norman" }
]

module.exports = function(app) { 
	app.get('/', function(req, res) {
		templateParameters = {
			"description" : "Homepage for the IMGEO website",
			"authors"     : authors,
			"index"       : true,
		};
		res.render('index.html', templateParameters);
	}); 

	app.get('/upload', function(req, res) { 
		templateParameters = { 
			"description" : "Upload your images to the IMGEO service!",
			"authors"     : authors,
			"upload"      : true,
		};
		res.render('upload.html', templateParameters);
	});
}
