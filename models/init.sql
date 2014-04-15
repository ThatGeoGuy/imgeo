-- ENGO 551 IMGEO Database Initialization Script -- 
-- Initialize Database, use these lines if it doesn't exist --
-- CREATE DATABASE imgeo_website; 
-- GRANT ALL PRIVILEGES ON DATABASE imgeo_website TO postgres;

-- Initialize Schema --
DROP SCHEMA IF EXISTS imgeo CASCADE;
CREATE SCHEMA imgeo;

-- Add extensions --
DROP EXTENSION IF EXISTS postgis;
CREATE EXTENSION postgis;

-- CREATE TABLES --
CREATE TABLE imgeo.locations (
	id serial PRIMARY KEY,
	lon_lat_point geography(POINT, 4326) UNIQUE
);
	
CREATE TABLE imgeo.images ( 
	id serial PRIMARY KEY,
	name varchar(8000),
	file_path varchar(41) UNIQUE 
);

CREATE TABLE imgeo.tags ( 
	id serial PRIMARY KEY,
	name varchar(8000) UNIQUE
);

CREATE TABLE imgeo.image_tag ( 
	id serial PRIMARY KEY,
	image_id integer REFERENCES imgeo.images(id),
	tag_id integer REFERENCES imgeo.tags(id), 
	CONSTRAINT imgeo_image_tag_unique UNIQUE (image_id, tag_id)
);

CREATE TABLE imgeo.image_location ( 
	id serial PRIMARY KEY,
	image_id integer REFERENCES imgeo.images(id),
	location_id integer REFERENCES imgeo.locations(id),
	CONSTRAINT imgeo_image_location_unique UNIQUE (image_id, location_id)
);
