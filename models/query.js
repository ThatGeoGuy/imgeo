/*
 * ENGO 551 IMGEO Query Constructor
 * File:         models/query.js
 * Author:       Jeremy Steward
 * Date:         2014-03-21 @ 13:40:45
 * Description:  Defines functions to help with building query and insertion
 * 				 strings. (uses prepared queries in node-postgres) 
 */

var fs   = require('fs'),
	path = require('path');

module.exports = {};

var loadQuery = function(filepath) { 
	var query; 
	fs.readFileSync(path.join(__dirname, filepath), function(err, data) { 
		if(err) { 
			throw err;
		}
		query = data.toString();
	});
	return query; 
};

/*
 * For each file in the queries directory, make a preparedStatement with
 * the same name as the file name (minus the .sql part) and return that 
 * statement. These are all put into the module.exports object, which 
 * will have a function name that is the same as the name of each of the
 * prepared statments. 
 */
fs.readDir(path.join(__dirname, "queries"), function(err, files) { 
	if(err) { 
		throw err;
	}
	
	for(var i = 0; i < files.length; ++i) { 
		/*
		 * NOTE: below each function will accept an argument 'values', 
		 * which is an array of each of the values that need to be 
		 * substituted into the prepared statements when they are 
		 * constructed.
		 */
		module.exports[files[i].substring(0,files[i].length - 4)] = function(values) {
			var queryString = loadQuery(path.join(__dirname, 'queries', files[i]));
			var preparedStatement = { 
				"name": files[i].substring(0,files[i].length - 4),
				"text": queryString,
				"values": values
			};
			return preparedStatement; 
		};
	}
});

