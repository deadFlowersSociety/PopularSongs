var pg = require('knex')({
  client: 'pg',
  connection: 'postgres://guestuser:guestuser@localhost5432/spotify_popular_songs'
});
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
