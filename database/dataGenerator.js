const faker = require('faker');
// // const Artist = require('./index');
const fs = require('fs');

var artistIdCount = 0; 
const makeArtistEntry = () =>  {

  artistIdCount++;
  return `${artistIdCount},${faker.name.firstName()} ${faker.name.lastName()}`;
}

const makeAlbumEntry = (numberOfAlbums) => {
  var randomNumber = Math.floor(Math.random() * (1000 - 0) + 0);
  var randomImage = `https://s3-us-west-1.amazonaws.com/spotifyimages/${randomNumber}.jpg`;
  return `${faker.random.number({
    min: 1, max: numberOfAlbums
  })},${faker.lorem.words(3)},${randomImage},${Math.floor(Math.random() * (2018 - 1920 + 1)) + 1920}`;

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

const writeArtistCSV = async (numberOfArtists, artistCSVPath) => {
  var i; 
  var l = numberOfArtists;
  var artistCount = 0; 
  // while (artistCount < numberOfArtists) {
    // let loop = () => {
      for (i = 0; i < l; i++) { //1:1:1 ratio 
      //  await artistCSVPath.write(`${makeArtistEntry()}\n`, function(err) {
      //    artistCSVPath.end();
        artistCSVPath.write(`${makeArtistEntry()}\n`);
  
       // artistCSVPath.on('finish', function() {
         //   console.log('artist csv file downloaded to seededData folder');
         // });
        // }
        // artistCSVPath.end();
      }
      // await loop();
      // artistCount += l;
  //   // artistCSVPath.on('finish', function() {
  //   //   console.log('artist csv file downloaded to seededData folder');
  //   // });
  // }
};

//make these async awaits because this is where the sorting is happening 

const writeAlbumCSV = async (numberOfAlbums, albumCSVPath) => {
  // albumCSVPath.write('artistID,name,imageUrl,yearPublished\n');
  var i;
  var l = numberOfAlbums;
  var albumCount = 0;
  // while (albumCount < numberOfAlbums) {
  //   let loop = () => {

      for (i = 0; i < l; i++) { // insert number of albums to write 1:1:1 ratio
        albumCSVPath.write(`${makeAlbumEntry(numberOfAlbums)}\n`);
        // albumCSVPath.on('finish', function() {
        //   console.log('album csv file downloaded to seededData folder');
        // });
      }
    // }
    // await loop();
    albumCount += l;
  // }
  // albumCSVPath.end();
};

// const writeAlbumCSV = async (numberOfAlbums, albumCSVPath) => {
//   albumCSVPath.write('artistID,name,imageUrl,yearPublished\n');
//   var i;
//   var l = numberOfAlbums;
//   var albumCount = 0;
//   // while (albumCount < numberOfAlbums) {
//   //   let loop = () => {

//       for (i = 0; i < l; i++) { // insert number of albums to write 1:1:1 ratio
//         albumCSVPath.write(`${makeAlbumEntry(numberOfAlbums)}\n`);
//         // albumCSVPath.on('finish', function() {
//         //   console.log('album csv file downloaded to seededData folder');
//         // });
//       }
//     // }
//     // await loop();
//     albumCount += l;
//   // }
//   // albumCSVPath.end();
// };

// const writeSongCSV = (numberOfSongs, songCSVPath) => {
//   songCSVPath.write('artistId,name,streams,length,popularity,inLibrary\n');
//   var i;
//   var l = numberOfSongs;
//   for (i = 0; i < l; i++) { //1:1:1 ratio
//     songCSVPath.write(`${makeSongsEntry(numberOfSongs)}\n`);
//   }

//   // songCSVPath.end(); 
// };

const generateData = async (numberOfArtists, numberOfAlbums, numberOfSongs, maxEntries) => {
  //2-3 minutes to seed a 1:1:1 ratio of 1M in each
  var max = maxEntries;
  
  // Artists
  var artistFileNumber = 1; 
  var artistStart = 0; 
  var artistEnd = max; 
  var artistCount = 0;

  // Albums
  var albumFileNumber = 1; 
  var albumStart = 0; 
  var albumEnd = max; 
  var albumCount = 0; 
  
  // Songs
  var songFileNumber = 1; 
  var songStart = 0; 
  var songEnd = max; 
  var count = 0; 
  // let artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV${artistFileNumber}.csv`);
  // let albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV${albumFileNumber}.csv`);
  // let songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV${songFileNumber}.csv`);
  
  // let artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV1.csv`);
  let albumCSV = fs.createWriteStream(`./database/albumCSV1.csv`);
  // let songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV1.csv`);
  
  // artistCSV.write('id,name\n');
  albumCSV.write('artistID,albumName,imageUrl,yearPublished\n');

  // while (artistStart < artistEnd) { //for scaling
  // while (artistStart < artistEnd) {
  //   await writeArtistCSV(numberOfArtists, artistCSV);
  //   // artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV${artistFileNumber}.csv`); //to accomodate creation of multipl csv files
  //   // artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV1.csv`);
  //   artistStart += numberOfArtists; 
  //   // if (artistFileNumber < 10) {
  //   //   artistFileNumber += 1;
  //   // }
  // }

  // while (albumStart < albumEnd) {

  while (albumStart < albumEnd) {
    await writeAlbumCSV(numberOfAlbums, albumCSV);
    // albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV${albumFileNumber}.csv`); //to accomodate creation of multipl csv files
    // albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV1.csv`);
    // albumCounts += numberOfArtists;
    albumStart += numberOfAlbums; 
    // if (albumFileNumber < 10) {
    //   albumFileNumber += 1;
    // }
  }

  let artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV1.csv`);
  // let albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV1.csv`);
  // let songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV1.csv`);
  
  artistCSV.write('id,name\n');

  // while (artistStart < artistEnd) { //for scaling
  while (artistStart < artistEnd) {
    await writeArtistCSV(numberOfArtists, artistCSV);
    // artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV${artistFileNumber}.csv`); //to accomodate creation of multipl csv files
    // artistCSV = fs.createWriteStream(`./database/seededData/artists/artistsCSV1.csv`);
    artistStart += numberOfArtists; 
    // if (artistFileNumber < 10) {
    //   artistFileNumber += 1;
    // }
  }

  // while (albumStart < albumEnd) {
  // while (albumStart < albumEnd) {
  //   await writeAlbumCSV(numberOfAlbums, albumCSV);
  //   // albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV${albumFileNumber}.csv`); //to accomodate creation of multipl csv files
  //   // albumCSV = fs.createWriteStream(`./database/seededData/albums/albumCSV1.csv`);
  //   // albumCounts += numberOfArtists;
  //   albumStart += numberOfAlbums; 
  //   // if (albumFileNumber < 10) {
  //   //   albumFileNumber += 1;
  //   // }
  // }

 
  // while (songStart < songEnd) {
  // while (songStart < songEnd) {
  //   await writeSongCSV(numberOfSongs, songCSV);
  //   // songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV${songFileNumber}.csv`); //to accomodate creation of multipl csv files
  //   // songCSV = fs.createWriteStream(`./database/seededData/songs/songsCSV1.csv`);
  //   songStart += numberOfSongs; 

  //   // if (songFileNumber < 10) {
  //   //   songFileNumber += 1;
  //   // }
  // }
}
// number of artists, number of albums, number of songs
generateData(2000000, 2000000, 2000000, 10000000);


// 10M artists iwth one album, and at least 10 songs

