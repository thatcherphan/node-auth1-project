const db = require('../database/db-config');

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    console.log(filter);
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({id})
        .first();
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then( ids => {
            const [id] = ids;
            return findById(id);
        });
}