const express = require('express');
const helmet = require('helmet');

const apiRouter = require('./api/api-routers.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to Thatcher's API"})
})

module.exports = server;