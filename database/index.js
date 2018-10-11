const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'guestuser',
  password: 'guestuser',
  database: 'spotify_popular_songs'
});
// working copy insertion command
//\copy popularsongs.songs FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/songs/songsCSV1.csv' DELIMITER ',' CSV HEADER;

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected with database');
  }
});

const getArtistInfo = (id, artistDataReceived) => {
  client.query(`select id, "songName", "albumName", "imageUrl", popularity, streams, "inLibrary" from popularsongs.artists, popularsongs.albums, popularsongs.songs where artists.id = ${id} and albums."artistID"= artists.id and songs."artistID"=artists.id`, (err, artistData) => {
    if (err) {
      console.log('error getting artist from database', err);
      artistDataReceived(err, null);
    } else {
      artistDataReceived(null, artistData.rows);
    }
  });
};

const postNewArtist = (number, postedNewArtist) => {
  client.query(`INSERT INTO popularsongs.artists (id, name) VALUES('${number}', 'testing')`, (err, result) => {
    if (err) {
      console.log('error inserting artist', err);
      postedNewArtist(err, null);
    } else {
      postedNewArtist(nill, result);
    }
  });
};

// wc -l database/seededData/albums/albumCSV1.csv
// node --max-old-space-size=5000 ./database/dataGenerator.js
// psql -f ./seedingQueries.sql spotify_popular_songszz


module.exports = {
  getArtistInfo: getArtistInfo,
  postNewArtist: postNewArtist
};
