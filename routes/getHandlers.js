/* 
 * ENGO 551 - IMGEO Project
 * File        : routes/handlers.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 14:00:24
 * Description : Implements the request handlers for each page on the server
 */

var url  = require("url"),
	fs   = require("fs"),
	path = require("path");

var authors = [ 
	{ "name": "Jeremy Steward" },
	{ "name": "Laura Norman" }
];

var imageExtensions = [
	".jpg",
	".jpeg",
	".png",
	".gif",
	".tif",
	".tiff"
];

module.exports = function(app, pg) { 
	app.get('/', function(req, res) {
		var url_parts = url.parse(request.url, true);
		var query = url_parts.query; 
		var templateParameters; 

		if(query === "") { 
			templateParameters = {
				"description" : "Homepage for the IMGEO website",
				"authors"     : authors,
				"index"       : true,
			};
			res.render('index.html', templateParameters);
		} else { 
			templateParameters = {};
			res.render('results.html', templateParameters);
		}
	}); 

	app.get('/upload', function(req, res) { 
		templateParameters = { 
			"description" : "Upload your images to the IMGEO service!",
			"authors"     : authors,
			"upload"      : true,
		};
		res.render('upload.html', templateParameters);
	});

	app.get('/image/*', function(req, res) {
		var path = url.parse(req.url).pathname; 
		path = path.split('/').filter(function(e) { 
			return e.length > 0; 
		});
		path.slice(1);

		var imageString = false; 
		for(var i = 0; i < imageExtensions.length; ++i) {
			if(path[1].slice(path[1].length - 4) === imageExtensions[i]) {
				imageString = "/img/" + path[1]; 
			}
		}

		if(imageString && fs.existsSync(path.join("public", imageString))) { 
			templateParameters = { 
				"description": "Image - " + imageString,
				"authors" : authors, 
				"imageUrl" : imageString,
				"pageUrl": app.get('FQDN') + req.originalUrl,
				"tags": ["test", "test2", "tag", "test", "another tag"]
			}
			res.render('imageView.html', templateParameters);
		} else { 
			res.send(404);
		}
	});
}
