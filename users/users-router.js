const router = require('express').Router();

const Users = require('../users/users-model.js');

const authorize = require('../auth/auth-required-middleware.js');

router.get('/', authorize, (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Cannot retrieve this list of users."})
        })
})

module.exports = router;