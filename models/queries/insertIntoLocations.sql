INSERT INTO imgeo.locations (lon_lat_point) 
SELECT ST_GeomFromEWKT($1)
WHERE NOT EXISTS
(
	SELECT imgeo.locations.lon_lat_point 
	FROM imgeo.locations
	WHERE imgeo.locations.lon_lat_point = ST_GeomFromEWKT($1)
);
