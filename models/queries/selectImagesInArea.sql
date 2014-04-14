SELECT 
images.name AS name, 
images.file_path AS filepath, 
regexp_matches(ST_AsText(locations.lon_lat_point), 'POINT\((-?\d+\.?\d+) (-?\d+\.?\d+)\)') AS lon_lat 
FROM 
imgeo.images, 
imgeo.locations, 
imgeo.image_location 
WHERE 
imgeo.image_location.image_id = imgeo.images.id AND 
imgeo.image_location.location_id = imgeo.locations.id AND 
ST_DWithin(imgeo.locations.lon_lat_point, ST_GeomFromEWKT($1), $2);
