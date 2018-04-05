const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
// const util = require('util');
const router = express.Router();
const app = express();
app.use(express.static('public'));
const request = require('request-promise');



const jsonParser = bodyParser.json();
app.use(morgan('common'));

// need to add headers with request to api? 
app.get('/makeRequest', function (req, res) {
  axios.get('https://www.numbeo.com/api/city_prices?api_key=4uxocu7eiqwid6&query=Phoenix')
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    // res.json(response);
  })
  .catch(function (error) {
    console.log(error);
  });
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  next();
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


  let server;

  function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      }).on('error', err => {
        reject(err);
      });
    });
  }


  function closeServer() {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          // so we don't also call `resolve()`
          return;
        }
        resolve();
      });
    });
  }

  if (require.main === module) {
    runServer().catch(err => console.error(err));
  };
  
  module.exports = {app, runServer, closeServer};


