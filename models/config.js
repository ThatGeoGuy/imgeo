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
		db:          "imgeo_website",
		port:        5432,
		user:        "postgres",
		pass:        "postgres",
		type:        "postgres",
		uri:         "localhost",
		connString:  "postgres://postgres:postgres@localhost:5432/imgeo_website",
		app: { 
			name: "IMGEO - Spatially aware image sharer"
		}
	}, 

	production: {
		db:          "imgeo_website",
		port:        process.env.PG_PORT || 5432,
		user:        process.env.PG_IMGEO_USER,
		pass:        process.env.PG_IMGEO_PASS,
		type:        "postgres",
		uri:         process.env.PG_URI,
		connString:  process.env.PG_IMGEO_CONNSTRING,
		app: { 
			name: "IMGEO - Spatially aware image sharer"
		}
	}
};
