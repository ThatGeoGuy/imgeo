SELECT imgeo.images.name
FROM imgeo.images
WHERE imgeo.images.file_path = $1;
