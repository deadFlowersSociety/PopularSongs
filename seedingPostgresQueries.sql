
 -- Postgres
-- truncate table songs;
-- truncate table albums;
truncate table artists;


create table if not exists popularsongs.artists ("id" serial, "name" varchar(70));
-- create table if not exists popularsongs.albums ("artistID" int, "name" varchar(70), "imageUrl" varchar(240), "yearPublished" int);
-- create table if not exists popularsongs.albums ("artistID" int, "name" varchar(70), "imageUrl" varchar(240), "yearPublished" int);

-- copy popularsongs.songs FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/songs/songsCSV1.csv' DELIMITER ',' CSV HEADER;
-- copy popularsongs.albums FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/albums/albumCSV1.csv' DELIMITER ',' CSV HEADER;
\copy popularsongs.artists FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/artists/artistsCSV1.csv' DELIMITER ',' CSV HEADER;

-- -- psql -f ./seedingQueries.sql spotify_popular_songs

-- --  node --max-old-space-size=5000 <filename>


-- -- Cassandra Queries 

-- copy songs (artistId, name, streams, length, popularity, inLibrary) FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/songs/songsCSV1.csv' with header=true;

-- copy artists (artistId, name) FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/artists/artistsCSV1.csv' with header=true;

-- copy albums (artistId, name, imageurl, yearPublished) FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/albums/albumCSV1.csv' with header=true;

-- Postgres

-- Read
select * from popularsongs.artists, popularsongs.albums, popularsongs.songs where artists.id = 9999999 and albums."artistID"= artists.id and songs."artistID"=artists.id;

-- Insert 

INSERT INTO "popularsongs"."albums"("artistID", "name", "imageUrl", "yearPublished") VALUES(1000001, 'John Doe', 'wwww.clonethis.com', 1999) RETURNING "artistID", "name", "imageUrl", "yearPublished";

-- Cassandra 
