
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const authorize = require('../auth/auth-required-middleware.js');

const Users = require('../users/users-model.js');

const usersRouter = require('../users/users-router.js');

// /api/users
// router.use('/users', usersRouter);

// /api
router.get('/', (req, res) => {
    res.status(200).json({api: "Thatcher's api is ready to go!"})
})

// /api/register
router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Cannot save this user"})
        })
})

router.get('/login', (req, res) => {

})

module.exports = router;