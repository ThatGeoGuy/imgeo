INSERT INTO imgeo.tags (name) 
SELECT $1 
WHERE NOT EXISTS 
(
	SELECT imgeo.tags.name 
	FROM imgeo.tags 
	WHERE imgeo.tags.name = $2
);
