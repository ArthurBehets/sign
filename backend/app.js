const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

const userRoutes = require('./routes/user');
const signRoutes = require('./routes/sign');
const propositionRoutes = require('./routes/proposition');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());


app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use('/api/auth', userRoutes);
app.use('/api/sign', signRoutes);
app.use('/api/proposition', propositionRoutes);


module.exports =  app;
