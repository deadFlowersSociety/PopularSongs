const faker = require('faker');
// // const Artist = require('./index');
const fs = require('fs');


const makeArtistEntry = () =>  `${faker.name.firstName()}`;

const makeAlbumEntry = (numberOfAlbums) => {
  return `${faker.random.number({
    min: 1, max: numberOfAlbums
  })},${faker.lorem.words(3)},www.thiswillbetheurl.com/${faker.random.number({
    min: 1, max: 1000,
  })}.com,${Math.floor(Math.random() * (2018 - 1920 + 1)) + 1920}`;
};

const makeSongsEntry = (numberOfSongs) => {
  return `${faker.random.number({
    min: 1, max: numberOfSongs
  })},${faker.lorem.words(3)},${Math.floor(Math.random() * (250000000 - 50000000 + 1)) + 50000000},${Math.floor(Math.random() * (300 - 210 + 1)) + 210},${Math.floor(Math.random() * 20) + 1},${Math.random() >= 0.5}`;
};

//CSV Entries

const writeArtistCSV = (numberOfArtists, artistCSVPath) => {
  artistCSVPath.write('name\n');
  
  var i; 
  var l = numberOfArtists;
  for (i = 0; i < l; i++) { //1:1:1 ratio 
    artistCSVPath.write(`${makeArtistEntry()}\n`);

    // artistCSVPath.on('finish', function() {
    //   console.log('artist csv file downloaded to seededData folder');
    // });
  }
  artistCSVPath.end();
};


const writeAlbumCSV = (numberOfAlbums, albumCSVPath) => {
  albumCSVPath.write('artistID,name,imageUrl,yearPublished\n');
  var i;
  var l = numberOfAlbums;
  for (i = 0; i < l; i++) { // insert number of albums to write 1:1:1 ratio
    albumCSVPath.write(`${makeAlbumEntry(numberOfAlbums)}\n`);
    // albumCSVPath.on('finish', function() {
    //   console.log('album csv file downloaded to seededData folder');
    // });
  }
  albumCSVPath.end();
};

const writeSongCSV = (numberOfSongs, songCSVPath) => {
  songCSVPath.write('artistId,name,streams,length,popularity,inLibrary\n');
  var i;
  var l = numberOfSongs;
  for (i = 0; i < l; i++) { //1:1:1 ratio
    songCSVPath.write(`${makeSongsEntry(numberOfSongs)}\n`);
  }

  songCSVPath.end(); 
};

const generateData = async (numberOfArtists, numberOfAlbums, numberOfSongs, maxEntries) => {
  //2-3 minutes to seed a 1:1:1 ratio of 1M in each
  var max = maxEntries;
  
  // Artists
  var artistFileNumber = 1; 
  var artistStart = 0; 
  var artistEnd = 1; 
  
  // Albums
  var albumFileNumber = 1; 
  var albumStart = 0; 
  var albumEnd = 1; 
  
  // Songs
  var songFileNumber = 1; 
  var songStart = 0; 
  var songEnd = 1; 
  
  // let artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV${artistFileNumber}.csv`);
  // let albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV${albumFileNumber}.csv`);
  // let songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV${songFileNumber}.csv`);
  
  let artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV1.csv`);
  let albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV1.csv`);
  let songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV1.csv`);
  
  // while (artistStart < artistEnd) { //for scaling
  while (artistStart < artistEnd) {
    await writeArtistCSV(numberOfArtists, artistCSV);
    // artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV${artistFileNumber}.csv`); //to accomodate creation of multipl csv files
    // artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV1.csv`);
    artistStart += 1; 

    // if (artistFileNumber < 10) {
    //   artistFileNumber += 1;
    // }
  }

  // while (albumStart < albumEnd) {
  while (albumStart < albumEnd) {
    await writeAlbumCSV(numberOfAlbums, albumCSV);
    // albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV${albumFileNumber}.csv`); //to accomodate creation of multipl csv files
    // albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV1.csv`);
    // albumCounts += numberOfArtists;
    albumStart += 1; 
    // if (albumFileNumber < 10) {
    //   albumFileNumber += 1;
    // }
  }
 
  // while (songStart < songEnd) {
  while (songStart < songEnd) {
    await writeSongCSV(numberOfSongs, songCSV);
    // songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV${songFileNumber}.csv`); //to accomodate creation of multipl csv files
    // songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV1.csv`);
    songStart += 1; 

    // if (songFileNumber < 10) {
    //   songFileNumber += 1;
    // }
  }
}
// number of artists, number of albums, number of songs
generateData(2000000, 2000000, 2000000, 20);

// 10M artists iwth one album, and at least 10 songs