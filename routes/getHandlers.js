/* 
 * ENGO 551 - IMGEO Project
 * File        : routes/getHandlers.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 14:00:24
 * Description : Implements the HTTP GET handlers for each page on the server
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
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query; 
		var templateParameters; 

		if(!query.hasOwnProperty('search')) { 
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
		var filepath = url.parse(req.url).pathname; 
		filepath = filepath.split('/').filter(function(e) { 
			return e.length > 0; 
		});
		filepath.slice(1);

		var imageString = false; 
		for(var i = 0; i < imageExtensions.length; ++i) {
			if(filepath[1].slice(filepath[1].length - 4) === imageExtensions[i]) {
				imageString = "/img/" + filepath[1]; 
			}
		}

		var imagePath = path.join(__dirname, "../public", imageString); 

		if(fs.existsSync(imagePath)) { 
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
