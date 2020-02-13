const users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    const {username, password} = req.headers;

    if(!(username && password)) {
        res.status(401).json({message: "Invalid credentials"})
    } else {
        users.findBy({username})
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)){
                    next()
                } else {
                    res.status(401).json({message: "Invalid credentials"})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "Server error"})
            })
    }
}