/* 
 * ENGO 551 - IMGEO Project
 * File        : routes/getHandlers.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 14:00:24
 * Description : Implements the HTTP GET handlers for each page on the server
 */

var url          = require("url"),
	fs           = require("fs"),
	modelConfig  = require('../models/config'),
	modelQueries = require('../models/query'),
	path         = require("path");


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
			qArray = query.search.split('$'); 
			if(qArray[0].match(new RegExp(/(-?\d+\.?\d+) (-?\d+\.?\d+)/))) { 
				pg.connect(modelConfig[app.get('env')], function(err, client, done) {
					var loc = 'SRID=4326;POINT(' +  qArray[0] + ')';
					client.query(modelQueries.selectImagesInArea([loc, 20000]), function(err, result) {
						var imagePaths = [];
						for(var i = 0; i < result.rows.length; ++i) { 
							imagePaths[i] = result.rows[i].filepath; 
						} 

						if(imagePaths.length === 0) { 
							imagePaths = false; 
						}

						templateParameters = {
							'authors': authors,
							'imageList': imagePaths
						};
						res.render('results.html', templateParameters);
						done(); 
					});
				});
			} else { 
				var imagePaths = [];
				pg.connect(modelConfig[app.get('env')], function(err, client, done) { 
					qArray.forEach(function(el, i, array) { 
						client.query(modelQueries.selectImagesByTag([array[i]]), function(err, result) { 
							for(var j = 0; j < result.rows.length; ++j) { 
								imagePaths.push(result.rows[j].filepath); 
							} 
						});
					});

					setTimeout(function() { 
						templateParameters = { 
							'authors': authors,
							'imageList': imagePaths
						}
						res.render('results.html', templateParameters); 
						done();
					}, 500); 
				}); 
			}
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
			pg.connect(modelConfig[app.get('env')], function(err, client, done) { 
				var tags = []; 
				client.query(modelQueries.selectTagsForImage([filepath[1]]), function(err, result) { 
					if(err) { done(err); } 
					for(var i = 0; i < result.rows.length; ++i) { 
						tags[i] = result.rows[i].name; 
					}
					var title; 
					client.query(modelQueries.selectImageName([filepath[1]]), function(err, result) { 
						if(err) { done(err); } 
						if(result.rows.length > 0) { 
							title = result.rows[0].name; 
						} else { 
							title = filepath[1]; 
						}
							
						var lat, lon; 
						client.query(modelQueries.selectLocationFromImage([filepath[1]]), function(err, result) { 
							if(err) { done(err); } 
							if(result.rows.length > 0) { 
								lon = result.rows[0].lon_lat[0]; 
								lat = result.rows[0].lon_lat[1]; 
							}
							
							var templateParameters = { 
								"title": title, 
								"description": "Image - " + imageString,
								"authors" : authors, 
								"imageUrl" : imageString,
								"pageUrl": app.get('FQDN') + req.originalUrl,
								"tags": tags,
								"latitude": lat,
								"longitude": lon
							}
							res.render('imageView.html', templateParameters);
							done(); 
						});
					}); 
				});
			});
		} else { 
			res.send(404);
		}
	});
}
