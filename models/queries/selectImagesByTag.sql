SELECT 
images.name AS name, 
images.file_path AS filepath,
regexp_matches(ST_AsText(locations.lat_lon_point), 'POINT\((-?\d+) (-?\d+)\)') AS lon_lat 
FROM 
imgeo.images,
imgeo.locations,
imgeo.image_location,
imgeo.tags,
imgeo.image_tag
WHERE 
imgeo.image_tag.image_id = imgeo.images.id AND
imgeo.image_tag.tag_id = imgeo.tags.id AND
imgeo.image_location.image_id = imgeo.images.id AND
imgeo.image_locaiton.location_id = imgeo.locations.id AND
imgeo.tags.name = $1;
