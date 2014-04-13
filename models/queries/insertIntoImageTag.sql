INSERT INTO imgeo.image_tag (image_id, tag_id) 
SELECT imgeo.images.id AS image_id, imgeo.tags.id AS tag_id
FROM imgeo.images, imgeo.tags
WHERE 
imgeo.images.file_path = $1 AND 
imgeo.tags.name = $2 AND 
NOT EXISTS
(
	SELECT 
	imgeo.image_tag.image_id, 
	imgeo.image_tag.tag_id
	FROM imgeo.image_tag, imgeo.images, imgeo.tags
	WHERE 
	imgeo.images.file_path = $1 AND
	imgeo.image_tag.image_id = imgeo.images.id AND
	imgeo.tags.name = $2 AND
	imgeo.image_tag.tag_id = imgeo.tags.id
);
