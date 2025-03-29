const db = require('../Connection');

// Logica para las queries de la tabla "users"

const getAllUsers = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.error('Error fetching users:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

const getUserById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error fetching user by ID:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

const createUser = async (user) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users SET ?', user, (err, results) => {
            if (err) {
                console.error('Error creating user:', err);
                return reject(err);
            }
            resolve(results.insertId);
        });
    });
};

// Aqui se van a exportar todas las funciones que se creen para la tabla users
module.exports = {
    getAllUsers,
    getUserById,
    createUser
}