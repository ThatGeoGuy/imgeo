SELECT imgeo.tags.name 
FROM imgeo.tags, imgeo.images, imgeo.image_tag
WHERE imgeo.images.id = imgeo.image_tag.image_id AND
imgeo.tags.id = imgeo.image_tag.tag_id AND 
imgeo.images.file_path = $1; 
