'use strict';

// Config
const PORT = 80;
const HOST = '0.0.0.0';
const TARGET_HOST = 'http://www.google-analytics.com';


const express = require('express');
const request = require('request');

// App
const app = express();

app.use('/', function(req, res) {
  console.log(`New request ${req.url}`);
  var url = TARGET_HOST + req.url;
  var r = null;
  if(req.method === 'POST') {
     r = request.post({uri: url, json: req.body});
  } else {
     r = request(url);
  }

  req.pipe(r).pipe(res);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
