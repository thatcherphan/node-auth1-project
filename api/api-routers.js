// const express = require('express');

// const router = express.Router();

const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

// /api/auth
router.use('/auth', authRouter);

// /api/users
router.use('/users', usersRouter);

// /api
router.get('/', (req, res) => {
    res.status(200).json({api: "Thatcher's api is ready to go!"})
})

module.exports = router;