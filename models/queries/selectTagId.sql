SELECT tags.id
FROM imgeo.tags
WHERE imgeo.tags.name = $1 LIMIT 1; 
