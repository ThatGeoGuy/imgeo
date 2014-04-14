SELECT 
regexp_matches(ST_AsText(locations.lon_lat_point), 'POINT\((-?\d+\.?\d+) (-?\d+\.?\d+)\)') AS lon_lat
FROM 
imgeo.images, imgeo.locations, imgeo.image_location
WHERE 
imgeo.image_location.image_id = imgeo.images.id AND
imgeo.image_location.location_id = imgeo.locations.id AND
imgeo.images.file_path = $1; 
