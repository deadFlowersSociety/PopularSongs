truncate table songs;
truncate table albums;
truncate table artists;


create table if not exists popularsongs.artists ("name" varchar(70));
create table if not exists popularsongs.albums ("artistID" int, "name" varchar(70), "imageUrl" varchar(240), "yearPublished" int);

copy popularsongs.songs FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/songs/songsCSV1.csv' DELIMITER ',' CSV HEADER;
copy popularsongs.albums FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/albums/albumCSV1.csv' DELIMITER ',' CSV HEADER;
copy popularsongs.artists FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/artists/artistsCSV1.csv' DELIMITER ',' CSV HEADER;

-- psql -f ./seedingQueries.sql spotify_popular_songs

--  node --max-old-space-size=5000 <filename>