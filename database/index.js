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
    console.log('connected');
  }
});

const query = { 
  text: `insert into secondtest.thistest ("artistID", "name") values (5, 'pop')`
};

// wc -l database/seededData/albums/albumCSV1.csv
// node --max-old-space-size=5000 ./database/dataGenerator.js
// psql -f ./seedingQueries.sql spotify_popular_songszz

// client.query(query, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res.rows[res.rows.length - 1]);
//   }
//   // client.end();
// });

client.query('SELECT * from secondtest.thistest', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res.rows[res.rows.length - 1]);
  }
  // client.end();
});

client.query(`\copy popularsongs.songs FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/songs/songsCSV1.csv' DELIMITER ',' CSV HEADER`, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('');
  }
  client.end();
});

// client.query(`copy popularsongs.songs FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/artists/artistsCSV1.csv' DELIMITER ',' CSV HEADER`, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('');
//   }
//   client.end();
// });

// client.query(`copy popularsongs.songs FROM '/Users/karin_hsu/Desktop/Hack_Reactor/PopularSongs/database/seededData/albums/albumCSV1.csv' DELIMITER ',' CSV HEADER`, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('');
//   }
//   client.end();
// });




// const mongoose = require('mongoose');
// // const db = require('../config/keys').mongoURI;
// const db = require('../config/keys').mongoMlab;


// mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));


// const Schema = mongoose.Schema;

// const ArtistSchema = new Schema({
//   id: Number, 
//   name: String,
//   albums: [{
//     id: Number, 
//     name: String, 
//     img: String,
//     publish: Number, 
//     songs: [{
//       id: Number,
//       name: String,
//       streams: Number,
//       length: Number, 
//       popularity: Number, 
//       library: Boolean
//     }]
//   }]
// });


// module.exports = Artists = mongoose.model('Artists', ArtistSchema);
