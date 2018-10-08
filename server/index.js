require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// const Artist = require('../database/index');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');


//------
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers.
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  // console.log("testing git");
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use( bodyParser.json() );
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../public/')));
  
  app.get('/artist/:id', (req, res) => {
    db.getArtistInfo(req.params.id, (err, result) => {
      if (err) {
        console.log('error found in getting data request', err);
        res.status(400);
      } else {
        console.log(result);
        res.status(200).send(result);
      }
    });
  });
  
  // expect to receive {artistID, albumID, songID, added -> bool either 1 or 0}
  app.post('/update', function (req, res) {
    const number = 10000002;
    number += 1;
    db.postNewArtist(number, (err, result) => {
      if (err) {
        console.log('error in request to post', err);
        res.status(400);
      } else {
        console.log(result);
        res.status(200);
      }
    });
  });


  console.log(`Worker ${process.pid} started`);
  
  const PORT = 3003;
  
  app.listen(PORT, function() {
    console.log(`listening on port ${PORT}!`);
  });
}

cluster.on('exit', (worker) => {
  console.log('mayday! mayday! worker', worker.id, ' is no more!')
  cluster.fork();
});


