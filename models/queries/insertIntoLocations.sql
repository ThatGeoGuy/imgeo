INSERT 
INTO imgeo.locations (lon_lat_point) 
VALUES
(ST_GeographyFromText('SRID=4326;POINT($1 $2)'));
