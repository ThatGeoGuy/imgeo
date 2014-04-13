INSERT INTO imgeo.image_location (image_id, location_id)
SELECT imgeo.images.id AS image_id, imgeo.locations.id AS location_id
FROM imgeo.images, imgeo.locations
WHERE 
imgeo.images.file_path = $1 AND
imgeo.locations.lon_lat_point = ST_GeomFromEWKT($2) AND 
NOT EXISTS 
(
	SELECT 
	imgeo.image_location.image_id, 
	imgeo.image_location.location_id
	FROM imgeo.image_location, imgeo.images, imgeo.locations
	WHERE 
	imgeo.images.file_path = $1 AND
	imgeo.image_location.image_id = imgeo.images.id AND
	imgeo.locations.lon_lat_point = ST_GeomFromEWKT($2) AND
	imgeo.image_location.location_id = imgeo.locations.id
);
