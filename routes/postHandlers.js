/* 
 * ENGO 551 - IMGEO Project
 * File        : routes/postHandlers.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 14:00:24
 * Description : Implements the HTTP POST handlers for each page on the server
 */

var crypto       = require('crypto'),
	fs           = require('fs'),
	formidable   = require('formidable'),
	modelConfig  = require('../models/config'),
	modelQueries = require('../models/query'),
	path         = require('path');

module.exports = function(app, pg) { 
	app.post('/upload', function(req, res) { 
		var form = formidable.IncomingForm(); 
		var name, loc, tags, filename, filetype, MD5; 

		pg.connect(modelConfig[app.get('env')], function(err, client, done) { 
			if(err) { throw err; }; 
			client.query(modelQueries.selectImageId([MD5 + filetype]), function(err, result) {
				if(err) { throw err; }; 

				form.parse(req, function(err, fields, files) { 
					name     = fields.imgname;
					loc      = 'SRID=4326;POINT(' + fields.location + ')';
					tags     = fields.tags.split(',');
					filename = fields.filename;
					filetype = fields.filename.substring(filename.length-4,filename.length);
					MD5      = crypto.createHash('md5')
									 .update(name + ' ' + loc)
									 .digest('hex'); 
					
					if(result.rows.length === 0) { 

						//pg.connect(modelConfig[app.get('env')], function(err, client, done) { 
							if(err) { throw err; }; 

							client.query(modelQueries.insertIntoLocations([loc]), function(err, result) { 
								if(err) { throw err; }; 
							});

							client.query(modelQueries.insertIntoImages([name, MD5 + filetype, MD5 + filetype]), function(err, result) {
								if(err) { throw err; }; 
							});

							client.query(modelQueries.insertIntoImageLocation([MD5 + filetype, loc]), function(err, result) { 
								if(err) { throw err; }; 
							}); 

							tags.forEach(function(el, i, array) { 
								client.query(modelQueries.insertIntoTags([array[i], array[i]]), function(err, result) { 
									if(err) { throw err; }; 
								}); 

								client.query(
									modelQueries.insertIntoImageTag([MD5 + filetype, array[i]]), 
									function(err, result) {
									if(err) { throw err; }; 
								});
							});
						//});
						
						// Saves the image, moves it to the appropriate path
						var source = fs.createReadStream(files.image.path);
						var dest = fs.createWriteStream(path.join(__dirname, '../public/img/', MD5+filetype));
						source.pipe(dest); 
						source.on('error', function(err) { throw err; }); 

						res.redirect('/image/' + MD5 + filetype); 
					} else { 
						res.send('The image already exists, please upload a different image'); 
					}
				});
			});
			done(); 
		});
	});
}; 
