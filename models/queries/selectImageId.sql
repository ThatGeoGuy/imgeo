SELECT images.id 
FROM imgeo.images
WHERE imgeo.images.file_path = $1 LIMIT 1; 
