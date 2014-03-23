/*
 * ENGO 551 IMGEO Query Constructor
 * File:         models/query.js
 * Author:       Jeremy Steward
 * Date:         2014-03-21 @ 13:40:45
 * Description:  Defines functions to help with building query and insertion
 * 				 strings. (uses prepared queries in node-postgres) 
 */

var fs = require('fs'), 
	path = require('path'); 

module.exports = { 

	/*
	 * A function to return a prepared statement for selecting all points
	 * within a radius from a supplied point
	 */
	findImagesInArea : function(latLng, radius) { 
		/* 
		 * The actual query is written in a .sql file in the 
		 * models/queries/ folder
		 */
		var queryString;
		fs.readFileSync(path.join(__dirname, 'queries/findImagesInArea.sql'), function(err, data) { 
			if(err) { 
				throw err; 
			} 
			queryString = data.toString();
		}); 

		var preparedStatement = { 
			"name": "findImagesInArea",
			"text": queryString,
			"values": [
				latLng.longitude,
				latLng.latitude,
				radius
			]
		}; 	
		return preparedStatement;
	}, 

	/*
	 * A function to return a prepared statement for selecting all images 
	 * that have been tagged with a specific tag
	 */ 
	findImagesByTag : function(tags) { 
		/*
		 * Actual query is written in a .sql file in the 
		 * models/queries/ folder
		 */
		var queryString; 
		fs.readFileSync(path.join(__dirname, 'queries/findImagesByTag.sql'), function(err, data) { 
			if(err) { 
				throw err;
			} 
			queryString = data.toString(); 
		});

		var preparedStatement = { 
			"name": "findImagesByTag", 
			"text": queryString,
			"values": [ tag ] 
		};
		return preparedStatement;
	}
};
