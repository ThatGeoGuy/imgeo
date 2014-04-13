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
	var query = fs.readFileSync(filepath, 'utf-8'); 
	// Remove all enter characters and trim the string
	return query.split('\n').join(' ').trim(); 
};

/*
 * For each file in the queries directory, make a parameterized query with
 * the same name as the file name (minus the .sql part) and return that 
 * statement. These are all put into the module.exports object, which 
 * will have a function name that is the same as the name of each of the
 * prepared statments. 
 */
var directory = path.join(__dirname, "queries"); 
fs.readdir(directory, function(err, files) { 
	if(err) { 
		throw err;
	}
	
	files.forEach(function(el, i, array) { 
		/*
		 * NOTE: below each function will accept an argument 'values', 
		 * which is an array of each of the values that need to be 
		 * substituted into the prepared statements when they are 
		 * constructed.
		 */

		var currentFile = array[i]; 
		var name = currentFile.substring(0,currentFile.length - 4); 
		module.exports[name] = function(values) { 
			var pathname = path.join(directory, currentFile); 
			var queryString = loadQuery(pathname); 
			var parameterizedQuery = { 
				"text": queryString, 
				"values": values
			}; 
			return parameterizedQuery; 
		}
	});

	/*
	for(var i = 0; i < files.length; ++i) { 
		/*
		 * NOTE: below each function will accept an argument 'values', 
		 * which is an array of each of the values that need to be 
		 * substituted into the prepared statements when they are 
		 * constructed.
		var currentFile = files[i].toString(); 
		var name = currentFile.substring(0,currentFile.length - 4);
		module.exports[name] = function(values) {
			var pathname = path.join(directory, currentFile); 
			var queryString = loadQuery(pathname);
			var parameterizedQuery = { 
				"text": queryString,
				"values": values
			};
			return parameterizedQuery; 
		};
	};
	*/
});

