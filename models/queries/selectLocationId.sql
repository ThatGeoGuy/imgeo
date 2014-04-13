SELECT locations.id
FROM imgeo.locations
WHERE 
imgeo.locations.lon_lat_point = ST_GeometryFromText($1) LIMIT 1;
