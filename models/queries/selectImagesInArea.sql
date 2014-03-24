SELECT 
images.name AS name, 
images.file_path AS filepath, 
regexp_matches(ST_AsText(locations.lat_lon_point), 'POINT\((-?\d+) (-?\d+)\)') AS lon_lat 
FROM 
imgeo.images, 
imgeo.locations, 
imgeo.image_location 
WHERE 
imgeo.image_location.image_id = imgeo.images.id AND 
imgeo.image_location.location_id = imgeo.locations.id AND 
ST_DWithin(imgeo.locations.lon_lat_point, ST_GeographyFromText('SRID=4326;POINT($1 $2)'),$3);
