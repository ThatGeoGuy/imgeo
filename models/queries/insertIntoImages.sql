INSERT INTO imgeo.images (name, file_path) 
SELECT $1, $2
WHERE NOT EXISTS
(
	SELECT 
	imgeo.images.name,
	imgeo.images.file_path
	FROM imgeo.images
	WHERE 
	imgeo.images.file_path = $3
);
