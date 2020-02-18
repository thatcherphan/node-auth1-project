const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const apiRouter = require('./api/api-routers.js');

const server = express();

const sessionConfig = {
    name: "cat",
    secret: "mycatishalfshavedandhelikescookies",
    cookies: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('./database/db-config.js'),
        tablename: "sessions",
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to Thatcher's API"})
})

module.exports = server;