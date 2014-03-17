/* 
 * ENGO 551 - IMGEO Project
 * File        : routes/handlers.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 14:00:24
 * Description : Implements the request handlers for each page on the server
 */

var url = require("url"),
	fs  = require("fs");

var authors = [ 
	{ "name": "Jeremy Steward" },
	{ "name": "Laura Norman" }
];

imageExtensions = [
	".jpg",
	".jpeg",
	".png",
	".gif",
	".tif",
	".tiff"
];

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

		if(imageString && fs.existsSync("public" + imageString)) { 
			templateParameters = { 
				"description": "Image result - " + imageString,
				"authors" : authors, 
				"imageUrl" : imageString,
				"pageUrl": app.get('FQDN') + req.originalUrl
			}
			res.render('imageView.html', templateParameters);
		} else { 
			res.send(404);
		}
	});
}
