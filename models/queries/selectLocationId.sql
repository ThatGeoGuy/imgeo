SELECT locations.id
FROM imgeo.locations
WHERE imgeo.locations.lon_lat_point = ST_GeometryFromText('SRID=4326;POINT($1 $2)');
