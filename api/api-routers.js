
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const authorize = require('../auth/auth-required-middleware.js');

const Users = require('../users/users-model.js');

const usersRouter = require('../users/users-router.js');

// /api/users
router.use('/users', usersRouter);

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

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    //To be continue for next lesson, session and cookies
    Users.findBy({ username })
        .first()
        .then(user =>{
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                req.session.skippy = "Harrythecat";

                res.status(200).json({message: `Welcome ${username}`})
            } else {
                res.status(401).json({message: 'Invalid credential'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Please enter correct username and password"})
        })

})

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
        if (err) {
            res.status(400).send('queue the groundhog day trope... you can never leave...');
        } else {
            res.send('you made it out! good job!');
        }
        });
    } else {
        res.end();
    }
});

module.exports = router;