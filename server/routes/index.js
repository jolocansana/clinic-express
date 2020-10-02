'use strict';

const express = require('express');
const app = express.Router();

app.use('/api/login', require('./login'));
app.use('/api/users', require('./users'));
app.use('/api/patients', require('./patients'));
app.use('/api/visits', require('./visits'));
app.use('/api/files', require('./files'));

// built vue files for production
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(__dirname + '/public/'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

module.exports = app;