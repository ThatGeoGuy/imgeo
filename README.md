imgeo
=====

Image sharing service that supports spatial queries. This project spawned as the result of an assignment for the course ENGO 551 - Advanced GIS. The purpose is for users to anonymously (no user authentication) upload imagery with location information to the system, and share these images with others via popular social networks (e.g. Facebook, Twitter, Google+). The server is implemented in node.js, using the Express.js framework. Nunjucks-based templating is used to derive dynamic content from the server. 

Run Server
----------

This project depends on node.js version 0.10 or greater. I highly recommend using [nvm](https://github.com/creationix/nvm) to manage your node installation if at all possible. To run the server and see the website, simply run the following commands: 

	$ git clone https://github.com/ThatGeoGuy/imgeo.git
	$ cd imgeo
	$ npm install
	$ node server.js

TODO
----

* Decide on schema for database
* Implement database and add database setup files to repo
* Create `configure` script to setup modules from npm and initialize database
* Finish templates for web pages (only results page left, need database)
* Implement search functionality in conjunction with Google Maps API
* Populate Wiki

License 
-------

This project is licensed under the GPLv3 license. This software is released as Free Software, WITHOUT WARRANTY. See `LICENSE` for more details. 
