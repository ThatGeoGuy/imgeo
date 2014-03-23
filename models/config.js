/*
 * ENGO 551 IMGEO Model (Database) Configuration
 * File:         models/config.js
 * Author:       Jeremy Steward
 * Date:         2014-03-21 @ 13:13:15
 * Description:  Defines the parameters that describe the database connection,
 * 				 development and production profiles. 
 */

module.exports = { 
	development: {
		database:  "imgeo_website",
		port:      5432,
		user:      "postgres",
		password:  "postgres",
		host:      "localhost",
		//connString:  "postgres://postgres:postgres@localhost:5432/imgeo_website",
		app: {
			name: "IMGEO - Spatially aware image sharer"
		}
	}, 

	production: {
		database:  "imgeo_website",
		port:      process.env.PG_PORT || 5432,
		user:      process.env.USER,
		password:  process.env.PG_PASS,
		host:      process.env.PG_HOST,
		//connString:  process.env.PG_IMGEO_CONNSTRING,
		app: { 
			name: "IMGEO - Spatially aware image sharer"
		}
	}
};
