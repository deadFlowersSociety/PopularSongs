sudo su - postgres

psql

create table if not exists popularsongs.artists ("id" serial, "name" varchar(70));
create table if not exists popularsongs.albums ("artistID" int, "name" varchar(70), "imageUrl" varchar(240), "yearPublished" int);
create table if not exists songs ("artistID" int, "name" varchar(70), "streams" int, "length" int, "popularity" int, "inLibrary" boolean);


\copy artists FROM '/home/ec2-user/artistsCSV1.csv' DELIMITER ',' CSV HEADER;
\copy popularsongs.ablums FROM '/home/ec2-user/albumCSV1.csv' DELIMITER ',' CSV HEADER;
\copy popularsongs.songs FROM '/home/ec2-user/songsCSV1.csv' DELIMITER ',' CSV HEADER;