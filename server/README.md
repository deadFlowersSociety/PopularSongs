<!-- Requests -->

1. POST: /songs/popularsongs/addPopularSong - postNewSong When provided a song 

2. GET: /songs/popularsongs/:id - getPopularSong When given a song/id, information related to that song will be retrieved such as: artist, streams, length, popularity, library

3. PUT: /songs/popularsongs/:id/updateLibrary - updatePopularSong when given a song/id, it will either add or remove given song from library

4. DELETE: /songs/popularsongs/:id/deletePopularSong - deletePopularSong When given a song/id, the delete request will remove that record and update table/document